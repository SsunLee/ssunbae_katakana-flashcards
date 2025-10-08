// app/study/japanese/kanji/page.tsx

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";

// UI
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import { KanjiSingleCardView } from "@/app/components/KanjiSingleCardView";
import { GridCardView } from "@/app/components/GridCardView";
import CardControls from "@/app/components/controls/CardControls";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import { Skeleton } from "@/app/components/ui/skeleton";

// 데이터/훅/상수 임포트 수정
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { useRemoteStudyDeck } from "@/app/hooks/useRemoteStudyDeck";
import { KANJI_WORDS as fallbackKanji, type Kanji } from "@/app/data/kanji";
import { fetchKanji } from "@/app/services/api"; // ✨ API 호출 함수 임포트 경로를 수정합니다.
import { FONT_STACKS } from "@/app/constants/fonts";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { useMounted } from '@/app/hooks/useMounted';

// JLPT 필터 관련 상수 정의
const JLPT_FILTERS = {
  'N5': 'N5', 'N4': 'N4', 'N3': 'N3', 'N2': 'N2', 'N1': 'N1',
};
type JlptFilterKey = keyof typeof JLPT_FILTERS;


const CARDS_PER_PAGE = 10;
type ViewMode = "single" | "grid";

export default function KanjiPage() {
  const deckType = "japanese-kanji";
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
  } = useRemoteStudyDeck<Kanji>({
    user,
    deckType,
    fetchData: fetchKanji,
    fallbackData: fallbackKanji,
  });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");
  const [kanjiFontSize, setKanjiFontSize] = useState(48);
  const [isWritingMode, setIsWritingMode] = useState(false);
  const { isSupported: isTtsSupported, ready: ttsReady, speakJa, selectedVoice, voices, selectVoice, isSafari } = useJaSpeech();

  const [jlptFilters, setJlptFilters] = useState<Record<JlptFilterKey, boolean>>({
    N5: true, N4: true, N3: true, N2: true, N1: true,
  });

  const [gridFlippedStates, setGridFlippedStates] = useState<Record<number, boolean>>({});
  const toggleGridCardFlip = (id: number) =>
  setGridFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  
  const handleJlptFilterChange = (level: JlptFilterKey) => {
    setJlptFilters(prev => ({ ...prev, [level]: !prev[level] }));
    setIndex(0);
    setFlipped(false);
    setCurrentPage(1);
    setOnlyFavs(false); 
  };

  const studyDeck = useMemo(() => {
    const favFiltered = onlyFavs ? deck.filter((w) => favs[w.id]) : deck;
    const activeJlptLevels = (Object.keys(jlptFilters) as JlptFilterKey[])
      .filter(key => jlptFilters[key]);
    if (activeJlptLevels.length === 0 || activeJlptLevels.length === Object.keys(JLPT_FILTERS).length) {
      return favFiltered;
    }
    const activeJlptNumbers = activeJlptLevels.map(level => parseInt(level.replace('N', '')));
    return favFiltered.filter(kanji => kanji.jlpt && activeJlptNumbers.includes(kanji.jlpt));
  }, [deck, onlyFavs, favs, jlptFilters]);

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

  const shuffle = () => { shuffleDeck(); setIndex(0); setFlipped(false); };
  const reset = () => { resetDeckToInitial(); setIndex(0); setFlipped(false); setCurrentPage(1); };

  const handleShuffleInWriting = () => {
    shuffle();
    setIsWritingMode(false);
  };

  const handleResetInWriting = () => {
    reset();
    setIsWritingMode(false);
  };

  const current = studyDeck[index] ?? null;
  const fontStack = useMemo(() => FONT_STACKS[fontFamily] || FONT_STACKS["Noto Sans JP"], [fontFamily]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || isWritingMode) return;
      if (viewMode !== "single") return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onFlip(); }
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [viewMode, onFlip, next, prev, isWritingMode]);

  const mounted = useMounted();
  const canTts = mounted && typeof window !== "undefined" && "speechSynthesis" in window;
  
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center p-6">
        <Skeleton className="h-10 w-full max-w-md mb-4" />
        <Skeleton className="h-20 w-full max-w-md mb-4" />
        <Skeleton className="w-full max-w-md h-96" />
      </div>
    );
  }
  
  if (error) {
    return <div className="min-h-screen w-full flex items-center justify-center">데이터를 불러오는 데 실패했습니다: {error}</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>
      <header className="w-full max-w-md mx-auto mb-1">
        <WelcomeBanner name={user?.nickname || undefined} subject={STUDY_LABELS[deckType]}/>
      </header>

      <div className="w-full max-w-md mx-auto mb-4 p-3 bg-card border border-border rounded-lg flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
        <span className="font-semibold mr-4">JLPT 레벨:</span>
        {(Object.keys(JLPT_FILTERS) as JlptFilterKey[]).map((level) => (
          <label key={level} className="flex items-center space-x-2 cursor-pointer">
            <Checkbox id={level} checked={jlptFilters[level]} onCheckedChange={() => handleJlptFilterChange(level)} />
            <span>{JLPT_FILTERS[level]}</span>
          </label>
        ))}
      </div>

      {!user && <LoginPromptCard onLoginClick={() => open("login")} />}

      {viewMode === "single" && (
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
          <span className="text-muted-foreground">
            ⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}
          </span>
          
          {canTts && (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => speakJa(current?.onyomi || "")} disabled={!ttsReady || !current || !current.onyomi}>
                🔊 음독
              </Button>
              <Button size="sm" variant="outline" onClick={() => speakJa(current?.kunyomi || "")} disabled={!ttsReady || !current || !current.kunyomi}>
                🔊 훈독
              </Button>
            </div>
          )}

          <Button size="sm" variant="outline" onClick={() => setShowSettings(true)}>⚙️ 설정</Button>

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
            wordFontSize={kanjiFontSize}
            setWordFontSize={setKanjiFontSize}
            resetDeck={reset}
          />
        </div>
      )}

      <main className="w-full max-w-5xl select-none">
        {viewMode === "single" ? (
          studyDeck.length === 0 ? <EmptyDeckMessage viewMode="single" /> : (
            current && 
            <KanjiSingleCardView 
              key={current.id} 
              card={current} 
              isFlipped={flipped} 
              isFav={!!favs[current.id]} 
              onFlip={onFlip} 
              onToggleFav={() => toggleFav(current.id)}
              kanjiFontSize={kanjiFontSize}
              isWritingMode={isWritingMode}
              onToggleWritingMode={() => setIsWritingMode((w) => !w)}
              onNext={next}
              onPrev={prev}
              onShuffle={handleShuffleInWriting}
              onReset={handleResetInWriting}              
            />
          )
        ) : (
          studyDeck.length === 0 ? <EmptyDeckMessage viewMode="grid" /> : (
            <GridCardView
              variant="words"
              cards={currentCards.map(c => ({ id: c.id, katakana: c.kanji, furigana: c.onyomi, answer: c.meaning, emoji: '🀄' }))}
              favs={favs}
              flippedStates={gridFlippedStates}
              onToggleFav={(id) => toggleFav(id as number)}
              onToggleCardFlip={toggleGridCardFlip}
              page={{ current: currentPage, total: totalPages, onPrev: goToPrevPage, onNext: goToNextPage }}
            />
          )
        )}
      </main>

      {viewMode === "single" && !isWritingMode && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <CardControls onPrev={prev} onNext={next} onShuffle={shuffle} onReset={reset} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
        {user && (
          <Button variant="outline" onClick={() => { setViewMode((p) => (p === "single" ? "grid" : "single")); setFlipped(false); }}>
            {viewMode === "single" ? "여러 장 모아보기" : "한 장씩 학습하기"}
          </Button>
        )}
        <label className="flex items-center space-x-2 cursor-pointer p-3 border rounded-lg bg-card hover:bg-accent hover:text-accent-foreground">
            <Checkbox
              id="only-favs-checkbox"
              checked={onlyFavs}
              onCheckedChange={(checked) => {
                setOnlyFavs(Boolean(checked));
                setIndex(0);
                setFlipped(false);
                setCurrentPage(1);
              }}
            />
            <span className="font-semibold">⭐ 즐겨찾기만 보기</span>
          </label>
      </div>

      <footer className="w-full max-w-md mx-auto mt-6 text-sm text-muted-foreground bg-card/so border border-border rounded-xl px-4 py-3">
        <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
          <li>⚙️설정에서 TTS Voice, Font, 한자 폰트 크기를 조절할 수 있습니다.</li>
          <li>키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
          <li><b>음독(音読み):</b> 한자의 중국 발음에서 유래한 읽기 방법.</li>
          <li><b>훈독(訓読み):</b> 한자의 뜻에 해당하는 일본 고유의 말을 붙여 읽는 방법.</li>
        </ul>
      </footer>
    </div>
  );
}

