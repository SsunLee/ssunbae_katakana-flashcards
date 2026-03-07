// app/study/layout.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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
import KakaoAdFit from "@/app/components/KakaoAdFit";
import {
  LEFT_SIDE_AD_MIN_WIDTH,
  RIGHT_SIDE_AD_MIN_WIDTH,
  SINGLE_LEFT_SIDE_AD_MIN_WIDTH,
  normalizeAdUnit,
  resolveAdUnit,
} from "@/app/lib/kakao-adfit";


export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudyShell>{children}</StudyShell>
  );
}

function StudyShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [brandLogoSrc, setBrandLogoSrc] = useState("/ssunedu_logo.png");
  const { isOpen, close, page, setPage } = useAuthModal();
  const pathname = usePathname();
  const debounce = useRef<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const [leftAdFillState, setLeftAdFillState] = useState<"unknown" | "filled" | "empty">("unknown");
  const defaultPcEdgeAdUnit = normalizeAdUnit("DAN-of4TF8Q7PFDbKn5Z");
  const leftAdUnit = resolveAdUnit(
    [
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_PC_SIDE_LEFT_UNIT,
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_PC_SIDE_UNIT,
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_SIDE_LEFT_UNIT,
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT,
    ],
    defaultPcEdgeAdUnit
  );
  const rightAdUnit = resolveAdUnit(
    [
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_PC_SIDE_RIGHT_UNIT,
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_PC_SIDE_UNIT,
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_SIDE_RIGHT_UNIT,
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT,
    ],
    defaultPcEdgeAdUnit
  );
  const defaultMobileBottomAdUnit = normalizeAdUnit("DAN-QMVosjDRN8zEUBnf");
  const mobileBottomAdUnit = resolveAdUnit(
    [process.env.NEXT_PUBLIC_KAKAO_ADFIT_MOBILE_UNIT, process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT],
    defaultMobileBottomAdUnit
  );
  const isViewportReady = viewportWidth !== null;
  const isDashboardPage = pathname === "/study/dashboard";
  const isJapaneseSentenceQuizPage = pathname === "/study/japanese/sentence-quiz";
  const pageInlineAdPaths = new Set([
    "/study/japanese/katakana-words",
    "/study/japanese/verbs",
    "/study/japanese/kanji",
    "/study/japanese/sentences",
    "/study/japanese/kana-chars",
    "/study/japanese/katakana-chars",
    "/study/japanese/hiragana-chars",
    "/study/japanese/sentence-quiz",
  ]);
  const hasPageInlineAd = pageInlineAdPaths.has(pathname ?? "");
  const isPageManagedAdPage = isJapaneseSentenceQuizPage;
  const isPcLeftAdVisible =
    !isDashboardPage &&
    !isPageManagedAdPage &&
    isViewportReady &&
    viewportWidth >= LEFT_SIDE_AD_MIN_WIDTH;
  const isPcRightAdVisible =
    !isDashboardPage &&
    !isPageManagedAdPage &&
    !isJapaneseSentenceQuizPage &&
    isViewportReady &&
    viewportWidth >= RIGHT_SIDE_AD_MIN_WIDTH;
  const isLayoutInlineAdVisible = !isDashboardPage && !hasPageInlineAd;
  const isDesktopAdRequested = isPcLeftAdVisible || isPcRightAdVisible;
  const shouldShowBottomFallbackForDesktop = isDesktopAdRequested && leftAdFillState === "empty";
  const shouldShowLayoutInlineAd =
    !isDashboardPage &&
    !hasPageInlineAd &&
    (shouldShowBottomFallbackForDesktop || (!isDesktopAdRequested && isLayoutInlineAdVisible));

  useEffect(() => {
    setLeftAdFillState("unknown");
  }, [pathname, isPcLeftAdVisible, isPcRightAdVisible, viewportWidth]);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    window.addEventListener("orientationchange", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      window.removeEventListener("orientationchange", updateWidth);
    };
  }, []);

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
            aria-label="쑨에듀 홈"
            className="flex items-center gap-2 select-none"
          >
            <Image
              src={brandLogoSrc}
              alt="쑨에듀"
              width={20}
              height={20}
              className="object-contain"
              priority
              onError={() => setBrandLogoSrc("/logo.svg")}
            />
            <span className="text-sm italic font-semibold">쑨에듀</span>
          </Link>

          <div className="w-8" />
        </div>
      </header>

      {/* 사이드 메뉴 */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        hideAds={isDashboardPage}
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

      {isPcLeftAdVisible ? (
        <aside className="fixed left-[clamp(1rem,12vw,14rem)] top-1/2 -translate-y-1/2 z-20">
          <KakaoAdFit
            adUnit={leftAdUnit}
            width={160}
            height={600}
            onFillChange={(filled) => setLeftAdFillState(filled ? "filled" : "empty")}
          />
        </aside>
      ) : null}
      {isPcRightAdVisible ? (
        <aside className="fixed right-[clamp(1rem,12vw,14rem)] top-1/2 -translate-y-1/2 z-20">
          <KakaoAdFit adUnit={rightAdUnit} width={160} height={600} />
        </aside>
      ) : null}

      {/* 페이지 콘텐츠 */}
      <main className="flex-grow overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[1720px]">
          <div className="min-w-0 flex-1">{children}</div>
        </div>
        {shouldShowLayoutInlineAd ? (
          <div className="mx-auto w-full max-w-md px-4 pb-6 pt-2 flex justify-center">
            <KakaoAdFit adUnit={mobileBottomAdUnit} width={300} height={250} />
          </div>
        ) : null}
      </main>
      <AdSafeSpacer />
      <AdGuardMount />
    </div>
  );
}
