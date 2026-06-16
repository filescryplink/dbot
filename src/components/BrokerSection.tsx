/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ArrowUpRight, ShieldCheck, Zap, Percent, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

interface BrokerSectionProps {
  isVi: boolean;
}

export default function BrokerSection({ isVi }: BrokerSectionProps) {
  const brokers = [
    {
      name: "Vantage Markets",
      subtitle: isVi ? "Sàn giao dịch tối ưu chuẩn quốc tế" : "Highly Regulated Multi-Asset Broker",
      link: "https://vigco.co/la-com-inv/vi/CRYPLINK",
      features: isVi
        ? [
            "Hỗ trợ khớp lệnh cực nhanh, độ trễ tối thiểu",
            "Chênh lệch Spread siêu cạnh tranh từ 0.0 pips",
            "Nền tảng giao dịch mạnh mẽ được cấp phép uy tín",
            "Dịch vụ hỗ trợ khách hàng Việt Nam 24/7 chuyên nghiệp"
          ]
        : [
            "Ultra-fast order execution with minimal latency",
            "Highly competitive spreads starting from 0.0 pips",
            "Trusted, regulated global multi-asset platform",
            "24/7 client support for Vietnamese traders"
          ],
      color: "from-amber-400 to-yellow-500",
      bgBorder: "border-amber-500/20 hover:border-amber-500/50",
      badge: "EXCLUSIVE PARTNER",
      stats: [
        { label: isVi ? "Nạp tối thiểu" : "Min Deposit", value: "$50" },
        { label: isVi ? "Khớp lệnh" : "Execution", value: isVi ? "Siêu tốc" : "Instant" }
      ]
    },
    {
      name: "Deriv",
      subtitle: isVi ? "Nền tảng giao dịch tài sản số & CFD đa dạng" : "Premier Digital Assets & CFD Broker",
      link: "https://deriv.partners/rx?sidi=F87A8F53-F60E-4A1D-BE1C-1672DD0BDDD3&utm_campaign=dynamicworks&utm_medium=affiliate&utm_source=CU40014",
      features: isVi
        ? [
            "Tối ưu giao dịch chỉ số tài chính tổng hợp (Synthetics)",
            "Độc quyền giao dịch chỉ số nhảy vọt (Volatility Indices)",
            "Nền tảng giao dịch chuyên nghiệp ổn định 100%",
            "Nạp rút an toàn, bảo mật thông tin tối đa"
          ]
        : [
            "Optimized synthetic asset & indices setups",
            "Exclusive Volatility and Jump indices available 24/7",
            "100% robust server platform without standard lag",
            "Secure encrypted deposits & protected accounts"
          ],
      color: "from-rose-500 to-red-600",
      bgBorder: "border-rose-500/20 hover:border-rose-500/50",
      badge: "OPTIMIZED FOR BOT",
      stats: [
        { label: isVi ? "Nạp tối thiểu" : "Min Deposit", value: "$5" },
        { label: isVi ? "Chỉ số độc quyền" : "Exclusive Assets", value: "Volatility" }
      ]
    }
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
      {/* Visual background decor */}
      <div className="absolute top-0 left-1/3 w-72 h-72 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          {isVi ? "Kế Hoạch Khớp Lệnh Sàn Uy Tín" : "COMPATIBLE TOP-TIER BROKERS"}
        </span>
        <h2 className="text-xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          {isVi ? "Sàn Giao Dịch Đối Tác Tin Dùng" : "Partner Broker Integrations"}
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          {isVi 
            ? "Mở tài khoản giao dịch thông qua liên kết đối tác của chúng tôi để được tối ưu hóa dữ liệu API, giảm thiểu trượt giá tối đa khi chạy DBOT."
            : "Register via our exclusive affiliate links below to secure enhanced premium API routing, minimal latency trade lines, and customized spreads for your DBOT setup."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {brokers.map((broker) => (
          <div 
            key={broker.name} 
            className={`bg-slate-950/50 rounded-2xl border ${broker.bgBorder} p-6 flex flex-col justify-between transition-all group relative duration-300`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded-full mb-2 inline-block">
                    {broker.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
                    {broker.name}
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  </h3>
                </div>
                <div className={`p-1.5 rounded-xl bg-gradient-to-tr ${broker.color} text-slate-950 font-bold text-xs`}>
                  Broker
                </div>
              </div>

              <p className="text-slate-400 text-xs mb-5 italic">{broker.subtitle}</p>

              {/* Stats bento */}
              <div className="grid grid-cols-2 gap-4 bg-slate-900/40 border border-slate-850/50 p-3 rounded-xl mb-5 font-mono text-xs">
                {broker.stats.map((stat, i) => (
                  <div key={i}>
                    <span className="text-slate-500 text-[10px] block uppercase">{stat.label}</span>
                    <span className="text-white font-extrabold">{stat.value}</span>
                  </div>
                ))}
              </div>

              <ul className="space-y-2 mb-6">
                {broker.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a 
              href={broker.link}
              target="_blank"
              rel="noreferrer referrer"
              className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <span>{isVi ? "Mở Tài Khoản & Chạy DBOT" : "Register & Run DBOT"}</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
