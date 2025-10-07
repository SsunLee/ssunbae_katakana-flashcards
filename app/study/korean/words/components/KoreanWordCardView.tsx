import { Button } from "@/app/components/ui/button";
import { KoreanWord } from "@/app/data/korean-words";

export default function KoreanWordCardView({
  word,
  isFlipped,
  isFav,
  onFlip,
  onToggleFav,
  titleFontSize,
  onToggleWritingMode,
}: {
  word: KoreanWord;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  titleFontSize: number;
  onToggleWritingMode?: () => void;
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
            <div 
              className="text-center font-bold mb-4"
              style={{ fontSize: `${titleFontSize}px` }}
            >
              {word.word}
            </div>
            {word.category && (
              <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {word.category}
              </span>
            )}
          </div>

          {/* 뒷면 */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card border-2 border-primary/50 rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center">
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
            <div className="w-full text-center space-y-4">
              <div 
                className="font-bold text-foreground mb-2"
                style={{ fontSize: `${titleFontSize}px` }}
              >
                {word.word}
              </div>
              <div className="text-xl text-muted-foreground mb-4">
                {word.meaning}
              </div>
              {word.pronunciation && (
                <div className="text-sm text-muted-foreground italic">
                  [{word.pronunciation}]
                </div>
              )}
              {word.hanja && (
                <div className="text-lg text-muted-foreground">
                  漢字: {word.hanja}
                </div>
              )}
              {word.example && (
                <div className="text-sm text-muted-foreground/80 mt-4 p-3 bg-muted/50 rounded-lg">
                  {word.example}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* 하단 버튼들: 별 버튼 제거, 쓰기모드 버튼만 필요시 노출 */}
      {onToggleWritingMode && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWritingMode();
            }}
          >
            ✍️ 쓰기 모드
          </Button>
        </div>
      )}
    </div>
  );
}
