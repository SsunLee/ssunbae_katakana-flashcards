// app/study/japanese/katakana-words/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";

// UI
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import { SingleCardView } from "@/app/components/SingleCardView";
import { GridCardView } from "@/app/components/GridCardView";
import CardControls from "@/app/components/controls/CardControls";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import { toast } from 'sonner'
import KakaoAdFit from "@/app/components/KakaoAdFit";

// 데이터/훅/상수
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { WORDS as KATAKANA_WORDS, type Word } from "@/app/data/words";
import { FONT_STACKS } from "@/app/constants/fonts";
import { APP_VERSION } from "@/app/constants/appConfig";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { useMounted } from '@/app/hooks/useMounted';
import { useContentImporter } from "@/app/hooks/useContentImporter";
import { fetchGeneratedContent } from "@/app/services/wordService";
import { normalizeAdUnit, resolveAdUnit } from "@/app/lib/kakao-adfit";

// error message
import { ERROR_MESSAGES, SUCCESS_MESSAGES, FOOTER_TEXTS } from "@/app/constants/message";


/** 페이지 공통 상수/타입 */
const CARDS_PER_PAGE = 10 as const;
type ViewMode = "single" | "grid";

export default function KatakanaWordsPage() {


  /** 고정값 */
  const initialDeck = KATAKANA_WORDS;
  const deckType = "katakana-words";

  const [wordFontSize, setwordFontSize] = useState(50);

  /** 사용자/모달 */
  const { user } = useAuth();
  const { open } = useAuthModal();

  /** Firestore 연동 덱 상태 (즐겨찾기까지 포함) */
  const {
    deck,
    setDeck,
    favs,
    toggleFav,
    shuffleDeck,
    resetDeckToInitial,
  } = useStudyDeck<Word>({ user, deckType, initialDeck });

  /** 뷰 상태 */
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const defaultMobileInlineAdUnit = normalizeAdUnit("DAN-QMVosjDRN8zEUBnf");
  const mobileInlineAdUnit = resolveAdUnit(
    [process.env.NEXT_PUBLIC_KAKAO_ADFIT_MOBILE_UNIT, process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT],
    defaultMobileInlineAdUnit
  );


  
  /** 단어 생성 (AI) */
  const [topic, setTopic] = useState("일상 회화");
  const [wordCount, setWordCount] = useState<number>(10);
  const [loadingImport, setLoadingImport] = useState(false);

  /** 그리드 카드 뒤집기 */
  const toggleGridCardFlip = (id: number) =>
    setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));

  /** 즐겨찾기 필터 적용된 학습 덱 */
  const studyDeck = useMemo(() => {
    return onlyFavs ? deck.filter((w) => favs[w.id]) : deck;
  }, [deck, onlyFavs, favs]);

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

  // AI 콘텐츠 가져오기 함수 
  const { importContent } = useContentImporter<Word>({
    deckType,
    setDeck,
    setIndex,
    setFlipped,
    setFlippedStates,
    setCurrentPage,
    setLoadingImport,
    fetchGeneratedContent,
    errorFallback: ERROR_MESSAGES.CONTENT_GENERATION_FAILED,
  });


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
  const isMobileViewport = viewportWidth !== null && viewportWidth < 1340;
  
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
            topic={topic}
            setTopic={setTopic}
            wordCount={wordCount}
            setWordCount={setWordCount}
            loadingImport={loadingImport}
            importContent={importContent}
            wordFontSize={wordFontSize}
            setWordFontSize={setwordFontSize}
            resetDeck={reset}
          />
        </div>
      )}

      {/* 메인 카드 영역 */}
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
      {viewMode === "single" && (
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

      {isMobileViewport ? (
        <div className="w-full max-w-md mx-auto mt-6 flex justify-center">
          <KakaoAdFit adUnit={mobileInlineAdUnit} width={300} height={250} />
        </div>
      ) : null}
      
      {/* 안내/버전 */}
      {/* ✅ 배경, 텍스트 색상을 테마에 맞게 변경 */}
      <footer className="w-full max-w-md mx-auto mt-6 text-sm text-muted-foreground bg-card/50 border border-border rounded-xl px-4 py-3">
        <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
          <li>{FOOTER_TEXTS.GUIDE_TTS_FONT}</li>
          <li>{FOOTER_TEXTS.GUIDE_AI_STUDY}</li>
          <li>
            {FOOTER_TEXTS.KEYBOARD_GUIDE.PREFIX}
            <kbd>Enter</kbd>
            {FOOTER_TEXTS.KEYBOARD_GUIDE.ENTER}
            <kbd>←/→</kbd>
            {FOOTER_TEXTS.KEYBOARD_GUIDE.ARROWS}
          </li>
        </ul>
      </footer>


    </div>
  );
}
