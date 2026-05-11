"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Locale } from "./types";

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
