"use client";

import { CalendarDays, Crosshair, ShieldAlert, Sparkles } from "lucide-react";
import { useLocale, currentFocusText } from "@/lib/locale";
import { useTradingPlan } from "@/lib/trading-plan-context";

type TargetId = "current-focus" | "best-trading-windows" | "high-risk-days";

function scrollToSection(id: TargetId) {
  const target = document.getElementById(id);
  if (!target) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function CurrentFocusPanel() {
  const { locale } = useLocale();
  const {
    plan,
    todayDateString,
    localDateReady,
    todayTradingDay,
    selectedPlanContainsToday,
    selectedPlanUsedFallback,
  } = useTradingPlan();
  const text = currentFocusText;
  const riskDates = plan.riskWindows.flatMap((window) => window.dates);
  const primaryRisk = riskDates.length > 0 ? riskDates.join(" / ") : text.noRiskDates[locale];
  const todayLabel = todayTradingDay
    ? `${todayTradingDay.displayDate} · ${todayTradingDay.ganzhi} · ${plan.signalTypes[todayTradingDay.type].label[locale]}`
    : todayDateString ?? text.loadingDate[locale];
  const todayAdvice = todayTradingDay
    ? todayTradingDay.advice[locale]
    : text.noTodayAdvice[locale];

  return (
    <section
      id="current-focus"
      className="bg-white rounded-2xl border border-emerald-100 shadow-[0_1px_4px_rgba(0,0,0,0.06)] p-5 sm:p-6 space-y-5 scroll-mt-4"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">
              <Crosshair size={12} />
              {text.sectionEyebrow[locale]}
            </span>
            <span className="text-[11px] font-medium text-gray-400">
              {text.cycleLabel[locale]} · {plan.period}
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-950 leading-tight">
              {plan.monthTitle[locale]}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              {plan.monthlyTheme.summary[locale]}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:w-[320px] shrink-0">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700 mb-1">
              <CalendarDays size={13} />
              {text.currentDay[locale]}
            </div>
            <p className="text-sm font-semibold text-gray-900">{todayLabel}</p>
            <p className="text-[11px] text-gray-500 leading-relaxed mt-1">{todayAdvice}</p>
          </div>
          <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-rose-600 mb-1">
              <ShieldAlert size={13} />
              {text.riskLabel[locale]}
            </div>
            <p className="text-sm font-semibold text-gray-900">{primaryRisk}</p>
            <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
              {plan.riskWindows[0]?.reason[locale] ?? text.noRiskDates[locale]}
            </p>
          </div>
        </div>
      </div>

      {localDateReady && (!selectedPlanContainsToday || selectedPlanUsedFallback) && (
        <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] font-medium text-amber-700">
          {selectedPlanUsedFallback ? text.fallbackCycle[locale] : text.outsideCycle[locale]}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 pt-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            <Sparkles size={13} />
            {text.summaryLabel[locale]}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {plan.monthlyTheme.highlights.slice(0, 3).map((item, index) => (
              <span
                key={`${item.zh}-${index}`}
                className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full"
              >
                {item[locale]}
              </span>
            ))}
            {plan.strategy.suitable.slice(0, 2).map((item, index) => (
              <span
                key={`${item.zh}-${index}`}
                className="text-[11px] text-sky-700 bg-sky-50 border border-sky-100 px-2 py-1 rounded-full"
              >
                {item[locale]}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap md:justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollToSection("current-focus")}
            className="h-9 px-3 rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            {text.actionToday[locale]}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("best-trading-windows")}
            className="h-9 px-3 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:border-emerald-200 hover:text-emerald-700 transition-colors"
          >
            {text.actionBestWindows[locale]}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("high-risk-days")}
            className="h-9 px-3 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:border-rose-200 hover:text-rose-600 transition-colors"
          >
            {text.actionRiskDays[locale]}
          </button>
        </div>
      </div>
    </section>
  );
}
