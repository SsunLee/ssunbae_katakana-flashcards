// app/hooks/useEnSpeech.ts
"use client";

import { useState, useEffect, useMemo } from 'react';

export function useEnSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [ready, setReady] = useState(false);

  const isSafari = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        // --- ✨ 영어 목소리만 필터링 ---
        const enVoices = availableVoices.filter(voice => voice.lang.startsWith('en-'));
        setVoices(enVoices);

        if (enVoices.length > 0) {
          // 로컬 스토리지에서 저장된 목소리 이름 가져오기
          const savedVoiceName = localStorage.getItem('selectedEnVoice');
          const savedVoice = enVoices.find(v => v.name === savedVoiceName);
          
          setSelectedVoice(savedVoice || enVoices[0]);
          setReady(true);
        }
      };

      // 목소리 목록이 변경될 때마다 업데이트
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices(); // 초기 로드

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const speakEn = (text: string) => {
    if (!isSupported || !ready || !selectedVoice || !text) return;
    
    window.speechSynthesis.cancel(); // 이전 음성 취소

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const selectVoice = (voice: SpeechSynthesisVoice | null) => {
    if (voice) {
      setSelectedVoice(voice);
      // 선택한 목소리를 로컬 스토리지에 저장
      localStorage.setItem('selectedEnVoice', voice.name);
    }
  };

  return { isSupported, ready, speakEn, selectedVoice, voices, selectVoice, isSafari };
}
