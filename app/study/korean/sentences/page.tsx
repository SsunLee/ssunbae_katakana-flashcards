"use client";

import { SentenceQuizPage } from "@/app/components/SentenceQuizPage";
import { KOREAN_SENTENCE_QUIZ } from "@/app/data/korean-sentence-quiz";
import { useKoSpeech } from "@/app/hooks/useKoSpeech";

export default function KoreanSentenceQuizRoute() {
  const { ttsReady, speakKo, selectedVoice, voices, selectVoice } = useKoSpeech();

  return (
    <SentenceQuizPage
      deckType="korean-sentences"
      subject="한국어 문장 퀴즈"
      title="문제"
      eyebrow="Korean Sentence Quiz"
      subtitle="한국어 문장 빈칸을 난이도별로 풀며 기초 서술문과 연결 표현을 연습합니다."
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

