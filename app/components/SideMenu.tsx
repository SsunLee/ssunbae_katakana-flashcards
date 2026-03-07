// /app/components/SideMenu.tsx

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { BarChart3, LogOut, Settings, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useTheme } from "@/app/context/ThemeContext";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "./ui/alert-dialog";
import { getIdToken, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ProfileAvatarIcon from "./ProfileAvatarIcon";
import { DEFAULT_AVATAR_COLOR, DEFAULT_AVATAR_ICON } from "@/app/constants/avatarOptions";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  hideAds?: boolean;
}

type MenuItem = { href: string; label: string; icon?: string; disabled?: boolean; };
type MenuGroup = { language: string; value: string; icon?: string; disabled?: boolean; items: MenuItem[]; };

const menuConfig: MenuGroup[] = [
  {
    language: "일본어 공부",
    value: "japanese",
    icon: "🇯🇵",
    items: [
      { href: "/study/japanese/katakana-words", label: "가타카나 단어", icon: "/icons/jp_word.png" },
      { href: "/study/japanese/sentence-quiz", label: "문장 퀴즈", icon: "🧩" },
      { href: "/study/japanese/verbs", label: "JLPT 동사", icon: "📝", disabled: false },
      { href: "/study/japanese/kanji", label: "JLPT 한자", icon: "🎴", disabled: false },
      { href: "/study/japanese/kana-chars", label: "가타카나 / 히라가나", icon: "/icons/jp_katakana.png" },
      { href: "/study/japanese/sentences", label: "일본어 문장", icon: "🌸" },
    ],
  },
  {
    language: "영어 공부",
    value: "english",
    icon: "🇺🇸",
    disabled: false,
    items: [
      { href: "/study/english/words", label: "단어 공부", icon: "📖", disabled: false },
      { href: "/study/english/sentences", label: "문장 퀴즈", icon: "🧩", disabled: false },
    ],
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
  {
    language: "한국어 공부",
    value: "korean",
    icon: "🇰🇷",
    items: [
      { href: "/study/korean/words", label: "한국어 단어 공부", icon: "📚", disabled: false },
      { href: "/study/korean/chars", label: "한글 자모 공부", icon: "📝", disabled: false },
      { href: "/study/korean/syllables", label: "완성형 한글 공부", icon: "🔤", disabled: false },
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


export default function SideMenu({ isOpen, onClose, hideAds = false }: SideMenuProps) {
  const { user } = useAuth();
  const [menuLogoSrc, setMenuLogoSrc] = useState("/ssunedu_logo.png");
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useAuthModal();
  const { theme, setTheme } = useTheme();

  const [openDelete, setOpenDelete] = useState(false);
  const [needReauth, setNeedReauth] = useState(false);
  const [password, setPassword] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lastStudyPage, setLastStudyPage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedPage = window.localStorage.getItem("lastActivePage");
    if (savedPage?.startsWith("/study/") && savedPage !== "/study/dashboard") {
      setLastStudyPage(savedPage);
    }
  }, [pathname, isOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  const handleProfileClick = () => {
    router.push('/profile');
    onClose();
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  async function callDeleteEndpoint() {
    const user = auth.currentUser;
    if (!user) throw new Error("No user");
    const idToken = await getIdToken(user, true);

    const res = await fetch("/api/account/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
    });

    if (res.status === 401) {
      setNeedReauth(true);
      throw new Error("Need reauth");
    }
    if (!res.ok) throw new Error("Delete failed");
  }

  async function handleDelete() {
    try {
      await callDeleteEndpoint();
      await signOut(auth).catch(() => {});
      router.replace("/goodbye");
      onClose();
    } catch (_) {
      // needReauth will show reauth UI
    }
  }

  async function handleReauthAndDelete() {
    const user = auth.currentUser;
    if (!user || !user.email) return;
    const cred = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, cred);
    await handleDelete();
  }  

  const openAuthFromSheet = (p: "login" | "register" = "login") => {
    onClose();
    setTimeout(() => open(p), 0);
  };

  const defaultAccordionValue = useMemo(() => {
    const currentGroup = menuConfig.find((lang) =>
      lang.items.some((item) => {
        // Handle cases like /study/japanese/verbs by checking parent path
        const parentPath = item.href.substring(0, item.href.lastIndexOf("/"));
        return pathname.startsWith(parentPath);
      })
    );
    // --- 👇 [수정] undefined 대신 빈 문자열 ''을 반환하여 타입 오류 해결 ---
    return currentGroup?.value || '';
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        side="left"
        className="w-[300px] bg-card border-r border-border text-foreground p-0 flex flex-col [&>button]:hidden"
      >
        <div 
          className="pt-[env(safe-area-inset-top)] bg-card"
          style={{ paddingTop: 'max(env(safe-area-inset-top), 16px)' }}
        >
          <SheetHeader className="px-6 pt-4 pb-6 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-foreground text-lg flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700/20 bg-white shadow-sm">
                  <Image
                    src={menuLogoSrc}
                    alt="쑨에듀"
                    width={22}
                    height={22}
                    className="object-contain"
                    onError={() => setMenuLogoSrc("/logo.svg")}
                  />
                </span>
                <span>학습 메뉴</span>
              </SheetTitle>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1"
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

        <div className="flex-grow p-3 overflow-y-auto flex flex-col">
          <div className="mb-3">
            <a
              href="/study/dashboard"
              onClick={onClose}
              className={`flex w-full items-center justify-start rounded-xl px-3 py-2 text-[13px] font-semibold ${
                pathname === "/study/dashboard"
                  ? "bg-primary/10 text-primary"
                  : "border border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              <BarChart3 className="mr-2 inline-block h-4 w-4 align-[-2px]" />
              <span>분석 대시보드</span>
            </a>
          </div>

          <Accordion type="single" collapsible defaultValue={defaultAccordionValue} className="w-full">
            {menuConfig.map((lang) => (
              <React.Fragment key={lang.value}>
                <AccordionItem value={lang.value} disabled={lang.disabled} className="border-b-0">
                    <AccordionTrigger className="text-xs font-semibold text-muted-foreground hover:no-underline hover:text-foreground disabled:opacity-50 px-2 py-2">
                      <MenuIcon icon={lang.icon} size={18} />
                      <span>{lang.language}</span>
                    </AccordionTrigger>
                  <AccordionContent 
                    className="pl-3 pr-1 pb-2 data-[state=open]:border-t data-[state=open]:border-border/60"
                  >
                    <div className="space-y-0">
                    {lang.items.map((item) => {
                        const isKanaCharsItem = item.href === "/study/japanese/kana-chars";
                        const isKanaCharsPath =
                          pathname === "/study/japanese/kana-chars" ||
                          pathname === "/study/japanese/katakana-chars" ||
                          pathname === "/study/japanese/hiragana-chars";
                        const isActive = pathname === item.href || (isKanaCharsItem && isKanaCharsPath);
                        return (
                        <Button
                          key={item.href}
                          variant="ghost"
                          disabled={item.disabled}
                          onClick={() => handleNavigate(item.href)}
                          className={`w-full justify-start px-2 py-2 text-[13px] font-medium h-auto min-h-0 ${
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <MenuIcon icon={item.icon} />
                          <span className="truncate">{item.label}</span>
                        </Button>
                        );
                    })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </React.Fragment>
            ))}
          </Accordion>
        </div>
        
        <div 
          className="flex-shrink-0 p-6 border-t border-border pb-[env(safe-area-inset-bottom)]"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
        >
          {user ? (
            <div className="flex flex-col items-start gap-3">
              <button 
                onClick={handleProfileClick} 
                className="flex items-center gap-2 text-left w-full rounded-lg px-2 py-1.5 transition-colors hover:bg-muted"
              >
                <Avatar className="h-9 w-9">
                  {!user.avatarIcon && (
                    <AvatarImage src={user.photoURL || undefined} alt={user.nickname || 'User'} />
                  )}
                  <AvatarFallback
                    style={{ backgroundColor: user.avatarColor || DEFAULT_AVATAR_COLOR }}
                    className="text-white"
                  >
                    <ProfileAvatarIcon icon={user.avatarIcon || DEFAULT_AVATAR_ICON} className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm truncate">{user.nickname}님</p>
                  <p className="text-[11px] text-muted-foreground">프로필 수정</p>
                </div>
              </button>

              <div className="grid w-full grid-cols-2 gap-2">
                <Button onClick={handleOpenSettings} variant="outline" size="sm" className="h-8 px-2 text-xs">
                  <Settings className="h-3.5 w-3.5" />
                  설정
                </Button>
                <Button onClick={() => setOpenDelete(true)} variant="destructive" size="sm" className="h-8 px-2 text-xs">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  계정 삭제
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm" className="h-8 px-2 text-xs">
                  <LogOut className="h-3.5 w-3.5" />
                  로그아웃
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleNavigate("/support")} className="h-8 px-2 text-xs">
                Support
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="default"
                onClick={() => openAuthFromSheet("login")}
                className="w-full font-bold h-9"
              >
                로그인 / 회원가입
              </Button>
              <div className="grid w-full grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={handleOpenSettings} className="h-8 px-2 text-xs">
                  <Settings className="h-3.5 w-3.5" />
                  설정
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleNavigate("/support")} className="h-8 px-2 text-xs">
                Support
                </Button>
              </div>
            </div>
          )} 
        </div>

        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="max-w-sm rounded-2xl border-border bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base">
                <Settings className="h-4 w-4" />
                설정
              </DialogTitle>
              <DialogDescription>
                서랍 메뉴에서 바로 바꿀 수 있는 공통 설정입니다.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">테마</p>
                <Select value={theme} onValueChange={(value) => setTheme(value as "light" | "dark")}>
                  <SelectTrigger className="w-full border-border bg-muted/60 text-foreground hover:bg-muted">
                    <SelectValue placeholder="테마 선택" />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card text-foreground">
                    <SelectItem value="light" className="text-foreground">White mode</SelectItem>
                    <SelectItem value="dark" className="text-foreground">Dark mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-xl border border-border bg-muted/40 px-3 py-3 text-xs leading-5 text-muted-foreground">
                음성, 폰트, 글자 크기 같은 학습별 세부 설정은 각 학습 화면의 <span className="font-semibold text-foreground">설정</span> 버튼에서 조절할 수 있습니다.
              </div>

              {lastStudyPage ? (
                <Button
                  variant="outline"
                  className="h-9 w-full"
                  onClick={() => {
                    setIsSettingsOpen(false);
                    handleNavigate(lastStudyPage);
                  }}
                >
                  최근 학습 화면으로 이동
                </Button>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>정말로 계정을 삭제할까요?</AlertDialogTitle>
              <AlertDialogDescription>
                이 작업은 되돌릴 수 없습니다. 모든 학습 기록과 프로필이 영구 삭제됩니다.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {needReauth ? (
              <div className="space-y-3">
                <p className="text-sm">보안을 위해 비밀번호를 다시 확인합니다.</p>
                <input type="password" className="w-full rounded-md border p-2" placeholder="비밀번호"
                       value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            ) : null}

            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              {!needReauth ? (
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  영구 삭제
                </AlertDialogAction>
              ) : (
                <AlertDialogAction onClick={handleReauthAndDelete}>
                  재인증 후 삭제
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </SheetContent>
    </Sheet>
  );
}

