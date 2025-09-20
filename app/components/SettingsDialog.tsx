// app/components/SettingsDialog.tsx
"use client";

import React from 'react';
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "./ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import type { UserProfile } from '../AuthContext';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfile | null;
  deckType: string;

  // TTS
  isTtsSupported: boolean;
  selectedVoice: SpeechSynthesisVoice | null;
  selectVoice: (voice: SpeechSynthesisVoice | null) => void;
  voices: SpeechSynthesisVoice[];
  isSafari: boolean;

  // Font
  fontFamily: string;
  setFontFamily: (font: string) => void;
  
  // Font Size (Optional)
  sentenceFontSize?: number;
  setSentenceFontSize?: (size: number) => void;
  wordFontSize?: number;
  setWordFontSize?: (size: number) => void;

  // Word Import (Optional)
  topic?: string;
  setTopic?: (topic: string) => void;
  wordCount?: number;
  setWordCount?: (count: number) => void;
  loadingImport?: boolean;
  importWordsFromServer?: (topic: string, count: number) => void;
  resetDeck: () => void;
}

export function SettingsDialog({
  open, onOpenChange, user, deckType,
  isTtsSupported, selectedVoice, selectVoice, voices, isSafari,
  fontFamily, setFontFamily, 
  sentenceFontSize, setSentenceFontSize,
  wordFontSize, setWordFontSize,
  topic, setTopic, wordCount, setWordCount, loadingImport, importWordsFromServer, resetDeck
}: SettingsDialogProps) {

  const showWordImport = deckType.endsWith('-words');
  const isEnglishMode = deckType.startsWith('english');
  const isSpanishMode = deckType.startsWith('spanish');
  // --- ✨ 문장 모드인지 확인하는 변수 추가 ---
  const isSentenceMode = deckType.endsWith('-sentences') || deckType === 'sentences';


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="bg-white/10 border-white/10 hover:bg-white/15" title="설정">
          ⚙️ 설정
        </Button>
      </DialogTrigger>

      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
      <DialogContent className="bg-slate-800/60 border-white/10 text-white rounded-2xl shadow-xl p-0 w-full max-w-lg">
        <div className="p-6">
          <DialogHeader className="mb-4 text-left">
            <DialogTitle className="text-lg font-semibold text-white flex items-center gap-2">⚙️ 설정</DialogTitle>
          </DialogHeader>
          
          {isTtsSupported && (
            <div className="mb-4">
              <label className="block text-sm text-white/70 mb-1">TTS Voice</label>
              <Select
                value={selectedVoice?.name || ""}
                onValueChange={(val) => {
                  const voice = voices.find(v => v.name === val) || null;
                  selectVoice(voice); 
                }}
                disabled={voices.length === 0}
              >
                <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white text-left">
                  {selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : '목소리를 찾을 수 없습니다.'}
                </SelectTrigger>
                <SelectContent className="z-[70] bg-slate-900 border-white/10" position="popper" sideOffset={8}>
                  {voices.map(v => <SelectItem className="text-white" key={v.name} value={v.name}>{v.name} ({v.lang})</SelectItem>)}
                </SelectContent>
              </Select>
              <div className="mt-1 text-xs text-white/50">브라우저: {isSafari ? "Safari" : "Chrome/Edge 등"}</div>
            </div>
          )}

          <div className="mb-2">
            <label className="block text-sm text-white/70 mb-1">Font</label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white"><SelectValue placeholder="Select font" /></SelectTrigger>
                <SelectContent className="z-[70] bg-slate-900 border-white/10" position="popper" sideOffset={8}>
                  {isEnglishMode ? (
                    <>
                      <SelectItem className="text-white" value="Inter">Inter</SelectItem>
                      <SelectItem className="text-white" value="Roboto">Roboto</SelectItem>
                      <SelectItem className="text-white" value="Lato">Lato</SelectItem>
                      <SelectItem className="text-white" value="Times New Roman">Times New Roman</SelectItem>
                    </>
                  ) : isSpanishMode ? (
                    <>
                      <SelectItem className="text-white" value="Lato">Lato (기본)</SelectItem>
                      <SelectItem className="text-white" value="Merriweather">Merriweather</SelectItem>
                      <SelectItem className="text-white" value="Roboto">Roboto</SelectItem>
                    </>
                  ) : ( // Japanese
                    <>
                      <SelectItem className="text-white" value="Noto Sans JP">Noto Sans JP</SelectItem>
                      <SelectItem className="text-white" value="Zen Kaku Gothic New">Zen Kaku Gothic New</SelectItem>
                      <SelectItem className="text-white" value="Noto Serif JP">Noto Serif JP</SelectItem>
                      <SelectItem className="text-white" value="Kosugi Maru">Kosugi Maru</SelectItem>
                    </>
                  )}
                </SelectContent>
            </Select>
          </div>

          {(deckType === 'english-words' || deckType === 'spanish-words') && wordFontSize && setWordFontSize && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <label htmlFor="word-font-size" className="block text-sm text-white/70 mb-1">
                단어 크기
              </label>
              <div className="flex items-center gap-4">
                <div className="w-full flex-grow bg-slate-900/50 rounded-full border border-white/10 flex items-center p-1">
                  <Slider
                    id="word-font-size"
                    min={24} max={72} step={1}
                    value={[wordFontSize]}
                    onValueChange={(value) => setWordFontSize(value[0])}
                    className="w-full"
                  />
                </div>
                <span className="text-sm w-12 text-center">{wordFontSize}px</span>
              </div>
            </div>
          )}

          {/* --- ✨ 문장 크기 조절 슬라이더 조건 수정 --- */}
          {isSentenceMode && sentenceFontSize && setSentenceFontSize && (
            <div className="mt-4 border-t border-white/10 pt-4">
              <label htmlFor="font-size" className="block text-sm text-white/70 mb-1">문장 크기</label>
              <div className="flex items-center gap-4">
                <div className="w-full flex-grow bg-slate-900/50 rounded-full border border-white/10 flex items-center p-1">
                  <Slider
                    id="font-size"
                    min={18} max={40} step={1}
                    value={[sentenceFontSize]}
                    onValueChange={(value) => setSentenceFontSize(value[0])}
                    className="w-full"
                  />
                </div>
                <span className="text-sm w-12 text-center">{sentenceFontSize}px</span>
              </div>
            </div>
          )}

          {showWordImport && topic !== undefined && setTopic && wordCount !== undefined && setWordCount && loadingImport !== undefined && importWordsFromServer && (
             <div className="mt-4 border-t border-white/10 pt-4 text-center text-white/70">
                '단어 가져오기' 기능은 현재 일본어 학습에서만 지원됩니다.
             </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

