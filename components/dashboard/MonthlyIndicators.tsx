"use client";

import { memo, useMemo } from "react";
import { SIGNAL_META } from "@/lib/mock-data";
import { SignalType } from "@/lib/types";
import { useLocale } from "@/lib/locale";
import { tradingPlanMay2026 } from "@/data/tradingPlanMay2026";

// ── Radar chart (SVG pentagon) ────────────────────────────────────────────────

const RadarChart = memo(function RadarChart() {
  const cx = 110, cy = 110, maxR = 80;
  const data = tradingPlanMay2026.radarData;
  const n = data.length;

  const getXY = (i: number, r: number): [number, number] => {
    const angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
  };

  const rings = [0.25, 0.5, 0.75, 1.0];
  const dataPolygon = data.map((d, i) => getXY(i, (maxR * d.value) / 100));
  const dataPath =
    dataPolygon.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + " Z";

  return (
    <svg viewBox="0 0 220 220" className="w-full h-full">
      {rings.map((level) => {
        const pts = [...Array(n)].map((_, i) => getXY(i, maxR * level));
        const path = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") + " Z";
        return <path key={level} d={path} fill="none" stroke="#E5E7EB" strokeWidth={level === 1.0 ? 1.5 : 1} />;
      })}
      {data.map((_, i) => {
        const [ox, oy] = getXY(i, maxR);
        return <line key={i} x1={cx} y1={cy} x2={ox.toFixed(1)} y2={oy.toFixed(1)} stroke="#E5E7EB" strokeWidth="1" />;
      })}
      <path d={dataPath} fill="rgba(22,163,74,0.10)" stroke="#16A34A" strokeWidth="1.5" strokeLinejoin="round" />
      {dataPolygon.map(([x, y], i) => (
        <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="3.5" fill="#16A34A" stroke="white" strokeWidth="1.5" />
      ))}
      {data.map((d, i) => {
        const [lx, ly] = getXY(i, maxR + 22);
        return (
          <text key={i} x={lx.toFixed(1)} y={ly.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize="9.5" fill="#6B7280" fontFamily="var(--font-geist-sans)">
            {d.label}
          </text>
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="14" fontWeight="600" fill="#111827" fontFamily="var(--font-geist-sans)">
        {Math.round(data.reduce((s, d) => s + d.value, 0) / data.length)}
      </text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize="8.5" fill="#9CA3AF" fontFamily="var(--font-geist-sans)">
        avg score
      </text>
    </svg>
  );
});

// ── Horizontal metric bar ─────────────────────────────────────────────────────

function MetricBar({ label, value, description, isRisk = false }: { label: string; value: number; description: string; isRisk?: boolean }) {
  const barColor = isRisk
    ? "bg-rose-400"
    : value >= 65 ? "bg-emerald-500" : value >= 45 ? "bg-amber-400" : "bg-rose-400";
  const textColor = isRisk
    ? "text-rose-600"
    : value >= 65 ? "text-emerald-600" : value >= 45 ? "text-amber-600" : "text-rose-600";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-700">{label}</span>
        <span className={`text-xs font-semibold font-mono ${textColor}`}>{value}</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${value}%` }} />
      </div>
      <p className="text-[10px] text-gray-400 leading-tight">{description}</p>
    </div>
  );
}

// ── Signal distribution bar (auto-calculated from calendar) ───────────────────

function SignalDistribution() {
  const { locale } = useLocale();
  const { signalTypes } = tradingPlanMay2026;

  const counts = useMemo(() =>
    tradingPlanMay2026.calendar.reduce(
      (acc, d) => { acc[d.type] = (acc[d.type] || 0) + 1; return acc; },
      {} as Record<SignalType, number>
    ), []
  );

  const total = tradingPlanMay2026.calendar.length;

  const segments: { signal: SignalType; dot: string }[] = [
    { signal: "trend",  dot: "bg-emerald-400" },
    { signal: "follow", dot: "bg-amber-300"   },
    { signal: "adjust", dot: "bg-sky-400"     },
    { signal: "risk",   dot: "bg-rose-400"    },
  ];

  const heading =
    locale === "zh" ? `信号分布 — 共 ${total} 个交易日` : `Signal Distribution — ${total} trading days`;

  return (
    <div className="space-y-2.5">
      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">{heading}</span>
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
        {segments.map(({ signal, dot }) => (
          <div key={signal} className={`${dot} rounded-full`} style={{ flex: counts[signal] ?? 0 }} title={`${counts[signal] ?? 0}`} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {segments.map(({ signal, dot }) => {
          const count = counts[signal] ?? 0;
          const label = signalTypes[signal].label[locale];
          return (
            <div key={signal} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${dot}`} />
              <span className="text-[10px] text-gray-500">
                {label} <span className="font-semibold text-gray-700">{count}d</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function MonthlyIndicators() {
  const { locale } = useLocale();
  const { monthlyTheme, signalBars, period, monthTitle } = tradingPlanMay2026;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            {locale === "zh" ? "月度概览" : "Monthly Overview"}
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {monthTitle[locale]} · {period} · {locale === "zh" ? "市场状态快照" : "Market condition snapshot"}
          </p>
        </div>
        <span className="text-[10px] font-medium text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
          {locale === "zh" ? "截至 5月11日" : "As of May 11"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-6 space-y-5">
          {/* Monthly theme */}
          <div className="pb-4 border-b border-gray-50 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-900">{monthlyTheme.keyword[locale]}</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-full font-medium">
                癸巳月
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">{monthlyTheme.summary[locale]}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
              {monthlyTheme.highlights.map((h, i) => (
                <span key={i} className="text-[10px] text-emerald-600 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                  {h[locale]}
                </span>
              ))}
              {monthlyTheme.risks.map((r, i) => (
                <span key={i} className="text-[10px] text-rose-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-rose-400 shrink-0" />
                  {r[locale]}
                </span>
              ))}
            </div>
          </div>

          {/* Signal bars — label/description follow locale */}
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {locale === "zh" ? "信号指标" : "Signal Indicators"}
          </div>
          <div className="space-y-5">
            {signalBars.map((bar, i) => (
              <MetricBar
                key={i}
                label={bar.label[locale]}
                value={bar.value}
                description={bar.description[locale]}
                isRisk={bar.isRisk ?? false}
              />
            ))}
          </div>

          <div className="pt-2 border-t border-gray-50">
            <SignalDistribution />
          </div>
        </div>

        {/* Right card: radar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-6 flex flex-col">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            {locale === "zh" ? "市场雷达" : "Market Radar"}
          </div>
          <div className="flex-1 flex items-center justify-center min-h-[180px]">
            <div className="w-full max-w-[220px] aspect-square">
              <RadarChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
