// app/hooks/useEsSpeech.ts
"use client";

import { useState, useEffect, useMemo } from 'react';

export function useEsSpeech() {
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
        // --- ✨ 스페인어 목소리만 필터링 ---
        const esVoices = availableVoices.filter(voice => voice.lang.startsWith('es-'));
        setVoices(esVoices);

        if (esVoices.length > 0) {
          const savedVoiceName = localStorage.getItem('selectedEsVoice');
          const savedVoice = esVoices.find(v => v.name === savedVoiceName);
          
          setSelectedVoice(savedVoice || esVoices[0]);
          setReady(true);
        }
      };

      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const speakEs = (text: string) => {
    if (!isSupported || !ready || !selectedVoice || !text) return;
    
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const selectVoice = (voice: SpeechSynthesisVoice | null) => {
    if (voice) {
      setSelectedVoice(voice);
      localStorage.setItem('selectedEsVoice', voice.name);
    }
  };

  return { isSupported, ready, speakEs, selectedVoice, voices, selectVoice, isSafari };
}
