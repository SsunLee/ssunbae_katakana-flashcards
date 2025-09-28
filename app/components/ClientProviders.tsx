// app/components/ClientProviders.tsx
"use client";

import { useState, useEffect, ReactNode } from 'react';
// Assuming these paths are correct based on your project structure
import { AuthProvider } from '@/app/AuthContext';
import { AuthModalProvider } from '@/app/context/AuthModalContext';
import Providers from '../providers'; // Assuming this is a valid component
import { Toaster } from 'sonner';
import { ThemeProvider, useTheme } from '@/app/context/ThemeContext';

/**
 * Toaster 컴포넌트는 ThemeProvider 컨텍스트 내에서 훅을 사용해야 하므로,
 * 별도의 컴포넌트로 분리합니다.
 */
function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      // 전역 테마 상태에 따라 Toaster의 테마를 동적으로 변경합니다.
      theme={theme === 'dark' ? 'dark' : 'light'}
      position="top-center"
      richColors
      closeButton
      duration={2600}
      toastOptions={{
        classNames: {
          // hardcoded 색상 대신 CSS 변수를 사용하는 Tailwind 유틸리티로 변경하여 테마에 반응하도록 합니다.
          toast: "backdrop-blur-md bg-card border border-border rounded-2xl shadow-xl text-foreground",
          title: "text-[15px] font-semibold",
          description: "text-muted-foreground text-sm",
          // 아래 클래스들은 투명도를 사용하므로 대부분의 경우 그대로 작동할 수 있습니다.
          success:
            "bg-blue-500/15 border-blue-400/25 " +
            "[&_.sonner-icon]:text-blue-400 [&_.sonner-icon]:opacity-90",
          error: "bg-red-500/15 border-red-400/25 [&_.sonner-icon]:text-red-400",
          warning: "bg-amber-500/15 border-amber-400/25 [&_.sonner-icon]:text-amber-400",
        },
      }}
    />
  );
}

/**
 * 실제 앱 콘텐츠와 프로바이더들을 감싸는 컴포넌트입니다.
 * ThemeProvider 내부에 위치해야 useTheme 훅을 사용할 수 있습니다.
 */
function AppContainer({ children }: { children: ReactNode }) {
  // 이 div에 bg-background를 추가하여 globals.css에 정의된 테마 배경색이 전체 컨텐츠에 적용되도록 합니다.
  return (
    <div className="bg-background min-h-screen w-full">
      <AuthProvider>
        <AuthModalProvider>
          <Providers>
            {children}
          </Providers>
        </AuthModalProvider>
      </AuthProvider>
      <ThemedToaster />
    </div>
  );
}

/**
 * 모든 클라이언트 사이드 프로바이더를 설정하는 메인 컴포넌트입니다.
 */
export default function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 클라이언트에서 마운트되기 전 (테마를 알 수 없기 전)에는 기본 로딩 화면을 보여줍니다.
  if (!mounted) {
    return (
      <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center" />
    );
  }

  // ThemeProvider가 최상위를 감싸고, 그 안에서 실제 앱 컨텐츠를 렌더링합니다.
  return (
    <ThemeProvider>
      <AppContainer>{children}</AppContainer>
    </ThemeProvider>
  );
}
