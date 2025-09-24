// app/study/layout.tsx
"use client";

import { useState } from "react";
import SideMenu from "@/app/components/SideMenu";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import LoginPage from "@/app/LoginPage";
import RegisterPage from "@/app/RegisterPage";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// --- ▼▼▼ AuthModalProvider를 여기서 import하지 않습니다 ▼▼▼ ---
// AuthModalProvider는 app/layout.tsx에서 이미 앱 전체를 감싸고 있습니다.
import { useAuthModal } from "@/app/context/AuthModalContext";

// --- ▼▼▼ AuthModalProvider로 감싸던 부분을 제거합니다 ▼▼▼ ---
export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudyShell>{children}</StudyShell>
  );
}

function StudyShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 이제 useAuthModal은 상위 레이아웃(app/layout.tsx)의 Provider를 정상적으로 참조합니다.
  const { isOpen, close, page, setPage } = useAuthModal();

  return (
    <div className="flex flex-col h-full w-full">
      {/* 헤더 */}
      <header className="w-full h-16 flex-shrink-0 border-b border-white/10 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between px-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-2"
            aria-label="메뉴 열기"
          >
            <Menu />
          </button>

          <Link
            href="/study"
            aria-label="ssunbae-edu 홈"
            className="flex items-center gap-2 select-none"
          >
            <Image src="/logo.svg" alt="ssunbae-edu" width={28} height={28} priority />
            <span className="text-lg font-semibold">ssunbae-edu</span>
          </Link>

          <div className="w-8" />
        </div>
      </header>

      {/* 사이드 메뉴 */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* 로그인/회원가입 모달 */}
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close(); }}>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogContent className="bg-slate-800/60 border-white/10 text-white rounded-2xl shadow-xl p-0 w-full max-w-sm">
          <DialogHeader className="sr-only">
            <DialogTitle>{page === "login" ? "로그인" : "회원가입"}</DialogTitle>
            <DialogDescription className="sr-only">
              {page === 'login' ? '이메일과 비밀번호로 로그인하세요.' : '새로운 계정을 만드세요.'}
            </DialogDescription>
          </DialogHeader>

          {page === "login" ? (
            <LoginPage
              onSwitchToRegister={() => setPage("register")}
              onSuccess={close}
            />
          ) : (
            <RegisterPage
              onSwitchToLogin={() => setPage("login")}
              onSuccess={close}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 페이지 콘텐츠 */}
      <main className="flex-grow overflow-y-auto">{children}</main>
    </div>
  );
}

