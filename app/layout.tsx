// ssunbae_katakana-flashcards/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'

import './styles/globals.css';
import ClientProviders from '@/app/components/ClientProviders';
import Script from 'next/script';
import Footer from "@/app/components/Footer";

const SITE_URL = 'https://ssunedu.com';



const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
});
const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-serif-kr',
})



export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || SITE_URL),
  
  title: {
    default: 'SSUN EDU - 언어 학습 플랫폼',
    template: '%s | SSUN EDU',
  },
  
  description:
    'SSUN EDU는 무료 일본어 사이트/무료 공부사이트로, 일본어 공부 사이트를 찾는 학습자를 위한 플래시카드 기반 학습 플랫폼입니다. 히라가나, 가타카나, 한자, 영어, 스페인어, 한국어 학습을 지원합니다.',
  
  keywords: [
    '무료 일본어 사이트',
    '무료 공부사이트',
    '일본어 공부 사이트',
    '일본어 공부사이트',
    '일본어 학습 사이트',
    '일본어 독학',
    '언어 학습',
    '영어 공부',
    '일본어 공부',
    '스페인어 공부',
    '한국어 학습',
    '외국어 학습',
    '단어 암기',
    '플래시카드',
    '히라가나',
    '가타카나',
    '한자',
    '한자 쓰기',
    '언어 교육',
    '어휘 학습',
    '문장 연습',
    'SSUN EDU',
  ],
  
  authors: [{ name: 'SSUN EDU' }],
  creator: 'SSUN EDU',
  publisher: 'SSUN EDU',
  
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: 'SSUN EDU',
    title: 'SSUN EDU - 효과적인 언어 학습 플랫폼',
    description: '영어, 일본어, 스페인어, 한국어를 플래시카드로 쉽고 재미있게 학습하세요.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SSUN EDU 언어 학습 플랫폼',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'SSUN EDU - 언어 학습 플랫폼',
    description: '영어, 일본어, 스페인어, 한국어를 효과적으로 학습하세요.',
    images: ['/og-image.png'],
    creator: '@ssunedu',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  category: 'education',
  alternates: {
    canonical: SITE_URL,
  },
  
  applicationName: 'SSUN EDU',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SSUN EDU',
  },
  formatDetection: {
    telephone: false,
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SSUN EDU',
    url: SITE_URL,
    inLanguage: 'ko-KR',
    description:
      '무료 일본어 사이트 및 언어 학습 플랫폼. 히라가나, 가타카나, 한자, 영어, 스페인어, 한국어 플래시카드 학습을 제공합니다.',
  };

  return (
    <html 
      lang="ko" 
      className={`${notoSansJP.variable} ${notoSansKr.variable} ${notoSerifKr.variable}`}
      suppressHydrationWarning // ✅ 수정된 부분: 테마 변경으로 인한 Hydration 경고를 무시합니다.
    >
      <head />
      <body>
        <Script
          id="adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3025305005440839"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          id="website-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ClientProviders>
          <main>{children}</main>
        </ClientProviders>
        <Footer />

      </body>
    </html>
  );
}

