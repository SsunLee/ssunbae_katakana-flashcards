"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Switch } from "@/app/components/ui/switch";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import CardControls from "@/app/components/controls/CardControls";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import KakaoAdFit from "@/app/components/KakaoAdFit";
import VerbCardView from "@/app/components/VerbCardView";
import VerbGridMode from "@/app/components/VerbGridcardView";
import VerbFormsTable from "@/app/components/VerbFormsTable";
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { useStudySessionAnalytics } from "@/app/hooks/useStudySessionAnalytics";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { fetchVerbs, isRemoteStudyApiEnabled } from "@/app/services/api";
import { VERBS as fallbackVerbs } from "@/app/data/verbs";
import type { Verb } from "@/app/types/verbs";
import { FONT_STACKS } from "@/app/constants/fonts";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { useMounted } from "@/app/hooks/useMounted";
import { VerbCardSkeleton } from "@/app/components/VerbCardSkeleton";
import { INLINE_CONTENT_AD_MAX_WIDTH, normalizeAdUnit, resolveAdUnit } from "@/app/lib/kakao-adfit";

const CARDS_PER_PAGE = 10 as const;
type ViewMode = "single" | "grid";

const JLPT_FILTERS = {
  N5: "N5",
  N4: "N4",
  N3: "N3",
  N2: "N2",
  N1: "N1",
} as const;
type JlptFilterKey = keyof typeof JLPT_FILTERS;

