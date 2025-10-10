//
"use client";

import { Button } from "@/app/components/ui/button";
import type { KoreanWord } from "@/app/data/korean-words";

interface KoreanWordCardViewProps {
  word: KoreanWord;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  titleFontSize: number;
  onToggleWritingMode: () => void; // ✨ 쓰기 모드 전환 함수 prop 추가
}

export default function KoreanWordCardView({
  word,
  isFlipped,
  isFav,
  onFlip,
  onToggleFav,
  titleFontSize,
  onToggleWritingMode, // ✨ 쓰기 모드 전환 함수 prop 추가
}: KoreanWordCardViewProps) {
  return (
    <div className="[perspective:1200px] w-full max-w-md mx-auto">
      <div
        role="button"
        tabIndex={0}
        aria-label="flip card"
        onClick={onFlip}
        // ✨ [수정] 오타를 수정하고 고정 높이를 적용합니다.
        className="relative h-80 md:h-96 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          {/* ✨ 쓰기 모드 버튼 추가 */}
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); onToggleWritingMode(); }}
            className="absolute top-4 left-4 h-9 w-9 rounded-full z-10"
            title="쓰기 모드"
          >
            <span className="text-xl flex items-center justify-center w-full h-full">✏️</span>
          </Button>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
            className="absolute top-4 right-4 h-9 w-9 rounded-full"
            title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <span className="text-xl flex items-center justify-center w-full h-full">{isFav ? "⭐" : "☆"}</span>
          </Button>
          <div className="text-center w-full">
            <p 
              className="font-semibold leading-snug break-all"
              style={{ fontSize: `${titleFontSize}px` }}
            >
              {word.word}
            </p>
            {word.category && (
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full mt-4">
                {word.category}
              </span>
            )}
          </div>
        </div>
        
        {/* 뒷면 */}
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-center w-full space-y-2">
            <p 
              className="font-bold text-primary"
              style={{ fontSize: `${titleFontSize * 0.9}px` }}
            >
              {word.meaning}
            </p>
            <p 
              className="font-semibold leading-snug break-all"
              style={{ fontSize: `${titleFontSize * 0.8}px` }}
            >
              {word.word}
            </p>
            {word.pronunciation && <p className="text-muted-foreground">[{word.pronunciation}]</p>}
            {word.hanja && <p className="text-muted-foreground">漢字: {word.hanja}</p>}
            
            <div className="w-full border-t ui-divider my-4"></div>
            
            {word.example && (
              <div className="text-sm text-foreground/90 p-2 bg-muted/50 rounded-md">
                <p>{word.example}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

