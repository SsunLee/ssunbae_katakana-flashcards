"use client";

import Image from "next/image";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { RefreshCw, Sparkles } from "lucide-react";
import { type Locale, useLocale } from "@/app/context/LocaleContext";

type UpdatePhase =
  | "checking"
  | "downloading"
  | "installing"
  | "ready"
  | "error"
  | "bypass";

const copy: Record<
  Locale,
  {
    title: string;
    stages: Record<Exclude<UpdatePhase, "bypass">, string>;
    tips: string[];
    tipLabel: string;
    retry: string;
    continue: string;
  }
> = {
  ko: {
    title: "쑨에듀를 준비하고 있어요",
    stages: {
      checking: "새로운 학습 자료를 확인하는 중",
      downloading: "새로운 학습 자료를 받는 중",
      installing: "업데이트를 마무리하는 중",
      ready: "준비가 끝났어요",
      error: "업데이트를 완료하지 못했어요",
    },
    tips: [
      "단어 카드는 즐겨찾기로 모아 다시 복습할 수 있어요.",
      "문장 퀴즈 결과는 분석 대시보드에서 확인할 수 있어요.",
      "짧게 자주 반복하면 오래 기억하는 데 도움이 돼요.",
      "정답을 소리 내어 읽으면 발음과 기억을 함께 익힐 수 있어요.",
    ],
    tipLabel: "학습 팁",
    retry: "다시 시도",
    continue: "현재 버전으로 시작",
  },
  en: {
    title: "Getting SSUN EDU ready",
    stages: {
      checking: "Checking for new lessons",
      downloading: "Downloading new lessons",
      installing: "Finishing the update",
      ready: "Ready to learn",
      error: "The update could not be completed",
    },
    tips: [
      "Save word cards as favorites for a focused review later.",
      "See your sentence quiz results in the analytics dashboard.",
      "Short, frequent reviews make new words easier to remember.",
      "Reading answers aloud helps you practice memory and pronunciation together.",
    ],
    tipLabel: "Study tip",
    retry: "Try again",
    continue: "Use current version",
  },
  ja: {
    title: "SSUN EDUを準備しています",
    stages: {
      checking: "新しい学習データを確認中",
      downloading: "新しい学習データをダウンロード中",
      installing: "アップデートを仕上げています",
      ready: "準備ができました",
      error: "アップデートを完了できませんでした",
    },
    tips: [
      "単語カードをお気に入りに保存して、あとで復習できます。",
      "文クイズの結果は分析ダッシュボードで確認できます。",
      "短い復習を繰り返すと、長く覚えやすくなります。",
      "答えを声に出すと、発音と記憶を一緒に練習できます。",
    ],
    tipLabel: "学習のヒント",
    retry: "もう一度試す",
    continue: "現在のバージョンで開始",
  },
  es: {
    title: "Preparando SSUN EDU",
    stages: {
      checking: "Buscando nuevas lecciones",
      downloading: "Descargando nuevas lecciones",
      installing: "Finalizando la actualización",
      ready: "Todo listo para aprender",
      error: "No se pudo completar la actualización",
    },
    tips: [
      "Guarda tarjetas como favoritas para repasarlas más tarde.",
      "Consulta tus resultados en el panel de análisis.",
      "Los repasos breves y frecuentes ayudan a recordar mejor.",
      "Leer las respuestas en voz alta mejora la memoria y la pronunciación.",
    ],
    tipLabel: "Consejo",
    retry: "Reintentar",
    continue: "Usar versión actual",
  },
};

