"use client";

import { MARKET_ASSETS } from "@/lib/mock-data";
import { TrendingUp, TrendingDown } from "lucide-react";

function fmt(n: number, decimals = 2) {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
}

export function MarketTicker() {
  const assets = [...MARKET_ASSETS, ...MARKET_ASSETS];

  return (
    <div className="border-b border-border bg-card/60 overflow-hidden">
      <div className="flex ticker-track whitespace-nowrap">
        {assets.map((asset, i) => {
          const positive = asset.changePct24h >= 0;
          return (
            <div key={`${asset.symbol}-${i}`} className="inline-flex items-center gap-2 px-5 py-2 border-r border-border/50 shrink-0">
              <span className="font-mono text-xs font-semibold text-foreground/80 tracking-wider">{asset.symbol}</span>
              <span className="font-mono text-xs font-bold">{fmt(asset.price, asset.price < 1 ? 4 : asset.price < 10 ? 3 : 2)}</span>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${positive ? "text-emerald-400" : "text-rose-400"}`}>
                {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {positive ? "+" : ""}{asset.changePct24h.toFixed(2)}%
              </span>
              <span className="text-xs text-muted-foreground">Vol {fmt(asset.volume24h)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
