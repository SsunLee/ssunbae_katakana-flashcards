"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Locale = "ko" | "en" | "ja" | "es";

const DEFAULT_LOCALE: Locale = "ko";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
} | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("ssunbae-locale") : null;
    if (saved && ["ko","en","ja","es"].includes(saved)) setLocale(saved as Locale);
  }, []);

  const changeLocale = (l: Locale) => {
    setLocale(l);
    if (typeof window !== "undefined") localStorage.setItem("ssunbae-locale", l);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
