// ssunbae_katakana-flashcards/app/components/ClientProviders.tsx
"use client";

import { ReactNode } from 'react';

// 가정된 경로들이 올바르다고 전제합니다.
import { AuthProvider } from '@/app/AuthContext';
import { AuthModalProvider } from '@/app/context/AuthModalContext';
import Providers from '../providers'; // 유효한 컴포넌트라고 가정합니다.
import { Toaster } from 'sonner';
import { ThemeProvider, useTheme } from '@/app/context/ThemeContext';
import { LocaleProvider } from '@/app/context/LocaleContext';

/**
 * Toaster 컴포넌트는 ThemeProvider 컨텍스트 내에서 훅을 사용해야 하므로,
 * 별도의 컴포넌트로 분리합니다.
 */
function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme === 'dark' ? 'dark' : 'light'}
      position="bottom-center"
      richColors
      closeButton
      duration={2600}
      toastOptions={{
        classNames: {
          toast: "backdrop-blur-md bg-card border border-border rounded-2xl shadow-xl text-foreground",
          title: "text-[15px] font-semibold",
          description: "text-muted-foreground text-sm",
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
 */
function AppContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen w-full pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
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
  // ✅ 수정된 부분: Hydration 오류를 유발하는 !mounted 체크를 제거했습니다.
  // 이제 서버와 클라이언트가 처음부터 동일한 UI를 렌더링하여 충돌을 방지합니다.
  // 테마 초기화는 ThemeProvider 내부에서 처리됩니다.
  return (
    <LocaleProvider>
      <ThemeProvider>
        <AppContainer>{children}</AppContainer>
      </ThemeProvider>
    </LocaleProvider>
  );
}
