/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum RiskLevel {
  Conservative = "CONSERVATIVE",
  Balanced = "BALANCED",
  Aggressive = "AGGRESSIVE"
}

export enum TradingStatus {
  Idle = "IDLE",
  Trading = "TRADING",
  Paused = "PAUSED"
}

export interface TradeLog {
  id: string;
  time: string;
  pair: string;
  type: "BUY" | "SELL";
  entryPrice: number;
  closePrice: number;
  pips: number;
  profit: number;
  status: "OPEN" | "CLOSED";
}

export interface MetricData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

export interface AiSetupResponse {
  pair: string;
  timeframe: string;
  action: string;
  confidence: string;
  entry: string;
  tp1: string;
  tp2: string;
  sl: string;
  analysis: string;
}

export interface LanguagePack {
  brand: string;
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  telegramBtn: string;
  portalBtn: string;
  liveStats: string;
  connectTitle: string;
  connectSub: string;
  riskLabel: string;
  brokerLabel: string;
  accountLabel: string;
  passwordLabel: string;
  saveConfig: string;
  recentTrades: string;
  aiTitle: string;
  aiSub: string;
  aiBtn: string;
  aiPromptPlaceholder: string;
  faqTitle: string;
  viewTerminal: string;
  viewLanding: string;
}
