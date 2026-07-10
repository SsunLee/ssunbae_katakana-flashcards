"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import {
  type Locale,
  type TranslationKey,
  supportedLocales,
  translations,
} from "@/app/i18n/translations";

export type { Locale } from "@/app/i18n/translations";

const DEFAULT_LOCALE: Locale = "ko";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
} | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = localStorage.getItem("ssunbae-locale");
    if (saved && supportedLocales.includes(saved as Locale)) setLocale(saved as Locale);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLocale = (l: Locale) => {
    setLocale(l);
    localStorage.setItem("ssunbae-locale", l);
  };

  const t = useCallback((key: TranslationKey, values?: Record<string, string | number>) => {
    const message = translations[locale][key];
    if (!values) return message;

    return Object.entries(values).reduce(
      (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
      message
    );
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale: changeLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
