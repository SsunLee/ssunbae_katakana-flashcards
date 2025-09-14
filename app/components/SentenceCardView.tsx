// app/components/SentenceCardView.tsx
import { type Sentence } from "@/app/data/sentences";
import { Star } from "lucide-react";
import { FuriganaText } from "./FuriganaText";

interface SentenceCardViewProps {
  card: Sentence;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
}

export function SentenceCardView({
  card,
  isFlipped,
  isFav,
  onFlip,
  onToggleFav,
}: SentenceCardViewProps) {
  return (
    <div
      className="w-full max-w-md h-80 rounded-2xl mx-auto cursor-pointer"
      onClick={onFlip}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* 카드 앞면 */}
        <div
          className="absolute w-full h-full bg-slate-800/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-white/10 shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav();
            }}
            className="absolute top-4 right-4 text-white/50 hover:text-yellow-400 transition-colors"
            aria-label="Toggle favorite"
          >
            <Star fill={isFav ? "#FFC700" : "none"} />
          </button>
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-wide">
            {card.sentence}
          </h2>
        </div>

        {/* 카드 뒷면 */}
        <div
          className="absolute w-full h-full bg-slate-800/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 text-center border border-white/10 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="w-full space-y-3">
            {/* 후리가나 + 툴팁 텍스트 */}
            <div className="text-2xl lg:text-3xl font-medium">
              <FuriganaText
                reading={card.reading}
                kanjiDetails={card.kanjiDetails}
              />
            </div>
            {/* 구분선 */}
            <hr className="border-white/20 w-3/4 mx-auto" />
            {/* 전체 후리가나 */}
            <p className="text-base text-sky-300/80">{card.furigana}</p>
            {/* 한글 번역 */}
            <p className="text-lg font-bold text-white/90">
              {card.translation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
