
// app/study/japanese/katakana-words/page.tsx

'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from '@/app/AuthContext';
import { SettingsDialog } from '@/app/components/SettingsDialog';
import { Button } from "@/app/components/ui/button";
import { Switch } from "@/app/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import { SingleCardView } from "@/app/components/SingleCardView";
import { type Word } from '@/app/data/words';
import { useJaSpeech } from '@/app/hooks/useJaSpeech';
import { useFlashcardDeck } from '@/app/hooks/useFlashcardDeck';
import { kanaToRomaji } from '@/app/utils/kana';
import { FONT_STACKS } from "@/app/constants/fonts";
import { generateRandomNickname } from '@/app/utils/nickname';
import { APP_VERSION } from '@/app/constants/appConfig';
import { fetchGeneratedWords } from "@/app/services/wordService";

import { WORDS as KATAKANA_WORDS } from '@/app/data/words';

export default function KatakanaWordsPage() {

  const initialDeck = KATAKANA_WORDS;
  const deckType = 'katakana-words';

  const { user } = useAuth();
  const {
    deck,
    setDeck,
    favs,
    toggleFav,
    shuffleDeck,
    resetDeckToInitial,
  } = useFlashcardDeck({ user, deckType, initialDeck });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [guestNickname] = useState(() => generateRandomNickname());
  const [filters, setFilters] = useState({ gojuon: true, dakuten: true, handakuten: false, yoon: false });
  const [topic, setTopic] = useState('여행');
  const [wordCount, setWordCount] = useState<number>(10);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [flippedStates, setFlippedStates] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const CARDS_PER_PAGE = 10;
  const [loadingImport, setLoadingImport] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState<boolean>(false);
  const [fontFamily, setFontFamily] = useState<string>('Noto Sans JP');
  

  const toggleGridCardFlip = (cardId: number) => { setFlippedStates(prev => ({ ...prev, [cardId]: !prev[cardId] })); };
  
  const studyDeck = useMemo(() => {
    const baseDeck = deck;
    return onlyFavs ? baseDeck.filter((w: Word) => favs[w.id]) : baseDeck;
  }, [deck, onlyFavs, favs]);

  const { currentCards, totalPages } = useMemo(() => ({
    currentCards: studyDeck.slice((currentPage - 1) * CARDS_PER_PAGE, currentPage * CARDS_PER_PAGE),
    totalPages: Math.ceil(studyDeck.length / CARDS_PER_PAGE) || 1,
  }), [currentPage, studyDeck]);

  const goToNextPage = () => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); };
  const goToPrevPage = () => { setCurrentPage(prev => Math.max(prev - 1, 1)); };

  async function importWords(topic: string, count: number) {
    setLoadingImport(true);
    try {
      const newDeck = await fetchGeneratedWords(topic, count);
      setDeck(newDeck);
      setIndex(0);
      setFlipped(false);
      setFlippedStates({});
      setCurrentPage(1);
      alert(`'${topic}' 주제의 새 단어 ${newDeck.length}개를 불러왔습니다!`);
    } catch (e) {
      alert('단어 불러오기에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoadingImport(false);
    }
  }

  const onFlip = useCallback(() => setFlipped(f => !f), []);
  const next = useCallback(() => { setIndex(i => (i + 1) % Math.max(1, studyDeck.length)); setFlipped(false); }, [studyDeck.length]);
  const prev = useCallback(() => { setIndex(i => (i - 1 + Math.max(1, studyDeck.length)) % Math.max(1, studyDeck.length)); setFlipped(false); }, [studyDeck.length]);
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
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>
        {/* Header and Banners */}
        <header className="w-full max-w-md max-auto mb-6">
            <div className="text-sm text-white/80 bg-slate-800/50 border border-white/10 rounded-lg p-4 text-center">
                <p>
                    <strong>{user?.nickname || guestNickname}</strong>님, 환영합니다!
                    <br />
                    아래 카드를 클릭하여 가타카나 학습을 시작하세요.
                </p>
            </div>
        </header>

        {!user && (
            <div className="w-full max-w-md mx-auto p-4 mb-6 bg-slate-800/50 border border-white/10 rounded-lg text-sm">
                <p className="font-semibold text-white">로그인하고 더 많은 기능을 이용해보세요! (무료)</p>
                <ul className="list-disc list-inside text-white/80 mt-2 space-y-1">
                    <li>나만의 단어장 클라우드 저장</li>
                    <li>즐겨찾기 목록 동기화</li>
                    <li>여러 장 모아보기 & 단어 생성 기능</li>
                    <li>Open AI 를 이용한 AI 단어 가져오기</li>
                </ul>
                <Button 
                    size="sm" 
                    className="w-full text-white/100 mt-4 bg-blue-600 hover:bg-blue-500">
                    <span className="font-bold">로그인 / 회원가입</span>
                </Button>
            </div>
        )}

        {/* Top Controls */}
        {viewMode === 'single' && (
          <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
            <span className="text-white/70">⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : '0 / 0'}</span>
            {isTtsSupported && (
              <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={() => speakJa(current?.furigana || "")} disabled={!ttsReady || !current}>
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
                topic={topic} 
                setTopic={setTopic} 
                wordCount={wordCount} 
                setWordCount={setWordCount} 
                loadingImport={loadingImport} 
                importWordsFromServer={importWords} 
                resetDeck={reset} />
          </div>
        )}

        {/* Main Content Area */}
        <main className="w-full max-w-5xl select-none">
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
                                <div className="text-2xl font-semibold break-all px-2">{card.katakana}</div>
                                <div className="text-sm text-white/70 mt-1">{card.furigana}</div>
                          </div>
                          {/* Grid Card Back */}
                          <div className="absolute inset-0 bg-slate-800/80 flex flex-col items-center justify-center text-center p-2 rounded-lg border border-white/10 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                <div className="text-lg font-semibold break-all">{card.answer}</div>
                                <div className="text-2xl mt-1">{card.emoji}</div>
                                <div className="text-xs text-white/70 mt-2">({kanaToRomaji(card.furigana)})</div>
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