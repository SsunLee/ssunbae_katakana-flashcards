// /app/components/SideMenu.tsx

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { BarChart3, Languages, LogOut, Megaphone, Settings, ShieldAlert } from "lucide-react";
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
import { useLocale } from "@/app/context/LocaleContext";
import { localeOptions, type TranslationKey } from "@/app/i18n/translations";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  hideAds?: boolean;
}

type MenuItem = { href: string; labelKey: TranslationKey; icon?: string; disabled?: boolean; };
type MenuGroup = { languageKey: TranslationKey; value: string; icon?: string; disabled?: boolean; items: MenuItem[]; };

const menuConfig: MenuGroup[] = [
  {
    languageKey: "menu.japanese",
    value: "japanese",
    icon: "🇯🇵",
    items: [
      { href: "/study/japanese/sentence-quiz", labelKey: "menu.sentenceQuiz", icon: "🧩" },
      { href: "/study/japanese/katakana-words", labelKey: "menu.jlptWords", icon: "/icons/jp_word.png" },
      { href: "/study/japanese/verbs", labelKey: "menu.jlptVerbs", icon: "📝", disabled: false },
      { href: "/study/japanese/kanji", labelKey: "menu.jlptKanji", icon: "🎴", disabled: false },
      { href: "/study/japanese/kana-chars", labelKey: "menu.kana", icon: "/icons/jp_katakana.png" },
      { href: "/study/japanese/sentences", labelKey: "menu.japaneseSentences", icon: "🌸" },
    ],
  },
  {
    languageKey: "menu.english",
    value: "english",
    icon: "🇺🇸",
    disabled: false,
    items: [
      { href: "/study/english/sentences", labelKey: "menu.sentenceQuiz", icon: "🧩", disabled: false },
      { href: "/study/english/words", labelKey: "menu.wordStudy", icon: "📖", disabled: false },
    ],
  },
  {
    languageKey: "menu.spanish",
    value: "spanish",
    icon: "🇪🇸",
    disabled: false,
    items: [
      { href: "/study/spanish/sentences", labelKey: "menu.sentenceQuiz", icon: "🧩", disabled: false },
      { href: "/study/spanish/words", labelKey: "menu.spanishWordStudy", icon: "/icons/es_word.png", disabled: false },
    ],
  },
  {
    languageKey: "menu.korean",
    value: "korean",
    icon: "🇰🇷",
    items: [
      { href: "/study/korean/sentences", labelKey: "menu.sentenceQuiz", icon: "🧩", disabled: false },
      { href: "/study/korean/words", labelKey: "menu.koreanWordStudy", icon: "📚", disabled: false },
      { href: "/study/korean/chars", labelKey: "menu.hangulChars", icon: "📝", disabled: false },
      { href: "/study/korean/syllables", labelKey: "menu.hangulSyllables", icon: "🔤", disabled: false },
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
  const { locale, setLocale, t } = useLocale();

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
                <span>{t("menu.title")}</span>
              </SheetTitle>
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1"
                aria-label={t("menu.close")}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <SheetDescription className="sr-only">
              {t("menu.description")}
            </SheetDescription>
          </SheetHeader>
        </div>

        <div className="flex-grow p-3 overflow-y-auto flex flex-col">
          <div className="mb-3">
            <button
              type="button"
              onClick={() => handleNavigate("/study/dashboard")}
              className={`flex w-full items-center justify-start rounded-xl px-3 py-2 text-[13px] font-semibold ${
                pathname === "/study/dashboard"
                  ? "bg-primary/10 text-primary"
                  : "border border-border bg-background text-foreground hover:bg-muted"
              }`}
            >
              <BarChart3 className="mr-2 inline-block h-4 w-4 align-[-2px]" />
              <span>{t("menu.dashboard")}</span>
            </button>
          </div>

          <Accordion type="single" collapsible defaultValue={defaultAccordionValue} className="w-full">
            {menuConfig.map((lang) => (
              <React.Fragment key={lang.value}>
                <AccordionItem value={lang.value} disabled={lang.disabled} className="border-b-0">
                    <AccordionTrigger className="text-xs font-semibold text-muted-foreground hover:no-underline hover:text-foreground disabled:opacity-50 px-2 py-2">
                      <MenuIcon icon={lang.icon} size={18} />
                      <span>{t(lang.languageKey)}</span>
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
                          <span className="truncate">{t(item.labelKey)}</span>
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
                  <p className="font-semibold text-foreground text-sm truncate">{user.nickname}</p>
                  <p className="text-[11px] text-muted-foreground">{t("menu.editProfile")}</p>
                </div>
              </button>

              <Button
                onClick={() => handleNavigate("/study/notices")}
                variant={pathname === "/study/notices" ? "default" : "outline"}
                size="sm"
                className="h-8 w-full justify-start px-2 text-xs"
              >
                <Megaphone className="h-3.5 w-3.5" />
                {t("menu.notices")}
              </Button>

              <div className="grid w-full grid-cols-2 gap-2">
                <Button onClick={handleOpenSettings} variant="outline" size="sm" className="h-8 px-2 text-xs">
                  <Settings className="h-3.5 w-3.5" />
                  {t("common.settings")}
                </Button>
                <Button onClick={() => setOpenDelete(true)} variant="destructive" size="sm" className="h-8 px-2 text-xs">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  {t("menu.deleteAccount")}
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm" className="h-8 px-2 text-xs">
                  <LogOut className="h-3.5 w-3.5" />
                  {t("menu.logout")}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleNavigate("/support")} className="h-8 px-2 text-xs">
                {t("common.support")}
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
                {t("menu.loginRegister")}
              </Button>
              <Button
                onClick={() => handleNavigate("/study/notices")}
                variant={pathname === "/study/notices" ? "default" : "outline"}
                size="sm"
                className="h-8 w-full justify-start px-2 text-xs"
              >
                <Megaphone className="h-3.5 w-3.5" />
                {t("menu.notices")}
              </Button>
              <div className="grid w-full grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={handleOpenSettings} className="h-8 px-2 text-xs">
                  <Settings className="h-3.5 w-3.5" />
                  {t("common.settings")}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleNavigate("/support")} className="h-8 px-2 text-xs">
                {t("common.support")}
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
                {t("common.settings")}
              </DialogTitle>
              <DialogDescription>
                {t("menu.settingsDescription")}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  {t("common.language")}
                </p>
                <Select value={locale} onValueChange={(value) => setLocale(value as typeof locale)}>
                  <SelectTrigger className="w-full border-border bg-muted/60 text-foreground hover:bg-muted" aria-label={t("common.selectLanguage")}>
                    <SelectValue placeholder={t("common.selectLanguage")} />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card text-foreground">
                    {localeOptions.map((option) => (
                      <SelectItem key={option.code} value={option.code} className="text-foreground">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">{t("common.theme")}</p>
                <Select value={theme} onValueChange={(value) => setTheme(value as "light" | "dark")}>
                  <SelectTrigger className="w-full border-border bg-muted/60 text-foreground hover:bg-muted">
                    <SelectValue placeholder={t("common.selectTheme")} />
                  </SelectTrigger>
                  <SelectContent className="border-border bg-card text-foreground">
                    <SelectItem value="light" className="text-foreground">{t("common.lightMode")}</SelectItem>
                    <SelectItem value="dark" className="text-foreground">{t("common.darkMode")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-xl border border-border bg-muted/40 px-3 py-3 text-xs leading-5 text-muted-foreground">
                {t("menu.studySettingsHint")}
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
                  {t("menu.recentStudy")}
                </Button>
              ) : null}
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("menu.deleteTitle")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("menu.deleteDescription")}
              </AlertDialogDescription>
            </AlertDialogHeader>

            {needReauth ? (
              <div className="space-y-3">
                <p className="text-sm">{t("menu.reauthDescription")}</p>
                <input type="password" className="w-full rounded-md border p-2" placeholder={t("menu.password")}
                       value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            ) : null}

            <AlertDialogFooter>
              <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
              {!needReauth ? (
                <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                  {t("menu.deleteForever")}
                </AlertDialogAction>
              ) : (
                <AlertDialogAction onClick={handleReauthAndDelete}>
                  {t("menu.reauthDelete")}
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </SheetContent>
    </Sheet>
  );
}
