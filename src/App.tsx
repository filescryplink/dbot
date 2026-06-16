/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Bot, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Terminal, 
  ArrowUpRight, 
  Coins, 
  Activity, 
  Zap,
  Info,
  Send,
  MessageSquare
} from "lucide-react";
import { motion } from "motion/react";

import MetricCard from "./components/MetricCard";
import LiveTrades from "./components/LiveTrades";
import FaqSection from "./components/FaqSection";
import BrokerSection from "./components/BrokerSection";

export default function App() {
  const [lang, setLang] = useState<"vi" | "en">("vi");
  const isVi = lang === "vi";

  // Navigation anchors
  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-150 selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-emerald-950/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[200px] left-1/4 w-[350px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[400px] right-1/4 w-[350px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="sticky top-0 z-50 bg-[#070b14]/80 backdrop-blur-md border-b border-slate-900 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-xl relative group">
              <Bot className="w-5 h-5 text-slate-950" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-slate-950 animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                DBOT
              </span>
              <span className="text-[10px] font-bold text-emerald-400 font-mono block tracking-wider uppercase">
                BY CRYPLINK
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono font-bold tracking-wider text-slate-400">
            <button 
              type="button" 
              onClick={() => scrollToAnchor("brokers")} 
              className="hover:text-emerald-400 transition-colors uppercase cursor-pointer"
            >
              {isVi ? "BROKER LỰA CHỌN" : "BROKERS"}
            </button>
            <button 
              type="button" 
              onClick={() => scrollToAnchor("live-ticks")} 
              className="hover:text-emerald-400 transition-colors uppercase cursor-pointer"
            >
              {isVi ? "TÍN HIỆU" : "SIGNALS"}
            </button>
            <button 
              type="button" 
              onClick={() => scrollToAnchor("faq")} 
              className="hover:text-emerald-400 transition-colors uppercase cursor-pointer"
            >
              {isVi ? "HỎI ĐÁP" : "FAQ"}
            </button>
            <a 
              href="https://t.me/balvmmo"
              target="_blank"
              rel="noreferrer referrer"
              className="hover:text-emerald-400 transition-colors uppercase cursor-pointer flex items-center gap-0.5 text-emerald-400"
            >
              <span>{isVi ? "LIÊN HỆ" : "CONTACT"}</span>
              <ArrowUpRight className="w-3 h-3 text-emerald-400" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* Server instances banner */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-slate-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>1,842 {isVi ? "ROBOT ĐANG CHẠY" : "BOTS ONLINE"}</span>
            </div>

            {/* Support Telegram Link Button */}
            <a
              href="https://t.me/balvmmo"
              target="_blank"
              rel="noreferrer referrer"
              className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-xl px-3 py-1.5 text-xs font-bold text-emerald-400 transition-colors"
              title={isVi ? "Liên hệ hỗ trợ" : "Contact support"}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Telegram</span>
            </a>

            {/* Language Selection Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === "vi" ? "en" : "vi")}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors rounded-xl px-3 py-1.5 text-xs font-bold text-white cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isVi ? "English" : "Tiếng Việt"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* CORE APPLICATION VIEW */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16 space-y-16">
        
        {/* HERO BLOCK */}
        <section className="text-center relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono mb-6"
          >
            <Zap className="w-3.5 h-3.5 fill-current animate-pulse text-emerald-400" />
            <span>
              {isVi ? "Robot giao dịch Forex tự động 100%" : "100% Automated Forex Bot Service"}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-sans"
          >
            {isVi ? (
              <>
                Giao Dịch Thành Công Với{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Robot DBOT Tự Động
                </span>
              </>
            ) : (
              <>
                Smarter Trading with{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Automated DBOT
                </span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-slate-400 text-sm md:text-base mb-8 leading-relaxed max-w-xl mx-auto"
          >
            {isVi 
              ? "Kết nối trực tiếp tài khoản MT4/MT5 của bạn qua CrypLink. Nhận tín hiệu giao dịch thông minh và báo cáo lệnh chuẩn xác, tiện lợi ngay trên Telegram."
              : "Directly link your MT4/MT5 brokerage account via CrypLink portals. Receive real-time trade signals and automated reports conveniently in Telegram."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary Action Buttons */}
            <button
              onClick={() => scrollToAnchor("brokers")}
              type="button"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 active:scale-[0.97] text-slate-950 font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-slate-950" />
              <span>{isVi ? "Kích Hoạt Robot Ngay" : "Connect Your Bot"}</span>
            </button>
          </motion.div>
        </section>

        {/* METRICS / STATS BENTO GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <MetricCard 
            title={isVi ? "Xác Xuất Đi Lệnh Thắng" : "Win Rate Performance"} 
            value="89.2%" 
            change="+4.1%" 
            isPositive={true} 
            iconName="trending_up" 
          />
          <MetricCard 
            title={isVi ? "Mức Lợi Nhuận Trung Bình Tuần" : "Avg Weekly ROI"} 
            value="4.81%" 
            change="+0.65%" 
            isPositive={true} 
            iconName="percent" 
          />
          <MetricCard 
            title={isVi ? "Lượng Pips Tích Luỹ Ròng" : "Total Secured Pips"} 
            value="+14,942" 
            change="+1,240" 
            isPositive={true} 
            iconName="activity" 
          />
          <MetricCard 
            title={isVi ? "Giới Hạn Sụt Giảm Smart-DD" : "Smart drawdown protection"} 
            value="< 2.45%" 
            change="-0.8%" 
            isPositive={true} 
            iconName="shield" 
          />
        </section>

        {/* RECOMENTED BROKERS WITH AFFILIATE LINKS */}
        <section id="brokers" className="scroll-mt-24">
          <BrokerSection isVi={isVi} />
        </section>

        {/* LIVE TRADE TELEMETRY LOGS */}
        <section id="live-ticks" className="scroll-mt-24">
          <LiveTrades isVi={isVi} />
        </section>

        {/* FAQ ACCORDION INFORMATION COMPONENT */}
        <section id="faq" className="scroll-mt-24">
          <FaqSection isVi={isVi} />
        </section>

        {/* SUPPORT / CONTACT BANNER SECTION */}
        <section id="contact" className="scroll-mt-24">
          <div className="bg-gradient-to-r from-emerald-950/30 via-[#0a1120] to-cyan-950/30 border border-emerald-500/15 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-xl shadow-emerald-950/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 mt-1 flex-shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-emerald-400 uppercase">
                  {isVi ? "HỖ TRỢ TRỰC TUYẾN 24/7" : "DIRECT 24/7 CUSTOMER SUPPORT"}
                </span>
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mt-1">
                  {isVi ? "Cần hỗ trợ cài đặt DBOT cá nhân?" : "Need help setting up your personal DBOT?"}
                </h3>
                <p className="text-slate-400 text-xs mt-2 max-w-lg leading-relaxed">
                  {isVi 
                    ? "Liên hệ trực tiếp với đội ngũ đại sứ của chúng tôi qua Telegram @balvmmo để nhận hướng dẫn kết nối API MT4/MT5 chi tiết hoặc cấu hình máy chủ VPS miễn phí."
                    : "Connect directly with our dedicated ambassador team on Telegram @balvmmo to receive personalized MT4/MT5 assistance or free premium cloud VPS onboarding."}
                </p>
              </div>
            </div>

            <a
              href="https://t.me/balvmmo"
              target="_blank"
              rel="noreferrer referrer"
              className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-emerald-500/10 text-sm cursor-pointer whitespace-nowrap"
            >
              <Send className="w-4 h-4 fill-current text-slate-950" />
              <span>{isVi ? "Liên Hệ Telegram Ngay" : "Contact on Telegram"}</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950 stroke-[3]" />
            </a>
          </div>
        </section>

        {/* TRUST / RISK AND REGULATORY NOTICE */}
        <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 text-xs text-slate-500 leading-relaxed font-sans max-w-4xl mx-auto space-y-3">
          <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider text-[10px] font-mono">
            <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{isVi ? "Cảnh báo rủi ro đầu tư quan trọng (Forex Risk)" : "Risk Disclosure & Financial Disclaimer"}</span>
          </div>
          <p>
            {isVi 
              ? "Giao dịch ngoại hối (Forex), CFD và các công cụ phái sinh ký quỹ là thị trường có tỷ lệ rủi ro cao và biến động mạnh. Lợi nhuận kiếm được trong quá khứ không phản ánh hay cam kết đảm bảo kết quả lợi nhuận tương lai. Mức đòn bẩy cao có thể hoạt động chống lại bạn cũng như hỗ trợ bạn."
              : "Financial derivatives, CFDs, and leveraged currency trading involve high-risk variables and fluctuations. Historic algorithmic wins represent simulation evaluations and never secure future ROI. Trade responsibly without risking critical living funds."}
          </p>
          <p>
            {isVi 
              ? "DBOT CrypLink vận hành như một cổng xử lý lệnh giao dịch theo thuật toán định lượng tự động và dịch vụ giáo dục lập đề xuất phân tích AI. Chúng tôi khách quan tự động hóa các chỉ báo và tuyệt đối không can dự môi giới trung gian, ủy thác đầu tư trái luật."
              : "DBOT and its associated handlers function purely as quantitative algorithmic signal transmitters and AI developer tools. No pooled trust managers, regulated brokerage services, or banking handles are managed directly by this web script."}
          </p>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-[#04070d] py-12 px-4 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-800 text-emerald-400">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-300">DBOT Engine @ CrypLink</span>
              <p className="text-[10px] text-slate-600 font-mono">Algorithmic Forex Portal v2026.06</p>
            </div>
          </div>

          <p className="text-center md:text-right text-[11px] font-mono">
            &copy; {new Date().getFullYear()} Cryplink Trading System. {isVi ? "Toàn bộ hệ thống liên kết được mã hóa bảo mật." : "All connections secured over cryptographically linked endpoints."}
          </p>
          
        </div>
      </footer>

    </div>
  );
}
