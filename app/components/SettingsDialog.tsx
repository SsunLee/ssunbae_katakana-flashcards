// app/components/SettingsDialog.tsx
"use client";

import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import type { UserProfile } from "../AuthContext";

import { useTheme } from "@/app/context/ThemeContext"; // ✅ 추가


const AI_SUPPORTED_DECKS = [
  "english-words",
  "spanish-words",
  "katakana-words",
  "spanish-sentences",
];

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfile | null;
  deckType: string;
  isTtsSupported: boolean;
  selectedVoice: SpeechSynthesisVoice | null;
  selectVoice: (voice: SpeechSynthesisVoice | null) => void;
  voices: SpeechSynthesisVoice[];
  isSafari: boolean;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  sentenceFontSize?: number;
  setSentenceFontSize?: (size: number) => void;
  wordFontSize?: number;
  setWordFontSize?: (size: number) => void;
  topic?: string;
  setTopic?: (topic: string) => void;
  wordCount?: number;
  setWordCount?: (count: number) => void;
  loadingImport?: boolean;
  importContent?: (topic: string, count: number) => void;
  resetDeck: () => void;
}

export function SettingsDialog({
  open,
  onOpenChange,
  user,
  deckType,
  isTtsSupported,
  selectedVoice,
  selectVoice,
  voices,
  isSafari,
  fontFamily,
  setFontFamily,
  sentenceFontSize,
  setSentenceFontSize,
  wordFontSize,
  setWordFontSize,
  topic,
  setTopic,
  wordCount,
  setWordCount,
  loadingImport,
  importContent,
  resetDeck,
}: SettingsDialogProps) {
  const showContentImport = AI_SUPPORTED_DECKS.includes(deckType);
  const isEnglishMode = deckType.startsWith("english");
  const isSpanishMode = deckType.startsWith("spanish");
  const isSentenceMode = deckType.endsWith("-sentences") || deckType === "sentences";
  const isKanjiMode = deckType === "kanji-words";
  const isCharMode = deckType.endsWith("-chars");
  const contentType = isSentenceMode ? "문장" : "단어";

  let sizeSliderLabel = "크기";
  if (isKanjiMode) sizeSliderLabel = "한자 크기";
  else if (isCharMode) sizeSliderLabel = "글자 크기";
  else if (isSentenceMode) sizeSliderLabel = "문장 크기";
  else sizeSliderLabel = "단어 크기";


  const { theme, setTheme } = useTheme(); // ✅ 추가: 전역 테마 컨텍스트 사용

  return (
    // ✅ 제어형 Dialog: 트리거 버튼은 외부(헤더)에서 관리
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card text-card-foreground border border-border rounded-2xl shadow-xl p-0 w-full max-w-lg">        <div className="p-6">
          <DialogHeader className="mb-4 text-left">
            <DialogTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              ⚙️ 설정
            </DialogTitle>
            <DialogDescription className="text-sm text-foreground/70">
              학습 환경을 사용자화하세요.
            </DialogDescription>
          </DialogHeader>

          {/* ✅ Theme Settings 섹션 (여기 추가) */}
          <div className="mb-4 pb-4 border-b ui-divider">
            <h3 className="text-sm font-semibold opacity-80 mb-2">Theme Settings</h3>
            <div className="flex items-center gap-3">
              <span className="w-24 text-sm opacity-80">Theme</span>
              <Select value={theme} onValueChange={(v) => setTheme(v as "light" | "dark")}>
                <SelectTrigger className="w-40 bg-muted/60 border text-foreground">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="z-[70] bg-background border">
                  <SelectItem value="light">White mode</SelectItem>
                  <SelectItem value="dark">Dark mode</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isTtsSupported && (
            <div className="mb-4">
              <label className="block text-sm text-foreground/70 mb-1">TTS Voice</label>
              <Select
                value={selectedVoice?.name || ""}
                onValueChange={(val) => {
                  const voice = voices.find((v) => v.name === val) || null;
                  selectVoice(voice);
                }}
                disabled={voices.length === 0}
              >
                <SelectTrigger className="w-full bg-muted/60 border border-border text-foreground">
                  {selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : "목소리를 찾을 수 없습니다."}
                </SelectTrigger>
                <SelectContent className="z-[70] bg-background border" position="popper" sideOffset={8}>
                  {voices.map((v) => (
                    <SelectItem key={v.name} value={v.name}>
                      {v.name} ({v.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* ✅ Font 섹션: 토큰화 */}
          <div className="mb-2">
            <label className="block text-sm opacity-80 mb-1">Font</label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger className="w-full bg-muted/60 border text-foreground">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent className="z-[70] bg-slate-900 border-white/10" position="popper" sideOffset={8}>
                {isEnglishMode ? (
                  <>
                    <SelectItem className="text-white" value="Inter">
                      Inter
                    </SelectItem>
                    <SelectItem className="text-white" value="Roboto">
                      Roboto
                    </SelectItem>
                    <SelectItem className="text-white" value="Lato">
                      Lato
                    </SelectItem>
                    <SelectItem className="text-white" value="Times New Roman">
                      Times New Roman
                    </SelectItem>
                  </>
                ) : isSpanishMode ? (
                  <>
                    <SelectItem className="text-white" value="Lato">
                      Lato (기본)
                    </SelectItem>
                    <SelectItem className="text-white" value="Merriweather">
                      Merriweather
                    </SelectItem>
                    <SelectItem className="text-white" value="Roboto">
                      Roboto
                    </SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem className="text-white" value="Noto Sans JP">
                      Noto Sans JP
                    </SelectItem>
                    <SelectItem className="text-white" value="Zen Kaku Gothic New">
                      Zen Kaku Gothic New
                    </SelectItem>
                    <SelectItem className="text-white" value="Noto Serif JP">
                      Noto Serif JP
                    </SelectItem>
                    <SelectItem className="text-white" value="Kosugi Maru">
                      Kosugi Maru
                    </SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {(isCharMode || isKanjiMode || deckType.endsWith("-words")) &&
            wordFontSize &&
            setWordFontSize && (
              <div className="mt-4 border-t ui-divider pt-4">
                <label className="block text-sm opacity-80 mb-1">{sizeSliderLabel}</label>
                <div className="flex items-center gap-4">
                  <div className="w-full flex-grow bg-muted/50 rounded-full border p-1">
                    <Slider
                      min={isCharMode ? 48 : 24}
                      max={isCharMode ? 128 : 72}
                      step={1}
                      value={[wordFontSize]}
                      onValueChange={(v) => setWordFontSize(v[0])}
                    />
                  </div>
                  <span className="text-sm w-12 text-center">{wordFontSize}px</span>
                </div>
              </div>
            )}

          {isSentenceMode && sentenceFontSize && setSentenceFontSize && (
            <div className="mt-4 border-t ui-divider pt-4">
              <label className="block text-sm opacity-80 mb-1">{sizeSliderLabel}</label>
              <div className="flex items-center gap-4">
                <div className="w-full flex-grow bg-muted/50 rounded-full border p-1">
                  <Slider
                    min={18}
                    max={40}
                    step={1}
                    value={[sentenceFontSize]}
                    onValueChange={(v) => setSentenceFontSize(v[0])}
                  />
                </div>
                <span className="text-sm w-12 text-center">{sentenceFontSize}px</span>
              </div>
            </div>
          )}

          {deckType === "sentences" || isKanjiMode || isCharMode ? (
            <div className="mt-4 border-t border-white/10 pt-4 text-center text-sm text-white/70">
              {deckType === "sentences"
                ? "일본어 문장 학습은 AI응답이 어렵습니다."
                : "이 학습 모드는 AI를 지원하지 않습니다."}
            </div>
          ) : (
            showContentImport &&
            topic !== undefined &&
            setTopic &&
            wordCount !== undefined &&
            setWordCount &&
            loadingImport !== undefined &&
            importContent && (
              <>
                {user ? (
                  <>
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <label className="block text-sm text-white/70 mb-1">새로운 {contentType} 주제</label>
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none"
                        placeholder={`예: 여행, 음식 (${contentType})`}
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm text-white/70 mb-1">생성할 {contentType} 개수</label>
                      <Select value={String(wordCount)} onValueChange={(v) => setWordCount(Number(v))}>
                        <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[70] bg-slate-900 border-white/10" position="popper" sideOffset={8}>
                          {[5, 10, 15, 20].map((num) => (
                            <SelectItem key={num} className="text-white" value={String(num)}>
                              {num}개
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={loadingImport}
                        onClick={() => importContent(topic, wordCount)}
                      >
                        {loadingImport ? "생성 중…" : `AI ${contentType} 생성`}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/10 border-white/10 hover:bg-white/15"
                        variant="outline"
                        onClick={() => {
                          resetDeck();
                          alert("덱을 기본값으로 복원했습니다.");
                        }}
                      >
                        저장본 복원
                      </Button>
                    </div>
                    <div className="mt-3 text-xs text-white/60">* AI 생성 기능은 외부 API를 사용합니다.</div>
                  </>
                ) : (
                  <div className="mt-4 border-t border-white/10 pt-4 text-center text-white/70">
                    {contentType}을 생성하려면 로그인이 필요합니다.
                  </div>
                )}
              </>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
