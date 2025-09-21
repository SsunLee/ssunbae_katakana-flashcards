// app/components/SideMenu.tsx

"use client";

import React, { useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { LogOut, UserCircle2, BookOpen } from "lucide-react";
import Image from "next/image";
import { useAuthModal } from "@/app/context/AuthModalContext";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// 메뉴 항목 구성
type MenuItem = {
  href: string;
  label: string;
  icon?: string;
  disabled?: boolean;
};

type MenuGroup = {
  language: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  items: MenuItem[];
};

const menuConfig: MenuGroup[] = [
  {
    language: "일본어 공부",
    value: "japanese",
    icon: "🇯🇵",
    items: [
      { href: "/study/japanese/katakana-words", label: "가타카나 단어 공부", icon: "/icons/jp_word.png" },
      { href: "/study/japanese/katakana-chars", label: "가타카나 글자 공부", icon: "/icons/jp_katakana.png" },
      { href: "/study/japanese/hiragana-chars", label: "히라가나 글자 공부", icon: "/icons/jp_hiragana.png" },
      { href: "/study/japanese/sentences", label: "일본어 문장 공부", icon: "🌸" },
      { href: "/study/japanese/kanji", label: "한자 공부", icon: "🎴", disabled: false },
    ],
  },
  {
    language: "영어 공부",
    value: "english",
    icon: "🇺🇸",
    disabled: false,
    items: [{ href: "/study/english/words", label: "단어 공부", icon: "📖", disabled: false }],
  },
  {
    language: "스페인어 공부",
    value: "spanish",
    icon: "🇪🇸",
    disabled: false,
    items: [
      { href: "/study/spanish/words", label: "스페인어 단어 공부", icon: "/icons/es_word.png", disabled: false },
      { href: "/study/spanish/sentences", label: "스페인어 문장 공부", icon: "/icons/es_sentences.png", disabled: false }
    ],
  },
];

const MenuIcon = ({ icon, size = 16 }: { icon?: string; size?: number }) => {
  if (!icon) return null;
  const isImage = icon.startsWith("/");
  return isImage ? (
    <Image
      src={icon}
      alt=""
      width={size}
      height={size}
      className="mr-2 inline-block align-[-2px] object-contain opacity-90"
    />
  ) : (
    <span className="mr-2 inline-block align-[-2px] font-emoji text-[16px]">{icon}</span>
  );
};

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useAuthModal();

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  const openAuthFromSheet = (p: "login" | "register" = "login") => {
    onClose();
    setTimeout(() => open(p), 0);
  };

  const defaultAccordionValue = useMemo(() => {
    return menuConfig.find((lang) =>
      lang.items.some((item) => pathname.startsWith(item.href.substring(0, item.href.lastIndexOf("/"))))
    )?.value ?? undefined;
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        side="left"
        className="w-[300px] bg-slate-950 border-r border-slate-800 text-slate-200 p-0 flex flex-col [&>button]:hidden"
      >
        {/* 안전 영역을 고려한 상단 패딩과 헤더 */}
        <div 
          className="pt-[env(safe-area-inset-top)] bg-slate-950"
          style={{ paddingTop: 'max(env(safe-area-inset-top), 16px)' }}
        >
          <SheetHeader className="px-6 pt-4 pb-6 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-white text-lg flex items-center gap-3">
                <BookOpen className="text-blue-400" />
                <span>학습 메뉴</span>
              </SheetTitle>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-1 -mr-1"
                aria-label="메뉴 닫기"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SheetDescription className="sr-only">
              언어별 학습 메뉴를 선택할 수 있습니다. 일본어, 영어, 스페인어 공부 메뉴가 있습니다.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="flex-grow p-3 overflow-y-auto">
          <Accordion type="single" collapsible defaultValue={defaultAccordionValue} className="w-full">
            {menuConfig.map((lang) => (
              <AccordionItem value={lang.value} key={lang.value} disabled={lang.disabled} className="border-b-0">
                  <AccordionTrigger className="text-sm font-semibold text-slate-300 hover:no-underline hover:text-white disabled:opacity-50 px-2 py-3">
                    <MenuIcon icon={lang.icon} size={18} />
                    <span>{lang.language}</span>
                  </AccordionTrigger>
                <AccordionContent 
                  className="pl-3 pr-1 pb-2 data-[state=open]:border-t data-[state=open]:border-slate-800/60"
                >
                  <div className="space-y-0">
                  {lang.items.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        disabled={item.disabled}
                        onClick={() => handleNavigate(item.href)}
                        className={`w-full p-3 inline-flex items-center gap-2 justify-end
                          pr-3 sm:pr-8  ${
                          pathname === item.href
                            ? "bg-blue-500/10 text-blue-300 font-semibold border-l-4 border-blue-400 rounded-l-none rounded-r-md hover:bg-blue-500/10"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white rounded-md"
                        }`}
                      >
                        <MenuIcon icon={item.icon} />
                        <span className="truncate">{item.label}</span>
                      </Button>

                  ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 하단 사용자 정보 영역 - 안전 영역 고려 */}
        <div 
          className="flex-shrink-0 p-6 border-t border-slate-800 pb-[env(safe-area-inset-bottom)]"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
        >
          {user ? (
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <UserCircle2 className="w-8 h-8 text-slate-500" />
                <div>
                  <p className="font-semibold text-white text-sm">{user.nickname}님</p>
                  <p className="text-xs text-slate-400">환영합니다!</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              onClick={() => openAuthFromSheet("login")}
              className="w-full text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              로그인 / 회원가입
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}