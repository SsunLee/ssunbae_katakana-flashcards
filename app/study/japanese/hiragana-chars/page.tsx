// app/study/japanese/hiragana-chars/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";

// UI & 컴포넌트
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


// 데이터 & 훅 & 상수
import type { Word } from "@/app/data/words";
import { HIRAGANA_CHARS } from "@/app/data/hiraganaChars";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { FONT_STACKS } from "@/app/constants/fonts";
import { APP_VERSION } from "@/app/constants/appConfig";
import { STUDY_LABELS } from "@/app/constants/studyLabels";

/** 페이지 상수/타입 */
const CARDS_PER_PAGE = 10 as const;
type ViewMode = "single" | "grid";
type FilterKey = "gojuon" | "dakuten" | "handakuten" | "yoon";

const FILTER_LABELS: Record<FilterKey, string> = {
  gojuon: "50음도",
  dakuten: "탁음",
  handakuten: "반탁음",
  yoon: "요음",
};

export default function HiraganaCharsPage() {
  /** 고정값 */
  const initialDeck = HIRAGANA_CHARS;
  const deckType = "hiragana-chars";
  const pageLabel = "가타카나 글자";

  /** 사용자 */
  const { user } = useAuth();

  /** Firestore 연동되는 공용 제네릭 훅 */
  const { deck, favs, toggleFav, shuffleDeck, resetDeckToInitial } =
    useStudyDeck<Word & { type: string }>({
      user,
      deckType,
      initialDeck, // 동일 상수 재사용
    });

  /** 뷰 상태 */
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");


  /** 문자군 필터 */
  const [filters, setFilters] = useState<Record<FilterKey, boolean>>({
    gojuon: true,
    dakuten: true,
    handakuten: false,
    yoon: false,
  });

  /** 필터 토글 */
  const handleFilterChange = (k: FilterKey) =>
    setFilters((prev) => ({ ...prev, [k]: !prev[k] }));

  /** 그리드 카드 뒤집기 */
  const toggleGridCardFlip = (id: number) =>
    setFlippedStates((prev) => ({ ...prev, [id]: !prev[id] }));

  /** (성능) 초기 덱에서 id→type 매핑 미리 구성 */
  const idToType = useMemo(() => {
    return new Map(initialDeck.map((c) => [c.id, c.type as FilterKey]));
  }, [initialDeck]);

  /** (성능) 활성 필터 집합 */
  const activeFilters = useMemo(() => {
    return new Set(
      (Object.keys(filters) as FilterKey[]).filter((k) => filters[k])
    );
  }, [filters]);

  /** 필터 + 즐겨찾기 적용된 최종 덱 */
  const studyDeck = useMemo(() => {
    // 활성 필터가 하나도 없으면 빈 배열 (명시적)
    const base =
      activeFilters.size > 0
        ? deck.filter((card) => {
            const t = idToType.get(card.id);
            return t ? activeFilters.has(t) : false;
          })
        : [];
    return onlyFavs ? base.filter((w) => favs[w.id]) : base;
  }, [deck, favs, onlyFavs, activeFilters, idToType]);

  /** 그리드 페이징 계산 */
  const { currentCards, totalPages } = useMemo(() => {
    const total = Math.ceil(studyDeck.length / CARDS_PER_PAGE) || 1;
    const start = (currentPage - 1) * CARDS_PER_PAGE;
    return {
      currentCards: studyDeck.slice(start, start + CARDS_PER_PAGE),
      totalPages: total,
    };
  }, [currentPage, studyDeck]);

  /** 페이지 이동 */
  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  /** 카드 플립/이동 */
  const onFlip = useCallback(() => setFlipped((f) => !f), []);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(1, studyDeck.length));
    setFlipped(false); // 잔상 방지
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

  /** 글꼴 스택 */
  const fontStack = useMemo(
    () => FONT_STACKS[fontFamily] || FONT_STACKS["Noto Sans JP"],
    [fontFamily]
  );

  /** 현재 카드 */
  const current = studyDeck[index] ?? null;

  /** 키보드 단축키 (Enter/Space 플립, ←/→ 이동) */
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
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
    },
    [viewMode, onFlip, next, prev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  return (
    <div className="w-full flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>
      {/* 환영 배너 */}
      <header className="w-full max-w-md mx-auto mb-1">
            <WelcomeBanner name={user?.nickname} subject={STUDY_LABELS[deckType]}/>
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
          <span className="text-white/70">
            ⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}
          </span>

          {isTtsSupported && (
            <Button
              size="sm"
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10"
              onClick={() => speakJa(current?.furigana || "")}
              disabled={!ttsReady || !current}
            >
              🔊 듣기 (ふりがな)
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
            topic=""
            setTopic={() => {}}
            wordCount={0}
            setWordCount={() => {}}
            loadingImport={false}
            importWordsFromServer={() => {}}
            resetDeck={reset}
          />
        </div>
      )}

      {/* 문자군 필터 */}
      <div className="w-full max-w-md mx-auto mb-4 p-3 bg-slate-800/50 rounded-lg flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
        {(Object.keys(FILTER_LABELS) as FilterKey[]).map((k) => (
          <label key={k} className="flex items-center space-x-2">
            <Checkbox id={k} checked={filters[k]} onCheckedChange={() => handleFilterChange(k)} />
            <span>{FILTER_LABELS[k]}</span>
          </label>
        ))}
      </div>

      {/* 메인 카드 영역 */}
      <main className="w-full max-w-5xl select-none">
        {viewMode === "single" ? (
          studyDeck.length === 0 ? (
            <EmptyDeckMessage viewMode="single" />
          ) : (
            current && (
              <SingleCardView
                key={current.id}       // 카드 변경 시 플립 잔상/애니메이션 꼬임 방지
                card={current}
                deckType={deckType}
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
              <GridCardView
                variant="chars"                // 글자 전용 그리드 스타일
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
        <CardControls onPrev={prev} onNext={next} onShuffle={shuffle} onReset={reset} />
      )}

      {/* 보기 전환 & Only Favs */}
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

      {/* 안내/버전 */}
      <footer className="w-full max-w-md mx-auto mt-6 text-sm text-white/70 bg-white/5 rounded-xl px-4 py-3">
        <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
          <li>설정 패널에서 변경한 <b>TTS Voice</b>와 <b>Font</b>는 즉시 적용됩니다. (브라우저에 저장)</li>
          <li>키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
        </ul>
      </footer>

      <div className="mt-4 text-center">
        <span className="text-white/40 text-xs">히라가나 공부 v{APP_VERSION}</span>
      </div>
    </div>
  );
}
