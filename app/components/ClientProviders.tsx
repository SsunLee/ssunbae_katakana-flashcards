// app/components/ClientProviders.tsx
"use client";

import { useState, useEffect, ReactNode } from 'react';
import { AuthProvider } from '@/app/AuthContext';
import { AuthModalProvider } from '@/app/context/AuthModalContext';
import Providers from '../providers';
import {Toaster} from 'sonner';


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
    <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white pt-[var(--safe-area-inset-top)] pb-[var(--safe-area-inset-bottom)] pl-[var(--safe-area-inset-left)] pr-[var(--safe-area-inset-right)]">
      <AuthProvider>
        <AuthModalProvider>
          <Providers>
            {children}
          </Providers>
        </AuthModalProvider>
      </AuthProvider>

      <Toaster
        theme="dark"
        position="top-center"
        richColors
        closeButton
        duration={2600}
        toastOptions={{
          classNames: {
            toast:
              "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl text-white",
            title: "text-[15px] font-semibold",
            description: "text-white/70 text-sm",
            success:
              "bg-blue-500/15 border-blue-400/25 " +
              "[&_.sonner-icon]:text-blue-400 [&_.sonner-icon]:opacity-90",
            error:   "bg-red-500/15 border-red-400/25 [&_.sonner-icon]:text-red-400",
            warning: "bg-amber-500/15 border-amber-400/25 [&_.sonner-icon]:text-amber-400",
          },
        }}
      />


    </div>
  );
}

