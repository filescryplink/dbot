/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TrendingUp, TrendingDown, Activity, Percent, ShieldCheck, Coins } from "lucide-react";
import { motion } from "motion/react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
}

const iconMap: Record<string, React.ReactNode> = {
  trending_up: <TrendingUp className="w-5 h-5 text-emerald-400" />,
  trending_down: <TrendingDown className="w-5 h-5 text-rose-400" />,
  activity: <Activity className="w-5 h-5 text-cyan-400" />,
  percent: <Percent className="w-5 h-5 text-amber-400" />,
  shield: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
  coins: <Coins className="w-5 h-5 text-pink-400" />
};

export default function MetricCard({ title, value, change, isPositive, iconName }: MetricCardProps) {
  const icon = iconMap[iconName] || <Activity className="w-5 h-5 text-emerald-400" />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl relative overflow-hidden backdrop-blur-md group hover:border-emerald-500/30 transition-all duration-300 shadow-lg shadow-black/20"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-all duration-500" />

      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-400 tracking-wide">{title}</span>
        <div className="p-2.5 bg-slate-800/60 rounded-xl border border-slate-700/50">
          {icon}
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2">
        <span className="text-2xl font-bold tracking-tight text-white font-sans">{value}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          isPositive 
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
            : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
        }`}>
          {change}
        </span>
      </div>
    </motion.div>
  );
}
