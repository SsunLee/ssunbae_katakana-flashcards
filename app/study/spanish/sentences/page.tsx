"use client";

import { SentenceQuizPage } from "@/app/components/SentenceQuizPage";
import { SPANISH_SENTENCE_QUIZ } from "@/app/data/spanish-sentence-quiz";
import { useEsSpeech } from "@/app/hooks/useEsSpeech";

export default function SpanishSentenceQuizRoute() {
  const { isSupported, ready, speakEs, selectedVoice, voices, selectVoice, isSafari } = useEsSpeech();

  return (
    <SentenceQuizPage
      deckType="spanish-sentences"
      subject="스페인어 문장 퀴즈"
      title="Pregunta"
      eyebrow="Spanish Sentence Quiz"
      subtitle="스페인어 문장 빈칸을 난이도별로 풀며 기본 동사와 연결 표현을 연습합니다."
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

