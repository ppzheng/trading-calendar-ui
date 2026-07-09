"use client";

import { useMemo } from "react";
import { useLocale } from "@/lib/locale";
import { SignalType } from "@/lib/types";
import { useTradingPlan } from "@/lib/trading-plan-context";
import type { TradingPlan } from "@/data/tradingPlans";

// ── Constants ──────────────────────────────────────────────────────────────────

const TODAY_STR = "2026-05-11";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// All colors are plain hex/rgba — no oklch, no CSS variables, no Tailwind tokens.
const COLORS: Record<SignalType, {
  cellBg: string; cellBorder: string;
  tagBg: string; tagBorder: string; tagText: string;
  dot: string;
}> = {
  trend:  { cellBg: "#E8F8F0", cellBorder: "#A7E8C4", tagBg: "#D1FAE5", tagBorder: "#A7E8C4", tagText: "#047857", dot: "#10B981" },
  follow: { cellBg: "#FFF8E1", cellBorder: "#F6D365", tagBg: "#FEF3C7", tagBorder: "#F6D365", tagText: "#B45309", dot: "#F59E0B" },
  adjust: { cellBg: "#EAF6FD", cellBorder: "#A7DDF7", tagBg: "#E0F2FE", tagBorder: "#A7DDF7", tagText: "#0369A1", dot: "#0EA5E9" },
  risk:   { cellBg: "#FDECEC", cellBorder: "#F5B5B5", tagBg: "#FFE4E6", tagBorder: "#F5B5B5", tagText: "#BE123C", dot: "#F43F5E" },
};

const BASE_FONT =
  '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", Arial, sans-serif';

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fromDateStr(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function buildCalendarRows(calendar: TradingPlan["calendar"]) {
  const first = fromDateStr(calendar[0].date);
  const last = fromDateStr(calendar[calendar.length - 1].date);
  const gridStart = new Date(first);
  gridStart.setDate(first.getDate() - first.getDay());
  const gridEnd = new Date(last);
  gridEnd.setDate(last.getDate() + (6 - last.getDay()));

  const dayMap = new Map(calendar.map((d) => [d.date, d]));
  const cells: {
    dateStr: string;
    displayDate: string;
    day: TradingPlan["calendar"][number] | null;
  }[] = [];

  for (const d = new Date(gridStart); d <= gridEnd; d.setDate(d.getDate() + 1)) {
    const dateStr = toDateStr(d);
    cells.push({
      dateStr,
      displayDate: `${d.getMonth() + 1}/${d.getDate()}`,
      day: dayMap.get(dateStr) ?? null,
    });
  }

  const result: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) result.push(cells.slice(i, i + 7));
  return result;
}

// ── Component ──────────────────────────────────────────────────────────────────

interface Props {
  exportRef: React.RefObject<HTMLDivElement | null>;
}

