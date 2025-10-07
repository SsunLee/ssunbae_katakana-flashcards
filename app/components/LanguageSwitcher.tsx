"use client";
import { Button } from "@/app/components/ui/button";
import { useLocale } from "@/app/context/LocaleContext";
import { useState } from "react";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [showLang, setShowLang] = useState(false);
  const LANGS = [
    { code: "en", label: "English" },
    { code: "ja", label: "日本語" },
    { code: "es", label: "Español" },
    { code: "ko", label: "한국어" },
  ];
  return (
    <div className="relative">
      <Button variant="ghost" size="icon" aria-label="Change language" onClick={() => setShowLang(v => !v)}>
        🌐
      </Button>
      {showLang && (
        <div className="absolute left-0 mt-2 z-50 bg-white dark:bg-zinc-900 border border-border rounded shadow-lg min-w-[120px]">
          {LANGS.map(l => (
            <button
              key={l.code}
              className={`w-full text-left px-4 py-2 hover:bg-muted ${locale === l.code ? "font-bold" : ""}`}
              onClick={() => { setLocale(l.code as any); setShowLang(false); }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
