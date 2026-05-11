export type EventCategory =
  | "protocol"
  | "macro"
  | "derivatives"
  | "regulatory"
  | "conference"
  | "listing";

export type EventImpact = "high" | "medium" | "low";

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  category: EventCategory;
  impact: EventImpact;
  description: string;
  assets?: string[];
  source?: string;
}

export interface MarketAsset {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePct24h: number;
  volume24h: number;
  marketCap: number;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  date: Date;
  previous: string;
  forecast: string;
  actual?: string;
  impact: EventImpact;
  country: string;
}

// trend = green  |  follow = yellow  |  adjust = blue  |  risk = red
export type SignalType = "trend" | "follow" | "adjust" | "risk";

export type Locale = "zh" | "en";
export type I18nText = { zh: string; en: string };

/** @deprecated use SignalType */
export type TradingSignal = SignalType;

export interface RadarDimension {
  label: string;
  value: number; // 0–100
}

export interface SignalBar {
  label: string;
  value: number;
  description: string;
}
