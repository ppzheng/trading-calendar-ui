"use client";

import { MARKET_ASSETS } from "@/lib/mock-data";
import { TrendingUp, TrendingDown, BarChart2, DollarSign, Layers } from "lucide-react";

function fmtBig(n: number) {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  return `$${(n / 1_000_000).toFixed(0)}M`;
}

export function StatsBar() {
  const totalMktCap = MARKET_ASSETS.reduce((s, a) => s + a.marketCap, 0);
  const totalVol = MARKET_ASSETS.reduce((s, a) => s + a.volume24h, 0);
  const btc = MARKET_ASSETS[0];
  const eth = MARKET_ASSETS[1];
  const btcDom = ((btc.marketCap / totalMktCap) * 100).toFixed(1);

  const stats = [
    { icon: DollarSign, label: "Total Market Cap", value: fmtBig(totalMktCap), sub: "+2.4% 24h", positive: true },
    { icon: BarChart2, label: "24h Volume", value: fmtBig(totalVol), sub: "Spot + Perps" },
    { icon: Layers, label: "BTC Dominance", value: `${btcDom}%`, sub: `${btc.changePct24h > 0 ? "+" : ""}${btc.changePct24h.toFixed(2)}% 24h`, positive: btc.changePct24h > 0 },
    {
      icon: btc.changePct24h >= 0 ? TrendingUp : TrendingDown,
      label: "BTC / ETH",
      value: `${(btc.price / eth.price).toFixed(2)}`,
      sub: "BTC/ETH ratio",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border-b border-border shrink-0">
      {stats.map((s, i) => (
        <div key={i} className="bg-card/40 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <s.icon className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] text-muted-foreground font-medium truncate">{s.label}</div>
            <div className="text-sm font-bold font-mono leading-tight">{s.value}</div>
            {s.sub && (
              <div className={`text-[10px] ${s.positive === true ? "text-emerald-400" : s.positive === false ? "text-rose-400" : "text-muted-foreground"}`}>
                {s.sub}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
