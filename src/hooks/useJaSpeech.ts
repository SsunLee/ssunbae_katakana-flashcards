
import { useEffect, useState } from 'react';


// Web Speech API 지원 여부를 확인하는 변수
const IS_SPEECH_SYNTHESIS_SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window;


// —— Web Speech API (ja-JP) helper with Safari optimization ——
export function useJaSpeech() {

  const [isSupported] = useState(IS_SPEECH_SYNTHESIS_SUPPORTED);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [ready, setReady] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {

    if (!isSupported) {
      setReady(false);
      return;
    }

    const synth = window.speechSynthesis;
    function loadVoices() {

      const allVoices = synth.getVoices();
      const jaVoices = allVoices.filter(v => 
        (v.lang || '').toLowerCase().startsWith('ja'));
      
      setVoices(jaVoices);
      setReady(jaVoices.length > 0);
      
      // Auto-select best Japanese voice when voices load
      if (jaVoices.length > 0) {
        // 1) 로컬스토리지에 저장된 보이스 우선
        let stored: SpeechSynthesisVoice | null = null;
        try {
          const storedName = localStorage.getItem('jaVoiceName');
          if (storedName) stored = jaVoices.find(v => v.name === storedName) || null;
        } catch {}
        // 2) 없으면 최적 보이스 자동 선택
        const bestVoice = stored || pickBestJaVoice(jaVoices);
        setSelectedVoice(bestVoice);

        // save 
        try {
          localStorage.setItem('jaVoiceName', bestVoice?.name || '');
        } catch {}

      }
    }
    
    // Safari sometimes needs multiple attempts to load voices
    loadVoices();
    if (window.speechSynthesis.getVoices().length === 0) {
      setTimeout(loadVoices, 100);
      setTimeout(loadVoices, 500);
    }
    
    synth.onvoiceschanged = loadVoices;
    return () => { synth.onvoiceschanged = null; };
  }, []);

  function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  function pickBestJaVoice(vs: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (vs.length === 0) return null;

    // For Safari, prioritize specific high-quality Japanese voices
    if (isSafari()) {
      // Try to find the best Japanese voices on Safari/macOS
      const priorities = [
        'Kyoko',           // macOS built-in Japanese voice (best quality)
        'Otoya',           // Alternative Japanese voice
        'O-ren',           // Another Japanese voice option
      ];
      
      for (const name of priorities) {
        const voice = vs.find(v => v.name.includes(name));
        if (voice) return voice;
      }
    }

    // General prioritization for all browsers
    const jaVoices = vs.filter(v => {
      const lang = v.lang?.toLowerCase();
      return lang?.startsWith('ja') || /japanese|nihon/i.test(v.name);
    });

    if (jaVoices.length === 0) {
      console.warn('No Japanese voices found, using default voice');
      return vs[0] || null;
    }

    // Prioritize by quality indicators
    const sortedVoices = jaVoices.sort((a, b) => {
      // Prefer local voices over remote
      if (a.localService !== b.localService) {
        return a.localService ? -1 : 1;
      }
      
      // Prefer voices with 'ja-JP' over other Japanese variants
      const aIsJaJP = a.lang === 'ja-JP';
      const bIsJaJP = b.lang === 'ja-JP';
      if (aIsJaJP !== bIsJaJP) {
        return aIsJaJP ? -1 : 1;
      }
      
      // For Safari, prefer specific known good voices
      if (isSafari()) {
        const qualityNames = ['Kyoko', 'Otoya', 'O-ren'];
        const aHasQuality = qualityNames.some(name => a.name.includes(name));
        const bHasQuality = qualityNames.some(name => b.name.includes(name));
        if (aHasQuality !== bHasQuality) {
          return aHasQuality ? -1 : 1;
        }
      }
      
      return 0;
    });

    return sortedVoices[0];
  }

  function speakJa(text: string) {

    if (!isSupported) return;

    const synth = window.speechSynthesis;
    if (!text || !('speechSynthesis' in window)) return;
    
    synth.cancel();
    
    const utter = new SpeechSynthesisUtterance(text);
    const voice = selectedVoice || pickBestJaVoice(voices);
    
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang || 'ja-JP';
    } else {
      utter.lang = 'ja-JP';
    }
    
    // Optimize speech parameters for better quality
    utter.rate = isSafari() ? 0.9 : 1.0;  // Slightly slower on Safari for clarity
    utter.pitch = 1.0;
    utter.volume = 1.0;
    
    // Add error handling
    utter.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
    };
    
    synth.speak(utter);
  }

  return { 
    isSupported,
    ready, 
    voices, 
    selectedVoice,
    speakJa,
    setSelectedVoice,
    isSafari: isSafari()
  } as const;
}