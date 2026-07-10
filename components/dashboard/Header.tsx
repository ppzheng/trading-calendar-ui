"use client";

import { useEffect, useState } from "react";
import { dashboardText, useLocale } from "@/lib/locale";
import { useTradingPlan } from "@/lib/trading-plan-context";
import type { TradingPlanId } from "@/data/tradingPlans";
import { personalProfile } from "@/data/analysisData";
import { DestinyModal } from "@/components/dashboard/DestinyModal";
import { FiveElementsModal } from "@/components/dashboard/FiveElementsModal";

const BADGE_STYLES = [
  "bg-orange-50 border-orange-200/70 text-orange-700",
  "bg-rose-50 border-rose-200/70 text-rose-700",
  "bg-purple-50 border-purple-200/70 text-purple-700",
  "bg-emerald-50 border-emerald-200/70 text-emerald-700",
] as const;

export function Header() {
  const { locale, setLocale } = useLocale();
  const { plan, plans, selectedPlanId, setSelectedPlanId } = useTradingPlan();
  const [destinyOpen, setDestinyOpen] = useState(false);
  const [fiveElementsOpen, setFiveElementsOpen] = useState(false);
  const cycleBadge = locale === "zh" ? `${plan.cycleGanzhi}月` : `${plan.cycleGanzhi} Month`;

  const badges = [
    personalProfile.dayMaster[locale],
    personalProfile.destinyType[locale],
    personalProfile.tradingPersona[locale],
    cycleBadge,
  ];
  const text = dashboardText;

  useEffect(() => {
    document.title = `${plan.monthTitle.en} · Trading Plan`;
  }, [plan.monthTitle.en]);

  return (
    <>
      <header className="bg-white border-b border-gray-100 shrink-0">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Left: brand + title */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.9" />
                <rect x="9" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                <rect x="1" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.6" />
                <rect x="9" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-gray-900 leading-none tracking-tight">
                {plan.title[locale]} · <span className="text-emerald-700">{plan.cycleGanzhi}月</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5 leading-none tracking-wide">
                {plan.period} · 丙午年
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Month selector */}
          <label className="flex items-center gap-1.5 shrink-0">
            <span className="hidden md:inline text-[11px] font-medium text-gray-400">
              {locale === "zh" ? "月份" : "Month"}
            </span>
            <select
              value={selectedPlanId}
              onChange={(event) => setSelectedPlanId(event.target.value as TradingPlanId)}
              data-month-selector
              className="h-8 max-w-[140px] sm:max-w-none rounded-xl border border-emerald-100 bg-emerald-50/70 px-2.5 text-[11px] font-semibold text-emerald-700 outline-none transition-colors hover:border-emerald-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
              aria-label={locale === "zh" ? "选择交易月份" : "Select trading month"}
            >
              {plans.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.selectorLabel[locale]}
                </option>
              ))}
            </select>
          </label>

          <div
            aria-live="polite"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-[11px] font-medium text-gray-500 shrink-0"
          >
            <span>{text.selectedMonth[locale]}</span>
            <span className="font-semibold text-gray-800">{plan.selectorLabel[locale]}</span>
          </div>

          {/* Avatar */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-100 to-amber-50 border border-orange-200/70 flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-[12px] sm:text-[13px] font-semibold text-orange-600 leading-none">丁</span>
          </div>

          {/* Identity badges */}
          <div className="hidden sm:flex flex-wrap gap-1.5">
            {badges.map((label, i) => (
              <span
                key={label}
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border leading-none ${BADGE_STYLES[i]}`}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px h-4 bg-gray-200 shrink-0" />

          {/* Analysis buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setDestinyOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-colors ${
                destinyOpen
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700"
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              {locale === "zh" ? "八字分析" : "Destiny"}
              {destinyOpen && <span className="text-[10px] text-emerald-600">{text.modalActive[locale]}</span>}
            </button>
            <button
              onClick={() => setFiveElementsOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-colors ${
                fiveElementsOpen
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700"
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              {locale === "zh" ? "五行分析" : "Five Elements"}
              {fiveElementsOpen && <span className="text-[10px] text-emerald-600">{text.modalActive[locale]}</span>}
            </button>
          </div>

          {/* Language toggle */}
          <div className="flex items-center gap-0.5 text-[11px] font-medium shrink-0">
            <button
              onClick={() => setLocale("zh")}
              className={`px-2 py-1 rounded transition-colors ${
                locale === "zh"
                  ? "text-emerald-600 bg-emerald-50 font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              中文
            </button>
            <span className="text-gray-200 select-none">/</span>
            <button
              onClick={() => setLocale("en")}
              className={`px-2 py-1 rounded transition-colors ${
                locale === "en"
                  ? "text-emerald-600 bg-emerald-50 font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              EN
            </button>
          </div>

          {/* PRO badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium text-emerald-700">PRO</span>
          </div>
        </div>

        {/* Mobile: analysis buttons in scroll strip */}
        <div className="lg:hidden border-t border-gray-50 overflow-x-auto">
          <div className="flex items-center gap-2 px-4 py-2 w-max">
            {/* Compact badges for mobile */}
            <div className="flex items-center gap-1.5 sm:hidden">
              {badges.map((label, i) => (
                <span
                  key={label}
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border leading-none ${BADGE_STYLES[i]}`}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="sm:hidden w-px h-3 bg-gray-200 shrink-0" />
            <button
              onClick={() => setDestinyOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                destinyOpen
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700"
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              {locale === "zh" ? "八字分析" : "Destiny"}
            </button>
            <button
              onClick={() => setFiveElementsOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                fiveElementsOpen
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "border-gray-200 text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700"
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
              {locale === "zh" ? "五行分析" : "Five Elements"}
            </button>
          </div>
        </div>
      </header>

      <DestinyModal open={destinyOpen} onOpenChange={setDestinyOpen} />
      <FiveElementsModal open={fiveElementsOpen} onOpenChange={setFiveElementsOpen} />
    </>
  );
}
