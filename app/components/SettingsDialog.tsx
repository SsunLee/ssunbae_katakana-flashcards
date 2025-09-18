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
                      <SelectItem className="text-white" value="Inter">Inter (기본)</SelectItem>
                      <SelectItem className="text-white" value="Roboto">Roboto</SelectItem>
                      <SelectItem className="text-white" value="Lato">Lato</SelectItem>
                      <SelectItem className="text-white" value="Times New Roman">Times New Roman</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem className="text-white" value="Noto Sans JP">Noto Sans JP (기본)</SelectItem>
                      <SelectItem className="text-white" value="Zen Kaku Gothic New">Zen Kaku Gothic New</SelectItem>
                      <SelectItem className="text-white" value="Noto Serif JP">Noto Serif JP</SelectItem>
                      <SelectItem className="text-white" value="Kosugi Maru">Kosugi Maru</SelectItem>
                    </>
                  )}
                </SelectContent>
            </Select>
          </div>

          {/* --- ✨ 영어 단어 크기 조절 슬라이더 추가 --- */}
          {deckType === 'english-words' && wordFontSize && setWordFontSize && (
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

          {deckType === 'sentences' && sentenceFontSize && setSentenceFontSize && (
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
            <>
              {user ? (
                <>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <label className="block text-sm text-white/70 mb-1">새로운 단어 주제</label>
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="예: 여행, 음식..." />
                  </div>
                  <div className="mt-2 text-sm text-white/70">
                    <label className="block text-sm text-white/70 mb-1">생성할 단어 개수</label>
                    <Select value={String(wordCount)} onValueChange={(value) => setWordCount(Number(value))}>
                        <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white"><SelectValue placeholder="단어 개수 선택" /></SelectTrigger>
                        <SelectContent className="z-[70] bg-slate-900 border-white/10" position="popper" sideOffset={8}>
                            <SelectItem className="text-white" value="5">5개</SelectItem>
                            <SelectItem className="text-white" value="10">10개</SelectItem>
                            <SelectItem className="text-white" value="15">15개</SelectItem>
                            <SelectItem className="text-white" value="20">20개</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="text-white bg-white/10 border-white/10 hover:bg-white/15" variant="outline" disabled={loadingImport} onClick={() => importWordsFromServer(topic, wordCount)} title="서버에서 새 단어를 불러옵니다">
                      {loadingImport ? '가져오는 중…' : '단어 가져오기'}
                    </Button>
                    <Button size="sm" className="text-white bg-white/10 border-white/10 hover:bg-white/15" variant="outline" onClick={() => { resetDeck(); alert('덱을 기본값으로 복원했습니다.'); }}>
                      저장본 복원
                    </Button>
                  </div>
                  <div className="mt-3 text-sm text-white/70">* '단어 가져오기'는 OpenAI API를 사용합니다.</div>
                </>
              ) : (
                <div className="mt-4 border-t border-white/10 pt-4 text-center text-white/70">
                  단어를 생성하려면 로그인이 필요합니다.
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

