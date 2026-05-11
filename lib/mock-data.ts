import { CalendarEvent, MarketAsset, EconomicIndicator } from "./types";

const d = (offset: number) => {
  const date = new Date(2026, 4, 11); // May 11 2026
  date.setDate(date.getDate() + offset);
  return date;
};

export const MARKET_ASSETS: MarketAsset[] = [
  { symbol: "BTC",  name: "Bitcoin",    price: 103842,  change24h: 1284,    changePct24h:  1.25,  volume24h: 38_400_000_000, marketCap: 2_048_000_000_000 },
  { symbol: "ETH",  name: "Ethereum",   price: 3842,    change24h: -62,     changePct24h: -1.59,  volume24h: 18_200_000_000, marketCap:   462_000_000_000 },
  { symbol: "SOL",  name: "Solana",     price: 187.42,  change24h: 4.21,    changePct24h:  2.30,  volume24h:  4_100_000_000, marketCap:    88_000_000_000 },
  { symbol: "BNB",  name: "BNB",        price: 628.91,  change24h: -3.44,   changePct24h: -0.54,  volume24h:  1_800_000_000, marketCap:    91_000_000_000 },
  { symbol: "XRP",  name: "XRP",        price: 2.41,    change24h: 0.07,    changePct24h:  2.99,  volume24h:  3_900_000_000, marketCap:   138_000_000_000 },
  { symbol: "DOGE", name: "Dogecoin",   price: 0.1842,  change24h: -0.0021, changePct24h: -1.13,  volume24h:  1_200_000_000, marketCap:    27_000_000_000 },
  { symbol: "ADA",  name: "Cardano",    price: 0.862,   change24h: 0.024,   changePct24h:  2.86,  volume24h:    890_000_000, marketCap:    30_000_000_000 },
  { symbol: "AVAX", name: "Avalanche",  price: 38.12,   change24h: 1.08,    changePct24h:  2.92,  volume24h:    620_000_000, marketCap:    15_600_000_000 },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: "e1",  title: "Ethereum Pectra Upgrade",        date: d(2),  category: "protocol",    impact: "high",   description: "Major EIP bundle enabling validator consolidation and ERC-7702 smart accounts.", assets: ["ETH"], source: "ethereum.org" },
  { id: "e2",  title: "Solana v2.1 Release",            date: d(5),  category: "protocol",    impact: "medium", description: "Performance improvements reducing validator hardware requirements.", assets: ["SOL"] },
  { id: "e3",  title: "Bitcoin Core 28.1 Release",      date: d(12), category: "protocol",    impact: "low",    description: "Minor bug-fix release for Bitcoin Core.", assets: ["BTC"] },
  { id: "e4",  title: "Cardano Chang Hard Fork #2",     date: d(18), category: "protocol",    impact: "high",   description: "Full governance activation on Cardano mainnet (Voltaire era).", assets: ["ADA"] },
  { id: "e5",  title: "US CPI Report (April)",          date: d(1),  category: "macro",       impact: "high",   description: "Consumer Price Index — April 2026. Consensus: 3.1% YoY.", assets: ["BTC","ETH"] },
  { id: "e6",  title: "FOMC Meeting Minutes",           date: d(8),  category: "macro",       impact: "high",   description: "Federal Open Market Committee minutes release from May meeting.", assets: ["BTC","ETH"] },
  { id: "e7",  title: "US Jobs Report (April)",         date: d(3),  category: "macro",       impact: "medium", description: "Non-Farm Payrolls and Unemployment Rate for April 2026." },
  { id: "e8",  title: "ECB Interest Rate Decision",     date: d(15), category: "macro",       impact: "medium", description: "European Central Bank rate decision. Expected: hold at 3.00%." },
  { id: "e9",  title: "CME BTC Options Expiry",         date: d(0),  category: "derivatives", impact: "high",   description: "$3.8B notional in BTC options expire at 4PM UTC. Max pain: $98,000.", assets: ["BTC"] },
  { id: "e10", title: "CME ETH Options Expiry",         date: d(0),  category: "derivatives", impact: "medium", description: "$1.2B notional in ETH options expire at 4PM UTC. Max pain: $3,600.", assets: ["ETH"] },
  { id: "e11", title: "Deribit Monthly Options Expiry", date: d(20), category: "derivatives", impact: "high",   description: "Monthly crypto options expiry on Deribit. $8.4B total open interest.", assets: ["BTC","ETH"] },
  { id: "e12", title: "CME BTC Futures Rollover",       date: d(6),  category: "derivatives", impact: "low",    description: "CME Bitcoin futures contract rollover from June to September.", assets: ["BTC"] },
  { id: "e13", title: "SEC Crypto Roundtable #4",       date: d(7),  category: "regulatory",  impact: "medium", description: "SEC hosts fourth crypto roundtable on trading and markets.", assets: ["BTC","ETH"] },
  { id: "e14", title: "EU MiCA Phase 2 Enforcement",   date: d(22), category: "regulatory",  impact: "high",   description: "Full enforcement of MiCA regulations for CASPs begins across EU.", assets: ["BTC","ETH","XRP"] },
  { id: "e15", title: "US Senate Digital Asset Bill",  date: d(10), category: "regulatory",  impact: "high",   description: "Senate floor vote on the Digital Asset Market Structure Bill." },
  { id: "e16", title: "Consensus 2026 — Day 1",        date: d(4),  category: "conference",  impact: "medium", description: "CoinDesk Consensus in Austin, TX. Keynotes from major protocol founders.", assets: ["BTC","ETH","SOL"] },
  { id: "e17", title: "Consensus 2026 — Day 2",        date: d(5),  category: "conference",  impact: "low",    description: "Day 2 of Consensus 2026.", assets: ["BTC","ETH","SOL"] },
  { id: "e18", title: "ETHGlobal Hackathon",           date: d(14), category: "conference",  impact: "low",    description: "ETHGlobal 48h hackathon — Singapore.", assets: ["ETH"] },
  { id: "e19", title: "AVAX Futures on CME",           date: d(9),  category: "listing",     impact: "high",   description: "CME Group launches Avalanche futures contracts.", assets: ["AVAX"] },
  { id: "e20", title: "XRP ETF Decision Deadline",     date: d(16), category: "listing",     impact: "high",   description: "SEC final deadline for spot XRP ETF approval/denial.", assets: ["XRP"] },
];

