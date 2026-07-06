"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, CircleHelp, RotateCcw, Shuffle, Volume2, XCircle } from "lucide-react";

import { useAuth } from "@/app/AuthContext";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useQuizTypographySettings } from "@/app/hooks/useQuizTypographySettings";
import { useStudySessionAnalytics } from "@/app/hooks/useStudySessionAnalytics";
import type { SentenceQuizItem, SentenceQuizLevel } from "@/app/data/sentence-quiz-types";
import { triggerHaptic } from "@/app/lib/haptics";

type QuizResult = "correct" | "wrong" | "skipped";

type SentenceQuizPageProps = {
  deckType: string;
  subject: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  deck: SentenceQuizItem[];
  storageKeyPrefix: string;
  defaultFontFamily: string;
  defaultSentenceFontSize: number;
  lastActivePage: string;
  isTtsSupported: boolean;
  ttsReady: boolean;
  speak: (text: string) => void;
  selectedVoice: SpeechSynthesisVoice | null;
  voices: SpeechSynthesisVoice[];
  selectVoice: (voice: SpeechSynthesisVoice | null) => void;
  isSafari?: boolean;
};

const LEVELS: SentenceQuizLevel[] = ["초급", "중급", "고급"];

function shuffleArray<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function CompactResultBadge({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
      <span className="mr-1">{label}</span>
      <span className={`font-semibold ${tone}`}>{value}</span>
    </div>
  );
}

function renderSentence(prompt: string, fontSize: number, answer?: string) {
  const [before, after] = prompt.split("_____");
  const lineHeight = Math.round(fontSize * 1.45);

  return (
    <p className="font-semibold text-foreground" style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}>
      {before}
      {answer ? <span className="border-b-2 border-primary px-1 text-primary">{answer}</span> : <span className="border-b-2 border-muted-foreground/40 px-8" />}
      {after}
    </p>
  );
}

