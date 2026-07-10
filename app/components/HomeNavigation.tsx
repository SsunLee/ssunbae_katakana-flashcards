"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useLocale } from "@/app/context/LocaleContext";

const SideMenu = dynamic(() => import("@/app/components/SideMenu"), { ssr: false });
const LoginPage = dynamic(() => import("@/app/LoginPage"), { ssr: false });
const RegisterPage = dynamic(() => import("@/app/RegisterPage"), { ssr: false });

export function HomeNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, close, page, setPage } = useAuthModal();
  const { t } = useLocale();

  return (
    <>
      <header className="sticky top-0 z-40 h-16 w-full border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
            aria-label={t("menu.open")}
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link href="/" aria-label="쑨에듀 홈" className="flex select-none items-center gap-2">
            <Image src="/ssunedu_logo.png" alt="쑨에듀" width={20} height={20} className="object-contain" priority />
            <span className="text-sm font-semibold italic">쑨에듀</span>
          </Link>

          <div className="h-10 w-10" aria-hidden="true" />
        </div>
      </header>

      <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close(); }}>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogContent className="w-full max-w-sm rounded-2xl border-border bg-card p-0 text-foreground shadow-xl">
          <DialogHeader className="sr-only">
            <DialogTitle>{page === "login" ? t("auth.login") : t("auth.register")}</DialogTitle>
            <DialogDescription>
              {page === "login" ? t("auth.loginDescription") : t("auth.registerDescription")}
            </DialogDescription>
          </DialogHeader>

          {page === "login" ? (
            <LoginPage onSwitchToRegister={() => setPage("register")} onSuccess={close} />
          ) : (
            <RegisterPage onSwitchToLogin={() => setPage("login")} onSuccess={close} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
