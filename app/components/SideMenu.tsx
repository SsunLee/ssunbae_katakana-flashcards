// /app/components/SideMenu.tsx

"use client";

import React, { useMemo, useState } from "react";
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

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from "./ui/alert-dialog";
import { getIdToken, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

type MenuItem = { href: string; label: string; icon?: string; disabled?: boolean; };
type MenuGroup = { language: string; value: string; icon?: string; disabled?: boolean; items: MenuItem[]; };

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
      { href: "/study/japanese/verbs", label: "일본어 동사 학습", icon: "📝", disabled: false },
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


export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { open } = useAuthModal();

  const [openDelete, setOpenDelete] = useState(false);
  const [needReauth, setNeedReauth] = useState(false);
  const [password, setPassword] = useState("");

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
                <BookOpen className="text-primary" />
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

        <div className="flex-grow p-3 overflow-y-auto">
          <Accordion type="single" collapsible defaultValue={defaultAccordionValue} className="w-full">
            {menuConfig.map((lang) => (
              <AccordionItem value={lang.value} key={lang.value} disabled={lang.disabled} className="border-b-0">
                  <AccordionTrigger className="text-sm font-semibold text-muted-foreground hover:no-underline hover:text-foreground disabled:opacity-50 px-2 py-3">
                    <MenuIcon icon={lang.icon} size={18} />
                    <span>{lang.language}</span>
                  </AccordionTrigger>
                <AccordionContent 
                  className="pl-3 pr-1 pb-2 data-[state=open]:border-t data-[state=open]:border-border/60"
                >
                  <div className="space-y-0">
                  {lang.items.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        disabled={item.disabled}
                        onClick={() => handleNavigate(item.href)}
                        className={`w-full justify-start p-3 text-sm font-medium h-auto ${
                          pathname === item.href
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
        
        <div 
          className="flex-shrink-0 p-6 border-t border-border pb-[env(safe-area-inset-bottom)]"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 24px)' }}
        >
          {user ? (
            <div className="flex flex-col items-start gap-4">
              <button 
                onClick={handleProfileClick} 
                className="flex items-center gap-3 text-left w-full hover:bg-muted rounded-lg p-2 -m-2 transition-colors"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.photoURL || undefined} alt={user.nickname || 'User'}/>
                  <AvatarFallback>
                    <UserCircle2 className="w-6 h-6 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm truncate">{user.nickname}님</p>
                  <p className="text-xs text-muted-foreground">프로필 수정</p>
                </div>
              </button>
              
              <Button onClick={() => setOpenDelete(true)} variant="destructive" className="w-full">
                <ShieldAlert className="w-4 h-4 mr-2" />
                계정 삭제
              </Button>

              <Button onClick={handleLogout} variant="outline" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
              
              <Button variant="ghost" onClick={() => handleNavigate("/support")} className="w-full">
                Support
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="default"
                onClick={() => openAuthFromSheet("login")}
                className="w-full font-bold"
              >
                로그인 / 회원가입
              </Button>
              <Button variant="ghost" onClick={() => handleNavigate("/support")} className="w-full">
                Support
              </Button>
            </div>
          )} 
        </div>

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

