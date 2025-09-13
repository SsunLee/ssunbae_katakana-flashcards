// app/layout.tsx
import type { Metadata } from 'next';
// Google Fonts를 불러오기 위한 next/font 모듈
import { Noto_Sans_JP, Zen_Kaku_Gothic_New, Noto_Serif_JP, Kosugi_Maru } from 'next/font/google';
import './styles/globals.css'; 
import { AuthProvider } from '@/app/AuthContext'; 

// 1. 폰트 설정 (가장 성능에 좋은 방식)
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp', // CSS 변수로 사용하기
});
// 다른 폰트들도 유사하게 설정할 수 있습니다.
// 여기서는 메인 폰트인 Noto Sans JP만 적용하는 예시입니다.
// 2. Metadata API를 사용한 <head> 태그 설정
export const metadata: Metadata = {
  title: '쑨쑨배 일본어 공부',
  description: 'AI를 이용한 일본어 단어 생성과 다양한 언어 학습 모드를 제공하는 인터랙티브 일본어 공부 사이트 입니다',
  
  // 검색엔진 인증 태그
    verification: {
    google: 'zmLko13b_r9i2TX5XqCk2aKkVtQzk9u2zbpabgwIRQY',
    // naver는 other 속성을 통해 따로 설정합니다.
    other: {
        'naver-site-verification': 'f11968c993745f3d11a619140df18e232fefc168',
    },
    },

  // 기타 메타 태그
  manifest: '/manifest.json', // manifest.json은 public 폴더에 있어야 합니다.
  
  // 파비콘 및 아이콘 설정
  icons: {
    icon: '/favicon.ico', // public 폴더에 있는 파일 경로
    apple: '/logo192.png', // public 폴더에 있는 파일 경로
  },
};
// 3. RootLayout 컴포넌트
    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html 
            lang="ko" 
            className={notoSansJP.variable}
            suppressHydrationWarning>    
          <body>
            {/* AuthProvider로 children을 감싸줍니다. */}
            <AuthProvider>
              {children}
            </AuthProvider>
          </body>
        </html>
      );
    }