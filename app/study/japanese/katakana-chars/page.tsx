// app/study/japanese/katakana-chars/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from '@/app/AuthContext';

// --- 컴포넌트 ---
import { SettingsDialog } from '@/app/components/SettingsDialog';
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "@/app/components/ui/checkbox";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import { SingleCardView } from "@/app/components/SingleCardView";

// --- 데이터, 훅, 유틸리티 ---
import { type Word } from '@/app/data/words';
import { useJaSpeech } from '@/app/hooks/useJaSpeech';
import { useFlashcardDeck } from '@/app/hooks/useFlashcardDeck';
import { kanaToRomaji } from '@/app/utils/kana';
import { FONT_STACKS } from "@/app/constants/fonts";
import { APP_VERSION } from '@/app/constants/appConfig';

// --- 페이지 전용 데이터 ---
import { KATAKANA_CHARS } from '@/app/data/katakanaChars';

export default function KatakanaCharsPage() {
  const initialDeck = KATAKANA_CHARS;
  const deckType = 'katakana-chars';

  const { user } = useAuth();
  
  // --- 기존 FlashcardApp의 모든 상태와 로직을 그대로 사용합니다 ---
  const {
    deck,
    favs,
    toggleFav,
    shuffleDeck,
    resetDeckToInitial,
  } = useFlashcardDeck({ user, deckType, initialDeck });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  // ★★★ '글자' 페이지의 핵심인 필터링 상태입니다. ★★★
  const [filters, setFilters] = useState({ gojuon: true, dakuten: true, handakuten: false, yoon: false });
  
  // '글자' 페이지에서는 AI 단어 생성 기능이 필요 없으므로 관련 상태는 제거합니다.
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 10;
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState<boolean>(false);
  const [fontFamily, setFontFamily] = useState<string>('Noto Sans JP');
  
  const handleFilterChange = (filterType: keyof typeof filters) => setFilters(prev => ({ ...prev, [filterType]: !prev[filterType] }));
  const toggleGridCardFlip = (cardId: number) => { setFlippedStates(prev => ({ ...prev, [cardId]: !prev[cardId] })); };
  
  const studyDeck = useMemo(() => {
    let baseDeck = deck;
    // ★★★ '가타카나 글자' 필터링 로직을 여기에 적용합니다. ★★★
    const activeFilters = Object.entries(filters).filter(([, value]) => value).map(([key]) => key);
    baseDeck = activeFilters.length > 0 ? deck.filter((card: Word) => {
      const originalCard = initialDeck.find(c => c.id === card.id);
      return originalCard && activeFilters.includes((originalCard as any).type);
    }) : [];
    
    return onlyFavs ? baseDeck.filter((w: Word) => favs[w.id]) : baseDeck;
  }, [deck, filters, onlyFavs, favs, initialDeck]);

  const { currentCards, totalPages } = useMemo(() => ({
    currentCards: studyDeck.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE),
    totalPages: Math.ceil(studyDeck.length / CARDS_PER_PAGE) || 1,
  }), [currentPage, studyDeck]);

  const goToNextPage = () => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); };
  const goToPrevPage = () => { setCurrentPage(prev => Math.max(prev - 1, 1)); };

  const onFlip = useCallback(() => setFlipped(f => !f), []);
  const next = useCallback(() => { setIndex(i => (i + 1) % Math.max(1, studyDeck.length)); setFlipped(false); }, [studyDeck.length]);
  const prev = useCallback(() => { setIndex(i => (i - 1 + Math.max(1, studyDeck.length)) % Math.max(1, studyDeck.length)); setFlipped(false); }, [studyDeck.length]);
  
  const shuffle = () => { shuffleDeck(); setIndex(0); setFlipped(false); };
  const reset = () => { resetDeckToInitial(); setIndex(0); setFlipped(false); setFlippedStates({}); setCurrentPage(1); };

  const { 
    isSupported: isTtsSupported, 
    ready: ttsReady, 
    speakJa, 
    selectedVoice, 
    voices, 
    selectVoice, 
    isSafari 
  } = useJaSpeech();

  const current = studyDeck[index] ?? null;
  const fontStack = useMemo(() => FONT_STACKS[fontFamily] || FONT_STACKS['Noto Sans JP'], [fontFamily]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (viewMode === 'single') {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onFlip(); }
        if (event.key === 'ArrowRight') next();
        if (event.key === 'ArrowLeft') prev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, onFlip, next, prev]);

  return (
    <div className="w-full flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>
      {/* Top Controls */}
      {viewMode === 'single' && (
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
          <span className="text-white/70">⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : '0 / 0'}</span>
           {isTtsSupported && (
            <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={() => speakJa(current?.furigana || "")} disabled={!ttsReady || !current}>
              🔊 듣기 (ふりがな)
            </Button>
          )}
          {/* '글자' 페이지에서는 단어 생성 기능이 없으므로 SettingsDialog에 관련 props를 전달하지 않습니다. */}
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
            // --- 단어 생성 관련 props는 전달하지 않음 ---
            topic="" setTopic={() => {}}
            wordCount={0} setWordCount={() => {}}
            loadingImport={false}
            importWordsFromServer={() => {}}
            resetDeck={reset}
          />
        </div>
      )}

      {/* ★★★ '글자' 페이지의 핵심인 필터링 UI입니다. ★★★ */}
      <div className="w-full max-w-md mx-auto mb-4 p-3 bg-slate-800/50 rounded-lg flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center space-x-2"><Checkbox id="gojuon" checked={filters.gojuon} onCheckedChange={() => handleFilterChange('gojuon')} /><label htmlFor="gojuon">50음도</label></div>
        <div className="flex items-center space-x-2"><Checkbox id="dakuten" checked={filters.dakuten} onCheckedChange={() => handleFilterChange('dakuten')} /><label htmlFor="dakuten">탁음</label></div>
        <div className="flex items-center space-x-2"><Checkbox id="handakuten" checked={filters.handakuten} onCheckedChange={() => handleFilterChange('handakuten')} /><label htmlFor="handakuten">반탁음</label></div>
        <div className="flex items-center space-x-2"><Checkbox id="yoon" checked={filters.yoon} onCheckedChange={() => handleFilterChange('yoon')} /><label htmlFor="yoon">요음</label></div>
      </div>
      
      {/* Main Content Area (기존과 동일) */}
        <main className="w-full max-w-md max-w-5xl select-none">
          {/* 🔽 2. 이 부분이 수정되었습니다. */}
          {viewMode === 'single' ? (
            studyDeck.length === 0 ? (
              <EmptyDeckMessage viewMode="single" />
            ) : (
              current && (
                <SingleCardView
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
            <div>
              {studyDeck.length === 0 ? (
                <EmptyDeckMessage viewMode="grid" /> 
              ) : (
                <>
                  <div className="flex flex-wrap justify-center gap-4">
                    {currentCards.map((card: Word) => (
                      <div key={card.id} className="w-40 [perspective:1200px] cursor-pointer group" onClick={() => toggleGridCardFlip(card.id)}>
                        <div className="relative h-48 w-full transition-transform duration-500 [transform-style:preserve-3d] rounded-lg" style={{ transform: flippedStates[card.id] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                          {/* Grid Card Front */}
                          <div className="absolute inset-0 bg-slate-800/60 flex flex-col items-center justify-center text-center p-2 rounded-lg border border-white/10 [backface-visibility:hidden]">
                            <Button type="button" size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); toggleFav(card.id); }} className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/20 hover:bg-black/30 border-none" title={favs[card.id] ? "즐겨찾기 해제" : "즐겨찾기 추가"}>
                              <span className="text-md flex items-center justify-center w-full h-full">{favs[card.id] ? "⭐" : "☆"}</span>
                            </Button>
                              <div className="text-6xl font-semibold break-all px-2">{card.katakana}</div>
                          </div>
                          {/* Grid Card Back */}
                          <div className="absolute inset-0 bg-slate-800/80 flex flex-col items-center justify-center text-center p-2 rounded-lg border border-white/10 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                <div className="text-5xl font-semibold break-all">{card.furigana}</div>
                                <div className="text-2xl mt-1">{card.emoji}</div>
                                <div className="text-sm text-white/70 mt-1 text-center">{card.answer}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-4 text-white">
                      <Button onClick={goToPrevPage} disabled={currentPage === 1} size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">이전</Button>
                      <span>{currentPage} / {totalPages}</span>
                      <Button onClick={goToNextPage} disabled={currentPage === totalPages} size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10">다음</Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </main>

        {/* Bottom Controls */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            {viewMode === 'single' && (
            <>
                <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={prev}><ChevronLeft className="mr-1 h-4 w-4" />이전</Button>
                <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={next}>다음<ChevronRight className="ml-1 h-4 w-4" /></Button>
                <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={shuffle} title="카드를 섞습니다">섞기</Button>
                <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={reset} title="처음 상태로 되돌립니다">리셋</Button>
            </>
            )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
            { user && (
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={() => { setViewMode(prev => (prev === 'single' ? 'grid' : 'single')); setFlipped(false); }}>
                {viewMode === 'single' ? '여러 장 모아보기' : '한 장씩 학습하기'}
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
                <li>단어를 추가/수정하려면 ⚙️설정 → 새로운 단어 주제/개수 설정 후 <b>단어 가져오기</b>를 클릭하세요.</li>
                <li>키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
            </ul>
        </footer>

        {/* Version Info */}
        <div className="mt-4 text-center">
            <span className="text-white/40 text-xs">
                가타카나 공부 v{APP_VERSION} | 
                <a href="https://github.com/SsunLee/ssunbae_katakana-flashcards" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 ml-1">
                    쑨쑨배의 Github
                </a>
            </span>
        </div>

    </div>
  );
}
