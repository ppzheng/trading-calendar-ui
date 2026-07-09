"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  tradingPlanOptions,
  tradingPlans,
  type TradingPlan,
  type TradingPlanId,
} from "@/data/tradingPlans";

type TradingPlanContextValue = {
  selectedPlanId: TradingPlanId;
  setSelectedPlanId: (id: TradingPlanId) => void;
  plan: TradingPlan;
  plans: readonly TradingPlan[];
};

const TradingPlanContext = createContext<TradingPlanContextValue | null>(null);

export function TradingPlanProvider({ children }: { children: ReactNode }) {
  const [selectedPlanId, setSelectedPlanId] = useState<TradingPlanId>("may-2026");

  const value = useMemo<TradingPlanContextValue>(() => ({
    selectedPlanId,
    setSelectedPlanId,
    plan: tradingPlans[selectedPlanId],
    plans: tradingPlanOptions,
  }), [selectedPlanId]);

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

