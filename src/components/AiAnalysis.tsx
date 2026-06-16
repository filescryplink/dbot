/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Cpu, Send, RefreshCw, AlertCircle, ArrowUpRight, ArrowDownRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AiSetupResponse } from "../types";

export default function AiAnalysis({ isVi }: { isVi: boolean }) {
  const [pair, setPair] = useState("XAUUSD");
  const [timeframe, setTimeframe] = useState("H4");
  const [isLoading, setIsLoading] = useState(false);
  const [setup, setSetup] = useState<AiSetupResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAiSetup = async () => {
    setIsLoading(true);
    setError(null);
    setSetup(null);

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pair, timeframe }),
      });

      if (!response.ok) {
        throw new Error(isVi ? "Không thể kết nối máy chủ phân tích." : "Could not connect to the analysis gateway.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setSetup(data);
    } catch (err: any) {
      console.error("AI client fetch failure:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const commonPairs = [
    { value: "XAUUSD", label: "XAUUSD (Gold)" },
    { value: "EURUSD", label: "EURUSD" },
    { value: "GBPUSD", label: "GBPUSD" },
    { value: "USDJPY", label: "USDJPY" },
    { value: "BTCUSD", label: "BTCUSD (Bitcoin)" }
  ];

  const commonTimeframes = ["M15", "H1", "H4", "D1"];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
      {/* Laser lines decorative element */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1 bg-cyan-500/10 px-2 py-0.5 rounded-full w-max border border-cyan-500/20">
            <Cpu className="w-3.5 h-3.5" />
            {isVi ? "MÁY TRANH BIỆN TÍN HIỆU TRÍ TUỆ NHÂN TẠO" : "GEMINI AI SIGNAL SYNTHESIS ENGINE"}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {isVi ? "Phân Tích & Kế Hoạch Đầu Tư AI" : "AI Technical Analyst Setup"}
          </h2>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-6 max-w-2xl">
        {isVi 
          ? "Tổng hợp chỉ báo RSI, Đường trung bình động EMA, Khối lượng và Cấu trúc sóng bằng cách đặt câu hỏi cho Mô hình AI Gemini 3.5. Nhận kết quả khuyến nghị vùng giá vào lệnh và chốt lời tối ưu."
          : "Correlate RSI, Moving Average EMA, Volume layouts, and market structures instantly using Google's primary Gemini 3.5 models. Generate pristine entries and take-profit bounds."}
      </p>

      {/* Select Control Section */}
      <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-850 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 font-mono">
            {isVi ? "Tài sản giao dịch" : "Trading Asset"}
          </label>
          <div className="flex gap-2 flex-wrap">
            {commonPairs.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setPair(item.value)}
                className={`text-xs px-3 py-2 rounded-xl border transition-all ${
                  pair === item.value 
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500" 
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 font-mono">
            {isVi ? "Khung Thời Gian" : "Timeframe"}
          </label>
          <div className="flex gap-1.5">
            {commonTimeframes.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`text-xs py-2 px-3 rounded-lg border font-bold ${
                  timeframe === tf
                    ? "bg-cyan-500/10 text-cyan-400 border-cyan-500 font-mono"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 font-mono"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={fetchAiSetup}
            disabled={isLoading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold h-[38px] px-6 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin text-slate-950" /> : <Send className="w-4 h-4 text-slate-950" />}
            {isVi ? "Phân Tích Với AI" : "Synthesize Trade Plan"}
          </button>
        </div>
      </div>

      {/* Output Presentation Layout */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-12 flex flex-col items-center justify-center text-center bg-slate-950/40 rounded-2xl border border-slate-850"
          >
            <Cpu className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
            <p className="text-white font-bold text-base mb-1">
              {isVi ? "Đang yêu cầu Trí tuệ Nhân tạo Gemini..." : "Consulting Gemini AI Analyst..."}
            </p>
            <p className="text-slate-400 text-xs font-mono max-w-sm">
              {isVi 
                ? "Duyệt xu thế RSI, MA, khối lượng sóng và tính toán các điểm kháng cự..." 
                : "Downloading charts, analyzing MACD crosses and preparing secure take-profit guidelines..."}
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-rose-500/5 border border-rose-500/20 text-rose-400 rounded-2xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold mb-0.5">{isVi ? "Không Thể Tổng Hợp Tín Hiệu" : "Analysis Attempt Failed"}</p>
              <p className="text-xs text-rose-400/90 leading-relaxed">{error}</p>
            </div>
          </motion.div>
        )}

        {setup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Action Card */}
            <div className="lg:col-span-1 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-[10px] bg-slate-900 border-l border-b border-slate-800 font-mono text-slate-500 rounded-bl-xl uppercase">
                {setup.timeframe} Signal
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-1">
                  {isVi ? "KHUYẾN NGHỊ BỞI AI" : "AI RECOMMENDATION"}
                </span>
                
                <h3 className={`text-3xl font-extrabold font-mono tracking-tight my-2 flex items-center gap-2 ${
                  setup.action.includes("BUY") ? "text-emerald-400" : "text-rose-400"
                }`}>
                  {setup.action.includes("BUY") ? <ArrowUpRight className="w-8 h-8" /> : <ArrowDownRight className="w-8 h-8" />}
                  {setup.action}
                </h3>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 bg-slate-900 p-3 rounded-xl border border-slate-850">
                    <span className="text-[10px] text-slate-500 uppercase block font-mono">{isVi ? "ĐỘ TIN CẬY" : "CONFIDENCE"}</span>
                    <span className="text-lg font-bold text-white font-mono">{setup.confidence}</span>
                  </div>
                  <div className="flex-1 bg-slate-900 p-3 rounded-xl border border-slate-850">
                    <span className="text-[10px] text-slate-500 uppercase block font-mono">{isVi ? "TÀI SẢN" : "ASSET"}</span>
                    <span className="text-lg font-bold text-cyan-400 font-mono">{setup.pair}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-900">
                <p className="text-[10px] leading-relaxed text-slate-500 flex items-start gap-1.5 font-mono">
                  <Info className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  {isVi 
                    ? "Tín hiệu này được tổng hợp từ các mô hình dòng lệnh thông minh. Vui lòng giao dịch đúng tỷ lệ rủi ro tài khoản." 
                    : "Simulated signal generated for quantitative educational parameters. Apply strict lot size practices."}
                </p>
              </div>
            </div>

            {/* Price Targets */}
            <div className="lg:col-span-1 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-semibold tracking-wider uppercase font-mono text-slate-400 mb-2">
                {isVi ? "VÙNG GIÁ GIAO DỊCH CHỦ CHỐT" : "KEY TRANSACTION TARGETS"}
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <span className="text-xs text-slate-400 font-mono">{isVi ? "Vùng Vào Lệnh (Entry)" : "Entry Level"}</span>
                  <span className="text-base font-bold text-white font-mono">{setup.entry}</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-emerald-500/5 rounded-xl border border-emerald-500/10 hover:border-emerald-500/20 transition-colors">
                  <span className="text-xs text-emerald-400 font-mono">Take Profit 1 (TP1)</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{setup.tp1}</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-emerald-500/5 rounded-xl border border-emerald-500/10 hover:border-emerald-500/20 transition-colors">
                  <span className="text-xs text-emerald-400 font-mono">Take Profit 2 (TP2)</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{setup.tp2}</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-rose-500/5 rounded-xl border border-rose-500/10 hover:border-rose-500/20 transition-colors">
                  <span className="text-xs text-rose-400 font-mono">Stop Loss (SL)</span>
                  <span className="text-base font-bold text-rose-400 font-mono">{setup.sl}</span>
                </div>
              </div>
            </div>

            {/* Analytical Rationale Text */}
            <div className="lg:col-span-1 bg-slate-950/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold tracking-wider uppercase font-mono text-slate-400 mb-3">
                  {isVi ? "BẢN PHÂN TÍCH KỸ THUẬT AI" : "AI TECHNICAL COMMENTARY"}
                </h4>
                <div className="text-slate-300 text-sm leading-relaxed p-4 bg-slate-900 rounded-xl border border-slate-850 font-sans">
                  {setup.analysis}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-900 text-xs text-slate-500 font-mono flex items-center justify-between">
                <span>Model: Gemini 3.5 Flash</span>
                <span className="text-cyan-400">● Live Cloud Sync</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
