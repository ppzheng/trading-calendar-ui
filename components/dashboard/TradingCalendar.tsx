"use client";

import { memo, useMemo, useCallback, useState } from "react";
import { Download } from "lucide-react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { SIGNAL_META } from "@/lib/mock-data";
import { SignalType } from "@/lib/types";
import { dashboardText, useLocale } from "@/lib/locale";
import { useTradingPlan } from "@/lib/trading-plan-context";
import type { TradingPlan } from "@/data/tradingPlans";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EXPORT_FONT = '-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei","Noto Sans SC",Arial,sans-serif';
const EXPORT_C = {
  trend:  { bg: "#E8F8F0", border: "#A7E8C4", text: "#047857" },
  follow: { bg: "#FFF8E1", border: "#F6D365", text: "#B45309" },
  adjust: { bg: "#EAF6FD", border: "#A7DDF7", text: "#0369A1" },
  risk:   { bg: "#FDECEC", border: "#F5B5B5", text: "#BE123C" },
} as const;

type TradingDay = TradingPlan["calendar"][number];

function fromDateStr(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildCalendarRows(calendar: TradingDay[]) {
  const first = fromDateStr(calendar[0].date);
  const last = fromDateStr(calendar[calendar.length - 1].date);
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - first.getDay());

  const gridEnd = new Date(last);
  gridEnd.setDate(last.getDate() + (6 - last.getDay()));

  const dayMap = new Map(calendar.map((d) => [d.date, d]));
  const cells: { dateStr: string; displayDate: string; day: TradingDay | null }[] = [];
  for (const d = new Date(gridStart); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    const dateStr = toDateStr(d);
    cells.push({
      dateStr,
      displayDate: `${d.getMonth() + 1}/${d.getDate()}`,
      day: dayMap.get(dateStr) ?? null,
    });
  }

  const rows: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
  return rows;
}

// ── Legend tooltip (Base UI) — kept only for the 4 legend items ──────────────

