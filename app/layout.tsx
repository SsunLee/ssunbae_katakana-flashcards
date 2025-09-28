// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './styles/globals.css';
import ClientProviders from '@/app/components/ClientProviders';
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
        {/* ⛔️ 삭제: Firebase 설정 인라인 스크립트 */}
        {/* ✅ AdSense는 next/script + afterInteractive 로드 권장 */}
      </head>
      <body>
        {/* AdSense: body에서 afterInteractive로 로드 */}
        <Script
          id="adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3025305005440839"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
