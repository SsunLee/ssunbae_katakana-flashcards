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
    <div className="relative w-full max-w-md mx-auto">
      <div 
        className="perspective-1000 w-full aspect-[3/4] max-h-[340px] min-h-[220px] cursor-pointer"
        onClick={onFlip}
      >
        <div 
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* 앞면 */}
          <div className="absolute inset-0 backface-hidden bg-card border-2 border-border rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center">
            {/* 연필(쓰기모드) 버튼 좌상단, 별 버튼 우상단 */}
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
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card border-2 border-primary/50 rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center">
            {/* 별 버튼만 우상단 */}
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
                style={{ fontSize: `${fontSize}px` }}
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
    </div>
  );
}
