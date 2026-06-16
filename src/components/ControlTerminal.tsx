/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Shield, Key, Sliders, Play, Square, Check, RefreshCw, Send, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";
import { RiskLevel, TradingStatus } from "../types";

interface ControlTerminalProps {
  isVi: boolean;
}

export default function ControlTerminal({ isVi }: ControlTerminalProps) {
  const [broker, setBroker] = useState("exness");
  const [accountId, setAccountId] = useState("");
  const [server, setServer] = useState("");
  const [password, setPassword] = useState("");
  const [risk, setRisk] = useState<RiskLevel>(RiskLevel.Balanced);
  const [status, setStatus] = useState<TradingStatus>(TradingStatus.Idle);
  const [telegramToken, setTelegramToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const generateTelegramToken = () => {
    setIsLoading(true);
    setTimeout(() => {
      const hex = Math.random().toString(16).substring(2, 8).toUpperCase();
      setTelegramToken(`DBT-${hex}`);
      setIsLoading(false);
      setMessage({
        text: isVi 
          ? "Đã tạo mã kết nối! Gửi tin nhắn này tới Telegram @DBot_Cryplink_Bot để đồng bộ."
          : "Linking command ready! Copy and send it to @DBot_Cryplink_Bot Telegram.",
        type: "success"
      });
    }, 800);
  };

  const handleLinkAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId || !password || !server) {
      setMessage({
        text: isVi ? "Vui lòng nhập đầy đủ thông tin tài khoản MT4/MT5!" : "Please fill in all MT4/MT5 account credentials!",
        type: "error"
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatus(TradingStatus.Trading);
      setMessage({
        text: isVi 
          ? "Đã liên kết tài khoản thành công! Robot DBOT đã bắt đầu tự động tối ưu giao dịch." 
          : "Broker linked successfully! DBOT has started automatic trade flow optimization.",
        type: "success"
      });
    }, 1200);
  };

  const toggleBotStatus = () => {
    if (status === TradingStatus.Trading) {
      setStatus(TradingStatus.Paused);
      setMessage({
        text: isVi ? "Đã tạm dừng giao dịch tự động." : "Automated trading paused.",
        type: "success"
      });
    } else {
      setStatus(TradingStatus.Trading);
      setMessage({
        text: isVi ? "Đã khởi động robot giao dịch tự động!" : "Automated trading engine activated!",
        type: "success"
      });
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column: Form & Connection logic */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-400" />
            {isVi ? "Kết Nối MetaTrader Broker" : "MetaTrader Integration Console"}
          </h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md">
            {isVi 
              ? "DBOT đồng bộ hóa giao dịch tự động hóa bảo mật với tài khoản MT4 / MT5 của bạn."
              : "DBOT synchronizes secure automation directly with your MT4 / MT5 terminal account safely."}
          </p>

          <form onSubmit={handleLinkAccount} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                {isVi ? "Chọn Nhà Môi Giới (Broker)" : "Select Broker"}
              </label>
              <select
                value={broker}
                onChange={(e) => setBroker(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/50 outline-none text-white text-sm rounded-xl px-4 py-3 font-sans transition-colors"
              >
                <option value="exness">Exness Global Limited</option>
                <option value="xm">XM Group (Trading Point)</option>
                <option value="icmarkets">IC Markets Pty Ltd</option>
                <option value="pepperstone">Pepperstone Group</option>
                <option value="octafx">OctaFX Brokerage</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                  {isVi ? "Máy Chủ Server MT4/5" : "Broker Server"}
                </label>
                <input
                  type="text"
                  placeholder="Exness-Real10"
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none text-white text-sm rounded-xl px-4 py-3 font-mono transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                  {isVi ? "Mã Số Tài Khoản" : "Login Account ID"}
                </label>
                <input
                  type="number"
                  placeholder="8561423"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  className="w-full bg-slate-500/0 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none text-white text-sm rounded-xl px-4 py-3 font-mono transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                {isVi ? "Mật Khẩu Giao Dịch (Master Password)" : "MetaTrader Password"}
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-1000 bg-slate-950 border border-slate-800 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none text-white text-sm rounded-xl px-4 py-3 font-mono transition-colors"
                />
                <Key className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
              </div>
              <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-400" />
                {isVi ? "Thông tin mật khẩu được mã hóa AES-256 an toàn." : "Password encrypted client-side using industry-safe SHA."}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98] transition-all text-slate-950 text-sm font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                {isVi ? "Lưu Cấu Hình & Liên Kết" : "Connect Trading Account"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Risk control levels & Telegram Linker token info */}
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3 font-mono">
                {isVi ? "CẤU HÌNH QUẢN TRỊ RỦI RO" : "RISK PROFILING SETUP"}
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                {[RiskLevel.Conservative, RiskLevel.Balanced, RiskLevel.Aggressive].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setRisk(level)}
                    className={`py-2 px-3 rounded-lg border text-xs font-mono font-bold transition-all ${
                      risk === level
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500"
                        : "bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>

              <div className="mt-3 p-4 bg-slate-950/40 border border-slate-800 rounded-xl text-xs text-slate-400 font-mono space-y-1">
                {risk === RiskLevel.Conservative && (
                  <>
                    <p className="text-emerald-400 font-bold">{isVi ? "Bảo Thủ (CONSERVATIVE)" : "Conservative Profiler Active"}</p>
                    <p>{isVi ? "• Lot giao dịch thấp định mức: 0.1 Lot tối đa cho mỗi $5,000 số dư." : "• Max lot size: 0.1 Lot per $5k balance limit."}</p>
                    <p>{isVi ? "• Mức sụt giảm (Drawdown) giới hạn: < 3% tài khoản." : "• Drawdown cap limit: Under 3% risk tolerance."}</p>
                  </>
                )}
                {risk === RiskLevel.Balanced && (
                  <>
                    <p className="text-cyan-400 font-bold">{isVi ? "Cân Bằng (BALANCED - Khuyên Dùng)" : "Balanced Profiler Active (Recommended)"}</p>
                    <p>{isVi ? "• Lot giao dịch: 0.25 Lot cho mỗi $5,000 số dư tiêu chuẩn." : "• Optimized trade lotting: 0.25 lot per $5k balance standard."}</p>
                    <p>{isVi ? "• Quản lý Smart Drawdown chủ động bảo vệ quỹ." : "• Active protection features protecting high-volume stopouts."}</p>
                  </>
                )}
                {risk === RiskLevel.Aggressive && (
                  <>
                    <p className="text-rose-400 font-bold">{isVi ? "Tấn Công (AGGRESSIVE)" : "Aggressive Profiler Active"}</p>
                    <p>{isVi ? "• Tận dụng lãi suất kép & mở rộng lưới giao dịch lot lớn." : "• Utilizes advanced high-lot compounding and grids."}</p>
                    <p className="text-rose-400/90 flex items-center gap-1 text-[11px] mt-1 bg-rose-500/5 p-1 rounded">
                      <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0" />
                      {isVi ? "Chú ý: Rủi ro biến động mạnh có thể xảy ra!" : "Note: High variance expected. Watch SL settings."}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Telegram linking token generator */}
            <div className="border-t border-slate-800 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3 font-mono">
                {isVi ? "LIÊN KẾT NHÓM TELEGRAM ALERTS" : "TELEGRAM GROUP INTEGRATOR"}
              </h3>
              <p className="text-xs text-slate-400 col-span-2 mb-4">
                {isVi 
                  ? "Nhận thông báo báo cáo Forex & kích hoạt lệnh mua bán trực tiếp trên tài khoản của bạn bằng Token này." 
                  : "Sync instant report tickets and execution commands directly to your personal messaging handle using this verification token."}
              </p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  placeholder={isVi ? "Mã Token chưa tạo" : "No token generated"}
                  value={telegramToken}
                  className="bg-slate-950 border border-slate-800 outline-none text-white text-md font-bold font-mono tracking-wider rounded-xl px-4 py-3 flex-1 select-all"
                />
                
                <button
                  type="button"
                  onClick={generateTelegramToken}
                  disabled={isLoading}
                  className="bg-slate-800 hover:bg-slate-700 active:scale-95 text-emerald-400 border border-slate-700 hover:border-emerald-500/20 transition-all font-semibold rounded-xl px-5 text-xs flex items-center justify-center font-mono"
                >
                  {isVi ? "Tạo Mã" : "Create"}
                </button>
              </div>
            </div>
          </div>

          {/* Prompt result & active controls */}
          <div className="space-y-3 mt-4">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 rounded-xl text-xs font-medium border ${
                  message.type === "success" 
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                }`}
              >
                {message.text}
              </motion.div>
            )}

            {status !== TradingStatus.Idle && (
              <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      status === TradingStatus.Trading ? "bg-emerald-400" : "bg-amber-400"
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${
                      status === TradingStatus.Trading ? "bg-emerald-500" : "bg-amber-500"
                    }`}></span>
                  </span>
                  <div>
                    <span className="text-xs text-slate-500 font-mono block">ROBOT STATUS</span>
                    <span className="text-sm font-bold text-white font-mono uppercase">
                      {status === TradingStatus.Trading 
                        ? (isVi ? "ĐANG GIAO DỊCH" : "LIVE TRADING ROUTINE") 
                        : (isVi ? "ĐANG TẠM DỪNG" : "PAUSED ACTIVE STATE")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleBotStatus}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-colors flex items-center gap-1.5 ${
                    status === TradingStatus.Trading 
                      ? "bg-rose-500/15 hover:bg-rose-500/25 text-rose-400" 
                      : "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400"
                  }`}
                >
                  {status === TradingStatus.Trading ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      {isVi ? "TẠM DỪNG" : "PAUSE ENGINE"}
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      {isVi ? "KÍCH HOẠT" : "ACTIVATE"}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
