import React from 'react';
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "./ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import type { UserProfile } from '../AuthContext';
import type { StudyFontSize } from "@/app/hooks/useStudyFontSize";

// 이 컴포넌트가 필요로 하는 props 타입을 정의합니다.
interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfile | null;
  deckType: string;


  // TTS 관련
  isTtsSupported: boolean;
  selectedVoice: SpeechSynthesisVoice | null;
  selectVoice: (voice: SpeechSynthesisVoice | null) => void; // ★★★ [수정] prop 이름과 타입 변경
  voices: SpeechSynthesisVoice[];
  isSafari: boolean;

  // 폰트 관련
  fontFamily: string;
  setFontFamily: (font: string) => void;
  studyFontSize?: StudyFontSize; // ★★★ [수정] studyFontSize 추가
  setStudyFontSize?: (v: StudyFontSize) => void; // ★★★ [수정] setStudyFontSize 추가


  // 단어 가져오기 관련
  topic: string;
  setTopic: (topic: string) => void;
  wordCount: number;
  setWordCount: (count: number) => void;
  loadingImport: boolean;
  importWordsFromServer: (topic: string, count: number) => void;
  resetDeck: () => void;
}

export function SettingsDialog({
  open, onOpenChange, user, deckType,
  isTtsSupported, selectedVoice, selectVoice, voices, isSafari, // ★★★ [수정] prop 이름 변경
  fontFamily, setFontFamily, studyFontSize, setStudyFontSize,
  topic, setTopic, wordCount, setWordCount, loadingImport, importWordsFromServer, resetDeck
}: SettingsDialogProps) {
   // 학습 폰트 사이즈 UI를 노출할지 여부 (둘 다 있어야 보임)
  const showStudyFontSize = typeof studyFontSize !== "undefined" && !!setStudyFontSize;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="bg-white/10 border-white/10 hover:bg-white/15" title="설정">
          ⚙️ 설정
        </Button>
      </DialogTrigger>

      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
      <DialogContent className="bg-slate-800/60 border-white/10 text-white rounded-2xl shadow-xl p-0 w-full max-w-lg
            transition-all duration-300
            data-[state=open]:animate-in
            data-[state=open]:fade-in-0
            data-[state=open]:slide-in-from-top-[48%]
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            data-[state=closed]:slide-out-to-top-[48%]
        ">
        <div className="p-6">
          <DialogHeader className="mb-4 text-left">
            <DialogTitle className="text-lg font-semibold text-white flex items-center gap-2">⚙️ 설정</DialogTitle>
          </DialogHeader>
          
          {/* --- 🔽 [수정] TTS 지원 여부에 따라 조건부 렌더링 --- */}
          {isTtsSupported && (
            <div className="mb-4">
              <label className="block text-sm text-white/70 mb-1">TTS Voice</label>
              <Select
                value={selectedVoice?.name || ""}
                onValueChange={(val) => {
                  const voice = voices.find(v => v.name === val) || null;
                  // ★★★ [수정] 새로운 selectVoice 함수를 호출합니다. (localStorage 로직 삭제)
                  selectVoice(voice); 
                }}
                disabled={voices.length === 0}
              >
                <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white text-left">
                  {selectedVoice ? `${selectedVoice.name} (${selectedVoice.lang})` : '(loading...)'}
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
                    <SelectItem className="text-white" value="Noto Sans JP">Noto Sans JP</SelectItem>
                    <SelectItem className="text-white" value="Zen Kaku Gothic New">Zen Kaku Gothic New</SelectItem>
                    <SelectItem className="text-white" value="Noto Serif JP">Noto Serif JP</SelectItem>
                    <SelectItem className="text-white" value="Kosugi Maru">Kosugi Maru</SelectItem>
                </SelectContent>
            </Select>
          </div>

          {/* ✅ NEW: 학습 폰트 사이즈 — 선택적으로만 노출 */}
          {showStudyFontSize && (
            <div className="mb-2 mt-4">
              <label className="block text-sm text-white/70 mb-1">학습 폰트 사이즈</label>
              <Select
                value={studyFontSize!}
                onValueChange={(v) => setStudyFontSize!(v as StudyFontSize)}
              >
                <SelectTrigger className="w-full bg-slate-800/60 border-white/10 text-white">
                  <SelectValue placeholder="Choose size" />
                </SelectTrigger>
                <SelectContent className="z-[70] bg-slate-900 border-white/10" position="popper" sideOffset={8}>
                  <SelectItem className="text-white" value="sm">작게</SelectItem>
                  <SelectItem className="text-white" value="md">보통</SelectItem>
                  <SelectItem className="text-white" value="lg">크게</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-1 text-xs text-white/50">문장/단어 카드의 글자 크기를 조절합니다.</div>
            </div>
          )}


          {/* --- 🔽 [수정] 'katakana-chars' 모드가 아닐 때만 단어 가져오기 기능을 보여줍니다 --- */}
          {deckType !== 'katakana-chars' && (
            <>
              {user ? (
                <>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <label className="block text-sm text-white/70 mb-1"> 새로운 단어 주제</label>
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
                    <Button 
                        size="sm" 
                        className="text-white bg-white/10 border-white/10 hover:bg-white/15" 
                        variant="outline" 
                        disabled={loadingImport} 
                        onClick={() => importWordsFromServer(topic, wordCount)} 
                        title="서버에서 새 단어를 불러옵니다">
                      {loadingImport ? '가져오는 중…' : '단어 가져오기'}
                    </Button>

                    <Button size="sm" className="text-white bg-white/10 border-white/10 hover:bg-white/15" variant="outline" onClick={() => { resetDeck(); alert('덱을 기본값으로 복원했습니다.'); }}>
                      저장본 복원
                    </Button>
                  </div>
                  <div className="mt-3 text-sm text-white/70">
                    * '단어 가져오기'는 OpenAI API를 사용합니다.
                  </div>
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