export default function JapaneseVerbsPage() {
  const deckType = "japanese-verbs";
  const { user } = useAuth();
  const { open } = useAuthModal();

  const {
    deck,
    favs,
    toggleFav,
    shuffleDeck,
    resetDeckToInitial,
    isLoading,
    error,
  } = useStudyDeck<Verb>({
    user,
    deckType,
    fetchDeckData: isRemoteStudyApiEnabled ? fetchVerbs : undefined,
    initialDeck: fallbackVerbs,
  });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");
  const [verbFontSize, setVerbFontSize] = useState<number>(28);
  const [expanded, setExpanded] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const [jlptFilters, setJlptFilters] = useState<Record<JlptFilterKey, boolean>>({
    N5: true,
    N4: true,
    N3: true,
    N2: true,
    N1: true,
  });
  const defaultMobileInlineAdUnit = normalizeAdUnit("DAN-QMVosjDRN8zEUBnf");
  const mobileInlineAdUnit = resolveAdUnit(
    [process.env.NEXT_PUBLIC_KAKAO_ADFIT_MOBILE_UNIT, process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT],
    defaultMobileInlineAdUnit
  );

  const [gridFlippedStates, setGridFlippedStates] = useState<Record<number, boolean>>({});
  const toggleGridCardFlip = (id: number) =>
    setGridFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleJlptFilterChange = (level: JlptFilterKey) => {
    setJlptFilters((prev) => ({ ...prev, [level]: !prev[level] }));
    setIndex(0);
    setFlipped(false);
    setCurrentPage(1);
  };

  // [추가] 이벤트 전달을 확인하기 위한 핸들러 함수
  const handleToggleFav = useCallback((id: number) => {
    console.log(`[PAGE] VerbCardView에서 클릭 이벤트를 받았습니다. ID: ${id}`);
    console.log("[PAGE] useStudyDeck의 toggleFav 함수를 호출합니다.");
    toggleFav(id);
  }, [toggleFav]);


  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    if (flipped) {
      t = setTimeout(() => setShowForms(true), 220);
    } else {
      setShowForms(false);
      setExpanded(false);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [flipped]);

  const studyDeck = useMemo(() => {
    const favFiltered = onlyFavs ? deck.filter((v) => favs[v.id]) : deck;
    const activeJlptLevels = (Object.keys(jlptFilters) as JlptFilterKey[]).filter(
      (key) => jlptFilters[key]
    );

    if (
      activeJlptLevels.length === 0 ||
      activeJlptLevels.length === Object.keys(JLPT_FILTERS).length
    ) {
      return favFiltered;
    }

    const activeJlptNumbers = activeJlptLevels.map((level) =>
      Number(level.replace("N", ""))
    );

    return favFiltered.filter((verb) => {
      const rawJlpt = verb.jlpt;
      if (rawJlpt === undefined || rawJlpt === null) return false;

      if (typeof rawJlpt === "number") {
        return activeJlptNumbers.includes(rawJlpt);
      }

      const normalized = String(rawJlpt).toUpperCase().trim();
      const numberPart = normalized.startsWith("N")
        ? normalized.slice(1)
        : normalized;
      const parsed = Number(numberPart);

      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 5) return false;
      return activeJlptNumbers.includes(parsed);
    });
  }, [deck, onlyFavs, favs, jlptFilters]);

  useEffect(() => {
    if (index >= studyDeck.length && studyDeck.length > 0) {
      setIndex(0);
    }
  }, [studyDeck, index]);

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

  const resetCardState = useCallback(() => {
    setFlipped(false);
    setIsWritingMode(false);
  }, []);

  const next = useCallback(() => {
    const deckSize = Math.max(1, studyDeck.length);
    setIndex((i) => (i + 1) % deckSize);
    resetCardState();
  }, [studyDeck.length, resetCardState]);

  const prev = useCallback(() => {
    const deckSize = Math.max(1, studyDeck.length);
    setIndex((i) => (i - 1 + deckSize) % deckSize);
    resetCardState();
  }, [studyDeck.length, resetCardState]);

  const shuffle = useCallback(() => {
    shuffleDeck();
    setIndex(0);
    resetCardState();
  }, [shuffleDeck, resetCardState]);

  const reset = useCallback(() => {
    resetDeckToInitial();
    setIndex(0);
    resetCardState();
    setGridFlippedStates({});
    setCurrentPage(1);
  }, [resetDeckToInitial, resetCardState]);

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
    enabled: Boolean(user) && !isLoading && studyDeck.length > 0,
    observedCardIds: viewMode === "single" ? (current ? [current.id] : []) : currentCards.map((card) => card.id),
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isWritingMode) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (viewMode !== "single") return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onFlip();
      } else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [viewMode, onFlip, next, prev, isWritingMode]);

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
  const shouldShowInlineAd = viewportWidth !== null && viewportWidth < INLINE_CONTENT_AD_MAX_WIDTH;
  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <div className="page-loader-spinner" role="status" aria-label="loading"></div>
      </div>
    );
  }

  const speakCurrent = () => {
    if (!current || !ttsReady || !isTtsSupported) return;
    speakJa(current.reading || current.kanji);
  };

  const subject = STUDY_LABELS[deckType] ?? "일본어 동사 학습";

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6"
      style={{ fontFamily: fontStack }}
    >
      <header className="w-full max-w-md mx-auto mb-1">
        <WelcomeBanner name={user?.nickname || undefined} subject={subject} />
      </header>

      {!user && <LoginPromptCard onLoginClick={() => open("login")} />}

      {viewMode === "single" && (
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
          <span className="text-muted-foreground">
            ⚡진행률 :{" "}
            {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}
          </span>
          {mounted && (
            <Button size="sm" variant="outline" onClick={speakCurrent} disabled={!ttsReady || !current} title="읽어주기">
              🔊 듣기 (동사)
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={() => setShowSettings(true)} aria-haspopup="dialog" aria-expanded={showSettings} title="설정">
            ⚙️ 설정
          </Button>
          <SettingsDialog open={showSettings} onOpenChange={setShowSettings} user={user} deckType={deckType} isTtsSupported={isTtsSupported} selectedVoice={selectedVoice} selectVoice={selectVoice} voices={voices} isSafari={isSafari} fontFamily={fontFamily} setFontFamily={setFontFamily} resetDeck={reset} sentenceFontSize={verbFontSize} setSentenceFontSize={setVerbFontSize} />
        </div>
      )}

      {!isLoading && error && studyDeck.length > 0 && (
        <div className="w-full max-w-md mb-4 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          원격 데이터 연결에 실패하여 기본 동사 데이터로 학습 중입니다.
        </div>
      )}

      <div className="w-full max-w-md mx-auto mb-4 p-3 bg-card border border-border rounded-lg flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
        <span className="font-semibold mr-4">JLPT 레벨:</span>
        {(Object.keys(JLPT_FILTERS) as JlptFilterKey[]).map((level) => (
          <label key={level} className="flex items-center space-x-2 cursor-pointer">
            <Checkbox
              id={`verbs-${level}`}
              checked={jlptFilters[level]}
              disabled={!user}
              onCheckedChange={() => handleJlptFilterChange(level)}
            />
            <span>{JLPT_FILTERS[level]}</span>
          </label>
        ))}
      </div>

      <main className="w-full max-w-5xl select-none">
        {isLoading ? (
          <VerbCardSkeleton />
        ) : error && studyDeck.length === 0 ? (
           <div className="text-center p-10 bg-destructive/10 border border-destructive/20 rounded-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-destructive mb-2">데이터 로딩 실패</h3>
            <p className="text-destructive/80 text-sm">
              데이터를 불러오는 데 문제가 발생했습니다. <br />
              잠시 후 다시 시도해 주세요.
            </p>
          </div>
        ) : (
          <>
            {viewMode === "single" ? (
              studyDeck.length === 0 ? (
                <EmptyDeckMessage viewMode="single" />
              ) : current ? (
                <>
                  <VerbCardView
                    verb={current}
                    isFlipped={flipped}
                    isFav={!!favs[current.id]}
                    onFlip={onFlip}
                    // [핵심 수정] 새로 만든 핸들러 함수를 props로 전달합니다.
                    onToggleFav={() => handleToggleFav(current.id)}
                    titleFontSize={verbFontSize}
                    isWritingMode={isWritingMode}
                    onToggleWritingMode={() => setIsWritingMode((w) => !w)}
                    onNext={next}
                    onPrev={prev}
                    onShuffle={shuffle}
                    onReset={reset}
                  />
                  {showForms && !isWritingMode && (
                    <VerbFormsTable
                      verb={current}
                      expanded={expanded}
                      onToggleExpand={() => setExpanded((v) => !v)}
                      onSpeakExample={speakJa}
                      canSpeak={mounted && isTtsSupported && ttsReady}
                      contentFontSize={Math.min(22, Math.max(12, Math.round(verbFontSize * 0.6)))}
                    />
                  )}
                </>
              ) : null
            ) : studyDeck.length === 0 ? (
              <EmptyDeckMessage viewMode="grid" />
            ) : (
              <VerbGridMode
                verbs={currentCards}
                favs={favs}
                flippedStates={gridFlippedStates}
                // [핵심 수정] 그리드 뷰에도 동일한 핸들러를 적용합니다.
                onToggleFav={handleToggleFav}
                onToggleCardFlip={(id) => toggleGridCardFlip(id as number)}
                page={{
                  current: currentPage,
                  total: totalPages,
                  onPrev: goToPrevPage,
                  onNext: goToNextPage,
                }}
                titleFontSize={verbFontSize}
                readingFontSize={Math.min(24, Math.max(14, Math.round(verbFontSize - 2)))}
                meaningFontSize={Math.min(20, Math.max(12, Math.round(verbFontSize * 0.8)))}
              />
            )}
          </>
        )}
      </main>

      {!isLoading && viewMode === "single" && !isWritingMode && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <CardControls onPrev={prev} onNext={next} onShuffle={shuffle} onReset={reset} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
        <Button
          variant="outline"
          onClick={() => {
            setViewMode((p) => (p === "single" ? "grid" : "single"));
            setFlipped(false);
            setIsWritingMode(false);
          }}
        >
          {viewMode === "single" ? "여러 장 모아보기" : "한 장씩 학습하기"}
        </Button>

        {user && (
          <label className="flex items-center gap-3 px-3 py-2 rounded-xl border border-border bg-card">
            <span className="text-foreground font-semibold">⭐ Only</span>
            <Switch
              checked={onlyFavs}
              onCheckedChange={(on) => {
                setOnlyFavs(on);
                setFlipped(false);
                setCurrentPage(1);
              }}
            />
          </label>
        )}
      </div>

      {!isLoading && viewMode === "single" && !isWritingMode && (
        <>
          {shouldShowInlineAd ? (
              <div className="w-full max-w-md mx-auto mt-6 flex justify-center">
                <KakaoAdFit adUnit={mobileInlineAdUnit} width={300} height={250} />
              </div>
            ) : null}
          <footer className="w-full max-w-md mx-auto mt-6 text-sm text-muted-foreground bg-card/50 border border-border rounded-xl px-4 py-3">
            <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
              <li>⚙️설정에서 TTS Voice, Font를 조절할 수 있습니다.</li>
              <li>
                키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음
              </li>
              <li>쓰기 모드를 통해 한자를 써서 학습 해보세요.</li>
            </ul>
          </footer>

        </>
      )}
    </div>
  );
}
