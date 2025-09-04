import React, { use, useEffect, useMemo, useState } from "react";
import "@fontsource/noto-sans-jp"; // 일본어 가독성 향상 (웹폰트)

import { WORDS, type Word } from './data/words';
import { useJaSpeech } from './hooks/useJaSpeech';
import { kanaToRomaji } from './utils/kana';


import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./components/ui/select";
import { Switch } from "./components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import pkg from '../package.json';
import { Value } from "@radix-ui/react-select";



// ————————————————————————————————————————————————
// Katakana Flashcard Webapp v0.2.0
// Recent updates:
//  - v0.2.0: Enhanced Safari TTS quality with voice optimization
//  - v0.1.0: Initial release with 100 words, romaji conversion, TTS
//  - Features: Kana→romaji (hepburn/simple), Audio playback, 3D cards
// ————————————————————————————————————————————————

// App version from package.json
const APP_VERSION = pkg.version;



// 일본어 웹 폰트 스택(이름 → font-family 문자열)
const FONT_STACKS: Record<string, string> = {
    'Noto Sans JP':
      `'Noto Sans JP','Hiragino Kaku Gothic ProN','Meiryo','Yu Gothic UI',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial`,
    'Zen Kaku Gothic New':
      `'Zen Kaku Gothic New','Hiragino Kaku Gothic ProN','Meiryo','Yu Gothic UI',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial`,
    'Noto Serif JP':
      `'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif`,
    'Kosugi Maru':
      `'Kosugi Maru','Hiragino Kaku Gothic ProN','Meiryo','Yu Gothic UI',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial`,
  };





