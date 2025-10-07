// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'

import './styles/globals.css';
import ClientProviders from '@/app/components/ClientProviders';
import Script from 'next/script';
import Footer from "@/app/components/Footer";


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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ssunbae-edu.com'),
  
  title: {
    default: 'SSUN EDU - 언어 학습 플랫폼',
    template: '%s | SSUN EDU',
  },
  
  description: 'SSUN EDU에서 영어, 일본어, 스페인어, 한국어를 효과적으로 학습하세요. 플래시카드와 반복 학습으로 단어와 문장을 빠르게 마스터하세요.',
  
  keywords: [
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
  
  // Open Graph (소셜 미디어 공유)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://ssunbae-edu.com',
    siteName: 'SSUN EDU',
    title: 'SSUN EDU - 효과적인 언어 학습 플랫폼',
    description: '영어, 일본어, 스페인어, 한국어를 플래시카드로 쉽고 재미있게 학습하세요.',
    images: [
      {
        url: '/og-image.png', // public/og-image.png 파일 추가 필요 (1200x630 권장)
        width: 1200,
        height: 630,
        alt: 'SSUN EDU 언어 학습 플랫폼',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'SSUN EDU - 언어 학습 플랫폼',
    description: '영어, 일본어, 스페인어, 한국어를 효과적으로 학습하세요.',
    images: ['/og-image.png'],
    creator: '@ssunedu', // 트위터 계정이 있다면
  },
  
  // 검색 엔진 최적화
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
  
  // 추가 메타 태그
  category: 'education',
  alternates: {
    canonical: 'https://ssunedu.com',
  },
  
  // 앱 정보 (모바일)
  applicationName: 'SSUN EDU',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SSUN EDU',
  },
  formatDetection: {
    telephone: false,
  },
  
  // 언어 대체 (나중에 다국어 지원 시)
  // alternates: {
  //   languages: {
  //     'ko-KR': 'https://ssunedu.com/ko',
  //     'en-US': 'https://ssunedu.com/en',
  //     'ja-JP': 'https://ssunedu.com/ja',
  //     'es-ES': 'https://ssunedu.com/es',
  //   },
  // },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansJP.variable} suppressHydrationWarning>
      <head>

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
        <Footer />
      </body>
    </html>
  );
}
