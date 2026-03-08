"use client";

import { useEffect, useMemo, useState } from "react";

import { FONT_STACKS } from "@/app/constants/fonts";

type QuizTypographyOptions = {
  storageKeyPrefix: string;
  defaultFontFamily: string;
  defaultSentenceFontSize: number;
};

function getStoredFontSize(key: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const raw = Number(localStorage.getItem(key));
  if (!Number.isFinite(raw)) return fallback;
  if (raw < 18 || raw > 40) return fallback;
  return raw;
}

export function useQuizTypographySettings({
  storageKeyPrefix,
  defaultFontFamily,
  defaultSentenceFontSize,
}: QuizTypographyOptions) {
  const fontKey = `${storageKeyPrefix}.fontFamily`;
  const sizeKey = `${storageKeyPrefix}.fontSize`;

  const [fontFamily, setFontFamily] = useState<string>(() => {
    if (typeof window === "undefined") return defaultFontFamily;
    return localStorage.getItem(fontKey) || defaultFontFamily;
  });
  const [sentenceFontSize, setSentenceFontSize] = useState<number>(() => getStoredFontSize(sizeKey, defaultSentenceFontSize));

  useEffect(() => {
    localStorage.setItem(fontKey, fontFamily);
  }, [fontFamily, fontKey]);

  useEffect(() => {
    localStorage.setItem(sizeKey, String(sentenceFontSize));
  }, [sentenceFontSize, sizeKey]);

  const fallbackStack = FONT_STACKS[defaultFontFamily] || defaultFontFamily;
  const fontStack = useMemo(() => FONT_STACKS[fontFamily] || fallbackStack, [fontFamily, fallbackStack]);

  return {
    fontFamily,
    setFontFamily,
    sentenceFontSize,
    setSentenceFontSize,
    fontStack,
  };
}
