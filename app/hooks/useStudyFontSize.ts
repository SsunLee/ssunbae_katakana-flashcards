"use client";
import { useEffect, useState } from "react";

export type StudyFontSize = "sm" | "md" | "lg"; // 필요하면 "xl"도 추가 가능
const KEY = "study.fontSize";

export function useStudyFontSize(defaultSize: StudyFontSize = "md") {
  const [studyFontSize, setStudyFontSize] = useState<StudyFontSize>(() => {
    if (typeof window === "undefined") return defaultSize;
    const saved = window.localStorage.getItem(KEY) as StudyFontSize | null;
    return saved ?? defaultSize;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, studyFontSize);
    }
  }, [studyFontSize]);

  return { studyFontSize, setStudyFontSize };
}
