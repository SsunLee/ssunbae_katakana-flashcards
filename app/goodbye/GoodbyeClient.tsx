// app/goodbye/GoodbyeClient.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
// 타입 오류 나면: npm i -D @types/canvas-confetti
import confetti from "canvas-confetti";
import { Button } from "@/app/components/ui/button";
import { CheckCircle2, Home, UserPlus, LifeBuoy } from "lucide-react";

function fireConfetti() {
  const end = Date.now() + 800;
  const defaults = { startVelocity: 38, spread: 360, ticks: 60, zIndex: 9999 };
  const interval: any = setInterval(() => {
    const timeLeft = end - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    confetti({
      ...defaults,
      particleCount: 50,
      origin: { x: Math.random(), y: Math.random() * 0.3 + 0.1 },
      scalar: 0.9,
    });
  }, 120);
}

export default function GoodbyeClient() {
  const fired = useRef(false);

  useEffect(() => {
    const reduce = typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (!fired.current && !reduce) {
      fired.current = true;
      const t = setTimeout(() => fireConfetti(), 450);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/20 via-transparent to-[#a78bfa]/20" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-[40rem] w-[40rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-[38rem] w-[38rem] rounded-full bg-violet-500/10 blur-3xl" />

      <main className="relative mx-auto flex min-h-[100dvh] max-w-3xl items-center justify-center p-6">
        <motion.section
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="w-full"
        >
          <div className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col items-center gap-3 px-8 pt-10 text-center sm:pt-12">
              <motion.div
                initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 120, damping: 10 }}
                className="rounded-full bg-emerald-500/15 p-4 ring-1 ring-emerald-400/30"
              >
                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
              </motion.div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                계정 삭제가 완료되었습니다
              </h1>
              <p className="max-w-xl text-balance text-sm text-muted-foreground sm:text-base">
                SSUN EDU를 이용해 주셔서 감사합니다. 언제든 다시 돌아오실 수 있습니다.
              </p>
            </div>

            <div className="mx-6 mt-8 border-t border-border/60" />

            <div className="grid gap-4 px-6 py-6 sm:grid-cols-3">
              <Feature title="개인정보 보호" desc="연결된 프로필과 학습 기록은 영구 삭제되었습니다." />
              <Feature title="언제든 재가입" desc="이메일로 간단히 새 계정을 만들 수 있어요." />
              <Feature title="문의 도움" desc="문제가 있다면 Support에서 도와드립니다." />
            </div>

            <div className="flex flex-col items-center gap-3 px-8 pb-10 pt-2 sm:flex-row sm:justify-center">
              <Button asChild className="h-11 px-5">
                <Link href="/"><Home className="mr-2 h-4 w-4" />홈으로 가기</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 px-5">
                <Link href="/support"><LifeBuoy className="mr-2 h-4 w-4" />Support</Link>
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} SSUN EDU — 고마웠어요. 곧 다시 만나요 👋
          </p>
        </motion.section>
      </main>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0% -10% 0%" }}
      transition={{ delay: 0.05, duration: 0.25 }}
      className="rounded-2xl border border-border/50 bg-muted/30 p-4 text-center"
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
    </motion.div>
  );
}
