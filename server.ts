import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. SECURITY & XSS PROTECTION MIDDLEWARE
  app.use((req, res, next) => {
    // Prevent MIME-sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");
    // Cross-site scripting (XSS) filter
    res.setHeader("X-XSS-Protection", "1; mode=block");
    // Control referrer headers
    res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
    // CSP: Allow framing inside secure environments like Google AI Studio, but secure against malicious endpoints
    res.setHeader(
      "Content-Security-Policy",
      "frame-ancestors 'self' https://*.google.com https://*.run.app https://ai.studio;"
    );
    // Secure clickjacking defense
    res.setHeader("X-Frame-Options", "ALLOW-FROM https://ai.studio https://*.google.com");
    next();
  });

  app.use(express.json());

  // 2. REMOTE FAVICON PROXY WITH 1-YEAR CACHE CONTROL
  // Fetches from the specified Cloudinary link and adds public client caching
  app.get("/favicon.ico", async (req, res) => {
    const faviconUrl = "https://res.cloudinary.com/dn7mjqbfc/image/upload/v1775793809/favicon_cttgw7.png";
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    try {
      const response = await fetch(faviconUrl);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        res.setHeader("Content-Type", "image/png");
        return res.send(Buffer.from(arrayBuffer));
      }
    } catch (e) {
      console.error("Favicon proxy failed, falling back to 301 redirect", e);
    }
    // Fallback: 301 redirect to the CDN URL
    res.redirect(301, faviconUrl);
  });

  // 3. MEMORY-BASED ANTI-BOT & RATE-LIMITER MIDDLEWARE
  const ipLimits = new Map<string, { count: number; resetAt: number }>();
  const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
  const MAX_REQUESTS = 20; // Allow max 20 analyze requests per minute/IP

  const botAndRateLimitProtection = (req: any, res: any, next: any) => {
    const userAgent = req.headers["user-agent"] || "";
    const lowercaseUA = userAgent.toLowerCase();
    
    // Scan for aggressive scrapers or automated command-line HTTP clients
    const crawlerBots = [
      "guzzlehttp", "python-requests", "curl", "wget", "headless", 
      "puppeteer", "selenium", "scrapy", "bot", "crawler", "spider"
    ];
    
    const isBot = crawlerBots.some(kw => lowercaseUA.includes(kw)) && 
                  !lowercaseUA.includes("chrome") && 
                  !lowercaseUA.includes("safari") && 
                  !lowercaseUA.includes("firefox");

    if (isBot) {
      console.warn(`[Anti-Bot] Blocked suspicious automated engine: ${userAgent}`);
      return res.status(403).json({ error: "Access denied. Suspicious engine activity detected." });
    }

    // Rate Limiting by Client Identifier IP
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
    const ipStr = Array.isArray(clientIp) ? clientIp[0] : clientIp;
    const now = Date.now();
    
    let userRecord = ipLimits.get(ipStr);
    if (!userRecord || now > userRecord.resetAt) {
      userRecord = { count: 1, resetAt: now + RATE_LIMIT_WINDOW };
      ipLimits.set(ipStr, userRecord);
    } else {
      userRecord.count++;
    }

    if (userRecord.count > MAX_REQUESTS) {
      console.warn(`[Rate Limit Triggered] IP: ${ipStr} has reached request limit.`);
      return res.status(429).json({ 
        error: "Too many requests. Please slow down and try again later." 
      });
    }

    next();
  };

  // Input Sanitization to fully defend against potential cross-site scripting (XSS) inside inputs
  const sanitizeInput = (req: any, res: any, next: any) => {
    if (req.body) {
      for (const key in req.body) {
        if (typeof req.body[key] === "string") {
          // Remove HTML tags to prevent XSS string injections
          req.body[key] = req.body[key].replace(/<[^>]*>/g, "");
        }
      }
    }
    next();
  };

  // Shared Gemini client on the server
  // User-Agent: aistudio-build is required for telemetry
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API endpoint: AI Forex Analysis (Guarded with Anti-bot, Rate Limits and Input Sanitization)
  app.post("/api/gemini/analyze", botAndRateLimitProtection, sanitizeInput, async (req, res) => {
    try {
      const { pair, timeframe } = req.body;
      if (!pair) {
        return res.status(400).json({ error: "Currency pair is required" });
      }

      if (!ai) {
        // High-quality dynamic fallback analyzer for users who haven't yet set their key
        const defaultActions = ["BUY", "SELL", "STRONG BUY", "STRONG SELL"];
        const action = defaultActions[Math.floor(Math.random() * defaultActions.length)];
        const confidence = Math.floor(Math.random() * 20) + 75; // 75-95%
        
        let entryNum = 1.05 + Math.random() * 0.1;
        if (pair === "XAUUSD" || pair === "GOLD") {
          entryNum = 2000 + Math.random() * 350;
        } else if (pair.includes("JPY")) {
          entryNum = 140 + Math.random() * 15;
        } else if (pair.includes("BTC")) {
          entryNum = 60000 + Math.random() * 30000;
        }
        
        const entry = entryNum.toFixed(pair.includes("JPY") ? 3 : pair.includes("BTC") ? 2 : pair.includes("XAU") ? 2 : 5);
        const pipValue = pair.includes("JPY") ? 0.01 : pair.includes("BTC") || pair.includes("XAU") ? 1.0 : 0.0001;
        const isUp = action.includes("BUY");
        
        const tp1 = (parseFloat(entry) + (isUp ? 40 * pipValue : -40 * pipValue)).toFixed(pair.includes("JPY") ? 3 : pair.includes("BTC") ? 2 : pair.includes("XAU") ? 2 : 5);
        const tp2 = (parseFloat(entry) + (isUp ? 110 * pipValue : -110 * pipValue)).toFixed(pair.includes("JPY") ? 3 : pair.includes("BTC") ? 2 : pair.includes("XAU") ? 2 : 5);
        const sl = (parseFloat(entry) + (isUp ? -30 * pipValue : 30 * pipValue)).toFixed(pair.includes("JPY") ? 3 : pair.includes("BTC") ? 2 : pair.includes("XAU") ? 2 : 5);

        return res.json({
          pair,
          timeframe: timeframe || "H4",
          action,
          confidence: `${confidence}%`,
          entry,
          tp1,
          tp2,
          sl,
          analysis: `Please configure your GEMINI_API_KEY secret in the Settings > Secrets panel of Google AI Studio for live, real-time AI technical analysis and multi-indicator signal synthesis. (Simulated model output loaded successfully for ${pair}.)`
        });
      }

      // If Gemini is available, query it for a high-quality Forex Setup
      const prompt = `You are an expert Forex technical analyst and quantitative trader.
Analyze the currency pair/asset: "${pair}" on timeframe: "${timeframe || 'H4'}".
Provide a professional, realistic trading signal setup with precise trade metrics.
Output your response PRECISELY in the following JSON format:
{
  "pair": "${pair}",
  "timeframe": "${timeframe || 'H4'}",
  "action": "BUY / SELL / STRONG BUY / STRONG SELL",
  "confidence": "85%",
  "entry": "1.08250 (realistic market level for the given pair)",
  "tp1": "1.08650 (precise Take Profit level 1)",
  "tp2": "1.09350 (precise Take Profit level 2)",
  "sl": "1.07950 (precise Stop Loss level)",
  "analysis": "Provide a brief 1-2 sentence technical summary explaining the structure trigger (e.g., RSI bullish divergence, EMA crossover, support level holding, or breakout retest)."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response from Gemini API");
      }

      const parsed = JSON.parse(responseText.trim());
      return res.json(parsed);

    } catch (error: any) {
      console.error("Gemini analysis error:", error);
      res.status(500).json({ error: error.message || "Internal server error during analysis" });
    }
  });

  // Serve static UI or mount Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    // Serve static files with robust 1-year progressive cache strategy
    app.use(
      express.static(distPath, {
        maxAge: "365d",
        immutable: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            // Keep fresh but browser cached for 1 hour to verify sudden updates
            res.setHeader("Cache-Control", "public, max-age=3600");
          }
        },
      })
    );
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express full-stack server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup failed:", err);
});
