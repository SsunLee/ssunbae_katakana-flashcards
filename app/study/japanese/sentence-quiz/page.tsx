"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, RotateCcw, Settings, Shuffle, Volume2, XCircle } from "lucide-react";

import { useAuth } from "@/app/AuthContext";
import KakaoAdFit from "@/app/components/KakaoAdFit";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { WelcomeBanner } from "@/app/components/WelcomeBanner";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { LOCAL_JAPANESE_SENTENCE_QUIZ } from "@/app/data/japanese-sentence-quiz";
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { useQuizTypographySettings } from "@/app/hooks/useQuizTypographySettings";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { useStudySessionAnalytics } from "@/app/hooks/useStudySessionAnalytics";
import { SINGLE_LEFT_SIDE_AD_MIN_WIDTH, normalizeAdUnit, resolveAdUnit } from "@/app/lib/kakao-adfit";
import { fetchJapaneseSentenceQuiz, isRemoteStudyApiEnabled } from "@/app/services/api";
import type { JapaneseSentenceQuiz } from "@/app/types/japaneseSentenceQuiz";

type QuizResult = "correct" | "wrong" | "skipped";

const JLPT_FILTERS = {
  N5: "N5",
  N4: "N4",
  N3: "N3",
  N2: "N2",
  N1: "N1",
} as const;

type JlptFilterKey = keyof typeof JLPT_FILTERS;

function shuffleArray<T>(items: T[]) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderRubyText(text: string, furigana?: string, className = "", showRuby = true) {
  if (!furigana || !showRuby) {
    return <span className={className}>{text}</span>;
  }

  return (
    <ruby className={className}>
      {text}
      <rt className="text-[0.62em] opacity-75">{furigana}</rt>
    </ruby>
  );
}

function renderPromptWithRuby(question: JapaneseSentenceQuiz, fontSize: number, revealed = false, showRuby = true) {
  const answerChoice = question.choices.find((choice) => choice.text === question.answer);
  const parts = question.promptReading ?? question.prompt.split("_____");
  const lineHeight = Math.round(fontSize * 1.45);

  return (
    <p className="font-semibold text-foreground" style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}>
      {parts.map((part, index) => {
        if (typeof part === "string") {
          if (part === "_____") {
            return revealed
              ? (
                <span key={`blank-${index}`} className="border-b-2 border-primary px-1 text-primary">
                  {renderRubyText(question.answer, answerChoice?.furigana, "", showRuby)}
                </span>
              )
              : <span key={`blank-${index}`} className="border-b-2 border-muted-foreground/40 px-8" />;
          }

          return <span key={`text-${index}`}>{part}</span>;
        }

        return <span key={`ruby-${index}`}>{renderRubyText(part.text, part.furigana, "", showRuby)}</span>;
      })}
    </p>
  );
}

function SignalResultBadge({
  correct,
  wrong,
  skipped,
}: {
  correct: number;
  wrong: number;
  skipped: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold sm:px-3 sm:py-1 sm:text-xs">
      <span className="text-emerald-500">{correct}</span>
      <span className="mx-1 text-muted-foreground">|</span>
      <span className="text-rose-500">{wrong}</span>
      <span className="mx-1 text-muted-foreground">|</span>
      <span className="text-amber-500">{skipped}</span>
    </div>
  );
}

