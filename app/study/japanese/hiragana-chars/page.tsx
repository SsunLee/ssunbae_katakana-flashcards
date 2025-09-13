"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import { SingleCardView } from "@/app/components/SingleCardView";
import { GridCardView } from "@/app/components/GridCardView";
import { type Word } from "@/app/data/words";
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { useFlashcardDeck } from "@/app/hooks/useFlashcardDeck";
import { FONT_STACKS } from "@/app/constants/fonts";
import { APP_VERSION } from "@/app/constants/appConfig";
import { HIRAGANA_CHARS } from "@/app/data/hiraganaChars";

export default function HiraganaCharsPage() {
  const initialDeck = HIRAGANA_CHARS;
  const deckType = "hiragana-chars";

  const { user } = useAuth();

  const { deck, favs, toggleFav, shuffleDeck, resetDeckToInitial } =
    useFlashcardDeck({ user, deckType, initialDeck });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filters, setFilters] = useState({ gojuon: true, dakuten: true, handakuten: false, yoon: false });
  const [viewMode, setViewMode] = useState<"single" | "grid">("single");
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 10;
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState<boolean>(false);
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");

  const handleFilterChange = (k: keyof typeof filters) =>
    setFilters((p) => ({ ...p, [k]: !p[k] }));

  const toggleGridCardFlip = (id: number) =>
    setFlippedStates((p) => ({ ...p, [id]: !p[id] }));

  const studyDeck = useMemo(() => {
    let base = deck;
    const active = Object.entries(filters)
      .filter(([, v]) => v)
      .map(([k]) => k);
    base =
      active.length > 0
        ? deck.filter((card: Word) => {
            const original = initialDeck.find((c) => c.id === card.id);
            return original && active.includes((original as any).type);
          })
        : [];
    return onlyFavs ? base.filter((w: Word) => favs[w.id]) : base;
  }, [deck, filters, onlyFavs, favs, initialDeck]);

  const { currentCards, totalPages } = useMemo(
    () => ({
      currentCards: studyDeck.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE),
      totalPages: Math.ceil(studyDeck.length / CARDS_PER_PAGE) || 1,
    }),
    [currentPage, studyDeck]
  );

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

  const { isSupported: isTtsSupported, ready: ttsReady, speakJa, selectedVoice, voices, selectVoice, isSafari } =
    useJaSpeech();

  const current = studyDeck[index] ?? null;
  const fontStack = useMemo(() => FONT_STACKS[fontFamily] || FONT_STACKS["Noto Sans JP"], [fontFamily]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (viewMode === "single") {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onFlip(); }
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [viewMode, onFlip, next, prev]);

  return (
    <div className="w-full flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>
      {/* Top Controls */}
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
            // 단어 생성 기능 없음
            topic="" setTopic={() => {}}
            wordCount={0} setWordCount={() => {}}
            loadingImport={false}
            importWordsFromServer={() => {}}
            resetDeck={reset}
          />
        </div>
      )}

      {/* 필터 UI */}
      <div className="w-full max-w-md mx-auto mb-4 p-3 bg-slate-800/50 rounded-lg flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
        {(["gojuon","dakuten","handakuten","yoon"] as const).map((k) => (
          <label key={k} className="flex items-center space-x-2">
            <Checkbox id={k} checked={filters[k]} onCheckedChange={() => handleFilterChange(k)} />
            <span>
              {k === "gojuon" ? "50음도" : k === "dakuten" ? "탁음" : k === "handakuten" ? "반탁음" : "요음"}
            </span>
          </label>
        ))}
      </div>

      {/* 메인 */}
      <main className="w-full max-w-5xl select-none">
        {viewMode === "single" ? (
          studyDeck.length === 0 ? (
            <EmptyDeckMessage viewMode="single" />
          ) : (
            current && (
              <SingleCardView
                key={current.id}           // 카드 변경 시 깜빡임 방지
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
          </>
        )}
      </main>

      {/* Bottom Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
        {viewMode === "single" && (
          <>
            <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={prev}>
              <ChevronLeft className="mr-1 h-4 w-4" />이전
            </Button>
            <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={next}>
              다음<ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={shuffle} title="카드를 섞습니다">
              섞기
            </Button>
            <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={reset} title="처음 상태로 되돌립니다">
              리셋
            </Button>
          </>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
        {user && (
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10"
            onClick={() => { setViewMode((p) => (p === "single" ? "grid" : "single")); setFlipped(false); }}
          >
            {viewMode === "single" ? "여러 장 모아보기" : "한 장씩 학습하기"}
          </Button>
        )}
        <label className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 bg-white/5">
          <span className="text-white/80 font-semibold">⭐ Only</span>
          <Switch checked={onlyFavs} onCheckedChange={(on) => { setOnlyFavs(on); setIndex(0); setFlipped(false); setCurrentPage(1); }} />
        </label>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-md mx-auto mt-6 text-sm text-white/70 bg-white/5 rounded-xl px-4 py-3">
        <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
          <li>설정 패널에서 변경한 <b>TTS Voice</b>와 <b>Font</b>는 즉시 적용됩니다. (브라우저에 저장)</li>
          <li>키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
        </ul>
      </footer>

      <div className="mt-4 text-center">
        <span className="text-white/40 text-xs">
          히라가나 공부 v{APP_VERSION}
        </span>
      </div>
    </div>
  );
}
