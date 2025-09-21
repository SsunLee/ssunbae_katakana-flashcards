// app/providers.tsx
'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { authenticate } from '@/app/lib/firebase';

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1) Firebase 인증 초기화 (웹/네이티브 공통)
    authenticate().catch(() => {});

    // 2) 네이티브 환경 판별 (Capacitor v7에선 isNativePlatform 제공)
    const isNative =
      typeof Capacitor.isNativePlatform === 'function'
        ? // @ts-ignore
          Capacitor.isNativePlatform()
        : Capacitor.getPlatform() !== 'web';

    if (!isNative) return;

    // 3) 네이티브에서만 안전영역 스코프 클래스 + 상태바 오버레이
    document.documentElement.classList.add('native');

    StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});
    StatusBar.setStyle({ style: Style.Light }).catch(() => {});

    // (선택) 상단 상태바 배경 색 일치 (다크 테마에서 깜빡임 방지)
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const prev = meta?.content;
    if (meta) meta.content = '#020617'; // slate-950

    return () => {
      document.documentElement.classList.remove('native');
      if (meta && prev) meta.content = prev;
    };
  }, []);

  return <>{children}</>;
}
