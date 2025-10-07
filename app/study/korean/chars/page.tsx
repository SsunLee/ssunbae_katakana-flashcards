// app/study/korean/chars/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import KoreanCharCardView from "./components/KoreanCharCardView";
import KoreanCharGridMode from "./components/KoreanCharGridMode";
import { useAuth } from "@/app/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";

import { SettingsDialog } from "@/app/components/SettingsDialog";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import CardControls from "@/app/components/controls/CardControls";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import KoreanWritingCanvas from "@/app/components/KoreanWritingCanvas";

import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { KOREAN_CHARS, type KoreanChar } from "@/app/data/korean-chars";
import { FONT_STACKS } from "@/app/constants/fonts";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { useMounted } from "@/app/hooks/useMounted";

// 한글 낭독용 TTS 훅 (음원 선택 포함)
function useKoSpeech() {
  const [ttsReady, setTtsReady] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    function updateVoices() {
      const allVoices = window.speechSynthesis.getVoices();
      const koVoices = allVoices.filter(v => v.lang.startsWith("ko"));
      setVoices(koVoices);
      if (koVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(koVoices[0]);
      }
      setTtsReady(koVoices.length > 0);
    }
    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, [selectedVoice]);

  const speakKo = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "ko-KR";
    if (selectedVoice) utter.voice = selectedVoice;
    window.speechSynthesis.speak(utter);
  };
  const selectVoice = (voice: SpeechSynthesisVoice | null) => {
    setSelectedVoice(voice);
  };
  return { ttsReady, speakKo, voices, selectedVoice, selectVoice };
}

const CARDS_PER_PAGE = 12 as const;
type ViewMode = "single" | "grid";

export default function KoreanCharsPage() {
  const { ttsReady, speakKo, voices, selectedVoice, selectVoice } = useKoSpeech();
  const initialDeck = KOREAN_CHARS;
  const deckType = "korean-chars";

  const { user } = useAuth();
  const { open } = useAuthModal();

  const { deck, favs, toggleFav, shuffleDeck, resetDeckToInitial } =
    useStudyDeck<KoreanChar>({ user, deckType, initialDeck });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans KR");
  const [charFontSize, setCharFontSize] = useState<number>(96);
  const [isWritingMode, setIsWritingMode] = useState(false);

  const [gridFlippedStates, setGridFlippedStates] = useState<Record<number, boolean>>({});
  const toggleGridCardFlip = (id: number) => setGridFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));

  const studyDeck = useMemo(() => {
    return onlyFavs ? deck.filter((c) => favs[c.id]) : deck;
  }, [deck, onlyFavs, favs]);

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
    setIsWritingMode(false); 
    setCurrentPage(1);
  }, [resetDeckToInitial, resetCardState]);

  const current = studyDeck[index] ?? null;
  const fontStack = useMemo(() => FONT_STACKS[fontFamily] || FONT_STACKS["Noto Sans KR"], [fontFamily]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isWritingMode) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (viewMode !== "single") return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onFlip(); } 
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [viewMode, onFlip, next, prev, isWritingMode]);

  const mounted = useMounted();
  if (!mounted) { 
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <span className="text-foreground">로딩 중...</span>
      </div>
    ); 
  }

  const subject = STUDY_LABELS[deckType] ?? "한글 자모 학습";

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>
      <header className="w-full max-w-md mx-auto mb-1">
        <WelcomeBanner name={user?.nickname || undefined} subject={subject} />
      </header>

      {!user && <LoginPromptCard onLoginClick={() => open("login")} />}

      {viewMode === "single" && (
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
          {/* 진행상황 (좌) */}
          <span className="text-muted-foreground">
            ⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}
          </span>
          {/* 듣기 버튼 (가운데) */}
          <div className="flex-1 flex justify-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => speakKo(current?.char || "")}
              disabled={!ttsReady || !current}
              title="듣기"
            >
              🔊 듣기 (한글)
            </Button>
          </div>
          {/* 설정 (우) */}
          <div>
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
              isTtsSupported={ttsReady}
              selectedVoice={selectedVoice}
              selectVoice={selectVoice}
              voices={voices}
              isSafari={false}
              fontFamily={fontFamily}
              setFontFamily={setFontFamily}
              resetDeck={reset}
              wordFontSize={charFontSize}
              setWordFontSize={setCharFontSize}
            />
          </div>
        </div>
      )}

      <main className="w-full max-w-5xl select-none">
        {isWritingMode ? (
          <KoreanWritingCanvas
            word={current?.char || ""}
            expectedStrokes={current?.strokes}
            onClose={() => setIsWritingMode(false)}
            onNext={next}
            onPrev={prev}
            onShuffle={shuffle}
            onReset={reset}
          />
        ) : viewMode === "single" ? (
          studyDeck.length === 0 ? <EmptyDeckMessage viewMode="single" /> : current && (
            <KoreanCharCardView
              char={current}
              isFlipped={flipped}
              isFav={!!favs[current.id]}
              onFlip={onFlip}
              onToggleFav={() => toggleFav(current.id)}
              fontSize={charFontSize}
              onToggleWritingMode={() => setIsWritingMode(true)}
            />
          )
        ) : (
          studyDeck.length === 0 ? <EmptyDeckMessage viewMode="grid" /> : 
          <KoreanCharGridMode 
            chars={currentCards} 
            favs={favs}
            flippedStates={gridFlippedStates}
            onToggleFav={(id) => toggleFav(id as number)} 
            onToggleCardFlip={(id) => toggleGridCardFlip(id as number)} 
            page={{ current: currentPage, total: totalPages, onPrev: goToPrevPage, onNext: goToNextPage }} 
            fontSize={charFontSize} 
          />
        )}
      </main>

      {viewMode === "single" && !isWritingMode && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <CardControls onPrev={prev} onNext={next} onShuffle={shuffle} onReset={reset} />
        </div>
      )}
      
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
        {user && (
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

      {viewMode === "single" && !isWritingMode && (
        <footer className="w-full max-w-md mx-auto mt-6 text-sm text-muted-foreground bg-card/50 border border-border rounded-xl px-4 py-3">
          <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
            <li>⚙️설정에서 Font와 크기를 조절할 수 있습니다.</li>
            <li>키보드: Enter 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
            <li>✍️ 쓰기 모드로 한글을 직접 써보세요!</li>
          </ul>
        </footer>
      )}
    </div>
  );
}

// ...분리된 컴포넌트는 components/ 폴더로 이동...