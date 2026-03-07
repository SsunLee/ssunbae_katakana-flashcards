"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";

import { SettingsDialog } from "@/app/components/SettingsDialog";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { Checkbox } from "@/app/components/ui/checkbox";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import { SingleCardView } from "@/app/components/SingleCardView";
import { GridCardView } from "@/app/components/GridCardView";
import CardControls from "@/app/components/controls/CardControls";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import KakaoAdFit from "@/app/components/KakaoAdFit";

import type { Word } from "@/app/data/words";
import { KATAKANA_CHARS } from "@/app/data/katakanaChars";
import { HIRAGANA_CHARS } from "@/app/data/hiraganaChars";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { useStudySessionAnalytics } from "@/app/hooks/useStudySessionAnalytics";
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { FONT_STACKS } from "@/app/constants/fonts";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { useMounted } from "@/app/hooks/useMounted";
import { INLINE_CONTENT_AD_MAX_WIDTH, normalizeAdUnit, resolveAdUnit } from "@/app/lib/kakao-adfit";

const CARDS_PER_PAGE = 10 as const;
type ViewMode = "single" | "grid";
type FilterKey = "gojuon" | "dakuten" | "handakuten" | "yoon";
type KanaMode = "katakana" | "hiragana";

const FILTER_LABELS: Record<FilterKey, string> = {
  gojuon: "50음도",
  dakuten: "탁음",
  handakuten: "반탁음",
  yoon: "요음",
};

const KANA_MODE_CONFIG: Record<
  KanaMode,
  {
    label: string;
    deckType: "katakana-chars" | "hiragana-chars";
    initialDeck: (Word & { type: string })[];
    ttsLabel: string;
  }
> = {
  katakana: {
    label: "가타카나",
    deckType: "katakana-chars",
    initialDeck: KATAKANA_CHARS,
    ttsLabel: "🔊 듣기 (가타카나)",
  },
  hiragana: {
    label: "히라가나",
    deckType: "hiragana-chars",
    initialDeck: HIRAGANA_CHARS,
    ttsLabel: "🔊 듣기 (히라가나)",
  },
};

type Props = {
  initialMode?: KanaMode;
};

