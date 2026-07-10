"use client";

import { SentenceQuizPage } from "@/app/components/SentenceQuizPage";
import { ENGLISH_SENTENCE_QUIZ } from "@/app/data/english-sentence-quiz";
import { useEnSpeech } from "@/app/hooks/useEnSpeech";
import { useLocale } from "@/app/context/LocaleContext";

export default function EnglishSentenceQuizRoute() {
  const { isSupported, ready, speakEn, selectedVoice, voices, selectVoice, isSafari } = useEnSpeech();
  const { t } = useLocale();

  return (
    <SentenceQuizPage
      deckType="english-sentences"
      subject={t("quiz.englishSubject")}
      title={t("quiz.questionTitle")}
      eyebrow={t("quiz.englishSubject")}
      subtitle={t("quiz.englishSubtitle")}
      deck={ENGLISH_SENTENCE_QUIZ}
      storageKeyPrefix="enSentenceQuiz"
      defaultFontFamily="Inter"
      defaultSentenceFontSize={21}
      lastActivePage="/study/english/sentences"
      isTtsSupported={isSupported}
      ttsReady={ready}
      speak={speakEn}
      selectedVoice={selectedVoice}
      voices={voices}
      selectVoice={selectVoice}
      isSafari={isSafari}
    />
  );
}
