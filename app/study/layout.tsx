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
} from "@/app/components/ui/dialog";
import LoginPage from "@/app/LoginPage";
import RegisterPage from "@/app/RegisterPage";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AuthModalProvider, useAuthModal } from "@/app/context/AuthModalContext";

// {children}은 각 학습 페이지의 page.tsx 입니다.
export default function StudyLayout({ children }: { children: React.ReactNode }) {
  // 전역 AuthModal 컨텍스트 제공
  return (
    <AuthModalProvider>
      <StudyShell>{children}</StudyShell>
    </AuthModalProvider>
  );
}

function StudyShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 모달 상태 (open은 여기서 직접 사용하지 않으므로 제외)
  const { isOpen, close, page, setPage } = useAuthModal();

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col">
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
        <DialogContent className="bg-slate-800/60 border-white/10 text-white rounded-2xl shadow-xl p-0 w-full max-w-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-[48%]">
          <DialogHeader className="sr-only">
            <DialogTitle>{page === "login" ? "로그인" : "회원가입"}</DialogTitle>
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
