"use client";

import { useMemo, useRef, useCallback, useState } from "react";
import { Download } from "lucide-react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { SIGNAL_META } from "@/lib/mock-data";
import { SignalType } from "@/lib/types";
import { useLocale } from "@/lib/locale";
import { tradingPlanMay2026, TradingDay } from "@/data/tradingPlanMay2026";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY_STR = "2026-05-11";

// Grid starts Monday May 4 — May 5 (Tue) is the first active trading day.
// 5 rows × 7 cols covers May 4 – June 7. Cells outside period are gray.
const GRID_START = new Date(2026, 4, 4);

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ── Light-themed signal tooltip ───────────────────────────────────────────────

function SignalTooltipWrap({ signal, children }: { signal: SignalType; children: React.ReactNode }) {
  const { locale } = useLocale();
  const { label, tooltip } = tradingPlanMay2026.signalTypes[signal];
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

function SignalTag({ signal }: { signal: SignalType }) {
  const { locale } = useLocale();
  const meta = SIGNAL_META[signal];
  const label = tradingPlanMay2026.signalTypes[signal].label[locale];
  return (
    <SignalTooltipWrap signal={signal}>
      <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full border leading-none whitespace-nowrap ${meta.tagBg} ${meta.tagText} ${meta.tagBorder}`}>
        {label}
      </span>
    </SignalTooltipWrap>
  );
}

function DayCell({ day, isToday }: { day: TradingDay; isToday: boolean }) {
  const { locale } = useLocale();
  const meta = SIGNAL_META[day.type];
  return (
    <div
      className={`
        relative flex flex-col rounded-xl border p-2.5 min-h-[106px] overflow-hidden
        transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-default
        ${meta.cellBg}
        ${isToday ? "ring-2 ring-emerald-500 ring-offset-1 border-emerald-300" : "border-gray-200/80"}
      `}
    >
      <div className="flex items-start justify-between mb-1.5 shrink-0">
        <span className={`text-xl font-bold leading-none font-mono ${isToday ? "text-emerald-600" : "text-gray-800"}`}>
          {day.displayDate}
        </span>
        <span className="text-[10px] font-medium text-gray-400 leading-none mt-0.5 font-mono">
          {day.ganzhi}
        </span>
      </div>
      <div className="mb-1.5 shrink-0">
        <SignalTag signal={day.type} />
      </div>
      <p className="text-[9.5px] text-gray-500 leading-snug line-clamp-2 hidden sm:block">
        {day.advice[locale]}
      </p>
      {isToday && (
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500" />
      )}
    </div>
  );
}

function GrayCell({ displayDate }: { displayDate: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-100 bg-gray-50/60 p-2.5 min-h-[106px] opacity-35">
      <span className="text-xl font-bold leading-none font-mono text-gray-400">{displayDate}</span>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function TradingCalendar() {
  const { locale } = useLocale();
  const { calendar, signalTypes } = tradingPlanMay2026;

  const calendarRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const dayMap = useMemo(
    () => new Map(calendar.map((d) => [d.date, d])),
    [calendar]
  );

  const rows: { dateStr: string; displayDate: string; day: TradingDay | null }[][] = useMemo(() => {
    const cells = Array.from({ length: 35 }, (_, i) => {
      const d = new Date(GRID_START);
      d.setDate(d.getDate() + i);
      const dateStr = toDateStr(d);
      return { dateStr, displayDate: `${d.getMonth() + 1}/${d.getDate()}`, day: dayMap.get(dateStr) ?? null };
    });
    const result = [];
    for (let i = 0; i < 35; i += 7) result.push(cells.slice(i, i + 7));
    return result;
  }, [dayMap]);

  const counts = useMemo(
    () => calendar.reduce((acc, d) => { acc[d.type] = (acc[d.type] || 0) + 1; return acc; }, {} as Record<SignalType, number>),
    [calendar]
  );

  const subtitle = locale === "zh"
    ? `${tradingPlanMay2026.period} · 癸巳月 · 每格显示干支、信号与操作建议`
    : `${tradingPlanMay2026.period} · Guisi Month · Each block shows ganzhi, signal, and trading advice`;

  const downloadCalendarAsImage = useCallback(async () => {
    if (!calendarRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      // dom-to-image-more uses SVG foreignObject → browser renders CSS natively,
      // so oklch() colors and CSS variables work correctly (html2canvas does not support oklch).
      const domtoimage = await import("dom-to-image-more");
      const dataUrl = await domtoimage.toPng(calendarRef.current, {
        bgcolor: "#ffffff",
        scale: 2,
        filter: (node: Node) =>
          !(node instanceof HTMLElement && node.hasAttribute("data-html2canvas-ignore")),
        onclone: (cloned: Element) => {
          // Expand overflow so the full 640px grid is captured on narrow viewports
          const scrollEl = cloned.querySelector("[data-calendar-scroll]") as HTMLElement | null;
          if (scrollEl) scrollEl.style.overflow = "visible";
        },
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "trading-calendar-may-2026.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("[Calendar download]", err);
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading]);

  return (
    <div className="space-y-4" ref={calendarRef}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            {locale === "zh" ? "交易日历" : "Trading Calendar"}
          </h2>
          <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Legend with tooltips */}
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

          {/* Divider (only when legend is visible) */}
          <div className="hidden md:block w-px h-4 bg-gray-200" />

          {/* Download button */}
          <button
            data-html2canvas-ignore
            onClick={downloadCalendarAsImage}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-gray-200 text-[11px] font-medium text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={11} className={isDownloading ? "animate-pulse" : ""} />
            {isDownloading
              ? (locale === "zh" ? "生成中..." : "Generating...")
              : (locale === "zh" ? "下载日历" : "Download Calendar")}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/70">
          {WEEKDAYS.map((d, i) => (
            <div key={d} className={`py-2.5 text-center text-[11px] font-semibold uppercase tracking-wider ${i >= 5 ? "text-gray-400" : "text-gray-500"}`}>
              {d}
            </div>
          ))}
        </div>

        <div className="overflow-x-auto" data-calendar-scroll>
          <div className="min-w-[640px] p-3 space-y-2">
            {rows.map((row, ri) => (
              <div key={ri} className="grid grid-cols-7 gap-2">
                {row.map((cell, ci) =>
                  cell.day ? (
                    <DayCell key={ci} day={cell.day} isToday={cell.dateStr === TODAY_STR} />
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
  );
}
