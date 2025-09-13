// app/study/japanese/page.tsx
// 직접 들어오면 마지막 방문 서브페이지(로컬스토리지)로 보내고, 없으면 기본 페이지로 보냅니다.
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JapaneseIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("lastActivePage");
    if (saved && saved.startsWith("/study/japanese/")) {
      router.replace(saved);
    } else {
      router.replace("/study/japanese/katakana-words");
    }
  }, [router]);

  return null;
}