function SignalTooltipWrap({ signal, children }: { signal: SignalType; children: React.ReactNode }) {
  const { locale } = useLocale();
  const { plan } = useTradingPlan();
  const { label, tooltip } = plan.signalTypes[signal];
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger render={<span />} className="cursor-default">
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner side="top" sideOffset={8} className="isolate z-50">
          <TooltipPrimitive.Popup className="max-w-[220px] rounded-lg bg-white border border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.1)] px-3 py-2.5 data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 duration-100">
            <p className="text-[11px] font-semibold text-gray-800 mb-1">{label[locale]}</p>
            <p className="text-[11px] text-gray-500 leading-relaxed">{tooltip[locale]}</p>
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

// ── Calendar components ───────────────────────────────────────────────────────

// Signal tag uses a native `title` tooltip — zero React/DOM overhead,
// invisible on touch devices (no hover), no z-index/overflow conflicts.
const SignalTag = memo(function SignalTag({ signal }: { signal: SignalType }) {
  const { locale } = useLocale();
  const { plan } = useTradingPlan();
  const meta = SIGNAL_META[signal];
  const { label, tooltip } = plan.signalTypes[signal];
  return (
    <span
      className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full border leading-none whitespace-nowrap ${meta.tagBg} ${meta.tagText} ${meta.tagBorder}`}
      title={`${label[locale]}: ${tooltip[locale]}`}
    >
      {label[locale]}
    </span>
  );
});

const DayCell = memo(function DayCell({ day, isToday }: { day: TradingDay; isToday: boolean }) {
  const { locale } = useLocale();
  const meta = SIGNAL_META[day.type];
  return (
    <div
      data-date={day.date}
      data-signal={day.type}
      className={`
        calendar-day-card
        relative flex flex-col rounded-[20px] border p-4 min-h-[132px] overflow-hidden
        transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-default
        ${meta.cellBg}
        ${isToday ? "ring-2 ring-emerald-500 ring-offset-1 border-emerald-300" : "border-gray-200/80"}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5 shrink-0">
        <span className={`text-xl font-bold leading-none font-mono ${isToday ? "text-emerald-600" : "text-gray-800"}`}>
          {day.displayDate}
        </span>
        <span className="ganzhi text-[13px] font-medium text-gray-400 leading-none mt-0.5 font-mono whitespace-nowrap">
          {day.ganzhi}
        </span>
      </div>
      <div className="mb-1.5 shrink-0">
        <SignalTag signal={day.type} />
      </div>
      <p className="text-[10px] text-gray-500 leading-snug line-clamp-2">
        {day.advice[locale]}
      </p>
      {isToday && (
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500" />
      )}
    </div>
  );
});

const GrayCell = memo(function GrayCell({ displayDate }: { displayDate: string }) {
  return (
    <div className="calendar-day-card flex flex-col rounded-[20px] border border-gray-100 bg-gray-50/60 p-4 min-h-[132px] opacity-35">
      <span className="text-xl font-bold leading-none font-mono text-gray-400">{displayDate}</span>
    </div>
  );
});

// ── Main export ───────────────────────────────────────────────────────────────

export function TradingCalendar() {
  const { locale } = useLocale();
  const { plan, selectedPlanContainsToday, todayDateString } = useTradingPlan();
  const { calendar, signalTypes, period, cycleGanzhi } = plan;

  const [isDownloading, setIsDownloading] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const text = dashboardText;

  const rows = useMemo(() => buildCalendarRows(calendar), [calendar]);

  const counts = useMemo(
    () => calendar.reduce((acc, d) => { acc[d.type] = (acc[d.type] || 0) + 1; return acc; }, {} as Record<SignalType, number>),
    [calendar]
  );

  const subtitle = locale === "zh"
    ? `${period} · ${cycleGanzhi}月 · 每格显示干支、信号与操作建议`
    : `${period} · ${cycleGanzhi} Month · Each block shows ganzhi, signal, and trading advice`;

  const downloadCalendarAsImage = useCallback(() => {
    if (isDownloading) return;
    setIsDownloading(true);
    setExportError(null);

    try {
      const flatCells = rows.flat();

      const cellsHTML = flatCells.map(({ displayDate, day }) => {
        if (!day) {
          return `<div style="background:#F9FAFB;border:1px solid #F3F4F6;border-radius:8px;padding:10px;min-height:100px;opacity:0.4;"><span style="font-size:15px;font-weight:700;color:#9CA3AF;">${displayDate}</span></div>`;
        }
        const c = EXPORT_C[day.type];
        const label = signalTypes[day.type].label[locale];
        const advice = day.advice[locale];
        return `<div style="background:${c.bg};border:1px solid ${c.border};border-radius:8px;padding:10px;min-height:100px;"><div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:5px;"><span style="font-size:16px;font-weight:700;color:#111;">${day.displayDate}</span><span style="font-size:11px;color:#666;">${day.ganzhi}</span></div><div style="margin-bottom:5px;"><span style="display:inline-block;font-size:9px;font-weight:600;color:${c.text};background:white;border:1px solid ${c.border};border-radius:99px;padding:2px 6px;">${label}</span></div><p style="font-size:9.5px;color:#4B5563;line-height:1.4;margin:0;">${advice}</p></div>`;
      }).join("");

      const whdays = locale === "zh"
        ? ["周日","周一","周二","周三","周四","周五","周六"]
        : WEEKDAYS;
      const weekdayHTML = whdays.map(d =>
        `<div style="text-align:center;font-size:10px;font-weight:600;color:#6B7280;padding:6px 0;text-transform:uppercase;letter-spacing:0.05em;">${d}</div>`
      ).join("");

      const legendHTML = (["trend","follow","adjust","risk"] as SignalType[]).map(s => {
        const c = EXPORT_C[s];
        const count = counts[s] ?? 0;
        return `<span style="display:inline-flex;align-items:center;gap:5px;"><span style="width:9px;height:9px;border-radius:50%;background:${c.text};display:inline-block;"></span><span style="font-size:11px;color:#374151;">${signalTypes[s].label[locale]}&nbsp;<b>${count}d</b></span></span>`;
      }).join("");

      const titleText = locale === "zh" ? "交易日历" : "Trading Calendar";
      const footerText = locale === "zh" ? "仅供参考，不构成投资建议。" : "For reference only. Not investment advice.";

      const html = `<!DOCTYPE html><html lang="${locale}"><head><meta charset="utf-8"><title>${titleText}</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{background:#fff;font-family:${EXPORT_FONT};}.g{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;}@media print{@page{size:A4 landscape;margin:1.2cm;}body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}</style></head><body><div style="padding:28px;max-width:1100px;margin:0 auto;"><div style="margin-bottom:14px;"><div style="font-size:20px;font-weight:700;color:#111;">${titleText}</div><div style="font-size:12px;color:#555;margin-top:3px;">${period} · ${cycleGanzhi}月</div></div><div style="display:flex;gap:18px;flex-wrap:wrap;margin-bottom:12px;padding:9px 13px;background:#F9FAFB;border-radius:8px;border:1px solid #E5E7EB;">${legendHTML}</div><div class="g" style="margin-bottom:4px;background:#F9FAFB;border-radius:6px;">${weekdayHTML}</div><div class="g">${cellsHTML}</div><div style="margin-top:14px;padding-top:10px;border-top:1px solid #E5E7EB;font-size:10px;color:#9CA3AF;">${footerText}</div></div><script>window.onload=function(){setTimeout(function(){window.print();},300);};<\/script></body></html>`;

      const win = window.open("", "_blank", "width=1200,height=900,scrollbars=yes");
      if (!win) {
        setExportError(text.exportPopupBlocked[locale]);
        return;
      }
      win.document.write(html);
      win.document.close();
    } catch (err) {
      console.error("[Calendar export]", err);
      setExportError(text.exportFailed[locale]);
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, locale, rows, counts, signalTypes, period, cycleGanzhi, text]);

  return (
    <div className="space-y-4">
        {/* ── Header: title + legend + download ── */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-gray-900">
              {locale === "zh" ? "交易日历" : "Trading Calendar"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{subtitle}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Legend — desktop only, keeps Base UI tooltips (4 instances) */}
            <div className="hidden md:flex items-center gap-4">
              {(["trend", "follow", "adjust", "risk"] as SignalType[]).map((sig) => {
                const m = SIGNAL_META[sig];
                return (
                  <SignalTooltipWrap key={sig} signal={sig}>
                    <div className="flex items-center gap-1.5 cursor-default">
                      <div className={`w-2 h-2 rounded-full ${m.dot}`} />
                      <span className="text-[10px] text-gray-500">{signalTypes[sig].label[locale]}</span>
                      <span className="text-[10px] font-semibold text-gray-700">{counts[sig] ?? 0}d</span>
                    </div>
                  </SignalTooltipWrap>
                );
              })}
            </div>

            <div className="hidden md:block w-px h-4 bg-gray-200" />

            {/* Download button */}
            <button
              onClick={downloadCalendarAsImage}
              disabled={isDownloading}
              data-calendar-export
              className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 whitespace-nowrap hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={13} className={isDownloading ? "animate-pulse" : ""} />
              <span className="hidden sm:inline">
                {isDownloading
                  ? (locale === "zh" ? "生成中..." : "Generating...")
                  : (locale === "zh" ? "下载日历" : "Download Calendar")}
              </span>
              <span className="sm:hidden">
                {isDownloading ? "..." : (locale === "zh" ? "下载" : "Save")}
              </span>
            </button>
          </div>
        </div>

        {exportError && (
          <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-700">
            {exportError}
          </div>
        )}

        <div className="md:hidden rounded-xl border border-gray-100 bg-white p-3 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-semibold text-gray-500">{text.signalGuide[locale]}</span>
            <span className="text-[10px] text-gray-400">{text.scrollHint[locale]}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["trend", "follow", "adjust", "risk"] as SignalType[]).map((sig) => {
              const meta = SIGNAL_META[sig];
              const signal = signalTypes[sig];
              return (
                <div key={sig} className={`rounded-lg border ${meta.tagBorder} ${meta.tagBg} px-2 py-1.5`}>
                  <div className={`text-[10px] font-semibold ${meta.tagText}`}>{signal.label[locale]}</div>
                  <p className="text-[10px] text-gray-500 leading-snug mt-0.5">{signal.advice[locale]}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Calendar card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto" data-calendar-scroll>
            <div className="min-w-[980px]">
              {/* Weekday header — inside scroll so it tracks with the grid on mobile */}
              <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/70">
                {WEEKDAYS.map((d, i) => (
                  <div
                    key={d}
                    className={`py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider ${i === 0 || i === 6 ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {/* Grid rows */}
              <div className="p-3 space-y-2 calendar-grid">
                {rows.map((row, ri) => (
                  <div key={ri} className="grid grid-cols-7 gap-2">
                    {row.map((cell, ci) =>
                      cell.day ? (
                        <DayCell key={ci} day={cell.day} isToday={selectedPlanContainsToday && cell.dateStr === todayDateString} />
                      ) : (
                        <GrayCell key={ci} displayDate={cell.displayDate} />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