export const ECONOMIC_INDICATORS: EconomicIndicator[] = [
  { id: "i1", name: "US CPI (YoY)",           date: d(1),  previous: "3.2%",  forecast: "3.1%",  impact: "high",   country: "US" },
  { id: "i2", name: "US Non-Farm Payrolls",   date: d(3),  previous: "186K",  forecast: "175K",  impact: "medium", country: "US" },
  { id: "i3", name: "US Unemployment Rate",   date: d(3),  previous: "4.1%",  forecast: "4.1%",  impact: "medium", country: "US" },
  { id: "i4", name: "FOMC Minutes",           date: d(8),  previous: "—",     forecast: "—",     impact: "high",   country: "US" },
  { id: "i5", name: "US PPI (MoM)",           date: d(13), previous: "0.2%",  forecast: "0.3%",  impact: "medium", country: "US" },
  { id: "i6", name: "ECB Rate Decision",      date: d(15), previous: "3.00%", forecast: "3.00%", impact: "medium", country: "EU" },
  { id: "i7", name: "US Retail Sales (MoM)",  date: d(13), previous: "-0.4%", forecast: "0.2%",  impact: "medium", country: "US" },
  { id: "i8", name: "US Initial Jobless Claims", date: d(8), previous: "218K", forecast: "220K", impact: "low",    country: "US" },
];

export const CATEGORY_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  protocol:    { label: "Protocol",    color: "text-blue-600",   bg: "bg-blue-50",    border: "border-blue-200" },
  macro:       { label: "Macro",       color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  derivatives: { label: "Derivatives", color: "text-amber-600",  bg: "bg-amber-50",   border: "border-amber-200" },
  regulatory:  { label: "Regulatory",  color: "text-purple-600", bg: "bg-purple-50",  border: "border-purple-200" },
  conference:  { label: "Conference",  color: "text-orange-600", bg: "bg-orange-50",  border: "border-orange-200" },
  listing:     { label: "Listing",     color: "text-rose-600",   bg: "bg-rose-50",    border: "border-rose-200" },
};

export const IMPACT_DOT: Record<string, string> = {
  high:   "bg-rose-500",
  medium: "bg-amber-400",
  low:    "bg-emerald-400",
};

// ─── May 2026 day-by-day trading data ────────────────────────────────────────

// label is intentionally omitted — use tradingPlanMay2026.signalTypes[sig].label[locale] for i18n text
export const SIGNAL_META: Record<string, { cellBg: string; tagBg: string; tagText: string; tagBorder: string; dot: string }> = {
  "trend":  { cellBg: "bg-emerald-50", tagBg: "bg-emerald-100", tagText: "text-emerald-700", tagBorder: "border-emerald-200", dot: "bg-emerald-500" },
  "follow": { cellBg: "bg-amber-50",   tagBg: "bg-amber-50",    tagText: "text-amber-700",   tagBorder: "border-amber-200",   dot: "bg-amber-400"  },
  "adjust": { cellBg: "bg-sky-50",     tagBg: "bg-sky-100",     tagText: "text-sky-700",     tagBorder: "border-sky-200",     dot: "bg-sky-500"    },
  "risk":   { cellBg: "bg-rose-50",    tagBg: "bg-rose-100",    tagText: "text-rose-700",    tagBorder: "border-rose-200",    dot: "bg-rose-500"   },
};
