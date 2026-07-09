"use client";
import { Button } from "@/app/components/ui/button";
import { useLocale } from "@/app/context/LocaleContext";
import { useState } from "react";
import { Languages } from "lucide-react";
import { localeOptions } from "@/app/i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [showLang, setShowLang] = useState(false);
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" aria-label={t("common.selectLanguage")} onClick={() => setShowLang(v => !v)}>
        <Languages className="h-4 w-4" />
      </Button>
      {showLang && (
        <div className="absolute left-0 mt-2 z-50 bg-white dark:bg-zinc-900 border border-border rounded shadow-lg min-w-[120px]">
          {localeOptions.map(l => (
            <button
              key={l.code}
              className={`w-full text-left px-4 py-2 hover:bg-muted ${locale === l.code ? "font-bold" : ""}`}
              onClick={() => { setLocale(l.code); setShowLang(false); }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
