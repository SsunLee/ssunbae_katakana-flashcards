import { Button } from "@/app/components/ui/button";
import { KoreanChar } from "@/app/data/korean-chars";

export default function KoreanCharGridMode({
  chars,
  favs,
  flippedStates,
  onToggleFav,
  onToggleCardFlip,
  page,
  fontSize,
}: {
  chars: KoreanChar[];
  favs: Record<number, boolean>;
  flippedStates: Record<number, boolean>;
  onToggleFav: (id: number) => void;
  onToggleCardFlip: (id: number) => void;
  page: { current: number; total: number; onPrev: () => void; onNext: () => void };
  fontSize: number;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {chars.map((char) => (
          <div
            key={char.id}
            className="perspective-1000 cursor-pointer"
            onClick={() => onToggleCardFlip(char.id)}
          >
            <div
              className={`relative w-full aspect-square transition-transform duration-500 transform-style-3d ${
                flippedStates[char.id] ? 'rotate-y-180' : ''
              }`}
            >
              {/* 앞면 */}
              <div className="absolute inset-0 backface-hidden bg-card border border-border rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <div style={{ fontSize: `${Math.round(fontSize * 0.6)}px` }} className="font-bold">
                  {char.char}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav(char.id);
                  }}
                  className="absolute top-2 right-2"
                >
                  {favs[char.id] ? "⭐" : "☆"}
                </button>
              </div>

              {/* 뒷면 */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card border border-primary/50 rounded-xl shadow p-4 flex flex-col items-center justify-center text-center">
                <div className="text-lg font-semibold text-primary mb-1">{char.romanization}</div>
                <div className="text-xs text-muted-foreground">{char.meaning}</div>
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
