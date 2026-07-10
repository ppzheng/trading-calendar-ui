"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  tradingPlanOptions,
  tradingPlans,
  type TradingPlan,
  type TradingPlanId,
} from "@/data/tradingPlans";

type PlanMatch = {
  id: TradingPlanId;
  containsDate: boolean;
};

type TradingPlanContextValue = {
  selectedPlanId: TradingPlanId;
  setSelectedPlanId: (id: TradingPlanId) => void;
  plan: TradingPlan;
  plans: readonly TradingPlan[];
  todayDateString: string | null;
  localDateReady: boolean;
  selectedPlanContainsToday: boolean;
  selectedPlanUsedFallback: boolean;
  todayTradingDay: TradingPlan["calendar"][number] | null;
};

const TradingPlanContext = createContext<TradingPlanContextValue | null>(null);

function toDateString(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dateValue(dateString: string): number {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).getTime();
}

function getPlanRange(plan: TradingPlan) {
  return {
    start: plan.calendar[0].date,
    end: plan.calendar[plan.calendar.length - 1].date,
  };
}

function planDistanceFromDate(plan: TradingPlan, dateString: string): number {
  const target = dateValue(dateString);
  const { start, end } = getPlanRange(plan);
  const startValue = dateValue(start);
  const endValue = dateValue(end);

  if (target >= startValue && target <= endValue) return 0;
  return Math.min(Math.abs(target - startValue), Math.abs(target - endValue));
}

function findPlanForDate(dateString: string): PlanMatch {
  let nearest = tradingPlanOptions[0];
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const plan of tradingPlanOptions) {
    const distance = planDistanceFromDate(plan, dateString);
    if (distance === 0) {
      return { id: plan.id as TradingPlanId, containsDate: true };
    }
    if (distance < nearestDistance) {
      nearest = plan;
      nearestDistance = distance;
    }
  }

  return { id: nearest.id as TradingPlanId, containsDate: false };
}

export function TradingPlanProvider({ children }: { children: ReactNode }) {
  const [todayDateString, setTodayDateString] = useState<string | null>(null);
  const [initialPlanMatch, setInitialPlanMatch] = useState<PlanMatch | null>(null);
  const [selectedPlanId, setSelectedPlanIdState] = useState<TradingPlanId>("may-2026");
  const hasUserSelectedPlan = useRef(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const localDateString = toDateString(new Date());
      const planMatch = findPlanForDate(localDateString);
      setTodayDateString(localDateString);
      setInitialPlanMatch(planMatch);
      setSelectedPlanIdState((current) => (hasUserSelectedPlan.current ? current : planMatch.id));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const setSelectedPlanId = useCallback((id: TradingPlanId) => {
    hasUserSelectedPlan.current = true;
    setSelectedPlanIdState(id);
  }, []);

  const selectedPlan = tradingPlans[selectedPlanId];
  const selectedPlanContainsToday = todayDateString
    ? selectedPlan.calendar.some((day) => day.date === todayDateString)
    : false;

  const value = useMemo<TradingPlanContextValue>(() => ({
    selectedPlanId,
    setSelectedPlanId,
    plan: selectedPlan,
    plans: tradingPlanOptions,
    todayDateString,
    localDateReady: todayDateString !== null,
    selectedPlanContainsToday,
    selectedPlanUsedFallback: Boolean(
      todayDateString &&
      initialPlanMatch &&
      selectedPlanId === initialPlanMatch.id &&
      !initialPlanMatch.containsDate
    ),
    todayTradingDay: todayDateString
      ? selectedPlan.calendar.find((day) => day.date === todayDateString) ?? null
      : null,
  }), [initialPlanMatch, selectedPlan, selectedPlanContainsToday, selectedPlanId, setSelectedPlanId, todayDateString]);

  return (
    <TradingPlanContext.Provider value={value}>
      {children}
    </TradingPlanContext.Provider>
  );
}

export function useTradingPlan() {
  const context = useContext(TradingPlanContext);
  if (!context) {
    throw new Error("useTradingPlan must be used inside TradingPlanProvider");
  }
  return context;
}
