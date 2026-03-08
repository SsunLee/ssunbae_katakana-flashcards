// app/study/japanese/katakana-words/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";

// UI
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
import { Skeleton } from "@/app/components/ui/skeleton";

// 데이터/훅/상수
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { useStudySessionAnalytics } from "@/app/hooks/useStudySessionAnalytics";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { WORDS as KATAKANA_WORDS, type Word } from "@/app/data/words";
import { FONT_STACKS } from "@/app/constants/fonts";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { useMounted } from '@/app/hooks/useMounted';
import { fetchWords, isRemoteStudyApiEnabled } from "@/app/services/api";
import { INLINE_CONTENT_AD_MAX_WIDTH, normalizeAdUnit, resolveAdUnit } from "@/app/lib/kakao-adfit";

// error message
import { FOOTER_TEXTS } from "@/app/constants/message";


/** 페이지 공통 상수/타입 */
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

function mergeLocalAndRemoteWords(localWords: Word[], remoteWords: Word[]): Word[] {
  const localIds = new Set(localWords.map((word) => word.id));
  const merged = [...localWords];
  for (const remoteWord of remoteWords) {
    if (!localIds.has(remoteWord.id)) {
      merged.push(remoteWord);
    }
  }
  return merged;
}

export default function KatakanaWordsPage() {


  /** 고정값 */
  const initialDeck = KATAKANA_WORDS;
  const deckType = "katakana-words";

  const [wordFontSize, setwordFontSize] = useState(50);

  /** 사용자/모달 */
  const { user } = useAuth();
  const { open } = useAuthModal();

  // useStudyDeck effect dependency 안정화를 위해 fetch 함수를 고정합니다.
  const fetchKatakanaWords = useCallback(async () => {
    const remoteWords = await fetchWords();
    return mergeLocalAndRemoteWords(KATAKANA_WORDS, remoteWords);
  }, []);

  /** Firestore 연동 덱 상태 (즐겨찾기까지 포함) */
  const {
    deck,
    favs,
    toggleFav,
    shuffleDeck,
    resetDeckToInitial,
    isLoading,
    error,
  } = useStudyDeck<Word>({
    user,
    deckType,
    initialDeck,
    fetchDeckData: isRemoteStudyApiEnabled ? fetchKatakanaWords : undefined,
  });

  /** 뷰 상태 */
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [jlptFilters, setJlptFilters] = useState<Record<JlptFilterKey, boolean>>({
    N5: true,
    N4: true,
    N3: true,
    N2: true,
    N1: true,
  });
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const defaultMobileInlineAdUnit = normalizeAdUnit("DAN-QMVosjDRN8zEUBnf");
  const mobileInlineAdUnit = resolveAdUnit(
    [process.env.NEXT_PUBLIC_KAKAO_ADFIT_MOBILE_UNIT, process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT],
    defaultMobileInlineAdUnit
  );

  /** 그리드 카드 뒤집기 */
  const toggleGridCardFlip = (id: number) =>
    setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));

  /** 즐겨찾기 필터 적용된 학습 덱 */
  const studyDeck = useMemo(() => {
    const favFiltered = onlyFavs ? deck.filter((w) => favs[w.id]) : deck;
    const activeJlptLevels = (Object.keys(JLPT_FILTERS) as JlptFilterKey[]).filter(
      (key) => jlptFilters[key]
    );

    if (activeJlptLevels.length === 0) return [];
    if (activeJlptLevels.length === Object.keys(JLPT_FILTERS).length) return favFiltered;

    const levelSet = new Set(activeJlptLevels);
    return favFiltered.filter((word) => word.jlpt && levelSet.has(word.jlpt));
  }, [deck, onlyFavs, favs, jlptFilters]);

  /** 그리드 페이징 계산 */
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

  const handleJlptFilterChange = (level: JlptFilterKey) => {
    setJlptFilters((prev) => ({ ...prev, [level]: !prev[level] }));
    setIndex(0);
    setFlipped(false);
    setCurrentPage(1);
  };


  /** 단일 카드 조작 */
  const onFlip = useCallback(() => setFlipped((f) => !f), []);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(1, studyDeck.length));
    setFlipped(false);
  }, [studyDeck.length]);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + Math.max(1, studyDeck.length)) % Math.max(1, studyDeck.length));
    setFlipped(false);
  }, [studyDeck.length]);

  /** 덱 조작 */
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

  /** 음성(TTS) */
  const {
    isSupported: isTtsSupported,
    speakJa,
    selectedVoice,
    voices,
    selectVoice,
    isSafari,
  } = useJaSpeech();

  /** 현재 카드 & 폰트 */
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

  /** 키보드 단축키 */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
  const shouldShowInlineAd = viewportWidth !== null && viewportWidth < INLINE_CONTENT_AD_MAX_WIDTH;
  
  if (!mounted) {
    return (
      // ✅ 로딩 상태도 테마에 맞게 변경
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <span className="text-foreground">로딩 중...</span>
      </div>
    );
  }

  return (
    // ✅ 배경 그라데이션과 고정 텍스트 색상을 제거합니다. 상위 레이아웃에서 배경과 텍스트 색상을 지정합니다.
    <div
      className="min-h-screen w-full flex flex-col items-center p-6"
      style={{ fontFamily: fontStack }}
    >
      {/* 환영 배너 */}
      <header className="w-full max-w-md mx-auto mb-1">
        <WelcomeBanner name={user?.nickname || undefined} subject={STUDY_LABELS[deckType]}/>
      </header>

      {/* 비로그인 안내 카드 */}
      {!user && (
          <LoginPromptCard
            onLoginClick={() => open("login")}
          />
      )}

      {/* 상단 컨트롤: 진행률 / 듣기 / 설정 */}
      {viewMode === "single" && (
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
          {/* ✅ text-muted-foreground로 변경 */}
          <span className="text-muted-foreground">
            ⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}
          </span>

          {mounted && (
            <Button
              size="sm"
              variant="outline" // ✅ variant="outline"을 사용하면 테마에 따라 스타일이 자동 적용됩니다.
              onClick={() => speakJa(current?.furigana)}
              disabled={!isTtsSupported}
            >
              🔊 듣기 (ふりがな)
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline" // ✅ variant="outline" 사용
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
            wordFontSize={wordFontSize}
            setWordFontSize={setwordFontSize}
            resetDeck={reset}
          />
        </div>
      )}
      {!isLoading && error && studyDeck.length > 0 && (
        <div className="w-full max-w-md mb-4 rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          원격 단어 데이터 연결에 실패하여 기본 100개 데이터로 학습 중입니다.
        </div>
      )}
      <div className="w-full max-w-md mx-auto mb-4 p-3 bg-card border border-border rounded-lg overflow-x-auto text-sm">
        <div className="mx-auto flex w-max items-center gap-2 whitespace-nowrap">
          <span className="font-semibold">JLPT:</span>
          {(Object.keys(JLPT_FILTERS) as JlptFilterKey[]).map((level) => (
            <label key={level} className="flex shrink-0 items-center space-x-1.5 cursor-pointer">
              <Checkbox
                id={`katakana-words-${level}`}
                checked={jlptFilters[level]}
                disabled={!user}
                onCheckedChange={() => handleJlptFilterChange(level)}
              />
              <span>{JLPT_FILTERS[level]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 메인 카드 영역 */}
      <main className="w-full max-w-5xl select-none">
        {isLoading ? (
          <div className="w-full max-w-md mx-auto space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-64 w-full rounded-2xl" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : error && studyDeck.length === 0 ? (
          <div className="text-center p-10 bg-destructive/10 border border-destructive/20 rounded-lg max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-destructive mb-2">데이터 로딩 실패</h3>
            <p className="text-destructive/80 text-sm">
              데이터를 불러오는 데 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </p>
          </div>
        ) : viewMode === "single" ? (
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
                fontSize={wordFontSize}
              />
            )
          )
        ) : (
          <>
            {studyDeck.length === 0 ? (
              <EmptyDeckMessage viewMode="grid" />
            ) : (
              <GridCardView
                variant="words"
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
          </>
        )}
      </main>

      {/* 하단 컨트롤(단일 카드 모드) */}
      {!isLoading && viewMode === "single" && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <CardControls onPrev={prev} onNext={next} onShuffle={shuffle} onReset={reset} />
        </div>
      )}

      {/* 보기 전환 & Only Favs */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
        {user && (
          <Button
            variant="outline" // ✅ variant="outline" 사용
            onClick={() => {
              setViewMode((p) => (p === "single" ? "grid" : "single"));
              setFlipped(false);
            }}
          >
            {viewMode === "single" ? "여러 장 모아보기" : "한 장씩 학습하기"}
          </Button>
        )}
        {/* ✅ 배경, 테두리, 텍스트 색상을 테마에 맞게 변경 */}
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
      
      {/* 안내/버전 */}
      {/* ✅ 배경, 텍스트 색상을 테마에 맞게 변경 */}
      {!isLoading && (
      <footer className="w-full max-w-md mx-auto mt-6 text-sm text-muted-foreground bg-card/50 border border-border rounded-xl px-4 py-3">
        <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
          <li>{FOOTER_TEXTS.GUIDE_TTS_FONT}</li>
          <li>기본 단어 100개와 원격 단어 데이터를 함께 사용합니다.</li>
          <li>
            {FOOTER_TEXTS.KEYBOARD_GUIDE.PREFIX}
            <kbd>Enter</kbd>
            {FOOTER_TEXTS.KEYBOARD_GUIDE.ENTER}
            <kbd>←/→</kbd>
            {FOOTER_TEXTS.KEYBOARD_GUIDE.ARROWS}
          </li>
        </ul>
      </footer>
      )}


    </div>
  );
}
