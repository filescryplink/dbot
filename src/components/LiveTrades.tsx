/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, RefreshCw, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TradeLog } from "../types";

export default function LiveTrades({ isVi }: { isVi: boolean }) {
  const [trades, setTrades] = useState<TradeLog[]>([
    {
      id: "tx-492",
      time: "08:08:42",
      pair: "XAUUSD",
      type: "BUY",
      entryPrice: 2315.42,
      closePrice: 2321.80,
      pips: 63.8,
      profit: 638.00,
      status: "CLOSED",
    },
    {
      id: "tx-491",
      time: "08:02:15",
      pair: "EURUSD",
      type: "SELL",
      entryPrice: 1.08254,
      closePrice: 1.08112,
      pips: 14.2,
      profit: 142.00,
      status: "CLOSED",
    },
    {
      id: "tx-490",
      time: "07:51:30",
      pair: "USDJPY",
      type: "BUY",
      entryPrice: 157.420,
      closePrice: 157.685,
      pips: 26.5,
      profit: 181.20,
      status: "CLOSED",
    },
    {
      id: "tx-489",
      time: "07:38:11",
      pair: "GBPUSD",
      type: "BUY",
      entryPrice: 1.27412,
      closePrice: 1.27545,
      pips: 13.3,
      profit: 133.00,
      status: "CLOSED",
    },
    {
      id: "tx-488",
      time: "07:22:04",
      pair: "AUDUSD",
      type: "SELL",
      entryPrice: 0.66120,
      closePrice: 0.66010,
      pips: 11.0,
      profit: 110.00,
      status: "CLOSED",
    }
  ]);

  const [activeTrades, setActiveTrades] = useState<TradeLog[]>([
    {
      id: "tx-open-01",
      time: "08:10:00",
      pair: "XAUUSD",
      type: "BUY",
      entryPrice: 2320.10,
      closePrice: 2321.55,
      pips: 14.5,
      profit: 145.00,
      status: "OPEN"
    },
    {
      id: "tx-open-02",
      time: "08:09:12",
      pair: "USDCHF",
      type: "SELL",
      entryPrice: 0.89420,
      closePrice: 0.89385,
      pips: 3.5,
      profit: 35.00,
      status: "OPEN"
    }
  ]);

  // Handle periodic mock trade alerts from "Telegram Cloud MT4"
  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate real-time updates on active trades to make the dashboard dynamic
      setActiveTrades((prev) =>
        prev.map((trade) => {
          const pipChange = (Math.random() - 0.48) * (trade.pair === "XAUUSD" ? 4.0 : 0.4);
          const newPips = +(trade.pips + pipChange).toFixed(1);
          const isGold = trade.pair === "XAUUSD";
          const newPrice = +(trade.entryPrice + (trade.type === "BUY" ? newPips : -newPips) * (isGold ? 0.1 : 0.0001)).toFixed(isGold ? 2 : 5);
          return {
            ...trade,
            pips: newPips,
            closePrice: newPrice,
            profit: +(newPips * (isGold ? 10.0 : 10.0)).toFixed(2)
          };
        })
      );

      // Randomly close an active trade and slide it to completed, then open a new active trade (every 18 seconds)
      if (Math.random() > 0.7) {
        // Grab an active trade
        if (activeTrades.length > 0) {
          const tradeToClose = { ...activeTrades[0], status: "CLOSED" as const, time: new Date().toLocaleTimeString("vi-VN", { hour12: false }) };
          
          // Add to closed trades list at the top, limit list length to 8
          setTrades((prev) => [tradeToClose, ...prev].slice(0, 8));
          
          // Generate an replacement open trade
          const pairs = ["EURUSD", "GBPUSD", "USDJPY", "XAUUSD", "AUDUSD", "EURJPY"];
          const selectedPair = pairs[Math.floor(Math.random() * pairs.length)];
          const selectType = Math.random() > 0.5 ? ("BUY" as const) : ("SELL" as const);
          
          let entry = 1.08 + Math.random() * 0.15;
          if (selectedPair === "XAUUSD") entry = 2300 + Math.random() * 50;
          if (selectedPair.includes("JPY")) entry = 155 + Math.random() * 5;
          
          const newOpen: TradeLog = {
            id: `tx-open-${Math.floor(Math.random() * 1000)}`,
            time: new Date().toLocaleTimeString("vi-VN", { hour12: false }),
            pair: selectedPair,
            type: selectType,
            entryPrice: +entry.toFixed(selectedPair === "XAUUSD" ? 2 : selectedPair.includes("JPY") ? 3 : 5),
            closePrice: +entry.toFixed(selectedPair === "XAUUSD" ? 2 : selectedPair.includes("JPY") ? 3 : 5),
            pips: 0.0,
            profit: 0.0,
            status: "OPEN" as const
          };

          setActiveTrades((prev) => [...prev.slice(1), newOpen]);
        }
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [activeTrades]);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">
              {isVi ? "TÍN HIỆU LIVE TỪ CLOUD MT4" : "LIVE CLOUD SIGNAL MONITOR"}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isVi ? "Nhật Ký Giao Dịch Gần Đây" : "Recent Live Auto Trades"}
          </h2>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/60">
          <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span>{isVi ? "Cập Nhật Mỗi 4S" : "Updates Every 4s"}</span>
        </div>
      </div>

      {/* Grid: Left: Active Trades (floating), Right: Past Trades (Table style list) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active open positions */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 font-mono uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{isVi ? "Lệnh Đang Chạy" : "Active Positions"}</span>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-sans tracking-normal">
              {activeTrades.length} {isVi ? "đang mở" : "open"}
            </span>
          </h3>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {activeTrades.map((trade) => (
                <motion.div
                  key={trade.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-950/60 border border-emerald-500/20 p-4 rounded-2xl relative group hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base font-mono">{trade.pair}</span>
                        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                          trade.type === "BUY" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                        }`}>
                          {trade.type}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-mono">Entry: {trade.entryPrice}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs text-slate-400">{trade.time}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                        ID: {trade.id}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-500 block uppercase">{isVi ? "LỢI NHUẬN PIP" : "PIP PL"}</span>
                      <span className={`text-sm font-bold font-mono flex items-center ${
                        trade.pips >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}>
                        {trade.pips >= 0 ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                        {trade.pips >= 0 ? "+" : ""}{trade.pips} pips
                      </span>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-[10px] font-semibold text-slate-500 block uppercase">{isVi ? "SỐ DƯ" : "EST. USD"}</span>
                      <span className={`text-md font-bold font-mono ${
                        trade.profit >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}>
                        {trade.profit >= 0 ? "+" : ""}${trade.profit.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Trade history */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-slate-300 font-mono uppercase tracking-wider mb-2">
            {isVi ? "Lịch Sử Lệnh Đã Đóng" : "Completed History"}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-xs font-semibold font-mono">
                  <th className="py-2.5 px-3">{isVi ? "Tài Sản" : "Asset"}</th>
                  <th className="py-2.5 px-3">{isVi ? "Loại" : "Type"}</th>
                  <th className="py-2.5 px-3">{isVi ? "Điểm Vào/Ra" : "Entry/Exit"}</th>
                  <th className="py-2.5 px-3">{isVi ? "Tích Luỹ" : "Pips"}</th>
                  <th className="py-2.5 px-3 text-right">{isVi ? "Lợi Nhuận" : "Profit"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                <AnimatePresence initial={false}>
                  {trades.map((trade) => (
                    <motion.tr
                      key={trade.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm hover:bg-slate-800/20 transition-colors"
                    >
                      <td className="py-3.5 px-3 font-semibold text-white font-mono flex items-center gap-1.5">
                        <span className="text-xs p-1 rounded bg-slate-800 border border-slate-700">{trade.pair}</span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                          trade.type === "BUY" ? "bg-emerald-1000/10 text-emerald-400 border border-emerald-500/10" : "bg-rose-1000/10 text-rose-400 border border-rose-500/10"
                        }`}>
                          {trade.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-mono text-xs text-slate-400">
                        {trade.entryPrice} → {trade.closePrice}
                      </td>
                      <td className={`py-3.5 px-3 font-mono font-semibold text-xs ${
                        trade.pips >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}>
                        +{trade.pips}
                      </td>
                      <td className={`py-3.5 px-3 text-right font-mono font-bold ${
                        trade.profit >= 0 ? "text-emerald-400" : "text-rose-400"
                      }`}>
                        +${trade.profit.toFixed(2)}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