const wait = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export default function LiveUpdateGate({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const [phase, setPhase] = useState<UpdatePhase>("checking");
  const [progress, setProgress] = useState(6);
  const [tipIndex, setTipIndex] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const messages = copy[locale];

  useEffect(() => {
    if (phase === "bypass" || phase === "error") return;

    const interval = window.setInterval(() => {
      setTipIndex((current) => (current + 1) % messages.tips.length);
    }, 3600);

    return () => window.clearInterval(interval);
  }, [messages.tips.length, phase]);

  useEffect(() => {
    let cancelled = false;

    const prepareApp = async () => {
      const isNative =
        typeof Capacitor.isNativePlatform === "function"
          ? Capacitor.isNativePlatform()
          : Capacitor.getPlatform() !== "web";

      if (!isNative) {
        setPhase("bypass");
        return;
      }

      try {
        const liveUpdates = await import("@capacitor/live-updates");
        const config = await liveUpdates.getConfig();

        // Released builds that still use background updates must not run a second sync.
        if (config.autoUpdateMethod !== "none" || config.enabled === false) {
          setPhase("bypass");
          return;
        }

        StatusBar.setOverlaysWebView({ overlay: true }).catch(() => {});
        StatusBar.setStyle({ style: Style.Light }).catch(() => {});

        setPhase("checking");
        setProgress(6);

        const result = await liveUpdates.sync((rawPercentage) => {
          if (cancelled) return;

          const percentage = rawPercentage <= 1 ? rawPercentage * 100 : rawPercentage;
          const normalized = Math.max(0, Math.min(100, percentage));
          const visibleProgress = Math.round(12 + normalized * 0.8);

          setProgress(visibleProgress);
          setPhase(normalized >= 88 ? "installing" : "downloading");
        });

        if (cancelled) return;

        setPhase("ready");
        setProgress(100);
        await wait(450);

        if (result.activeApplicationPathChanged) {
          await liveUpdates.reload();
          return;
        }

        StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
        setPhase("bypass");
      } catch {
        if (!cancelled) {
          setPhase("error");
          setProgress(0);
        }
      }
    };

    prepareApp();

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const displayedProgress = useMemo(
    () => Math.max(0, Math.min(100, progress)),
    [progress]
  );

  if (phase === "bypass") return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] min-h-[100dvh] overflow-hidden bg-[#1769e8] text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col px-7 pb-[max(28px,env(safe-area-inset-bottom))] pt-[max(30px,env(safe-area-inset-top))]">
        <div className="flex flex-1 flex-col items-center justify-center py-5 text-center">
          <Image
            src="/ssunedu_logo.png"
            alt="쑨에듀 캐릭터"
            width={285}
            height={424}
            priority
            className="h-auto w-[148px] drop-shadow-[0_18px_28px_rgba(5,39,108,0.28)] sm:w-[166px]"
          />

          <h1 className="mt-7 text-[24px] font-bold leading-tight tracking-normal sm:text-[26px]">
            {messages.title}
          </h1>
          <p className="mt-2 min-h-6 text-[15px] font-medium tracking-normal text-blue-100">
            {messages.stages[phase]}
          </p>

          {phase !== "error" ? (
            <div className="mt-7 w-full" aria-live="polite">
              <div className="mb-2 flex items-center justify-between text-sm font-semibold">
                <span>{messages.stages[phase]}</span>
                <span className="tabular-nums">{displayedProgress}%</span>
              </div>
              <div
                className="h-2.5 overflow-hidden rounded-full bg-[#0c4eb9]"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={displayedProgress}
              >
                <div
                  className="h-full rounded-full bg-[#ffdc67] transition-[width] duration-500 ease-out"
                  style={{ width: `${displayedProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="mt-7 flex w-full flex-col gap-3">
              <button
                type="button"
                onClick={() => setAttempt((current) => current + 1)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white px-4 text-[15px] font-bold text-[#1459c7] shadow-sm active:scale-[0.99]"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                {messages.retry}
              </button>
              <button
                type="button"
                onClick={() => setPhase("bypass")}
                className="h-11 w-full px-4 text-[14px] font-semibold text-blue-100 underline decoration-blue-200/60 underline-offset-4"
              >
                {messages.continue}
              </button>
            </div>
          )}
        </div>

        <div className="min-h-[92px] border-t border-white/20 pt-5 text-center" aria-live="polite">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase text-[#ffdf73]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {messages.tipLabel}
          </div>
          <p key={`${locale}-${tipIndex}`} className="mt-2 text-[14px] leading-6 tracking-normal text-blue-50">
            {messages.tips[tipIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
