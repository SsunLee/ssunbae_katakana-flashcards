// app/components/AdGuard.tsx
'use client';
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { initAdmob } from '@/app/lib/admob';
import { ensureShown } from '@/app/lib/admob-banner';

export default function AdGuard() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    (async () => {
      const ok = await initAdmob();
      if (ok) {
        // 라우트 전환 직후 레이아웃 안정 대기(체감상 300~500ms가 무난)
        await new Promise(r => setTimeout(r, 400));
        await ensureShown();
      }
    })();
  }, []);

  return null;
}
