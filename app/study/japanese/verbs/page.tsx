// app/study/japanese/verbs/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";

// UI & 컴포넌트
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import CardControls from "@/app/components/controls/CardControls";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import VerbCardView from "@/app/components/VerbCardView";
import VerbGridMode from "@/app/components/VerbGridcardView";
import VerbFormsTable from "@/app/components/VerbFormsTable";

// 데이터 & 훅 & 상수
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { VERBS, type Verb } from "@/app/data/verbs";
import { FONT_STACKS } from "@/app/constants/fonts";
import { APP_VERSION } from "@/app/constants/appConfig";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { useMounted } from "@/app/hooks/useMounted";

const CARDS_PER_PAGE = 10 as const;
type ViewMode = "single" | "grid";

export default function JapaneseVerbsPage() {
  const initialDeck = VERBS;
  const deckType = "japanese-verbs";

  const { user } = useAuth();
  const { open } = useAuthModal();

  const { deck, favs, toggleFav, shuffleDeck, resetDeckToInitial } =
    useStudyDeck<Verb>({ user, deckType, initialDeck });

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
  
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;
    if (flipped) {
      t = setTimeout(() => setShowForms(true), 220);
    } else {
      setShowForms(false);
      setExpanded(false);
    }
    return () => { if (t) clearTimeout(t); };
  }, [flipped]);

  const [gridFlippedStates, setGridFlippedStates] = useState<Record<number, boolean>>({});
  const toggleGridCardFlip = (id: number) => setGridFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));

  const studyDeck = useMemo(() => {
    return onlyFavs ? deck.filter((v) => favs[v.id]) : deck;
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
  
  const { isSupported: isTtsSupported, ready: ttsReady, speakJa, selectedVoice, voices, selectVoice, isSafari } = useJaSpeech();
  const current = studyDeck[index] ?? null;
  const fontStack = useMemo(() => FONT_STACKS[fontFamily] || FONT_STACKS["Noto Sans JP"], [fontFamily]);

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
  if (!mounted) { return <div className="min-h-screen w-full bg-background flex items-center justify-center"><span className="text-foreground">로딩 중...</span></div>; }

  const speakCurrent = () => { if (!current || !ttsReady || !isTtsSupported) return; speakJa(current.reading || current.kanji); };

  const subject = STUDY_LABELS[deckType] ?? "일본어 동사 학습";

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>
      <header className="w-full max-w-md mx-auto mb-1">
        <WelcomeBanner name={user?.nickname || undefined} subject={subject} />
      </header>

      {!user && <LoginPromptCard onLoginClick={() => open("login")} />}

      {viewMode === "single" && (
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
          <span className="text-muted-foreground">⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}</span>
          {mounted && <Button size="sm" variant="outline" onClick={speakCurrent} disabled={!ttsReady || !current} title="읽어주기">🔊 듣기 (동사)</Button>}
          <Button size="sm" variant="outline" onClick={() => setShowSettings(true)} aria-haspopup="dialog" aria-expanded={showSettings} title="설정">⚙️ 설정</Button>
          <SettingsDialog open={showSettings} onOpenChange={setShowSettings} user={user} deckType={deckType} isTtsSupported={isTtsSupported} selectedVoice={selectedVoice} selectVoice={selectVoice} voices={voices} isSafari={isSafari} fontFamily={fontFamily} setFontFamily={setFontFamily} resetDeck={reset} sentenceFontSize={verbFontSize} setSentenceFontSize={setVerbFontSize} />
        </div>
      )}

      <main className="w-full max-w-5xl select-none">
        {viewMode === "single" ? (
          studyDeck.length === 0 ? <EmptyDeckMessage viewMode="single" /> : current && (
            <>
              <VerbCardView
                verb={current}
                isFlipped={flipped}
                isFav={!!favs[current.id]}
                onFlip={onFlip}
                onToggleFav={() => toggleFav(current.id)}
                titleFontSize={verbFontSize}
                isWritingMode={isWritingMode}
                onToggleWritingMode={() => setIsWritingMode(w => !w)}
                onNext={next}
                onPrev={prev}
                onShuffle={shuffle}
                onReset={reset}
              />
              {showForms && !isWritingMode && (
                <VerbFormsTable verb={current} expanded={expanded} onToggleExpand={() => setExpanded(v => !v)} contentFontSize={Math.min(22, Math.max(12, Math.round(verbFontSize * 0.6)))} />
              )}
            </>
          )
        ) : (
          studyDeck.length === 0 ? <EmptyDeckMessage viewMode="grid" /> : 
          <VerbGridMode 
            verbs={currentCards} 
            favs={favs}
            flippedStates={gridFlippedStates}
            onToggleFav={(id) => toggleFav(id as number)} 
            onToggleCardFlip={(id) => toggleGridCardFlip(id as number)} 
            page={{ current: currentPage, total: totalPages, onPrev: goToPrevPage, onNext: goToNextPage, }} 
            titleFontSize={verbFontSize} 
            readingFontSize={Math.min(24, Math.max(14, Math.round(verbFontSize - 2)))} 
            meaningFontSize={Math.min(20, Math.max(12, Math.round(verbFontSize * 0.8)))} 
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
        <>
          <footer className="w-full max-w-md mx-auto mt-6 text-sm text-muted-foreground bg-card/50 border border-border rounded-xl px-4 py-3">
            <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
              <li>⚙️설정에서 TTS Voice, Font를 조절할 수 있습니다.</li>
              <li>키보드: Enter 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
              <li>쓰기 모드를 통해 한자를 써서 학습 해보세요. </li>
            </ul>
          </footer>
          <div className="mt-4 text-center">
            <span className="text-muted-foreground/60 text-xs"> 일본어 공부 v{APP_VERSION}{" "} <a href="https://github.com/SsunLee/ssunbae_katakana-flashcards" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 ml-1">쑨쑨배의 Github</a></span>
          </div>
        </>
      )}
    </div>
  );
}