export function SentenceQuizPage({
  deckType,
  subject,
  title,
  eyebrow,
  subtitle,
  deck,
  storageKeyPrefix,
  defaultFontFamily,
  defaultSentenceFontSize,
  lastActivePage,
  isTtsSupported,
  ttsReady,
  speak,
  selectedVoice,
  voices,
  selectVoice,
  isSafari = false,
}: SentenceQuizPageProps) {
  const quizSectionRef = useRef<HTMLElement | null>(null);
  const { user } = useAuth();
  const { open } = useAuthModal();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const [results, setResults] = useState<Record<number, QuizResult>>({});
  const [shuffleTick, setShuffleTick] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [levelFilters, setLevelFilters] = useState<Record<SentenceQuizLevel, boolean>>({
    "초급": true,
    "중급": true,
    "고급": true,
  });
  const { fontFamily, setFontFamily, sentenceFontSize, setSentenceFontSize, fontStack } = useQuizTypographySettings({
    storageKeyPrefix,
    defaultFontFamily,
    defaultSentenceFontSize,
  });

  const filteredDeck = useMemo(() => {
    const activeLevels = LEVELS.filter((level) => levelFilters[level]);
    if (activeLevels.length === 0 || activeLevels.length === LEVELS.length) return deck;
    return deck.filter((item) => activeLevels.includes(item.level));
  }, [deck, levelFilters]);
  const orderedDeck = useMemo(() => (shuffleTick === 0 ? filteredDeck : shuffleArray(filteredDeck)), [filteredDeck, shuffleTick]);
  const visibleDeck = useMemo(() => (user ? orderedDeck : orderedDeck.slice(0, 3)), [orderedDeck, user]);
  const currentQuestion = visibleDeck[questionIndex];
  const counts = useMemo(
    () =>
      Object.values(results).reduce(
        (acc, result) => {
          acc[result] += 1;
          return acc;
        },
        { correct: 0, wrong: 0, skipped: 0 } as Record<QuizResult, number>
      ),
    [results]
  );
  const isLastQuestion = visibleDeck.length > 0 && questionIndex === visibleDeck.length - 1;
  const isFirstQuestion = questionIndex === 0;
  const progressText = visibleDeck.length > 0 ? `${questionIndex + 1} / ${visibleDeck.length}` : "0 / 0";
  const solvedCount = counts.correct + counts.wrong + counts.skipped;
  const optionTextSize = Math.max(15, Math.round(sentenceFontSize * 0.72));
  const optionCircleSize = Math.max(38, Math.round(sentenceFontSize * 1.75));

  useEffect(() => {
    localStorage.setItem("lastActivePage", lastActivePage);
  }, [lastActivePage]);

  useStudySessionAnalytics({
    userId: user?.uid,
    deckType,
    enabled: Boolean(user) && visibleDeck.length > 0,
    observedCardIds: currentQuestion ? [currentQuestion.id] : [],
  });

  useEffect(() => {
    if (questionIndex < visibleDeck.length) return;
    setQuestionIndex(0);
    setSelectedChoice(null);
    setCurrentResult(null);
  }, [questionIndex, visibleDeck.length]);

  const resetAnswerState = () => {
    setSelectedChoice(null);
    setCurrentResult(null);
  };

  const focusQuizSection = () => {
    requestAnimationFrame(() => {
      const section = quizSectionRef.current;
      if (!section) return;

      section.scrollIntoView({ behavior: "smooth", block: "start" });
      section.focus({ preventScroll: true });
    });
  };

  const handleFilterChange = (level: SentenceQuizLevel) => {
    if (!user) return;
    setLevelFilters((prev) => ({ ...prev, [level]: !prev[level] }));
    setShuffleTick(0);
    setQuestionIndex(0);
    resetAnswerState();
    setResults({});
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen w-full overflow-x-hidden px-4 py-6 sm:px-6" style={{ fontFamily: fontStack }}>
        <div className="mx-auto max-w-[660px]">
          <WelcomeBanner name={user?.nickname || undefined} subject={subject} subtitle={subtitle} />
          <section className="ds-surface mt-4 p-6 text-center text-sm text-muted-foreground">선택한 난이도에 맞는 문제가 없습니다.</section>
        </div>
      </div>
    );
  }

  const handleSelect = (choice: string) => {
    if (currentResult) return;

    const result: QuizResult = choice === currentQuestion.answer ? "correct" : "wrong";
    void triggerHaptic(result === "correct" ? "success" : "warning");
    setSelectedChoice(choice);
    setCurrentResult(result);
    setResults((prev) => ({ ...prev, [currentQuestion.id]: result }));
  };

  const handleSkip = () => {
    if (currentResult) return;
    void triggerHaptic("light");
    setSelectedChoice(null);
    setCurrentResult("skipped");
    setResults((prev) => ({ ...prev, [currentQuestion.id]: "skipped" }));
  };

  const handlePrevious = () => {
    if (isFirstQuestion) return;
    void triggerHaptic("light");
    setQuestionIndex((prev) => Math.max(0, prev - 1));
    resetAnswerState();
    focusQuizSection();
  };

  const handleNext = () => {
    void triggerHaptic("light");
    setQuestionIndex((prev) => (isLastQuestion ? 0 : prev + 1));
    resetAnswerState();
    focusQuizSection();
  };

  const handleReset = () => {
    setQuestionIndex(0);
    resetAnswerState();
    setResults({});
  };

  const handleShuffle = () => {
    setShuffleTick((prev) => prev + 1);
    setQuestionIndex(0);
    resetAnswerState();
    setResults({});
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden px-4 py-6 sm:px-6" style={{ fontFamily: fontStack }}>
      <div className="mx-auto max-w-[660px]">
        <WelcomeBanner name={user?.nickname || undefined} subject={subject} subtitle={subtitle} />

        {!user ? (
          <LoginPromptCard
            onLoginClick={() => open("login")}
            title="로그인하면 문장 퀴즈 학습 기록이 자동 저장됩니다."
            features={["난이도별 문장 퀴즈", "최근 학습 흐름 대시보드 반영", "다른 학습 모드와 함께 기록 통합"]}
          />
        ) : null}

        <div className="mb-4 w-full overflow-x-auto rounded-xl border border-border bg-card p-3 text-sm">
          <div className="mx-auto flex w-max items-center gap-3 whitespace-nowrap">
            <span className="font-semibold text-foreground">난이도:</span>
            {LEVELS.map((level) => (
              <label key={level} className={`flex shrink-0 items-center space-x-1.5 ${user ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}>
                <Checkbox checked={levelFilters[level]} onCheckedChange={() => handleFilterChange(level)} disabled={!user} />
                <span>{level}</span>
              </label>
            ))}
          </div>
          {!user ? <p className="mt-2 text-center text-xs text-muted-foreground">비로그인 체험은 3문제까지 제공되며, 난이도 필터는 로그인 후 사용할 수 있습니다.</p> : null}
        </div>

        <section ref={quizSectionRef} tabIndex={-1} className="ds-surface p-5 outline-none sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold text-foreground">{title} {questionIndex + 1}</h1>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {currentQuestion.level}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center justify-start gap-2 sm:w-auto sm:justify-end">
              <div className="ds-chip">{progressText}</div>
              <CompactResultBadge label="정답" value={counts.correct} tone="text-emerald-500" />
              <CompactResultBadge label="오답" value={counts.wrong} tone="text-rose-500" />
              <CompactResultBadge label="모름" value={counts.skipped} tone="text-amber-500" />
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
                처음부터
              </Button>
              <Button size="sm" variant="outline" onClick={handleShuffle}>
                <Shuffle className="h-4 w-4" />
                섞기
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowSettings(true)} aria-haspopup="dialog" aria-expanded={showSettings}>
                설정
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
                sentenceFontSize={sentenceFontSize}
                setSentenceFontSize={setSentenceFontSize}
                resetDeck={handleReset}
              />
            </div>
          </div>

          {currentResult ? (
            <div
              className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                currentResult === "correct"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : currentResult === "wrong"
                    ? "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                    : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
              }`}
            >
              {currentResult === "correct"
                ? "정답입니다. 문장 구조를 그대로 익혀두면 비슷한 패턴에도 바로 적용할 수 있습니다."
                : currentResult === "wrong"
                  ? "오답입니다. 바로 아래 해설에서 문장 구조를 확인해보세요."
                  : "모르는 문제로 넘겼습니다. 정답과 해설을 보고 다시 익혀두면 좋습니다."}
            </div>
          ) : null}

          <div className="ds-surface-soft mt-8 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">빈칸에 들어갈 가장 알맞은 표현을 고르세요.</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => speak(currentQuestion.prompt.replace("_____", currentQuestion.answer))}
                disabled={!isTtsSupported || !ttsReady}
                className="w-full justify-center sm:w-auto"
              >
                <Volume2 className="h-4 w-4" />
                문장 듣기
              </Button>
            </div>

            <div className="mt-6">{renderSentence(currentQuestion.prompt, sentenceFontSize, currentResult ? currentQuestion.answer : undefined)}</div>

            {currentResult ? <p className="mt-4 text-base text-muted-foreground">{currentQuestion.translation}</p> : null}

            <div className="mt-8 space-y-3">
              {currentQuestion.choices.map((choice, index) => {
                const optionLabel = String.fromCharCode(65 + index);
                const isCorrect = choice === currentQuestion.answer;
                const isSelected = choice === selectedChoice;
                const answered = Boolean(currentResult);
                const containerClass = answered
                  ? isCorrect
                    ? "border-primary bg-primary/10 text-primary"
                    : isSelected
                      ? "border-rose-500 bg-rose-500/10 text-rose-500"
                      : "border-border bg-card text-muted-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent/40";

                return (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => handleSelect(choice)}
                    disabled={answered}
                    className={`flex w-full items-center gap-3 rounded-[24px] border px-4 py-3 text-left transition-colors ${containerClass}`}
                  >
                    <span
                      className="inline-flex shrink-0 items-center justify-center rounded-full border border-current font-semibold"
                      style={{ width: `${optionCircleSize}px`, height: `${optionCircleSize}px`, fontSize: `${Math.max(18, optionTextSize)}px` }}
                    >
                      {optionLabel}
                    </span>
                    <span className="min-w-0 flex-1 font-medium" style={{ fontSize: `${optionTextSize}px` }}>
                      {choice}
                    </span>
                    {answered && isCorrect ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : null}
                    {answered && isSelected && !isCorrect ? <XCircle className="h-5 w-5 shrink-0" /> : null}
                  </button>
                );
              })}
            </div>

            {currentResult ? (
              <div className="mt-8 rounded-[24px] border border-border bg-card px-5 py-5">
                <h2 className="text-lg font-semibold text-foreground">해설</h2>
                <ol className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                  {currentQuestion.explanation.map((item, index) => (
                    <li key={item}>
                      {index + 1}. {item}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-muted-foreground">전체 {visibleDeck.length}문제 중 {solvedCount}문제를 확인했습니다.</div>
              <div className="flex flex-wrap gap-2">
                {!currentResult ? (
                  <Button variant="outline" onClick={handleSkip}>
                    <CircleHelp className="h-4 w-4" />
                    모르는 문제
                  </Button>
                ) : null}
                <Button variant="outline" onClick={handlePrevious} disabled={isFirstQuestion}>
                  이전 문제
                </Button>
                <Button onClick={handleNext}>{isLastQuestion ? "다시 시작" : "다음 문제"}</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
