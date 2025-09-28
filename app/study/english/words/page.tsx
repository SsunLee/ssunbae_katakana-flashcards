// app/study/english/words/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";

// UI Components
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import { EnglishSingleCardView } from "@/app/components/EnglishSingleCardView";
import { GridCardView } from "@/app/components/GridCardView";
import CardControls from "@/app/components/controls/CardControls";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";

// Data, Hooks, Constants
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { useEnSpeech } from "@/app/hooks/useEnSpeech";
import { ENGLISH_WORDS, type EnglishWord } from "@/app/data/english-words";
import { FONT_STACKS } from "@/app/constants/fonts";
import { APP_VERSION } from "@/app/constants/appConfig";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { useContentImporter } from "@/app/hooks/useContentImporter";
import { fetchGeneratedContent } from "@/app/services/wordService";
import { useMounted } from "@/app/hooks/useMounted";
import { ERROR_MESSAGES } from "@/app/constants/message";

const CARDS_PER_PAGE = 10;
type ViewMode = "single" | "grid";

export default function EnglishWordsPage() {
  const initialDeck = ENGLISH_WORDS;
  const deckType = "english-words"; 

  const { user } = useAuth();
  const { open } = useAuthModal();

  const { deck, favs, toggleFav, shuffleDeck, resetDeckToInitial, setDeck } = useStudyDeck<EnglishWord>({ user, deckType, initialDeck });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Inter");
  const [wordFontSize, setWordFontSize] = useState(48);
  
  const { isSupported: isTtsSupported, ready: ttsReady, speakEn, selectedVoice, voices, selectVoice, isSafari } = useEnSpeech();

  const [topic, setTopic] = useState("일상 회화");
  const [wordCount, setWordCount] = useState<number>(10);
  const [loadingImport, setLoadingImport] = useState(false);

  const toggleGridCardFlip = (id: number) => setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));

  const studyDeck = useMemo(() => {
    return onlyFavs ? deck.filter((w) => favs[w.id]) : deck;
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
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(1, studyDeck.length));
    setFlipped(false);
  }, [studyDeck.length]);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + Math.max(1, studyDeck.length)) % Math.max(1, studyDeck.length));
    setFlipped(false);
  }, [studyDeck.length]);

  const shuffle = () => { shuffleDeck(); setIndex(0); setFlipped(false); };
  const reset = () => { resetDeckToInitial(); setIndex(0); setFlipped(false); setFlippedStates({}); setCurrentPage(1); };

  const { importContent } = useContentImporter<EnglishWord>({
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

  const current = studyDeck[index] ?? null;
  const fontStack = useMemo(() => FONT_STACKS[fontFamily] || fontFamily, [fontFamily]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (viewMode !== "single") return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onFlip(); } 
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [viewMode, onFlip, next, prev]);

  const mounted = useMounted();
  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>
      <header className="w-full max-w-md mx-auto mb-1">
        <WelcomeBanner name={user?.nickname || undefined} subject={STUDY_LABELS[deckType]}/>
      </header>

      {!user && <LoginPromptCard onLoginClick={() => open("login")} />}

      {viewMode === "single" && (
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
          <span className="text-muted-foreground">
            ⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}
          </span>
          
          {isTtsSupported && (
            <Button size="sm" variant="outline" onClick={() => speakEn(current?.word || "")} disabled={!ttsReady || !current}>
              🔊 듣기 (Word)
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
            topic={topic}
            setTopic={setTopic}
            wordCount={wordCount}
            setWordCount={setWordCount}
            loadingImport={loadingImport}
            importContent={importContent}
            resetDeck={reset}
            wordFontSize={wordFontSize}
            setWordFontSize={setWordFontSize}
          />
        </div>
      )}

      <main className="w-full max-w-5xl select-none">
        {viewMode === "single" ? (
          studyDeck.length === 0 ? <EmptyDeckMessage viewMode="single" /> : (
            current && 
            <EnglishSingleCardView 
              key={current.id} 
              card={current} 
              isFlipped={flipped} 
              isFav={!!favs[current.id]} 
              onFlip={onFlip} 
              onToggleFav={() => toggleFav(current.id)}
              wordFontSize={wordFontSize}
            />
          )
        ) : (
          studyDeck.length === 0 ? <EmptyDeckMessage viewMode="grid" /> : (
            <GridCardView
              variant="words"
              cards={currentCards.map(c => ({ id: c.id, katakana: c.word, furigana: c.pronunciation, answer: c.meaning, emoji: '📝' }))}
              favs={favs}
              flippedStates={flippedStates}
              onToggleFav={(id) => toggleFav(id as number)}
              onToggleCardFlip={toggleGridCardFlip}
              page={{ current: currentPage, total: totalPages, onPrev: goToPrevPage, onNext: goToNextPage }}
            />
          )
        )}
      </main>

      {viewMode === "single" && (
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
        <label className="flex items-center gap-3 px-3 py-2 rounded-xl border border-border bg-card">
          <span className="text-foreground font-semibold">⭐ Only</span>
          <Switch checked={onlyFavs} onCheckedChange={(on) => { setOnlyFavs(on); setIndex(0); setFlipped(false); setCurrentPage(1); }} />
        </label>
      </div>

      <footer className="w-full max-w-md mx-auto mt-6 text-sm text-muted-foreground bg-card/50 border border-border rounded-xl px-4 py-3">
        <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
          <li>⚙️설정에서 TTS Voice, Font, 폰트 크기를 조절할 수 있습니다.</li>
          <li>⚙️설정에서 AI 단어 추가 학습을 할 수 있습니다.</li>
          <li>키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
        </ul>
      </footer>

      <div className="mt-4 text-center">
        <span className="text-muted-foreground/60 text-xs">영어 공부 v{APP_VERSION}</span>
      </div>
    </div>
  );
}