export default function KanaCharsStudyPage({ initialMode = "katakana" }: Props) {
  const [kanaMode, setKanaMode] = useState<KanaMode>(initialMode);
  const { label: kanaLabel, deckType, initialDeck, ttsLabel } = useMemo(
    () => KANA_MODE_CONFIG[kanaMode],
    [kanaMode]
  );

  const { user } = useAuth();
  const { open } = useAuthModal();

  const { deck, favs, toggleFav, shuffleDeck, resetDeckToInitial } =
    useStudyDeck<Word & { type: string }>({
      user,
      deckType,
      initialDeck,
    });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");
  const [charFontSize, setCharFontSize] = useState(96);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const [filters, setFilters] = useState<Record<FilterKey, boolean>>({
    gojuon: true,
    dakuten: true,
    handakuten: false,
    yoon: false,
  });
  const defaultMobileInlineAdUnit = normalizeAdUnit("DAN-QMVosjDRN8zEUBnf");
  const mobileInlineAdUnit = resolveAdUnit(
    [process.env.NEXT_PUBLIC_KAKAO_ADFIT_MOBILE_UNIT, process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT],
    defaultMobileInlineAdUnit
  );

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
    setCurrentPage(1);
    setFlippedStates({});
    setOnlyFavs(false);
  }, [kanaMode]);

  const handleFilterChange = (k: FilterKey) =>
    setFilters((prev) => ({ ...prev, [k]: !prev[k] }));

  const toggleGridCardFlip = (id: number) =>
    setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));

  const idToType = useMemo(
    () => new Map(initialDeck.map((c) => [c.id, c.type as FilterKey])),
    [initialDeck]
  );

  const activeFilters = useMemo(
    () => new Set((Object.keys(filters) as FilterKey[]).filter((k) => filters[k])),
    [filters]
  );

  const studyDeck = useMemo(() => {
    const filtered =
      activeFilters.size > 0
        ? deck.filter((card) => {
            const t = idToType.get(card.id);
            return t ? activeFilters.has(t) : false;
          })
        : [];
    return onlyFavs ? filtered.filter((w) => favs[w.id]) : filtered;
  }, [deck, favs, onlyFavs, activeFilters, idToType]);

  const { currentCards, totalPages } = useMemo(() => {
    const total = Math.ceil(studyDeck.length / CARDS_PER_PAGE) || 1;
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    return {
      currentCards: studyDeck.slice(start, start + CARDS_PER_PAGE),
      totalPages: total,
    };
  }, [currentPage, studyDeck]);

  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const onFlip = useCallback(() => setFlipped((f) => !f), []);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(1, studyDeck.length));
    setFlipped(false);
  }, [studyDeck.length]);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + Math.max(1, studyDeck.length)) % Math.max(1, studyDeck.length));
    setFlipped(false);
  }, [studyDeck.length]);

  const shuffle = () => {
    shuffleDeck();
    setIndex(0);
    setFlipped(false);
  };
  const reset = () => {
    resetDeckToInitial();
    setIndex(0);
    setFlipped(false);
    setFlippedStates({});
    setCurrentPage(1);
  };

  const {
    isSupported: isTtsSupported,
    ready: ttsReady,
    speakJa,
    selectedVoice,
    voices,
    selectVoice,
    isSafari,
  } = useJaSpeech();

  const current = studyDeck[index] ?? null;
  const fontStack = useMemo(
    () => FONT_STACKS[fontFamily] || FONT_STACKS["Noto Sans JP"],
    [fontFamily]
  );

  useStudySessionAnalytics({
    userId: user?.uid,
    deckType,
    enabled: Boolean(user) && studyDeck.length > 0,
    observedCardIds: viewMode === "single" ? (current ? [current.id] : []) : currentCards.map((card) => card.id),
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (viewMode !== "single") return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onFlip();
      } else if (e.key === "ArrowRight") {
        next();
      } else if (e.key === "ArrowLeft") {
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [viewMode, onFlip, next, prev]);

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

  const mounted = useMounted();
  const canTts = mounted && typeof window !== "undefined" && "speechSynthesis" in window;
  const shouldShowInlineAd = viewportWidth !== null && viewportWidth < INLINE_CONTENT_AD_MAX_WIDTH;
  const subject = STUDY_LABELS[deckType] || `${kanaLabel} 글자`;

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>
      <header className="w-full max-w-md mx-auto mb-1">
        <WelcomeBanner name={user?.nickname || undefined} subject={subject} />
      </header>

      {!user && <LoginPromptCard onLoginClick={() => open("login")} />}

      {viewMode === "single" && (
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
          <span className="text-muted-foreground">
            ⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}
          </span>

          {canTts && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => speakJa(current?.katakana || "")}
              disabled={!ttsReady || !current}
            >
              {ttsLabel}
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowSettings(true)}
            aria-haspopup="dialog"
            aria-expanded={showSettings}
            title="설정"
          >
            ⚙️ 설정
          </Button>

          <SettingsDialog
            open={showSettings}
            onOpenChange={setShowSettings}
            user={user}
            deckType={deckType}
            isTtsSupported={isTtsSupported}
            selectedVoice={selectedVoice}
            selectVoice={selectVoice}
            voices={voices}
            isSafari={isSafari}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            wordFontSize={charFontSize}
            setWordFontSize={setCharFontSize}
            resetDeck={reset}
          />
        </div>
      )}

      <div className="w-full max-w-md mx-auto mb-3 p-3 bg-card border border-border rounded-lg flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-muted-foreground">문자 종류</span>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={kanaMode === "katakana" ? "default" : "outline"}
            onClick={() => setKanaMode("katakana")}
          >
            가타카나
          </Button>
          <Button
            size="sm"
            variant={kanaMode === "hiragana" ? "default" : "outline"}
            onClick={() => setKanaMode("hiragana")}
          >
            히라가나
          </Button>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto mb-4 p-3 bg-card border border-border rounded-lg flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
        {(Object.keys(FILTER_LABELS) as FilterKey[]).map((k) => (
          <label key={k} className="flex items-center space-x-2">
            <Checkbox
              id={`${kanaMode}-${k}`}
              checked={filters[k]}
              onCheckedChange={() => handleFilterChange(k)}
            />
            <span>{FILTER_LABELS[k]}</span>
          </label>
        ))}
      </div>

      <main className="w-full max-w-5xl select-none">
        {viewMode === "single" ? (
          studyDeck.length === 0 ? (
            <EmptyDeckMessage viewMode="single" />
          ) : (
            current && (
              <SingleCardView
                key={current.id}
                card={current}
                deckType={deckType}
                isFlipped={flipped}
                isFav={!!favs[current.id]}
                onFlip={onFlip}
                onToggleFav={() => toggleFav(current.id)}
                fontSize={charFontSize}
              />
            )
          )
        ) : studyDeck.length === 0 ? (
          <EmptyDeckMessage viewMode="grid" />
        ) : (
          <GridCardView
            variant="chars"
            cards={currentCards}
            favs={favs}
            flippedStates={flippedStates}
            onToggleFav={(id) => toggleFav(id as number)}
            onToggleCardFlip={toggleGridCardFlip}
            page={{
              current: currentPage,
              total: totalPages,
              onPrev: goToPrevPage,
              onNext: goToNextPage,
            }}
          />
        )}
      </main>

      {viewMode === "single" && (
        <CardControls onPrev={prev} onNext={next} onShuffle={shuffle} onReset={reset} />
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
        {user && (
          <Button
            variant="outline"
            onClick={() => {
              setViewMode((p) => (p === "single" ? "grid" : "single"));
              setFlipped(false);
            }}
          >
            {viewMode === "single" ? "여러 장 모아보기" : "한 장씩 학습하기"}
          </Button>
        )}

        <label className="flex items-center gap-3 px-3 py-2 rounded-xl border border-border bg-card">
          <span className="text-foreground font-semibold">⭐ Only</span>
          <Switch
            checked={onlyFavs}
            onCheckedChange={(on) => {
              setOnlyFavs(on);
              setIndex(0);
              setFlipped(false);
              setCurrentPage(1);
            }}
          />
        </label>
      </div>

      {shouldShowInlineAd ? (
        <div className="w-full max-w-md mx-auto mt-6 flex justify-center">
          <KakaoAdFit adUnit={mobileInlineAdUnit} width={300} height={250} />
        </div>
      ) : null}

      <footer className="w-full max-w-md mx-auto mt-6 text-sm text-muted-foreground bg-card/50 border border-border rounded-xl px-4 py-3">
        <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
          <li>⚙️설정에서 TTS Voice, Font, 폰트 크기를 조절할 수 있습니다.</li>
          <li>키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
        </ul>
      </footer>
    </div>
  );
}
