import React, { useCallback, useEffect, useMemo, useState } from "react";
import { auth, db } from "./firebase";
import { UserProfile } from "./AuthContext"; // 👈 AuthContext에서 UserProfile 타입을 가져옵니다.

import { doc, getDoc, setDoc } from "firebase/firestore";

// 필요한 데이터, 훅, 유틸리티 및 UI 컴포넌트들을 모두 import 합니다.
import { WORDS, type Word } from './data/words';
import { useJaSpeech } from './hooks/useJaSpeech';
import { kanaToRomaji } from './utils/kana';
import { FONT_STACKS } from "./constants/fonts";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";

const APP_VERSION = "0.5.0"; // 버전 업데이트

export default function FlashcardApp({ user}: { user: UserProfile}) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState<Word[]>(WORDS);
  const [favs, setFavs] = useState<Record<number, true>>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Firestore에서 데이터 불러오기
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setDeck(userData.deck && userData.deck.length > 0 ? userData.deck : WORDS);
        setFavs(userData.favs || {});
      }
      setIsDataLoaded(true);
    };
    loadUserData();
  }, [user]);

  // Firestore에 데이터 저장하기
  const saveDataToFirestore = useCallback(async (newDeck: Word[], newFavs: Record<number, true>) => {
    if (!user || !isDataLoaded) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { deck: newDeck, favs: newFavs }, { merge: true });
    } catch (error) {
      console.error("데이터 저장 실패:", error);
    }
  }, [user, isDataLoaded]);

  // deck 또는 favs 상태가 변경될 때마다 자동 저장
  useEffect(() => {
    saveDataToFirestore(deck, favs);
  }, [deck, favs, saveDataToFirestore]);

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
  
  const studyDeck = useMemo(() => (onlyFavs ? deck.filter(w => favs[w.id]) : deck), [deck, favs, onlyFavs]);
  const { currentCards, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    const currentCards = studyDeck.slice(startIndex, endIndex);
    const totalPages = Math.ceil(studyDeck.length / CARDS_PER_PAGE) || 1;
    return { currentCards, totalPages };
  }, [currentPage, studyDeck]);

  const toggleGridCardFlip = (cardId: number) => { setFlippedStates(prev => ({ ...prev, [cardId]: !prev[cardId] })); };
  const goToNextPage = () => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); };
  const goToPrevPage = () => { setCurrentPage(prev => Math.max(prev - 1, 1)); };

  async function importWordsFromServer(topic: string, count: number) {
    setLoadingImport(true);
    try {
      const resp = await fetch('/api/generate-words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, count }),
      });
      if (!resp.ok) throw new Error('서버 응답 오류');
      const json = await resp.json();
      if (!json.ok || !Array.isArray(json.words)) throw new Error('잘못된 데이터 형식');
      const newDeck: Word[] = json.words.map((w: any, i: number) => ({ ...w, id: i + 1 }));
      setDeck(newDeck);
      setIndex(0);
      setFlipped(false);
      setFlippedStates({});
      setCurrentPage(1);
      setFavs({});
      alert(`'${topic}' 주제의 새 단어 ${newDeck.length}개를 불러왔습니다!`);      
    } catch (e) {
      console.error(e);
      alert('단어 불러오기 실패');
    } finally {
      setLoadingImport(false);
    }
  }

  const onFlip = useCallback(() => { setFlipped((f) => !f); }, []);
  const next = useCallback(() => { setIndex((i) => (i + 1) % Math.max(1, studyDeck.length)); setFlipped(false); }, [studyDeck.length]);
  const prev = useCallback(() => { setIndex((i) => (i - 1 + Math.max(1, studyDeck.length)) % Math.max(1, studyDeck.length)); setFlipped(false); }, [studyDeck.length]);
  const shuffle = () => { const arr = [...deck].sort(() => Math.random() - 0.5); setDeck(arr); setIndex(0); setFlipped(false); };
  const reset = () => { setDeck(WORDS); setIndex(0); setFlipped(false); setFlippedStates({}); setCurrentPage(1); };
  const toggleFav = (id: number) => { setFavs(prev => { const n = { ...prev }; if (n[id]) delete n[id]; else n[id] = true; return n; }); };
  const { ready: ttsReady, speakJa, selectedVoice, voices, setSelectedVoice, isSafari } = useJaSpeech();
  const current = studyDeck[index] ?? null;
  const romaji = useMemo(() => kanaToRomaji(current?.furigana || ''), [current]);
  const progress = studyDeck.length === 0 ? '0 / 0' : `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}`;
  const fontStack = useMemo(() => FONT_STACKS[fontFamily] || FONT_STACKS['Noto Sans JP'], [fontFamily]);


  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center p-6" style={{ fontFamily: fontStack }}>

        <header className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight"> 🦋{user.nickname}の 가타카나 공부🦋</h1>
        <p className="text-white/70 mt-4">가타카나 단어를 보고 맞춰보세요. 클릭하면 뒤집혀 정답이 보입니다.</p>
        <hr className="w-full mx-auto my-4 border-white/10" />
        </header>

      
        {/* --- 🔽 '한 장씩 보기' 모드일 때만 상단 컨트롤 표시 --- */}
        {viewMode === 'single' && (
          <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">
            <span className="text-white/70">⚡진행률 : {progress}</span>
            <Button
              size="sm"
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10"
              onClick={() => speakJa(current?.furigana || "")}
              disabled={!ttsReady || !current}
              title={ttsReady ? "ふりがな 를 再生" : "브라우저 음성 준비 중"}
            >
              🔊 듣기 (ふりがな)
            </Button>
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="bg-white/10 border-white/10 hover:bg-white/15" title="설정">
                  ⚙️ 설정
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-5 overflow-visible">
                <DialogHeader className="mb-3 flex items-center justify-between">
                    <DialogTitle className="text-lg font-semibold text-white flex items-center gap-2">⚙️설정</DialogTitle>
                    <DialogClose asChild>
                        <Button size="sm" variant="ghost" className="h-8 px-3 text-white/90 hover:text-white">닫기 ✕</Button>
                    </DialogClose>
                </DialogHeader>
                <div className="mb-4">
                  <label className="block text-sm text-white/70 mb-1">TTS Voice</label>
                  <Select
                    value={selectedVoice?.name || ""}
                    onValueChange={(val) => {
                      const v = voices.find(vv => vv.name === val) || null;
                      setSelectedVoice(v);
                      try { localStorage.setItem("jaVoiceName", v?.name || ""); } catch {}
                    }}
                    disabled={voices.length === 0}
                  >
                    <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white text-left">
                      {selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : '(loading...)'}
                    </SelectTrigger>
                    <SelectContent className="z-[70] bg-slate-900 border-white/10" position="popper" sideOffset={8}>
                      {voices.map(v => <SelectItem className="text-white" key={v.name} value={v.name}>{v.name} ({v.lang})</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <div className="mt-1 text-xs text-white/50">브라우저: {isSafari ? "Safari" : "Chrome/Edge 등"}</div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-white/70 mb-1">Font</label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white"><SelectValue placeholder="Select font" /></SelectTrigger>
                      <SelectContent className="z-[70] bg-slate-900 border-white/10" position="popper" sideOffset={8}>
                          <SelectItem className="text-white" value="Noto Sans JP">Noto Sans JP</SelectItem>
                          <SelectItem className="text-white" value="Zen Kaku Gothic New">Zen Kaku Gothic New</SelectItem>
                          <SelectItem className="text-white" value="Noto Serif JP">Noto Serif JP</SelectItem>
                          <SelectItem className="text-white" value="Kosugi Maru">Kosugi Maru</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <label className="block text-sm text-white/70 mb-1"> 새로운 단어 주제</label>
                  <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="예: 여행, 음식..." />
                </div>
                <div className="mt-2 text-sm text-white/70">
                  <label className="block text-sm text-white/70 mb-1">생성할 단어 개수</label>
                  <Select value={String(wordCount)} onValueChange={(value) => setWordCount(Number(value))}>
                      <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white"><SelectValue placeholder="단어 개수 선택" /></SelectTrigger>
                      <SelectContent className="z-[70] bg-slate-900 border-white/10" position="popper" sideOffset={8}>
                          <SelectItem className="text-white" value="5">5개</SelectItem>
                          <SelectItem className="text-white" value="10">10개</SelectItem>
                          <SelectItem className="text-white" value="15">15개</SelectItem>
                          <SelectItem className="text-white" value="20">20개</SelectItem>
                      </SelectContent>
                  </Select>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="text-white bg-white/10 border-white/10 hover:bg-white/15" variant="outline" disabled={loadingImport} onClick={() => importWordsFromServer(topic,wordCount)} title="서버에서 새 단어를 불러옵니다">
                    {loadingImport ? '가져오는 중…' : '단어 가져오기'}
                  </Button>
                  <Button size="sm" className="text-white bg-white/10 border-white/10 hover:bg-white/15" variant="outline" onClick={() => { reset(); alert('덱을 기본값으로 복원했습니다.'); }}>
                    저장본 복원
                  </Button>
                  
                </div>
                <div className="mt-3 text-sm text-white/70">
                  * '단어 가져오기'는 OpenAI API를 사용합니다.
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        <main className="w-full max-w-5xl select-none">
          {viewMode === 'single' ? (
            <div className="[perspective:1200px] w-full max-w-md mx-auto">
              {/* --- '한 장씩 보기' 모드일 때도 카드가 없으면 안내 메시지 표시 --- */}
              {studyDeck.length === 0 ? (
                <div className="relative h-64 md:h-72 bg-slate-800/60 flex flex-col items-center justify-center text-center px-6 rounded-2xl border border-white/10">
                  <div className="text-lg font-semibold mb-2">학습할 카드가 없습니다</div>
                  <p className="text-white/70">즐겨찾기한 카드가 없거나, 생성된 단어가 없습니다.<br/>'⭐ Only' 필터를 끄거나 새 단어를 가져오세요.</p>
                </div>
              ) : (
                current && <div
                  key={current.id}
                  role="button"
                  tabIndex={0}
                  aria-label="flip card"
                  onClick={onFlip}
                  className="relative h-64 md:h-72 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
                  style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* Front */}
                  <div className="absolute inset-0 bg-slate-800/60 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6" style={{ backfaceVisibility: 'hidden' }}>
                    <Button type="button" size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); toggleFav(current.id); }} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 border border-white/10" title={favs[current.id] ? "즐겨찾기 해제" : "즐겨찾기 추가"}>
                      <span className="text-lg flex items-center justify-center w-full h-full">{favs[current.id] ? "⭐" : "☆"}</span>
                    </Button>
                    <div className="text-sm text-white/60 mb-2">카드를 클릭하세요</div>
                    <div className="text-center w-full">
                      <div className="flex flex-col items-center">
                        <div className="text-5xl md:text-6xl font-semibold leading-snug">{current.katakana}</div>
                        <div className="mt-2 text-base md:text-lg font-normal text-white/80">{current.furigana}</div>
                      </div>
                    </div>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
                    <div className="text-center w-full">
                      <div className="text-sm text-white/60 mb-2">정답</div>
                      <div className="text-4xl md:text-5xl font-semibold">
                        {current.answer} <span className="align-middle">{current.emoji}</span>
                        <span className="block text-lg md:text-xl font-normal text-white/80 mt-2">({romaji})</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* ---'여러 장 모아보기' 모드에서 카드가 없으면 안내 메시지 표시 --- */}
              {studyDeck.length === 0 ? (
                <div className="relative h-96 bg-slate-800/60 flex flex-col items-center justify-center text-center px-6 rounded-2xl border border-white/10">
                  <div className="text-lg font-semibold mb-2">표시할 카드가 없습니다</div>
                  <p className="text-white/70">즐겨찾기한 카드가 없거나, 생성된 단어가 없습니다.<br/>'⭐ Only' 필터를 끄거나 새 단어를 가져오세요.</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap justify-center gap-4">
                    {currentCards.map(card => (
                      <div
                        key={card.id}
                        className="w-40 [perspective:1200px] cursor-pointer group"
                        onClick={() => toggleGridCardFlip(card.id)}
                      >
                        <div
                          className="relative h-48 w-full transition-transform duration-500 [transform-style:preserve-3d] rounded-lg"
                          style={{ transform: flippedStates[card.id] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                        >
                          {/* 앞면 */}
                          <div className="absolute inset-0 bg-slate-800/60 flex flex-col items-center justify-center text-center p-2 rounded-lg border border-white/10 [backface-visibility:hidden]">
                            {/* --- 그리드 뷰 카드에 즐겨찾기 버튼 추가 --- */}
                            <Button type="button" size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); toggleFav(card.id); }} className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/20 hover:bg-black/30 border-none" title={favs[card.id] ? "즐겨찾기 해제" : "즐겨찾기 추가"}>
                              <span className="text-md flex items-center justify-center w-full h-full">{favs[card.id] ? "⭐" : "☆"}</span>
                            </Button>
                            <div className="text-2xl font-semibold break-all px-2">{card.katakana}</div>
                            <div className="text-sm text-white/70 mt-1">{card.furigana}</div>
                          </div>
                          {/* 뒷면 */}
                          <div className="absolute inset-0 bg-slate-800/80 flex flex-col items-center justify-center text-center p-2 rounded-lg border border-white/10 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <div className="text-lg font-semibold break-all">{card.answer}</div>
                            <div className="text-2xl mt-1">{card.emoji}</div>
                              <div className="text-xs text-white/70 mt-2">
                                ({kanaToRomaji(card.furigana)})
                              </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* 페이지네이션 */}
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

        {/* --- 🔽 하단 컨트롤 영역 --- */}
        {/* 첫 번째 줄: 카드 조작 버튼 */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            {/* '한 장씩 보기' 모드일 때만 이전/다음/섞기/리셋 버튼 표시 */}
            {viewMode === 'single' && (
            <>
                <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={prev}><ChevronLeft className="mr-1 h-4 w-4" />이전</Button>
                <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={next}>다음<ChevronRight className="ml-1 h-4 w-4" /></Button>
                <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={shuffle} title="카드를 섞습니다">섞기</Button>
                <Button size="sm" variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10" onClick={reset} title="처음 상태로 되돌립니다">리셋</Button>
            </>
            )}
        </div>

        {/* 두 번째 줄: 보기 모드 및 필터 버튼 */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
            {/* '모드 전환' 버튼 */}
            <Button
                variant="outline"
                className="border-white/10 bg-white/5 hover:bg-white/10"
                onClick={() => {
                    setViewMode(prev => (prev === 'single' ? 'grid' : 'single'));
                    setFlipped(false); // 모드 전환 시 뒤집힘 상태 초기화
                }}
            >
                {viewMode === 'single' ? '여러 장 모아보기' : '한 장씩 학습하기'}
            </Button>

            {/* '즐겨찾기만' 토글 */}
            <label className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 bg-white/5">
            <span className="text-white/80 font-semibold">⭐ Only</span>
            <Switch
                checked={onlyFavs}
                onCheckedChange={(on) => { setOnlyFavs(on); setIndex(0); setFlipped(false); setCurrentPage(1); }}
            />
            </label>
        </div>

        {/* App footer notice (bullet tips) */}
        <hr className="my-6 w-full max-w-md border-white/10" />
        <footer className="w-full max-w-md text-sm text-white/70 bg-white/5 rounded-xl px-4 py-3">
          <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
            <li>설정 패널에서 변경한 <b>TTS Voice</b>와 <b>Font</b>는 즉시 적용됩니다. (브라우저에 저장)</li>
            <li>
              단어를 추가/수정하려면 ⚙️설정 → 새로운 단어 주제/개수 설정 후 <b>단어 가져오기</b>를 클릭하세요.
              <ul className="list-disc list-outside pl-6 mt-1 space-y-1 text-white/60">
                <li>Front: 가타카나 + ふりがな</li>
                <li>Back: 영어 정답 + 이모지 + (로마자)</li>
              </ul>
            </li>
            <li>키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
          </ul>
        </footer>

        {/* Version info */}
        <div className="mt-4 text-center">
          <span className="text-white/40 text-xs">
            카타카나 플래시카드 v{APP_VERSION} | 쑨쑨배의 Github
            <a 
              href="https://github.com/SsunLee/ssunbae_katakana-flashcards" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white/60 ml-1"
            >
              GitHub
            </a>
          </span>
        </div>
      
    </div>
  );
}