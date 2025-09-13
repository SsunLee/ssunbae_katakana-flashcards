"use client";
import React, { createContext, useContext, useMemo, useState } from "react";

type Page = "login" | "register";
type Ctx = {
  isOpen: boolean;
  page: Page;
  open: (p?: Page) => void;
  close: () => void;
  setPage: (p: Page) => void;
};

const AuthModalContext = createContext<Ctx | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState<Page>("login");

  const value = useMemo<Ctx>(
    () => ({
      isOpen,
      page,
      open: (p?: Page) => {
        if (p) setPage(p);
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
      setPage,
    }),
    [isOpen, page]
  );

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within <AuthModalProvider>");
  return ctx;
}