export default function JapaneseSentenceQuizPage() {
  const deckType = "japanese-sentence-quiz";
  const { user } = useAuth();
  const { open } = useAuthModal();
  const { isSupported: isTtsSupported, ready: ttsReady, speakJa, selectedVoice, voices, selectVoice, isSafari } = useJaSpeech();
  const { deck, isLoading, error } = useStudyDeck<JapaneseSentenceQuiz>({
    user,
    deckType,
    initialDeck: LOCAL_JAPANESE_SENTENCE_QUIZ,
    fetchDeckData: isRemoteStudyApiEnabled ? fetchJapaneseSentenceQuiz : undefined,
  });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const [results, setResults] = useState<Record<number, QuizResult>>({});
  const [jlptFilters, setJlptFilters] = useState<Record<JlptFilterKey, boolean>>({
    N5: true,
    N4: true,
    N3: true,
    N2: true,
    N1: true,
  });
  const [shuffleTick, setShuffleTick] = useState(0);
  const [showRuby, setShowRuby] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const { fontFamily, setFontFamily, sentenceFontSize, setSentenceFontSize, fontStack } = useQuizTypographySettings({
    storageKeyPrefix: "jpSentenceQuiz",
    defaultFontFamily: "Noto Sans JP",
    defaultSentenceFontSize: 22,
  });
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const defaultPcEdgeAdUnit = normalizeAdUnit("DAN-of4TF8Q7PFDbKn5Z");
  const defaultMobileAdUnit = normalizeAdUnit("DAN-QMVosjDRN8zEUBnf");
  const leftSideAdUnit = resolveAdUnit(
    [
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_PC_SIDE_LEFT_UNIT,
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_PC_SIDE_UNIT,
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_SIDE_LEFT_UNIT,
      process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT,
    ],
    defaultPcEdgeAdUnit
  );
  const bottomAdUnit = resolveAdUnit(
    [process.env.NEXT_PUBLIC_KAKAO_ADFIT_MOBILE_UNIT, process.env.NEXT_PUBLIC_KAKAO_ADFIT_UNIT],
    defaultMobileAdUnit
  );

  useEffect(() => {
    localStorage.setItem("lastActivePage", "/study/japanese/sentence-quiz");
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("jpSentenceQuizShowRuby");
    if (saved === null) return;
    setShowRuby(saved === "1");
  }, []);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    window.addEventListener("orientationchange", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      window.removeEventListener("orientationchange", updateWidth);
    };
  }, []);

  const filteredDeck = useMemo(() => {
    const activeLevels = (Object.keys(jlptFilters) as JlptFilterKey[]).filter((key) => jlptFilters[key]);

    if (activeLevels.length === 0 || activeLevels.length === Object.keys(JLPT_FILTERS).length) {
      return deck;
    }

    return deck.filter((quiz) => activeLevels.includes(quiz.jlpt as JlptFilterKey));
  }, [deck, jlptFilters]);
  const orderedDeck = useMemo(() => {
    if (shuffleTick === 0) return filteredDeck;
    return shuffleArray(filteredDeck);
  }, [filteredDeck, shuffleTick]);
  const visibleDeck = useMemo(() => {
    if (user) return orderedDeck;
    return orderedDeck.slice(0, 3);
  }, [orderedDeck, user]);

  useEffect(() => {
    if (questionIndex < visibleDeck.length) return;
    setQuestionIndex(0);
    setSelectedChoice(null);
    setCurrentResult(null);
  }, [visibleDeck, questionIndex]);

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
  const solvedCount = counts.correct + counts.wrong + counts.skipped;
  const isLastQuestion = visibleDeck.length > 0 && questionIndex === visibleDeck.length - 1;
  const progressText = visibleDeck.length > 0 ? `${questionIndex + 1} / ${visibleDeck.length}` : "0 / 0";
  const questionLabel = visibleDeck.length > 0 ? `Q-${String(questionIndex + 1).padStart(3, "0")}` : "Q-000";
  const isWideLayout = viewportWidth !== null && viewportWidth >= SINGLE_LEFT_SIDE_AD_MIN_WIDTH;
  const optionTextSize = Math.max(13, Math.round(sentenceFontSize * 0.58));
  const optionCircleSize = Math.max(30, Math.round(sentenceFontSize * 1.25));

  useStudySessionAnalytics({
    userId: user?.uid,
    deckType,
    enabled: Boolean(user) && !isLoading && visibleDeck.length > 0,
    observedCardIds: currentQuestion ? [currentQuestion.id] : [],
  });

  const handleFilterChange = (level: JlptFilterKey) => {
    if (!user) return;
    setJlptFilters((prev) => ({ ...prev, [level]: !prev[level] }));
    setShuffleTick(0);
    setQuestionIndex(0);
    setSelectedChoice(null);
    setCurrentResult(null);
    setResults({});
  };

  const handleSelect = (choice: string) => {
    if (!currentQuestion || currentResult) return;

    const result: QuizResult = choice === currentQuestion.answer ? "correct" : "wrong";
    setSelectedChoice(choice);
    setCurrentResult(result);
    setResults((prev) => ({ ...prev, [currentQuestion.id]: result }));
  };

  const handleSkip = () => {
    if (!currentQuestion || currentResult) return;
    setSelectedChoice(null);
    setCurrentResult("skipped");
    setResults((prev) => ({ ...prev, [currentQuestion.id]: "skipped" }));
  };

  const handleNext = () => {
    if (visibleDeck.length === 0) return;

    if (isLastQuestion) {
      setQuestionIndex(0);
    } else {
      setQuestionIndex((prev) => prev + 1);
    }

    setSelectedChoice(null);
    setCurrentResult(null);
  };

  const handleReset = () => {
    setQuestionIndex(0);
    setSelectedChoice(null);
    setCurrentResult(null);
    setResults({});
  };

  const handleShuffle = () => {
    setShuffleTick((prev) => prev + 1);
    setQuestionIndex(0);
    setSelectedChoice(null);
    setCurrentResult(null);
    setResults({});
  };

  const handleRubyToggle = (next: boolean) => {
    setShowRuby(next);
    localStorage.setItem("jpSentenceQuizShowRuby", next ? "1" : "0");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-[660px] space-y-4">
          <Skeleton className="h-20 w-full rounded-[24px]" />
          <Skeleton className="h-14 w-full rounded-[20px]" />
          <Skeleton className="h-[420px] w-full rounded-[28px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6" style={{ fontFamily: fontStack }}>
      {isWideLayout ? (
        <aside
          className="fixed z-20 hidden min-[1024px]:block"
          style={{
            left: "calc(env(safe-area-inset-left, 0px) + 12px)",
            top: "calc(env(safe-area-inset-top, 0px) + 76px)",
          }}
        >
          <KakaoAdFit adUnit={leftSideAdUnit} width={160} height={600} />
        </aside>
      ) : null}

      <div className="mx-auto max-w-[660px]">
          <WelcomeBanner
            name={user?.nickname || undefined}
            subject={STUDY_LABELS[deckType]}
            subtitle="JLPT 레벨을 골라 일본어 문장 빈칸 퀴즈를 풀 수 있습니다."
            className="max-w-[430px]"
          />

          {!user ? (
            <LoginPromptCard
              onLoginClick={() => open("login")}
              title="로그인하면 일본어 문장 퀴즈 학습 기록이 자동 저장됩니다."
              features={["JLPT 문장 퀴즈 기록 저장", "분석 대시보드에 퀴즈 학습 반영", "원격 문제와 로컬 문제를 함께 활용"]}
            />
          ) : null}

          {error && deck.length > 0 ? (
            <div className="mb-4 rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
              원격 문제를 불러오지 못해 로컬 기본 5문제로 학습 중입니다.
            </div>
          ) : null}

          <div className="mb-4 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-xl border border-border bg-card p-3 text-sm">
            <span className="font-semibold text-foreground">JLPT 레벨:</span>
            {(Object.keys(JLPT_FILTERS) as JlptFilterKey[]).map((level) => (
              <label key={level} className={`flex items-center space-x-2 ${user ? "cursor-pointer" : "cursor-not-allowed opacity-60"}`}>
                <Checkbox
                  id={`jp-quiz-${level}`}
                  checked={jlptFilters[level]}
                  onCheckedChange={() => handleFilterChange(level)}
                  disabled={!user}
                />
                <span>{JLPT_FILTERS[level]}</span>
              </label>
            ))}
            {!user ? <span className="text-xs text-muted-foreground">비로그인 체험은 3문제까지 제공되며, JLPT 필터는 로그인 후 사용할 수 있습니다.</span> : null}
          </div>

          <section className="ds-surface p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold text-foreground">{questionLabel}</h1>
                  {currentQuestion ? (
                    <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:text-sm">
                      JLPT {currentQuestion.jlpt}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-1.5">
                <div className="ds-chip">{progressText}</div>
                <SignalResultBadge correct={counts.correct} wrong={counts.wrong} skipped={counts.skipped} />
                <Button size="icon" variant="outline" onClick={handleReset} aria-label="처음부터" className="h-8 w-8">
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
                <Button size="icon" variant="outline" onClick={handleShuffle} aria-label="섞기" className="h-8 w-8">
                  <Shuffle className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setShowSettings(true)}
                  aria-label="설정"
                  aria-haspopup="dialog"
                  aria-expanded={showSettings}
                  className="h-8 w-8"
                >
                  <Settings className="h-3.5 w-3.5" />
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

            {visibleDeck.length === 0 ? (
              <div className="mt-8 rounded-[24px] border border-dashed border-border bg-background/70 px-5 py-8 text-center text-sm text-muted-foreground">
                선택한 JLPT 레벨에 맞는 문제가 없습니다. 필터를 다시 선택해주세요.
              </div>
            ) : (
              <>
                {currentResult ? (
                  <div
                    className={`mt-5 rounded-2xl border px-4 py-3 ${
                      currentResult === "skipped" ? "text-xs sm:text-sm" : "text-sm"
                    } ${
                      currentResult === "correct"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                        : currentResult === "wrong"
                          ? "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {currentResult === "correct"
                      ? "정답입니다. 소리 내어 읽어보면 패턴이 잘 남습니다."
                      : currentResult === "wrong"
                        ? "오답입니다. 바로 아래 해설에서 문장 패턴을 확인해보세요."
                        : "모르는 문제로 넘겼습니다. 정답과 해설을 확인하고 다시 풀어보세요."}
                  </div>
                ) : null}

                <div className="ds-surface-soft mt-8 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">빈칸의 답을 고르시오.</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleRubyToggle(!showRuby)}
                        aria-label="히라가나 표시 토글"
                        title="히라가나 표시"
                        className={`inline-flex h-9 items-center justify-center rounded-full border px-2.5 transition-colors ${
                          showRuby
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-border bg-card text-muted-foreground hover:bg-accent/40"
                        }`}
                      >
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current text-[11px] font-semibold">
                          あ
                        </span>
                      </button>
                      <Button
                        variant="outline"
                        onClick={() => speakJa(currentQuestion.prompt.replace("_____", currentQuestion.answer))}
                        disabled={!isTtsSupported || !ttsReady}
                        aria-label="문장 듣기"
                        title="문장 듣기"
                        className="h-10 w-10 rounded-full p-0"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6">{renderPromptWithRuby(currentQuestion, sentenceFontSize, Boolean(currentResult), showRuby)}</div>

                  {currentResult ? (
                    <p className="mt-4 text-base text-muted-foreground">{currentQuestion.translation}</p>
                  ) : null}

                  <div className="mt-8 space-y-3">
                    {currentQuestion.choices.map((choice, index) => {
                      const optionLabel = String.fromCharCode(65 + index);
                      const isCorrect = choice.text === currentQuestion.answer;
                      const isSelected = choice.text === selectedChoice;
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
                          key={choice.text}
                          type="button"
                          onClick={() => handleSelect(choice.text)}
                          disabled={answered}
                          className={`flex w-full items-center gap-2 rounded-[22px] border px-3 py-2 text-left transition-colors sm:px-3.5 sm:py-2.5 ${containerClass}`}
                        >
                          <span
                            className="inline-flex shrink-0 items-center justify-center rounded-full border border-current font-semibold"
                            style={{ width: `${optionCircleSize}px`, height: `${optionCircleSize}px`, fontSize: `${Math.max(15, optionTextSize)}px` }}
                          >
                            {optionLabel}
                          </span>
                          <span className="min-w-0 flex-1 font-medium" style={{ fontSize: `${optionTextSize}px` }}>
                            {renderRubyText(choice.text, choice.furigana, "leading-6", showRuby)}
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
                    <div className="text-sm text-muted-foreground">현재 세션에서 {solvedCount}문제를 확인했습니다.</div>
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
              </>
            )}
          </section>

          {!isWideLayout ? (
            <div className="mt-6 flex justify-center">
              <KakaoAdFit adUnit={bottomAdUnit} width={300} height={250} />
            </div>
          ) : null}
      </div>
    </div>
  );
}