export function CalendarExportView({ exportRef }: Props) {
  const { locale } = useLocale();
  const { plan } = useTradingPlan();
  const { calendar, signalTypes, period, cycleGanzhi } = plan;

  const rows = useMemo(() => buildCalendarRows(calendar), [calendar]);

  const counts = useMemo(
    () =>
      calendar.reduce((acc, d) => {
        acc[d.type] = (acc[d.type] ?? 0) + 1;
        return acc;
      }, {} as Record<SignalType, number>),
    [calendar]
  );

  return (
    /*
      Positioned off-screen so html2canvas can measure and render it without
      it appearing in the page. Must NOT be display:none — html2canvas needs
      the element to be part of the layout.
    */
    <div
      ref={exportRef}
      style={{
        position: "fixed",
        left: "-9999px",
        top: "0",
        width: "1200px",
        background: "#F6FBF8",
        fontFamily: BASE_FONT,
        padding: "28px",
        boxSizing: "border-box",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      {/* ── Title bar ── */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        padding: "20px 24px",
        marginBottom: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{
            fontSize: "16px",
            fontWeight: "700",
            color: "#111827",
            lineHeight: "1.2",
            fontFamily: BASE_FONT,
          }}>
            {locale === "zh" ? "交易日历" : "Trading Calendar"}
            {" · "}
            <span style={{ color: "#059669" }}>{cycleGanzhi}月</span>
          </div>
          <div style={{
            fontSize: "11px",
            color: "#9CA3AF",
            marginTop: "5px",
            lineHeight: "1.4",
            fontFamily: BASE_FONT,
          }}>
            {period}
            {" · "}
            {locale === "zh"
              ? "每格显示干支、信号与操作建议"
              : "Ganzhi · Signal · Trading Advice"}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {(["trend", "follow", "adjust", "risk"] as SignalType[]).map((sig) => {
            const c = COLORS[sig];
            return (
              <div key={sig} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: c.dot,
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: "10px", color: "#6B7280", fontFamily: BASE_FONT }}>
                  {signalTypes[sig].label[locale]}
                </span>
                <span style={{ fontSize: "10px", fontWeight: "700", color: "#374151", fontFamily: BASE_FONT }}>
                  {counts[sig] ?? 0}d
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Calendar card ── */}
      <div style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
      }}>
        {/* Weekday header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          borderBottom: "1px solid #F3F4F6",
          background: "#F9FAFB",
        }}>
          {WEEKDAYS.map((day, i) => (
            <div key={day} style={{
              padding: "10px 0",
              textAlign: "center",
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              color: i === 0 || i === 6 ? "#9CA3AF" : "#6B7280",
              fontFamily: BASE_FONT,
            }}>
              {day}
            </div>
          ))}
        </div>

        {/* Grid rows */}
        <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {rows.map((row, ri) => (
            <div key={ri} style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "8px",
            }}>
              {row.map((cell, ci) => {
                if (!cell.day) {
                  return (
                    <div key={ci} style={{
                      borderRadius: "16px",
                      border: "1px solid #F3F4F6",
                      background: "#F9FAFB",
                      padding: "14px",
                      minHeight: "132px",
                      boxSizing: "border-box",
                      opacity: 0.4,
                    }}>
                      <span style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#9CA3AF",
                        fontFamily: BASE_FONT,
                        lineHeight: "1",
                      }}>
                        {cell.displayDate}
                      </span>
                    </div>
                  );
                }

                const day = cell.day;
                const isToday = cell.dateStr === TODAY_STR;
                const c = COLORS[day.type];
                const tagLabel = signalTypes[day.type].label[locale];

                return (
                  <div key={ci} style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    border: `1px solid ${isToday ? "#10B981" : c.cellBorder}`,
                    outline: isToday ? "2px solid #10B981" : "none",
                    outlineOffset: isToday ? "2px" : "0",
                    background: c.cellBg,
                    padding: "14px",
                    minHeight: "132px",
                    boxSizing: "border-box",
                  }}>
                    {/* Date + ganzhi */}
                    <div style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "8px",
                      marginBottom: "8px",
                      flexShrink: 0,
                    }}>
                      <span style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        lineHeight: "1",
                        color: isToday ? "#059669" : "#1F2937",
                        fontFamily: BASE_FONT,
                      }}>
                        {day.displayDate}
                      </span>
                      <span style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#94A3B8",
                        lineHeight: "1",
                        marginTop: "3px",
                        fontFamily: BASE_FONT,
                        whiteSpace: "nowrap",
                      }}>
                        {day.ganzhi}
                      </span>
                    </div>

                    {/* Signal tag */}
                    <div style={{ marginBottom: "8px", flexShrink: 0 }}>
                      <span style={{
                        display: "inline-block",
                        fontSize: "9px",
                        fontWeight: "600",
                        padding: "3px 7px",
                        borderRadius: "9999px",
                        border: `1px solid ${c.tagBorder}`,
                        background: c.tagBg,
                        color: c.tagText,
                        whiteSpace: "nowrap",
                        lineHeight: "1.4",
                        fontFamily: BASE_FONT,
                      }}>
                        {tagLabel}
                      </span>
                    </div>

                    {/* Advice — overflow hidden to cap height */}
                    <div style={{
                      fontSize: "10px",
                      color: "#6B7280",
                      lineHeight: "1.45",
                      overflow: "hidden",
                      maxHeight: "30px",
                      fontFamily: BASE_FONT,
                    }}>
                      {day.advice[locale]}
                    </div>

                    {/* Today indicator dot */}
                    {isToday && (
                      <div style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "8px",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#10B981",
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
