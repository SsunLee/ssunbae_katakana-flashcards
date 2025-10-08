// app/components/AdGuardMount.tsx

'use client';

import dynamic from 'next/dynamic';

// Client 컴포넌트 내부에서만 ssr:false 사용
const AdGuard = dynamic(() => import('./AdGuard'), { ssr: false });

export default function AdGuardMount() {
  return <AdGuard />;
}
