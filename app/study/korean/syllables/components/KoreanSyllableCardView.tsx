import { Button } from "@/app/components/ui/button";
import { KoreanSyllable } from "@/app/data/korean-syllables";

export default function KoreanSyllableCardView({
  syllable,
  isFlipped,
  isFav,
  onFlip,
  onToggleFav,
  fontSize,
}: {
  syllable: KoreanSyllable;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  fontSize: number;
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
              onClick={e => { e.stopPropagation(); onToggleFav(); }}
              className="absolute top-4 right-4 h-9 w-9 rounded-full"
              title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            >
              <span className="text-xl flex items-center justify-center w-full h-full">{isFav ? "⭐" : "☆"}</span>
            </Button>
            <div className="text-center font-bold mb-4" style={{ fontSize: `${fontSize}px` }}>{syllable.char}</div>
          </div>
          {/* 뒷면 */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card border-2 border-primary/50 rounded-2xl shadow-lg p-4 flex flex-col items-center justify-center">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={e => { e.stopPropagation(); onToggleFav(); }}
              className="absolute top-4 right-4 h-9 w-9 rounded-full"
              title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
            >
              <span className="text-xl flex items-center justify-center w-full h-full">{isFav ? "⭐" : "☆"}</span>
            </Button>
            <div className="w-full text-center space-y-4">
              <div className="font-bold text-foreground mb-2" style={{ fontSize: `${fontSize}px` }}>{syllable.char}</div>
              {syllable.meaning && <div className="text-xl text-muted-foreground mb-4">{syllable.meaning}</div>}
              {syllable.example && <div className="text-sm text-muted-foreground/80 mt-4 p-3 bg-muted/50 rounded-lg">{syllable.example}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
