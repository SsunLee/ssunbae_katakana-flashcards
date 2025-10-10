"use client";

import { useState, useEffect } from "react";

/**
 * 한글 낭독을 위한 SpeechSynthesis API 훅.
 * 사용 가능한 한국어 음성을 찾아 관리하고, 텍스트를 음성으로 변환하는 기능을 제공합니다.
 * @returns {object} ttsReady, speakKo, voices, selectedVoice, selectVoice
 */
export function useKoSpeech() {
  const [ttsReady, setTtsReady] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    // 서버 사이드에서는 실행되지 않도록 방어 코드 추가
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    function updateVoices() {
      const allVoices = window.speechSynthesis.getVoices();
      const koVoices = allVoices.filter(v => v.lang.startsWith("ko"));
      setVoices(koVoices);
      
      // 선택된 음성이 없거나, 현재 선택된 음성이 더 이상 목록에 없을 때 기본값으로 설정
      if (koVoices.length > 0 && (!selectedVoice || !koVoices.includes(selectedVoice))) {
        setSelectedVoice(koVoices[0]);
      }
      
      setTtsReady(koVoices.length > 0);
    }

    // voices가 변경될 때 즉시 호출하고, 이벤트 리스너도 등록합니다.
    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [selectedVoice]); // selectedVoice를 의존성 배열에 추가하여 안정성 확보

  /**
   * 주어진 텍스트를 한국어로 읽어줍니다.
   * @param {string} text - 읽을 텍스트
   */
  const speakKo = (text: string) => {
    if (!ttsReady || typeof window === "undefined" || !window.speechSynthesis) return;
    
    // 진행 중인 모든 음성 출력을 취소하여 중첩 방지
    window.speechSynthesis.cancel();

    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "ko-KR";
    if (selectedVoice) {
      utter.voice = selectedVoice;
    }
    window.speechSynthesis.speak(utter);
  };

  /**
   * 사용할 음성을 선택합니다.
   * @param {SpeechSynthesisVoice | null} voice - 선택할 음성 객체
   */
  const selectVoice = (voice: SpeechSynthesisVoice | null) => {
    setSelectedVoice(voice);
  };

  return { ttsReady, speakKo, voices, selectedVoice, selectVoice };
}
