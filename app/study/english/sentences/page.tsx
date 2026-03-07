"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, RotateCcw, Volume2, XCircle } from "lucide-react";

import { useAuth } from "@/app/AuthContext";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { Button } from "@/app/components/ui/button";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { ENGLISH_SENTENCE_QUIZ } from "@/app/data/english-sentence-quiz";
import { useStudySessionAnalytics } from "@/app/hooks/useStudySessionAnalytics";
import { useEnSpeech } from "@/app/hooks/useEnSpeech";

type QuizResult = "correct" | "wrong" | "skipped";

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

function renderSentence(prompt: string, answer?: string) {
  const [before, after] = prompt.split("_____");

  return (
    <p className="text-xl font-semibold leading-9 text-foreground sm:text-2xl">
      {before}
      {answer ? <span className="border-b-2 border-primary px-1 text-primary">{answer}</span> : <span className="border-b-2 border-muted-foreground/40 px-8" />}
      {after}
    </p>
  );
}

export default function EnglishSentenceQuizPage() {
  const deckType = "english-sentences";
  const { user } = useAuth();
  const { open } = useAuthModal();
  const { isSupported: isTtsSupported, ready: ttsReady, speakEn } = useEnSpeech();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const [results, setResults] = useState<Record<number, QuizResult>>({});
  const visibleDeck = useMemo(() => (user ? ENGLISH_SENTENCE_QUIZ : ENGLISH_SENTENCE_QUIZ.slice(0, 3)), [user]);

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
  const progressText = visibleDeck.length > 0 ? `${questionIndex + 1} / ${visibleDeck.length}` : "0 / 0";
  const solvedCount = counts.correct + counts.wrong + counts.skipped;

  useEffect(() => {
    localStorage.setItem("lastActivePage", "/study/english/sentences");
  }, []);

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

  if (!currentQuestion) {
    return null;
  }

  const handleSelect = (choice: string) => {
    if (currentResult) return;

    const result: QuizResult = choice === currentQuestion.answer ? "correct" : "wrong";
    setSelectedChoice(choice);
    setCurrentResult(result);
    setResults((prev) => ({ ...prev, [currentQuestion.id]: result }));
  };

  const handleSkip = () => {
    if (currentResult) return;
    setSelectedChoice(null);
    setCurrentResult("skipped");
    setResults((prev) => ({ ...prev, [currentQuestion.id]: "skipped" }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setQuestionIndex(0);
      setSelectedChoice(null);
      setCurrentResult(null);
      return;
    }

    setQuestionIndex((prev) => prev + 1);
    setSelectedChoice(null);
    setCurrentResult(null);
  };

  const handleReset = () => {
    setQuestionIndex(0);
    setSelectedChoice(null);
    setCurrentResult(null);
    setResults({});
  };

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-[760px]">
        <WelcomeBanner
          name={user?.nickname || undefined}
          subject={STUDY_LABELS[deckType]}
          subtitle="문장 빈칸을 보고 가장 자연스러운 표현을 고르는 퀴즈입니다."
        />

        {!user ? (
          <LoginPromptCard
            onLoginClick={() => open("login")}
            title="로그인하면 문장 퀴즈 학습 기록이 자동 저장됩니다."
            features={["문장 퀴즈 학습 기록 저장", "최근 학습 흐름 대시보드 반영", "다른 학습 모드와 함께 기록 통합"]}
          />
        ) : null}

        <section className="rounded-[28px] border border-border bg-card p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">English Sentence Quiz</p>
              <h1 className="mt-1 text-2xl font-semibold text-foreground">Question {questionIndex + 1}</h1>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground">{progressText}</div>
              <CompactResultBadge label="정답" value={counts.correct} tone="text-emerald-500" />
              <CompactResultBadge label="오답" value={counts.wrong} tone="text-rose-500" />
              <CompactResultBadge label="모름" value={counts.skipped} tone="text-amber-500" />
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
                처음부터
              </Button>
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
                  ? "오답입니다. 바로 아래 해설에서 시제와 문장 구조를 확인해보세요."
                  : "모르는 문제로 넘겼습니다. 정답과 해설을 보고 다시 한 번 익혀두면 좋습니다."}
            </div>
          ) : null}

          <div className="mt-8 rounded-[28px] border border-border bg-background/70 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">빈칸에 들어갈 가장 알맞은 표현을 고르세요.</p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => speakEn(currentQuestion.prompt.replace("_____", currentQuestion.answer))}
                disabled={!isTtsSupported || !ttsReady}
              >
                <Volume2 className="h-4 w-4" />
                문장 듣기
              </Button>
            </div>

            <div className="mt-6">{renderSentence(currentQuestion.prompt, currentResult ? currentQuestion.answer : undefined)}</div>

            {currentResult ? (
              <p className="mt-4 text-base text-muted-foreground">{currentQuestion.translation}</p>
            ) : null}

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
                    className={`flex w-full items-center gap-4 rounded-[24px] border px-4 py-4 text-left transition-colors ${containerClass}`}
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current text-lg font-semibold">
                      {optionLabel}
                    </span>
                    <span className="min-w-0 flex-1 text-lg font-medium">{choice}</span>
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
                <Button onClick={handleNext}>{isLastQuestion ? "다시 시작" : "다음 문제"}</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
