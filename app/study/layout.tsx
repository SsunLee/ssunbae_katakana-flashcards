// app/study/layout.tsx
"use client";

import { useEffect, useRef, useState } from "react";
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
import { useAuthModal } from "@/app/context/AuthModalContext";
import AdGuardMount from './../components/AdGuardMount';
import AdSafeSpacer from "../components/AdSafeSpacer";  
import { ensureShown, ensureHidden, refreshIfNeeded } from "@/app/lib/admob-banner";


export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudyShell>{children}</StudyShell>
  );
}

function StudyShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, close, page, setPage } = useAuthModal();
  const debounce = useRef<number | null>(null);

  // 레이아웃 진입 시 1회 표시(약간 딜레이)
  useEffect(() => {
    const t = setTimeout(() => { void ensureShown(); }, 300);
    // 회전 시 사이즈 갱신
    const onResize = () => void refreshIfNeeded();
    window.addEventListener('orientationchange', onResize);
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('resize', onResize);
      void ensureHidden(); // 떠날 때는 숨김(제거 아님)
    };
  }, []);

  // 메뉴/모달 열림에 따른 토글(디바운스 250ms)
  useEffect(() => {
    const overlay = isMenuOpen || isOpen;
    if (debounce.current) window.clearTimeout(debounce.current);
    debounce.current = window.setTimeout(() => {
      if (overlay) void ensureHidden();
      else void ensureShown();
    }, 250);
    return () => {
      if (debounce.current) window.clearTimeout(debounce.current);
    };
  }, [isMenuOpen, isOpen]);

  return (
    // ✅ text-foreground를 추가하여 레이아웃 내 모든 텍스트의 기본 색상을 테마에 맞게 설정합니다.
    <div className="flex flex-col h-full w-full text-foreground">
      {/* 헤더 */}
      {/* ✅ 헤더 배경과 테두리 색상을 테마 변수를 사용하도록 변경합니다. */}
      <header className="w-full h-16 flex-shrink-0 border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between px-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -ml-2"
            aria-label="메뉴 열기"
          >
            <Menu />
          </button>

          <Link
            href="/"
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
        {/* ✅ Dialog 컨텐츠의 배경, 테두리, 텍스트 색상을 테마에 맞게 변경합니다. */}
        <DialogContent className="bg-card border-border text-foreground rounded-2xl shadow-xl p-0 w-full max-w-sm">
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
      <AdSafeSpacer />
      <AdGuardMount />
    </div>
  );
}
