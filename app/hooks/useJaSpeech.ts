// app/hooks/useJaSpeech.ts
"use client";

import { useState, useEffect, useCallback } from 'react';

// --- Helper Functions ---
const isBrowser = typeof window !== 'undefined';
const isSpeechSynthesisSupported = () => isBrowser && 'speechSynthesis' in window;
const isSafariBrowser = () => isBrowser && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export function useJaSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSupported] = useState(isSpeechSynthesisSupported);
  const [isSafari] = useState(isSafariBrowser);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isSupported) return;

    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      if (allVoices.length === 0) return; // Voices not ready yet

      const jaVoices = allVoices.filter(v => v.lang.startsWith('ja'));
      setVoices(jaVoices);

      if (jaVoices.length > 0) {
        const storedVoiceName = localStorage.getItem("jaVoiceName");
        const foundVoice = jaVoices.find(v => v.name === storedVoiceName);
        setSelectedVoice(foundVoice || jaVoices[0]);
        setReady(true);
      }
    };

    // Voices might load asynchronously.
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    loadVoices(); // Attempt initial load

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [isSupported]);

  // ★★★ [개선] 음성 변경과 localStorage 저장을 한 번에 처리하는 함수 ★★★
  const selectVoice = useCallback((voice: SpeechSynthesisVoice | null) => {
    if (voice) {
      setSelectedVoice(voice);
      try {
        localStorage.setItem("jaVoiceName", voice.name);
      } catch (error) {
        console.error("Failed to save voice to localStorage", error);
      }
    }
  }, []);

  const speakJa = useCallback((text: string) => {
    if (ready && selectedVoice && text) {
      // Cancel any previous speech to prevent overlap
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
      window.speechSynthesis.speak(utterance);
    }
  }, [ready, selectedVoice]);

  return { 
    isSupported, 
    ready, 
    speakJa, 
    selectedVoice, 
    voices, 
    selectVoice, // setSelectedVoice 대신 이 함수를 사용합니다.
    isSafari 
  };
}