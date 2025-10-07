import { Button } from "@/app/components/ui/button";
import { KoreanWord } from "@/app/data/korean-words";

export default function KoreanWordGridMode({
  words,
  favs,
  flippedStates,
  onToggleFav,
  onToggleCardFlip,
  page,
  titleFontSize,
}: {
  words: KoreanWord[];
  favs: Record<number, boolean>;
  flippedStates: Record<number, boolean>;
  onToggleFav: (id: number) => void;
  onToggleCardFlip: (id: number) => void;
  page: { current: number; total: number; onPrev: () => void; onNext: () => void };
  titleFontSize: number;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {words.map((word) => (
          <div
            key={word.id}
            className="perspective-1000 cursor-pointer"
            onClick={() => onToggleCardFlip(word.id)}
          >
            <div
              className={`relative w-full aspect-[3/4] max-h-[340px] min-h-[220px] transition-transform duration-500 transform-style-3d ${
                flippedStates[word.id] ? 'rotate-y-180' : ''
              }`}
            >
              {/* 앞면 */}
              <div className="absolute inset-0 backface-hidden bg-card border border-border rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <div style={{ fontSize: `${Math.round(titleFontSize * 0.7)}px` }} className="font-bold">
                  {word.word}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav(word.id);
                  }}
                  className="absolute top-2 right-2"
                >
                  {favs[word.id] ? "⭐" : "☆"}
                </button>
              </div>

              {/* 뒷면 */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card border border-primary/50 rounded-xl shadow p-4 flex flex-col items-center justify-center text-center">
                <div className="text-sm text-muted-foreground mb-2">{word.meaning}</div>
                {word.example && (
                  <div className="text-xs text-muted-foreground/70 mt-2">
                    {word.example}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="outline" size="sm" onClick={page.onPrev} disabled={page.current === 1}>
          이전
        </Button>
        <span className="text-sm text-muted-foreground">
          {page.current} / {page.total}
        </span>
        <Button variant="outline" size="sm" onClick={page.onNext} disabled={page.current === page.total}>
          다음
        </Button>
      </div>
    </div>
  );
}
