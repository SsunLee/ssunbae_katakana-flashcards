"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientRedirect() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("lastActivePage");
    const fallback = "/study/japanese/katakana-words";
    const target = saved && saved.startsWith("/study/") ? saved : fallback;
    router.replace(target);
  }, [router]);

  return null;
}
