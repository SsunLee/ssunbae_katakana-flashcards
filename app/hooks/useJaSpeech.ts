// app/hooks/useJaSpeech.ts
"use client";

import { useState, useEffect, useCallback } from 'react';

// --- Helper Functions ---
const isBrowser = typeof window !== 'undefined';
const isSpeechSynthesisSupported = () => isBrowser && 'speechSynthesis' in window;
const isSafariBrowser = () => isBrowser && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const normalizeLang = (lang?: string) => (lang || '').toLowerCase().replace('_', '-');

const isLikelyJapaneseVoice = (voice: SpeechSynthesisVoice) => {
  const lang = normalizeLang(voice.lang);
  if (lang.startsWith('ja')) return true;

  const haystack = `${voice.name} ${voice.voiceURI}`.toLowerCase();
  const japaneseHints = [
    'ja-jp',
    'japanese',
    'nihongo',
    'otoya',
    'o-ren',
    'oren',
    'kyoto',
    'kyoko',
    'siri',
  ];

  return japaneseHints.some((hint) => haystack.includes(hint));
};

const dedupeVoices = (voices: SpeechSynthesisVoice[]) => {
  const map = new Map<string, SpeechSynthesisVoice>();
  voices.forEach((voice) => {
    const key = `${voice.voiceURI || voice.name}__${normalizeLang(voice.lang)}`;
    if (!map.has(key)) map.set(key, voice);
  });
  return Array.from(map.values());
};

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

      let jaVoices = dedupeVoices(allVoices.filter(isLikelyJapaneseVoice));

      // Safari는 일본어 음성을 늦게/제한적으로 노출하는 경우가 있어 보조 필터를 한 번 더 적용
      if (isSafari && jaVoices.length <= 1) {
        const expanded = dedupeVoices(
          allVoices.filter((voice) => {
            const haystack = `${voice.name} ${voice.voiceURI}`.toLowerCase();
            return (
              haystack.includes('siri') ||
              haystack.includes('otoya') ||
              haystack.includes('o-ren') ||
              haystack.includes('kyoto') ||
              haystack.includes('kyoko') ||
              haystack.includes('ja-jp')
            );
          })
        );
        if (expanded.length > jaVoices.length) jaVoices = expanded;
      }

      // 최종 정렬: 일본어 lang 우선, 그 다음 이름순
      jaVoices.sort((a, b) => {
        const aJa = normalizeLang(a.lang).startsWith('ja') ? 0 : 1;
        const bJa = normalizeLang(b.lang).startsWith('ja') ? 0 : 1;
        if (aJa !== bJa) return aJa - bJa;
        return a.name.localeCompare(b.name);
      });

      setVoices(jaVoices);

      if (jaVoices.length > 0) {
        const storedVoiceUri = localStorage.getItem("jaVoiceUri");
        const storedVoiceName = localStorage.getItem("jaVoiceName");
        const foundVoice =
          jaVoices.find((v) => v.voiceURI === storedVoiceUri) ||
          jaVoices.find((v) => v.name === storedVoiceName);
        setSelectedVoice(foundVoice || jaVoices[0]);
        setReady(true);
      } else {
        setReady(false);
      }
    };

    // Voices might load asynchronously.
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    loadVoices(); // Attempt initial load
    const retryTimers = [500, 1500, 3000].map((ms) => window.setTimeout(loadVoices, ms));

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      retryTimers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [isSupported, isSafari]);

  // ★★★ [개선] 음성 변경과 localStorage 저장을 한 번에 처리하는 함수 ★★★
  const selectVoice = useCallback((voice: SpeechSynthesisVoice | null) => {
    if (voice) {
      setSelectedVoice(voice);
      try {
        localStorage.setItem("jaVoiceName", voice.name);
        localStorage.setItem("jaVoiceUri", voice.voiceURI || "");
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
