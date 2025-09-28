// app/components/ClientProviders.tsx
"use client";

import { useState, useEffect, ReactNode } from 'react';
import { AuthProvider } from '@/app/AuthContext';
import { AuthModalProvider } from '@/app/context/AuthModalContext';
import Providers from '../providers';

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      // 로딩 상태 UI: 전체 배경을 채우도록 수정
      <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        {/* 필요 시 로딩 스피너 등을 추가할 수 있습니다. */}
      </div>
    );
  }

  return (
    // ✅ layout.tsx에 있던 UI 래퍼 div를 이곳으로 가져옵니다.
    <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white pt-[var(--safe-area-inset-top)] pb-[var(--safe-area-inset-bottom)] pl-[var(--safe-area-inset-left)] pr-[var(--safe-area-inset-right)]">
      <AuthProvider>
        <AuthModalProvider>
          <Providers>
            {children}
          </Providers>
        </AuthModalProvider>
      </AuthProvider>
    </div>
  );
}

