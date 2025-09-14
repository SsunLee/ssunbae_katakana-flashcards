// app/study/japanese/sentences/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/AuthContext";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { JP_SENTENCES, type SentenceCard } from "@/app/data/sentences";
import { SentenceCardView } from "@/app/components/SentenceCardView";
import CardControls from "@/app/components/controls/CardControls";
import { Switch } from "@/app/components/ui/switch";
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { Button } from "@/app/components/ui/button";


import { EmptyDeckMessage } from "@/app/components/EmptyDeckMessage";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { FONT_STACKS } from "@/app/constants/fonts";

import { StudyFontSize, useStudyFontSize } from "@/app/hooks/useStudyFontSize";
import { SettingsDialog } from "@/app/components/SettingsDialog"; // 이미 있으시면 그대로

export default function SentencesPage() {
  const { user } = useAuth();
  const deckType = "sentences-jp"; // ← constants/studyLabels.ts 에 매핑 추가 필요 (아래 참고)

  // Firestore 연동 덱 (즐겨찾기 포함)
  const { deck, favs, toggleFav, shuffleDeck, resetDeckToInitial } =
    useStudyDeck<SentenceCard>({ user, deckType, initialDeck: JP_SENTENCES });

  // 뷰 상태
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [onlyFavs, setOnlyFavs] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");
  const current = deck[index] ?? null;

  // 즐겨찾기 필터 적용
  const studyDeck = useMemo(
    () => (onlyFavs ? deck.filter((c) => favs[c.id]) : deck),
    [deck, favs, onlyFavs]
  );

  // 🔊 TTS (브라우저 말하기)
  const {
    isSupported: isTtsSupported,
    ready: ttsReady,
    speakJa,
  } = useJaSpeech();

  // 현재 카드

  // rt 있으면 rt, 없으면 원문 text 로 이어붙여서 읽기
  const reading = useMemo(() => {
    if (!current) return "";
    return current.parts.map(p => p.rt ?? p.text).join("").replace(/\s+/g, "");
  }, [current]);

  const fontStack = useMemo(
    () => FONT_STACKS[fontFamily] || FONT_STACKS["Noto Sans JP"],
    [fontFamily]
  );

  // 카드 조작
  const onFlip = useCallback(() => setFlipped((f) => !f), []);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % Math.max(1, studyDeck.length));
    setFlipped(false); // 플립 잔상 방지
  }, [studyDeck.length]);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + Math.max(1, studyDeck.length)) % Math.max(1, studyDeck.length));
    setFlipped(false);
  }, [studyDeck.length]);

  // 덱 조작
  const shuffle = () => {
    shuffleDeck();
    setIndex(0);
    setFlipped(false);
  };
  const reset = () => {
    resetDeckToInitial();
    setIndex(0);
    setFlipped(false);
  };

  // 키보드 단축키: Enter/Space=Flip, ←/→=Prev/Next
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onFlip();
      } else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onFlip, next, prev]);

  // 학습 폰트 사이즈 (브라우저 저장)
  const { studyFontSize, setStudyFontSize } = useStudyFontSize("md");
  const [showSettings, setShowSettings] = useState(false);


  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center p-6"
      style={{ fontFamily: fontStack }}
    >
      {/* 환영 배너 */}
      <header className="w-full max-w-md mx-auto mb-1">
            <WelcomeBanner name={user?.nickname} subject={STUDY_LABELS[deckType]}/>
      </header>

      {/* 비로그인 안내 카드 */}
      {!user && <LoginPromptCard onLoginClick={() => window.dispatchEvent(new CustomEvent("open-auth-login"))} />}

      {/* 진행률 + Only Favs */}
      <div className="mb-4 w-full max-w-md mx-auto flex items-center justify-between text-sm">
        <span className="text-white/70">
          ⚡진행률 : {studyDeck.length ? `${Math.min(index + 1, studyDeck.length)} / ${studyDeck.length}` : "0 / 0"}
        </span>
        {isTtsSupported && (
        <Button
          size="sm"
          variant="outline"
          className="border-white/10 bg-white/5 hover:bg-white/10"
          onClick={() => speakJa(reading)}
          disabled={!ttsReady || !current}
        >
          🔊 듣기
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
            }}
          />
        </label>
    <div className="flex flex-col items-center p-6">
      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        user={user}
        deckType={deckType}
        // TTS 관련은 필요 시 전달 (생략 가능)
        isTtsSupported={false}
        selectedVoice={null}
        selectVoice={() => {}}
        voices={[]}
        isSafari={false}
        // 폰트 관련
        fontFamily={"Noto Sans JP"}
        setFontFamily={() => {}}
        // NEW: 폰트 사이즈 바인딩
        studyFontSize={studyFontSize}
        setStudyFontSize={setStudyFontSize}
        // 단어 생성 관련은 비활성
        topic=""
        setTopic={() => {}}
        wordCount={0}
        setWordCount={() => {}}
        loadingImport={false}
        importWordsFromServer={() => {}}
        resetDeck={reset}
      />
      
      </div>

      </div>




      {/* 카드 뷰 */}
      <main className="w-full max-w-3xl select-none">
        {studyDeck.length === 0 ? (
          <EmptyDeckMessage viewMode="single" />
        ) : (
          current && (
            <SentenceCardView
              key={current.id}          // 카드 교체 시 애니메이션 꼬임 방지
              card={current}
              isFlipped={flipped}
              isFav={!!favs[current.id]}
              onFlip={onFlip}
              onToggleFav={() => toggleFav(current.id)}
              fontSize={studyFontSize}
            />
          )
        )}
      </main>

      {/* 컨트롤 */}
      <div className="mt-4">
        <CardControls onPrev={prev} onNext={next} onShuffle={shuffle} onReset={reset} />
      </div>
    </div>
  );
}
