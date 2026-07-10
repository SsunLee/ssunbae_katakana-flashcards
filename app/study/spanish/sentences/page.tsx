"use client";

import { SentenceQuizPage } from "@/app/components/SentenceQuizPage";
import { SPANISH_SENTENCE_QUIZ } from "@/app/data/spanish-sentence-quiz";
import { useEsSpeech } from "@/app/hooks/useEsSpeech";
import { useLocale } from "@/app/context/LocaleContext";

export default function SpanishSentenceQuizRoute() {
  const { isSupported, ready, speakEs, selectedVoice, voices, selectVoice, isSafari } = useEsSpeech();
  const { t } = useLocale();

  return (
    <SentenceQuizPage
      deckType="spanish-sentences"
      subject={t("quiz.spanishSubject")}
      title={t("quiz.questionTitle")}
      eyebrow={t("quiz.spanishSubject")}
      subtitle={t("quiz.spanishSubtitle")}
      deck={SPANISH_SENTENCE_QUIZ}
      storageKeyPrefix="esSentenceQuiz"
      defaultFontFamily="Lato"
      defaultSentenceFontSize={24}
      lastActivePage="/study/spanish/sentences"
      isTtsSupported={isSupported}
      ttsReady={ready}
      speak={speakEs}
      selectedVoice={selectedVoice}
      voices={voices}
      selectVoice={selectVoice}
      isSafari={isSafari}
    />
  );
}
