"use client";

import { SentenceQuizPage } from "@/app/components/SentenceQuizPage";
import { KOREAN_SENTENCE_QUIZ } from "@/app/data/korean-sentence-quiz";
import { useKoSpeech } from "@/app/hooks/useKoSpeech";
import { useLocale } from "@/app/context/LocaleContext";

export default function KoreanSentenceQuizRoute() {
  const { ttsReady, speakKo, selectedVoice, voices, selectVoice } = useKoSpeech();
  const { t } = useLocale();

  return (
    <SentenceQuizPage
      deckType="korean-sentences"
      subject={t("quiz.koreanSubject")}
      title={t("quiz.questionTitle")}
      eyebrow={t("quiz.koreanSubject")}
      subtitle={t("quiz.koreanSubtitle")}
      deck={KOREAN_SENTENCE_QUIZ}
      storageKeyPrefix="koSentenceQuiz"
      defaultFontFamily="Noto Sans KR"
      defaultSentenceFontSize={24}
      lastActivePage="/study/korean/sentences"
      isTtsSupported={voices.length > 0}
      ttsReady={ttsReady}
      speak={speakKo}
      selectedVoice={selectedVoice}
      voices={voices}
      selectVoice={selectVoice}
    />
  );
}
