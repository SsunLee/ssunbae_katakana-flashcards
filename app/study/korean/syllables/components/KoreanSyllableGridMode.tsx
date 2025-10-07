import { Button } from "@/app/components/ui/button";
import { KoreanSyllable } from "@/app/data/korean-syllables";

export default function KoreanSyllableGridMode({
  syllables,
  favs,
  flippedStates,
  onToggleFav,
  onToggleCardFlip,
  page,
  fontSize,
}: {
  syllables: KoreanSyllable[];
  favs: Record<number, boolean>;
  flippedStates: Record<number, boolean>;
  onToggleFav: (id: number) => void;
  onToggleCardFlip: (id: number) => void;
  page: { current: number; total: number; onPrev: () => void; onNext: () => void };
  fontSize: number;
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {syllables.map((syllable) => (
          <div
            key={syllable.id}
            className="perspective-1000 cursor-pointer"
            onClick={() => onToggleCardFlip(syllable.id)}
          >
            <div
              className={`relative w-full aspect-[3/4] max-h-[340px] min-h-[220px] transition-transform duration-500 transform-style-3d ${
                flippedStates[syllable.id] ? 'rotate-y-180' : ''
              }`}
            >
              {/* 앞면 */}
              <div className="absolute inset-0 backface-hidden bg-card border border-border rounded-xl shadow p-4 flex flex-col items-center justify-center">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={e => { e.stopPropagation(); onToggleFav(syllable.id); }}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full"
                  title={favs[syllable.id] ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                >
                  <span className="text-xl flex items-center justify-center w-full h-full">{favs[syllable.id] ? "⭐" : "☆"}</span>
                </Button>
                <div style={{ fontSize: `${Math.round(fontSize * 0.7)}px` }} className="font-bold">
                  {syllable.char}
                </div>
              </div>
              {/* 뒷면 */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-card border border-primary/50 rounded-xl shadow p-4 flex flex-col items-center justify-center text-center">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={e => { e.stopPropagation(); onToggleFav(syllable.id); }}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full"
                  title={favs[syllable.id] ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                >
                  <span className="text-xl flex items-center justify-center w-full h-full">{favs[syllable.id] ? "⭐" : "☆"}</span>
                </Button>
                <div className="text-sm text-muted-foreground mb-2">{syllable.meaning}</div>
                {syllable.example && (
                  <div className="text-xs text-muted-foreground/70 mt-2">
                    {syllable.example}
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
