// app/study/korean/chars/components/KoreanCharCardView.tsx

import { Button } from "@/app/components/ui/button";
import { KoreanChar } from "@/app/data/korean-chars";

export default function KoreanCharCardView({
  char,
  isFlipped,
  isFav,
  onFlip,
  onToggleFav,
  fontSize,
  onToggleWritingMode,
}: {
  char: KoreanChar;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  fontSize: number;
  onToggleWritingMode: () => void;
}) {
  return (
    <div className="[perspective:1200px] w-full max-w-md mx-auto">
      <div
        role="button"
        tabIndex={0}
        aria-label="flip card"
        onClick={onFlip}
        className="relative h-80 md:h-96 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
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
            className="absolute top-4 right-4 h-9 w-9 rounded-full z-10"
            title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <span className="text-xl flex items-center justify-center w-full h-full">{isFav ? "⭐" : "☆"}</span>
          </Button>
          <div 
            className="text-center font-bold"
            style={{ fontSize: `${fontSize}px` }}
          >
            {char.char}
          </div>
          <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full mt-4">
            {char.type === "vowel" ? "모음" : "자음"}
          </div>
        </div>

        {/* 뒷면 */}
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-primary/50 rounded-2xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
            className="absolute top-4 right-4 h-9 w-9 rounded-full z-10"
            title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <span className="text-xl flex items-center justify-center w-full h-full">{isFav ? "⭐" : "☆"}</span>
          </Button>
          <div className="w-full text-center space-y-3">
            <div 
              className="font-bold text-foreground"
              style={{ fontSize: `${fontSize * 0.9}px` }}
            >
              {char.char}
            </div>
            <div className="text-2xl text-primary font-semibold">
              {char.romanization}
            </div>
            <div className="text-base text-muted-foreground">
              {char.meaning}
            </div>
            {char.example && (
              <div className="text-sm text-muted-foreground/80 mt-4 p-3 bg-muted/50 rounded-lg">
                예: {char.example}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

