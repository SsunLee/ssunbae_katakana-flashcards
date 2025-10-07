// ssunbae_katakana-flashcards/app/components/Footer.tsx
"use client"; // useState와 useEffect를 사용하기 위해 이 라인을 추가합니다.

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  // 이 컴포넌트가 브라우저에 완전히 로드된 후에 실행됩니다.
  useEffect(() => {
    // 현재 연도를 다시 설정하여 Hydration이 완료된 후의 값으로 업데이트합니다.
    // 대부분의 경우 값이 같겠지만, 연도가 바뀌는 시점의 엣지 케이스를 방지합니다.
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t py-6 text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        {/* ✅ 수정된 부분: 상태(state)에 저장된 연도를 사용합니다. */}
        <p className="text-muted-foreground">© {year} SSUN EDU</p>
        <nav className="flex gap-4">
          <Link href="/support" className="hover:underline">Support</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}