export default function App() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState(WORDS);

  const [topic, setTopic] = useState('여행');
  const [wordCount, setWordCount] = useState<number>(10);


  // 불러오기 상태
  const [loadingImport, setLoadingImport] = useState(false);

  // ⭐ 즐겨찾기 (id -> true) 로컬 저장
  const [favs, setFavs] = useState<Record<number, true>>(() => {
    try { return JSON.parse(localStorage.getItem('favWords') || '{}'); } catch { return {}; }
  });
  useEffect(() => {
    try { localStorage.setItem('favWords', JSON.stringify(favs));} catch {}
  }, [favs]);
  
  // ⭐ 즐겨찾기만 학습 토글 (로컬 저장)
  const [onlyFavs, setOnlyFavs] = useState<boolean>(() => {
    try {return localStorage.getItem('onlyFavs') === '1';} catch { return false; }
  });
  
  useEffect(() => {
    try { localStorage.setItem('onlyFavs', onlyFavs ? '1' : '0'); } catch {}
  }, [onlyFavs]);
  
  // 현재 학습용 덱 (즐겨찾기 필터 반영)
  const studyDeck = useMemo(
    () => (onlyFavs ? deck.filter(w => favs[w.id]) : deck),
    [deck, favs, onlyFavs]
  );
  
  async function importWordsFromServer(topic: string, count: number): Promise<number> {
    // 1. 주제가 비어있으면 사용자에게 알림
    if (!topic || topic.trim() === '') {
      alert('주제를 입력해주세요.');
      return 0;
    }
  
    // 2. 불러오기 상태 설정
    setLoadingImport(true);
    try {
      // 3. 서버에 요청
      const resp = await fetch('/api/generate-words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),});
      
      // 4. 응답 처리
      if (!resp.ok) {
        const errorText = await resp.text();
        throw new Error(`서버 오류: ${resp.status} ${errorText}`);
      }
  
      // 5. JSON 파싱
      const json = await resp.json();
  
      // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼ 디버깅 코드 추가 ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
      console.log("1. 서버로부터 받은 전체 JSON:", json);
    


      // 6. 단어 목록 검증
      if (!json?.ok) {
        throw new Error(json?.error || '알 수 없는 오류');
      }
  
      const newWords: Array<Omit<Word, 'id'>> = Array.isArray(json.words) ? json.words : [];
      // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ 디버깅 코드 추가 ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
      console.log("2. 추출된 단어 배열 (newWords):", newWords);
      console.log("3. 추출된 단어 개수 (newWords.length):", newWords.length);
      
      if (newWords.length === 0) {
        alert('서버에서 단어를 불러오지 못했습니다.');
        return 0;
      }
      // 7. 새로운 단어에 고유 ID 부여
      const newDeck: Word[] = newWords.map((w, i) => ({ id: i + 1, ...w }));
      // 8. 덱 업데이트
      setDeck(newDeck);
      setIndex(0);
      setFlipped(false);
      setFavs({}); // 새로운 덱을 받았으므로 즐겨찾기 초기화
      if (onlyFavs) setOnlyFavs(false); // 즐겨찾기 필터 해제
  
      // 9. 성공적으로 불러온 단어 수 반환
      try {
        localStorage.setItem('words:custom', JSON.stringify(newDeck));
      } catch (e) {
        console.warn('로컬 저장 실패', e);
      }

      // 10. 성공 알림
      alert(`서버에서 ${newDeck.length}개의 단어를 불러왔습니다.`);
      console.log('단어 : (newDeck.length)', newDeck.length);
      return newDeck.length;
    } catch (e: any) {
      console.error('단어 불러오기 실패', e);
      alert(`단어 불러오기 실패: ${e.message}`);
      return 0;
    } finally {
      setLoadingImport(false);
    }
  }
  
    // settings panel
    const [showSettings, setShowSettings] = useState(false);
  
    // esc로 설정 패널 닫기
    useEffect(() => {
      if (!showSettings) return;
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowSettings(false);};
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [showSettings]);
  
  
    const [fontFamily, setFontFamily] = useState<string>(() => {
      try {
          return localStorage.getItem('jpFont') || 'Noto Sans JP';
        } catch {
          return 'Noto Sans JP';
        }
    });
  
    useEffect(() => {
      try {
        localStorage.setItem('jpFont', fontFamily);
      } catch {}
    }, [fontFamily]);
      const fontStack = useMemo(
          () => FONT_STACKS[fontFamily] || FONT_STACKS['Noto Sans JP'],
          [fontFamily]
      );


  const { ready: ttsReady, speakJa, selectedVoice, voices, setSelectedVoice, isSafari } = useJaSpeech();

  // voices가 로드된 뒤, 선택된 보이스가 없으면 안전하게 채워줍니다.
  useEffect(() => {
    if (voices.length === 0) return;
  
    if (!selectedVoice) {
      let initial: SpeechSynthesisVoice | null = null;
  
      // 1) 저장된 보이스 우선
      try {
        const stored = localStorage.getItem("jaVoiceName");
        if (stored) initial = voices.find(v => v.name === stored) || null;
      } catch {}
  
      // 2) 없으면 최적 보이스(ja-*/local 우선) 또는 첫번째
      if (!initial) {
        const jaVoices = voices.filter(v => (v.lang || "").toLowerCase().startsWith("ja"));
        initial = (jaVoices.find(v => v.localService) || jaVoices[0]) ?? voices[0];
      }
  
      setSelectedVoice(initial);
    }
  }, [voices, selectedVoice, setSelectedVoice]);
  


  const current = studyDeck[index] ?? null;
  const romaji = useMemo(() => kanaToRomaji(current?.furigana || ''), [current]);
  //const progress = `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}`;
  const progress = 
  studyDeck.length === 0
    ? '0 / 0'
    : `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}`;

  // studyDeck 변동 시 index 보정
  useEffect(() => {
    if (studyDeck.length === 0) {
      if (index !== 0) setIndex(0);
      setFlipped(false);
      return;
    }
    if (index >= studyDeck.length){
      setIndex(0);
      setFlipped(false);
    }
  }, [studyDeck.length]);

  function onFlip() { setFlipped((f) => !f); }
  function next() { setIndex((i) => (i + 1) % Math.max(1, studyDeck.length)); setFlipped(false); }
  function prev() { setIndex((i) => (i - 1 + Math.max(1, studyDeck.length)) % Math.max(1, studyDeck.length)); setFlipped(false); }
  function shuffle() {
    const arr = [...deck];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setDeck(arr); setIndex(0); setFlipped(false);
  }
  function reset() { setDeck(WORDS); setIndex(0); setFlipped(false); }

  // 즐겨찾기 토글
  function toggleFav(id: number) {
    setFavs(prev => {
      const n = { ...prev};
      if (n[id]) delete n[id]; else n[id] = true;
        return n;
    });
  }


  // 키보드 방향키로 이전 다음, 엔터로는 뒤집기
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // 설정 패널 무시
      if (showSettings) return;
      // 입력/선택 요소에 포커스가 있으면 무시
      const tag = (document.activeElement?.tagName || '').toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key ==='ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onFlip();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showSettings, next, prev]);



  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-6"
      style={{ fontFamily: fontStack }}
    >

      <header className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight"> 🦋쑨쑨배の 가타카나 공부🦋</h1>
        <p className="text-white/70 mt-1">가타카나 단어를 보고 맞춰보세요. 클릭하면 뒤집혀 정답이 보입니다.</p>
      </header>

       {/* Controls (top) */}
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">

        {/* Center: 진행도 */}
        <span className="text-white/70">⚡진행률 : {progress}</span>


        {/* 듣기 */}
        <Button
          size="sm"
          variant="outline"
          className="border-white/10 bg-white/5 hover:bg-white/10"
          onClick={() => speakJa(current?.furigana || "")}
          disabled={!ttsReady || !current}
          title={ttsReady ? "ふりがな を 再生" : "브라우저가 음성을 아직 준비 중입니다"}
        >
          🔊 듣기 (ふりがな)
        </Button>

        {/* 우: 설정(하나만) — shadcn Dialog Trigger */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/10 border-white/10 hover:bg-white/15"
            aria-label="Open Settings"
            title="TTS/Font 설정"
          >
            ⚙️ 설정
          </Button>
          </DialogTrigger>

          <DialogContent className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-5 ... overflow-visible">
            <DialogHeader className="mb-3 flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold text-white flex items-center gap-2">⚙️설정</DialogTitle>
              <DialogClose asChild>
              <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3 text-white/90 hover:text-white"
                >닫기 ✕
              </Button>
              </DialogClose>
            </DialogHeader>

            {/* Voice ------------------------------------------------ */}
            <div className="mb-4">
              <label className="block text-sm text-white/70 mb-1">TTS Voice</label>

              {/* voices가 로딩되기 전에는 disabled + placeholder 만 */}
              {voices.length === 0 ? (
                <Select disabled>
                  <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white text-left">
                    {selectedVoice ? (
                      `${selectedVoice.name} ${selectedVoice.lang ? `(${selectedVoice.lang})` : ''}`
                    ) : (
                      <span className="text-white/70">(loading...)</span>
                    )}
                  </SelectTrigger>
                </Select>
              ) : (

              <Select
                value={selectedVoice?.name || voices[0]?.name || ""}
                onValueChange={(val) => {
                  const v = voices.find(vv => vv.name === val) || null;
                  setSelectedVoice(v);
                  try { localStorage.setItem("jaVoiceName", v?.name || ""); } catch {}
                }}
                disabled={voices.length === 0}
              >
                <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white">
                  <SelectValue placeholder="(loading...)" />
                </SelectTrigger>

                {/* Dialog(보통 z-50)보다 높은 z-index, popper로 위치 */}
                <SelectContent
                  className="z-[70] bg-slate-900 border-white/10"
                  position="popper"
                  sideOffset={8}
                >
                  {voices.length === 0 ? (
                    <SelectItem className="text-white" value="__loading" disabled>
                      (loading…)
                    </SelectItem>
                  ) : (
                    voices.map(v => (
                      <SelectItem className="text-white" key={v.name} value={v.name}>
                        {v.name} {v.lang ? `(${v.lang})` : ""}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>

              )}

              <div className="mt-1 text-xs text-white/50">
                브라우저: {isSafari ? "Safari" : "Chrome/Edge 등"}
              </div>
            </div>

            {/* Font ------------------------------------------------- */}
            <div className="mb-2">

              <label className="block text-sm text-white/70 mb-1">Font</label>
              {/* Font */}
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>

                <SelectContent
                  className="z-[70] bg-slate-900 border-white/10"
                  position="popper"
                  sideOffset={8}
                >
                  <SelectItem className="text-white" value="Noto Sans JP">Noto Sans JP</SelectItem>
                  <SelectItem className="text-white" value="Zen Kaku Gothic New">Zen Kaku Gothic New</SelectItem>
                  <SelectItem className="text-white" value="Noto Serif JP">Noto Serif JP</SelectItem>
                  <SelectItem className="text-white" value="Kosugi Maru">Kosugi Maru</SelectItem>
                </SelectContent>
              </Select>

            </div>

            <div className="text-sm text-white/70 mt-3">
              * 적용한 설정들은 즉시 적용됩니다.
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <label className="block text-sm text-white/70 mb-1"> 새로운 단어 주제</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 여행, 음식, 비즈니스..."
              />
            </div>
            <div className="mt-2 text-sm text-white/70">
              <label className="block text-sm text-white/70 mb-1">생성할 단어 개수</label>
              <Select
                value={String(wordCount)}
                onValueChange={(Value) => setWordCount(Number(Value))}
                >
                  <SelectTrigger  className="w-full bg-slate-800/60 border-white/10 text-white">
                    <SelectValue placeholder="단어 개수 선택" />
                  </SelectTrigger>
                  <SelectContent
                    className="z-[70] bg-slate-900 border-white/10"
                    position="popper"
                    sideOffset={8}
                    >
                      <SelectItem className="text-white" value="5">5개</SelectItem>
                      <SelectItem className="text-white" value="10">10개</SelectItem>
                      <SelectItem className="text-white" value="15">15개</SelectItem>
                      <SelectItem className="text-white" value="20">20개</SelectItem>
                    </SelectContent>
                </Select>            

            </div>
            {/* 단어 가져오기, 덱 리셋 */}
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                className="text-white bg-white/10 border-white/10 hover:bg-white/15"
                variant="outline"
                disabled={loadingImport}
                onClick={() => importWordsFromServer(topic,wordCount)}
                title="서버에서 새 단어를 불러옵니다"
              >
                {loadingImport ? '가져오는 중…' : '단어 가져오기'}
              </Button>
              
              {/* 현재 덱 저장본 복원 (로컬) */}
              <Button
                size="sm"
                className="text-white bg-white/10 border-white/10 hover:bg-white/15"              
                variant="outline"
                onClick={() => { 
                  reset();
                  alert('덱을 기본값으로 복원했습니다.');
                }}
              >
                저장본 복원
              </Button>
              
            </div>
            <div className="mt-3 text-sm text-white/70">
              * '단어 가져오기'는 OpenAI API를 사용하며, 무료로 제공되는 기능입니다.
              <br />
              * 너무 많은 단어를 자주 요청할 경우, 일시적으로 차단될 수 있습니다.
            </div>

          </DialogContent>
        </Dialog>
      </div>
      {/* Card with 3D flip */}
      <div className="[perspective:1200px] w-full max-w-md select-none">
     {/* studyDeck이 비면 안내 카드 */}
     {!current ? (
       <div className="relative h-64 md:h-72 bg-slate-800/60 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6">
         <div className="text-center">
           <div className="text-lg font-semibold mb-2">즐겨찾기한 카드가 없습니다</div>
           <p className="text-white/70">
             카드 앞면 우상단의 <b>☆</b> 버튼으로 즐겨찾기를 추가하거나
             <br />‘⭐ Only’ 토글을 끄세요.
           </p>
         </div>
       </div>
      ) : (
      <div
        role="button"
        tabIndex={0}
        aria-label="flip card"
        onClick={onFlip}
        className="relative h-64 md:h-72 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >

          {/* Front */}
          <div className="absolute inset-0 bg-slate-800/60 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6" style={{ backfaceVisibility: 'hidden' }}>
            {/* ⭐ Favorite toggle */}
            {current && (
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={(e) => { e.stopPropagation(); toggleFav(current.id); }}
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 border border-white/10"
              title={favs[current.id] ? "즐겨찾기 해제" : "즐겨찾기 추가"}>
              <span className="text-lg">{favs[current.id] ? "⭐" : "☆"}</span>
            </Button>
            )}

            <div className="text-sm text-white/60 mb-2">카드를 클릭하세요</div>
            <div className="text-center w-full">
              <div
                className="text-5xl md:text-6xl font-semibold leading-snug break-words overflow-hidden text-ellipsis max-w-full"
                style={{ wordBreak: "break-all", overflowWrap: "break-word" }}>

                <div className="flex flex-col items-center">
                  {/* 메인 카타카나 */}
                  <div className="text-5xl md:text-6xl font-semibold leading-snug">
                    {current.katakana}
                  </div>

                  {/* 후리가나 (작게, 아래 표시) */}
                  <div className="mt-2 text-base md:text-lg font-normal text-white/80">
                    {current.furigana}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
            <div className="text-center w-full">
              <div className="text-sm text-white/60 mb-2">정답</div>
              <div
                className="text-4xl md:text-5xl font-semibold break-words overflow-hidden text-ellipsis max-w-full"
                style={{ wordBreak: "break-all", overflowWrap: "break-word" }}
              >
                {current.answer} <span className="align-middle">{current.emoji}</span>
                <span
                  className="block text-lg md:text-xl font-normal text-white/80 mt-2 break-words max-w-full"
                  style={{ wordBreak: "break-all", overflowWrap: "break-word" }}
                >
                  ({romaji})
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
        <Button 
          size="sm"
          variant="outline"
          className="border-white/10 bg-white/5 hover:bg-white/10"
          onClick={prev}>
                <ChevronLeft className="mr-1 h-4 w-4" />
            이전</Button>
        <Button 
          size="sm"
          variant="outline"
          className="border-white/10 bg-white/5 hover:bg-white/10"
          onClick={next}>
            다음
            <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
        <Button   
          size="sm"
          variant="outline"
          className="border-white/10 bg-white/5 hover:bg-white/10"
          onClick={shuffle} 
          title="카드를 섞습니다">
            섞기
        </Button>
        <Button 
          size="sm"
          variant="outline"
          className="border-white/10 bg-white/5 hover:bg-white/10"
          onClick={reset} 
          title="처음 상태로 되돌립니다">
            리셋
        </Button>

        <span className="mx-2 text-white/40">|</span>
        
      {/* ⭐ Only (Switch 사용) */}
      <label className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 bg-white/5">
        <span className="text-white/80 font-semibold">⭐ Only</span>
        <Switch
          checked={onlyFavs}
          onCheckedChange={(on) => { setOnlyFavs(on); setIndex(0); setFlipped(false); }}
        />
      </label>
      </div>

      {/* App footer notice (bullet tips) */}
      <hr className="my-6 w-full max-w-md border-white/10" />
      <footer className="w-full max-w-md text-sm text-white/70 bg-white/5 rounded-xl px-4 py-3">
        <ul className="list-disc list-outside pl-6 space-y-1 leading-relaxed">
          <li>설정 패널에서 변경한 <b>TTS Voice</b>와 <b>Font</b>는 즉시 적용됩니다. (브라우저에 저장)</li>
          <li>
            단어를 추가/수정하려면 코드 상단의 <code>WORDS</code> 배열을 편집하세요.
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
