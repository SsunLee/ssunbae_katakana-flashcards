"use client";

import { SentenceQuizPage } from "@/app/components/SentenceQuizPage";
import { ENGLISH_SENTENCE_QUIZ } from "@/app/data/english-sentence-quiz";
import { useEnSpeech } from "@/app/hooks/useEnSpeech";

export default function EnglishSentenceQuizRoute() {
  const { isSupported, ready, speakEn, selectedVoice, voices, selectVoice, isSafari } = useEnSpeech();

  return (
    <SentenceQuizPage
      deckType="english-sentences"
      subject="영어 문장 퀴즈"
      title="Question"
      eyebrow="English Sentence Quiz"
      subtitle="초급, 중급, 고급 문장 빈칸을 풀며 문법과 표현을 반복 학습합니다."
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

