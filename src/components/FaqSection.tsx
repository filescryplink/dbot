/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FaqItem {
  qEn: string;
  qVi: string;
  aEn: string;
  aVi: string;
}

export default function FaqSection({ isVi }: { isVi: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      qEn: "How does the DBOT Automated Trading Robot work?",
      qVi: "Robot Giao Dịch Tự Động của DBOT hoạt động thế nào?",
      aEn: "DBOT connects to your MetaTrader MT4/MT5 account via secure APIs. Our quantitative systems scan currency pairs 24/7, tracking moving averages and momentum indicators to execute and manage trades automatically based on your selected risk settings.",
      aVi: "DBOT kết nối với tài khoản MetaTrader MT4/MT5 của bạn thông qua API bảo mật. Hệ thống định lượng quét tỷ giá liên tục 24/7, tự động đặt lệnh và quản trị rủi ro tối ưu dựa trên cấu hình bạn chọn."
    },
    {
      qEn: "What is the minimum brokerage deposit recommended?",
      qVi: "Số vốn tối thiểu được khuyến nghị là bao nhiêu?",
      aEn: "DBOT operates with balances from $100. We suggest a cushion of $200 to $500 for effective position sizing and risk safety margins.",
      aVi: "DBOT hoạt động từ số dư chỉ $100. Chúng tôi khuyên dùng mức từ $200 đến $500 để quản lý kích thước lot an toàn, tránh ảnh hưởng lớn bởi biến động bất ngờ."
    },
    {
      qEn: "Do I need to keep my computer or phone turned on 24/7?",
      qVi: "Tôi có cần bật máy tính hay điện thoại liên tục 24/7 không?",
      aEn: "No. DBOT operates entirely on high-performance cloud VPS. Order processing and management run server-side, meaning your personal device can remain fully offline.",
      aVi: "Không cần. Hệ điều hành DBOT chạy 24/7 trên máy chủ VPS đám mây tốc độ cao. Toàn bộ lệnh tự động kích hoạt phía máy chủ, bạn có thể tắt thiết bị bất cứ lúc nào."
    },
    {
      qEn: "How secure is my MetaTrader broker account?",
      qVi: "Tài khoản giao dịch của tôi có an toàn không?",
      aEn: "Strictly secure. DBOT only reads and executes orders via account authorization keys. We have zero access to withdraw your capital; your funds remain safe with your selected broker.",
      aVi: "Tuyệt đối an toàn. DBOT chỉ nhận quyền đặt lệnh trên MT4/MT5 và không có bất kỳ quyền rút tiền hay can thiệp ví ký quỹ nào. Vốn của bạn được lưu trữ an toàn riêng biệt tại sàn môi giới của bạn."
    },
    {
      qEn: "What is the CrypLink Telegram integration?",
      qVi: "Liên kết CrypLink với Telegram mang lại lợi ích gì?",
      aEn: "CrypLink pushes instant trade notifications, execution alerts, and profit updates directly to your Telegram chat, letting you control DBOT remotely with ease.",
      aVi: "CrypLink gửi lập tức các cảnh báo đặt lệnh, đẩy báo cáo chốt lời trực tiếp về Telegram cá nhân và cho phép bạn điều chỉnh nhanh DBOT từ xa qua giao diện chat."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
      
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          {isVi ? "Các Câu Hỏi Thường Gặp" : "General Queries & FAQ"}
        </h2>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-slate-950/40 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 text-white hover:bg-slate-900/20 transition-all cursor-pointer"
              >
                <span className="font-bold text-sm md:text-base leading-snug">
                  {isVi ? faq.qVi : faq.qEn}
                </span>
                <span className="p-1 bg-slate-800 rounded-lg text-slate-400">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="p-5 pt-0 text-slate-400 text-sm border-t border-slate-900 leading-relaxed font-sans">
                      {isVi ? faq.aVi : faq.aEn}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
