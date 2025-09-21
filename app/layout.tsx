// app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './styles/globals.css';

import { AuthProvider } from '@/app/AuthContext';
import { AuthModalProvider } from '@/app/context/AuthModalContext';
import Providers from './providers';
import Script from 'next/script';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: '쑨쑨배 일본어, 영어, 스페인어 공부',
  description:
    '다양한 언어 공부를 할 수 있고 AI기능 등 여러 기능이 있는 영어 공부, 스페인어 공부 일본어 공부 사이트 입니다',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansJP.variable} suppressHydrationWarning>
      <head>
        <Script
          id="firebase-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.__firebase_config = ${JSON.stringify({
              apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
              authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
              projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
              storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
              messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
              appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
            })};`,
          }}
        />
      </head>
      <body>
        <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white">
          <AuthProvider>
            <AuthModalProvider>
              <Providers>
                {/* --- ▼▼▼ 안전 영역 패딩을 여기에 최종적으로 적용합니다 ▼▼▼ --- */}
                <div className="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] h-full">
                  {children}
                </div>
              </Providers>
            </AuthModalProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}

