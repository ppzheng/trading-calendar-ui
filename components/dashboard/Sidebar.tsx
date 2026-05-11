"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CATEGORY_META, IMPACT_DOT, MARKET_ASSETS } from "@/lib/mock-data";
import { EventCategory } from "@/lib/types";
import { TrendingUp, TrendingDown, BarChart3, Filter } from "lucide-react";

interface SidebarProps {
  activeFilters: EventCategory[];
  onToggleFilter: (cat: EventCategory) => void;
}

function fmtPrice(n: number) {
  if (n >= 1000) return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
  if (n >= 1) return `$${n.toFixed(2)}`;
  return `$${n.toFixed(4)}`;
}

export function Sidebar({ activeFilters, onToggleFilter }: SidebarProps) {
  const categories = Object.keys(CATEGORY_META) as EventCategory[];
  const top5 = MARKET_ASSETS.slice(0, 5);

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-sidebar flex flex-col">
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">

          {/* Market Prices */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Markets</span>
            </div>
            <div className="space-y-1">
              {top5.map((asset) => {
                const positive = asset.changePct24h >= 0;
                return (
                  <div key={asset.symbol} className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-sidebar-accent/60 transition-colors cursor-default">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-foreground/90 w-10">{asset.symbol}</span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-xs font-mono font-semibold">{fmtPrice(asset.price)}</span>
                      <span className={`text-[10px] font-medium flex items-center gap-0.5 ${positive ? "text-emerald-400" : "text-rose-400"}`}>
                        {positive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                        {positive ? "+" : ""}{asset.changePct24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Event Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event Filters</span>
            </div>
            <div className="space-y-1.5">
              {categories.map((cat) => {
                const meta = CATEGORY_META[cat];
                const active = activeFilters.includes(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => onToggleFilter(cat)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-xs transition-all ${
                      active
                        ? `${meta.bg} ${meta.border} border ${meta.color}`
                        : "text-muted-foreground hover:bg-sidebar-accent/40 border border-transparent"
                    }`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-sm ${active ? meta.bg.replace("/15", "/60") : "bg-muted"} border ${active ? meta.border : "border-border"}`} />
                    <span className="font-medium">{meta.label}</span>
                    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-current" />}
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Impact Legend */}
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">Impact</span>
            <div className="space-y-2">
              {(["high", "medium", "low"] as const).map((level) => (
                <div key={level} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <div className={`w-2 h-2 rounded-full ${IMPACT_DOT[level]}`} />
                  <span className="capitalize font-medium">{level}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* DeFi Fear & Greed */}
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">Fear & Greed</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Index</span>
                <Badge variant="outline" className="text-yellow-400 border-yellow-500/40 bg-yellow-500/10 text-xs font-mono">72 — Greed</Badge>
              </div>
              <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-rose-500 via-yellow-500 to-emerald-500" style={{ clipPath: "inset(0 28% 0 0)" }} />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Fear</span>
                <span>Greed</span>
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>
    </aside>
  );
}
