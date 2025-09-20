"use client";
import { useAuthReady } from "@/app/hooks/useAuthReady";
import { Button } from "@/app/components/ui/button";
// 필요시: useAuthUser 훅 등으로 user 가져오기

export default function Header() {
  const authReady = useAuthReady();

  // ✅ Auth 준비되기 전에는 렌더하지 않음 → SSR/CSR 초기 구조 동일
  if (!authReady) return null;

  return (
    <header className="flex items-center justify-between">
      <div>Logo</div>
      <nav className="flex gap-2">
        {/* 로그인/비로그인 분기, TTS 버튼 등 Auth 의존 UI */}
        <Button variant="outline" size="sm">⚙️ 설정</Button>
      </nav>
    </header>
  );
}
