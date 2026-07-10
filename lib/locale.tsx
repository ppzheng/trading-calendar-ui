"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { I18nText, Locale } from "./types";

type LocaleCtx = { locale: Locale; setLocale: (l: Locale) => void };

const LocaleContext = createContext<LocaleCtx>({ locale: "zh", setLocale: () => {} });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh");
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleCtx {
  return useContext(LocaleContext);
}

export const currentFocusText = {
  sectionEyebrow: {
    zh: "今日交易聚焦",
    en: "Current Trading Focus",
  },
  cycleLabel: {
    zh: "当前周期",
    en: "Current Cycle",
  },
  currentDay: {
    zh: "今日",
    en: "Today",
  },
  loadingDate: {
    zh: "正在读取本地日期",
    en: "Reading local date",
  },
  outsideCycle: {
    zh: "今天不在当前所选交易周期内",
    en: "Today is outside the selected trading cycle",
  },
  fallbackCycle: {
    zh: "当前日期不在已注册交易周期内，已展示最近的交易周期",
    en: "Your current date is outside all registered trading cycles, so the nearest cycle is shown",
  },
  summaryLabel: {
    zh: "月度核心",
    en: "Monthly Core",
  },
  riskLabel: {
    zh: "风险提醒",
    en: "Risk Reminder",
  },
  actionToday: {
    zh: "查看今日",
    en: "View Today",
  },
  actionBestWindows: {
    zh: "最佳窗口",
    en: "Best Windows",
  },
  actionRiskDays: {
    zh: "风险日",
    en: "Risk Days",
  },
  noTodayAdvice: {
    zh: "可继续查看本周期的最佳窗口与风险日。",
    en: "Review this cycle's best windows and risk days instead.",
  },
  noRiskDates: {
    zh: "本周期暂无独立风险日列表。",
    en: "No separate risk-day list is available for this cycle.",
  },
} satisfies Record<string, I18nText>;

export const dashboardText = {
  selectedMonth: {
    zh: "当前",
    en: "Selected",
  },
  signalGuide: {
    zh: "信号说明",
    en: "Signal Guide",
  },
  scrollHint: {
    zh: "横向滑动查看完整交易日历",
    en: "Swipe horizontally to view the full trading calendar",
  },
  exportPopupBlocked: {
    zh: "浏览器拦截了导出窗口，请允许弹窗后重试。",
    en: "The browser blocked the export window. Allow popups and try again.",
  },
  exportFailed: {
    zh: "导出失败，请稍后重试。",
    en: "Export failed. Please try again.",
  },
  modalActive: {
    zh: "已打开",
    en: "Open",
  },
} satisfies Record<string, I18nText>;
