// ssunbae_katakana-flashcards/app/components/Footer.tsx
"use client"; // useState와 useEffect를 사용하기 위해 이 라인을 추가합니다.

import Link from "next/link";
import { useState, useEffect } from "react";

const COUNTER_NAMESPACE = "ssunbae-edu";
const VISITOR_SEEN_KEY = "ssunbae-visitor-seen-v1";

function normalizeEnv(value: string | undefined) {
  if (!value) return "";
  const trimmed = value.trim();
  const hasDoubleQuotes = trimmed.startsWith('"') && trimmed.endsWith('"');
  const hasSingleQuotes = trimmed.startsWith("'") && trimmed.endsWith("'");
  if (hasDoubleQuotes || hasSingleQuotes) return trimmed.slice(1, -1);
  return trimmed;
}

function buildCounterKey() {
  if (typeof window === "undefined") return "visitors";
  const host = (window.location.hostname || "local").toLowerCase();
  const safeHost = host.replace(/[^a-z0-9.-]/g, "");
  return `visitors-${safeHost}`;
}

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  // 이 컴포넌트가 브라우저에 완전히 로드된 후에 실행됩니다.
  useEffect(() => {
    // 현재 연도를 다시 설정하여 Hydration이 완료된 후의 값으로 업데이트합니다.
    // 대부분의 경우 값이 같겠지만, 연도가 바뀌는 시점의 엣지 케이스를 방지합니다.
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    let cancelled = false;

    const configuredBase = normalizeEnv(process.env.NEXT_PUBLIC_VISITOR_COUNTER_BASE_URL);
    const counterBase = configuredBase || "https://api.countapi.xyz";
    const key = buildCounterKey();
    const hitUrl = `${counterBase}/hit/${COUNTER_NAMESPACE}/${encodeURIComponent(key)}`;
    const getUrl = `${counterBase}/get/${COUNTER_NAMESPACE}/${encodeURIComponent(key)}`;

    const readCountValue = (data: unknown) => {
      if (!data || typeof data !== "object") return null;
      const value = (data as { value?: unknown; count?: unknown }).value ?? (data as { count?: unknown }).count;
      return typeof value === "number" ? value : null;
    };

    const loadVisitorCount = async () => {
      try {
        const seen = localStorage.getItem(VISITOR_SEEN_KEY) === "1";
        const url = seen ? getUrl : hitUrl;
        const res = await fetch(url, { method: "GET", cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const count = readCountValue(data);
        if (!cancelled && typeof count === "number") {
          setVisitorCount(count);
        }
        if (!seen) {
          localStorage.setItem(VISITOR_SEEN_KEY, "1");
        }
      } catch {
        // 방문자 수 조회 실패는 UI를 막지 않음
      }
    };

    void loadVisitorCount();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="border-t py-6 text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-muted-foreground">© {year} SSUN EDU</p>
          {visitorCount !== null && (
            <p className="text-xs text-muted-foreground/80">Visitors {visitorCount.toLocaleString()}</p>
          )}
        </div>
        <nav className="flex gap-4">
          <Link href="/support" className="hover:underline">Support</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}

