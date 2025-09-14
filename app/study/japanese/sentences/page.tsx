// app/study/japanese/sentences/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";

// UI
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import { GridCardView } from "@/app/components/GridCardView";
import CardControls from "@/app/components/controls/CardControls";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import { SentenceCardView } from "@/app/components/SentenceCardView"; // 새로 추가

// 데이터/훅/상수
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { SENTENCES, type Sentence } from "@/app/data/sentences"; // 새로 추가
import { FONT_STACKS } from "@/app/constants/fonts";
import { APP_VERSION } from "@/app/constants/appConfig";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { STUDY_LABELS } from "@/app/constants/studyLabels";

/** 페이지 공통 상수/타입 */
const CARDS_PER_PAGE = 10 as const;
type ViewMode = "single" | "grid";

export default function SentencesPage() {
  /** 고정값 */
  const initialDeck = SENTENCES;
  const deckType = "sentences"; // deckType 변경
  const pageLabel = "어려운 문장"; // 페이지 라벨 변경

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
  } = useStudyDeck<Sentence>({ user, deckType, initialDeck });

  /** 뷰 상태 */
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");
  const [fontSize, setFontSize] = useState(32); // 폰트 크기 상태 추가

  /** 단어 생성 (AI) - 이 페이지에서는 비활성화하거나 문장 생성으로 변경 필요 */
  const [topic, setTopic] = useState("일상회화");
  const [wordCount, setWordCount] = useState<number>(5);
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

  /** AI 생성 기능 (주석 처리 또는 문장 생성으로 로직 변경 필요) */
  async function importSentences(topic: string, count: number) {
    alert("문장 생성 기능은 아직 구현되지 않았습니다.");
    // setLoadingImport(true);
    // try {
    //   const newDeck = await fetchGeneratedSentences(topic, count);
    //   setDeck(newDeck);
    //   ...
    // }
  }

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
    ready: ttsReady,
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

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center p-6"
      style={{ fontFamily: fontStack }}
    >
      <header className="w-full max-w-md mx-auto mb-1">
        <WelcomeBanner name={user?.nickname} subject={STUDY_LABELS[deckType]} />
      </header>

      {!user && <LoginPromptCard onLoginClick={() => open("login")} />}

      {viewMode === "single" && (
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
          <span className="text-white/70">
            ⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}
          </span>
          {isTtsSupported && (
            <Button
              size="sm"
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10"
              onClick={() => speakJa(current?.sentence || "")}
              disabled={!ttsReady || !current}
            >
              🔊 듣기 (문장)
            </Button>
          )}
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
            importWordsFromServer={importSentences} // 함수 교체
            resetDeck={reset}
          />
        </div>
      )}

      <main className="w-full max-w-5xl select-none">
        {viewMode === "single" ? (
          studyDeck.length === 0 ? (
            <EmptyDeckMessage viewMode="single" />
          ) : (
            current && (
              <SentenceCardView // SingleCardView를 SentenceCardView로 교체
                key={current.id}
                card={current}
                isFlipped={flipped}
                isFav={!!favs[current.id]}
                onFlip={onFlip}
                onToggleFav={() => toggleFav(current.id)}
              />
            )
          )
        ) : (
          <>
            {studyDeck.length === 0 ? (
              <EmptyDeckMessage viewMode="grid" />
            ) : (
                // GridCardView는 단어에 최적화되어 있으므로, 문장용 variant를 추가하거나
                // 간단하게 문장만 표시하도록 수정이 필요할 수 있습니다.
              <GridCardView
                variant="words" // 'sentences' variant가 없으므로 'words'로 변경하여 타입 오류 해결
                cards={currentCards.map(c => ({
                  id: c.id,
                  // GridCardView의 `cards` prop은 `Word` 타입 객체를 기대합니다.
                  // `Sentence` 타입의 데이터를 `Word` 타입의 구조로 매핑해줍니다.
                  katakana: c.sentence, // `katakana`는 카드 앞면의 주 텍스트로 사용됩니다.
                  furigana: c.furigana,   // `furigana`는 보조 텍스트로 사용됩니다.
                  answer: c.translation,  // `answer`는 카드 뒷면의 텍스트로 사용됩니다.
                  emoji: '文',             // `emoji` 속성이 필요하므로 기본값을 추가합니다.
                }))}
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

      {viewMode === "single" && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <CardControls onPrev={prev} onNext={next} onShuffle={shuffle} onReset={reset} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
        {user && (
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10"
            onClick={() => {
              setViewMode((p) => (p === "single" ? "grid" : "single"));
              setFlipped(false);
            }}
          >
            {viewMode === "single" ? "여러 장 모아보기" : "한 장씩 학습하기"}
          </Button>
        )}
        <label className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 bg-white/5">
          <span className="text-white/80 font-semibold">⭐ Only</span>
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

      <footer className="w-full max-w-md mx-auto mt-6 text-sm text-white/70 bg-white/5 rounded-xl px-4 py-3">
        <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
          <li>카드 뒷면의 한자에 마우스를 올리면 뜻과 예문을 볼 수 있습니다.</li>
          <li>설정(⚙️)에서 폰트, TTS 음성을 변경할 수 있습니다.</li>
          <li>키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
        </ul>
      </footer>

      <div className="mt-4 text-center">
        <span className="text-white/40 text-xs">
          문장 공부 v{APP_VERSION}{" "}
          <a
            href="https://github.com/SsunLee/ssunbae_katakana-flashcards"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 ml-1"
          >
            쑨쑨배의 Github
          </a>
        </span>
      </div>
    </div>
  );
}


