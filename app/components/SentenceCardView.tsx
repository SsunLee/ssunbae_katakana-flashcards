// app/components/SentenceCardView.tsx
import React from "react";
import type { StudyFontSize } from "@/app/hooks/useStudyFontSize";
import type { SentenceCard, FuriPart } from "@/app/data/sentences";
import { Button } from "@/app/components/ui/button";

interface Props {
  card: SentenceCard;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  fontSize?: StudyFontSize; // NEW
}


type FuriProps = {
  text: string;
  rt?: string;
  gloss?: string[];
  className?: string;
  interactiveOverride?: boolean;
  /** NEW: 본문 글자 크기 오버라이드 */
  textClassName?: string;
};

// 확장 A까지 포함: 3400–4DBF, 기본: 4E00–9FFF
const KANJI_REGEX = /[\u3400-\u4DBF\u4E00-\u9FFF]/;



export function Furi({
  text, rt, gloss, className, interactiveOverride, textClassName,
}: FuriProps) {
  const isKanji = /[\u3400-\u4DBF\u4E00-\u9FFF]/.test(text);
  const hasMeta = !!rt || (gloss && gloss.length > 0);
  const interactive = typeof interactiveOverride === "boolean"
    ? interactiveOverride
    : isKanji && hasMeta;

  const base = "relative inline-flex items-end align-baseline pt-[0.9em] -mt-[0.9em] pb-[0.15em] px-[0.35em] mx-[0.12em] rounded-xl";
  const hoverable = interactive
    ? "group cursor-help hover:bg-white/[0.10] hover:ring-1 hover:ring-white/10"
    : "bg-transparent pointer-events-none";

  return (
    <span className={[base, hoverable, className ?? ""].join(" ")}>
      {rt && (
        <span
            className="absolute left-1/2 -translate-x-1/2 -top-[0.55em] 
            text-[0.60em] md:text-[0.65em] leading-none text-white/85 
            pointer-events-none select-none whitespace-nowrap"
        >
          {rt}
        </span>
      )}

      {/* ⬇️ 여기만 바뀜: 기본값은 적당히 작게, 필요시 외부에서 덮어쓰기 */}
      <span className={["font-semibold", textClassName ?? "text-2xl md:text-3xl"].join(" ")}>
        {text}
      </span>

      {interactive && gloss && gloss.length > 0 && (
        <div className="
          hidden group-hover:block
          absolute left-0 top-[calc(100%+10px)] z-50
          min-w-[16rem] max-w-[24rem]
          rounded-xl border border-white/10 bg-slate-900/90
          px-4 py-3 text-sm text-white shadow-xl
        ">
          <div className="text-base font-semibold mb-2">
            {text} ・ {gloss[0]}
          </div>
          <ol className="list-decimal list-inside space-y-1 text-white/90">
            {gloss.slice(1).map((g, i) => <li key={i}>{g}</li>)}
          </ol>
        </div>
      )}
    </span>
  );
}

// 학습 폰트 사이즈에 따라 앞/뒤면 텍스트 클래스 매핑
const FRONT_TEXT: Record<StudyFontSize, string> = {
  sm: "text-lg md:text-2xl",
  md: "text-xl md:text-3xl",
  lg: "text-2xl md:text-4xl",
};
const BACK_LINE: Record<StudyFontSize, string> = {
  sm: "text-lg md:text-2xl",
  md: "text-xl md:text-3xl",
  lg: "text-2xl md:text-4xl",
};
const BACK_FURI_TEXT: Record<StudyFontSize, string> = {
  sm: "text-base md:text-2xl",
  md: "text-lg md:text-3xl",
  lg: "text-xl md:text-4xl",
};

export const SentenceCardView: React.FC<Props> = ({
  card,
  isFlipped,
  isFav,
  onFlip,
  onToggleFav,
  fontSize = "md"
}) => {
  const plain = card.parts.map(p => p.text).join("");

  return (
    <div className="[perspective:1200px] w-full max-w-md mx-auto">
      <div
        role="button"
        tabIndex={0}
        aria-label="flip card"
        onClick={onFlip}
        className="relative h-[320px] md:h-[360px] transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* 앞면 */}
        <div className="absolute inset-0 bg-slate-800/60 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6 [backface-visibility:hidden]">
          {/* 즐겨찾기: 앞면에만 표시 */}
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
            className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/20 hover:bg-black/30 border-none"
            title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <span className="text-lg">{isFav ? "⭐" : "☆"}</span>
          </Button>

            {/* 카드 안내 문구 */}
          <div className="text-sm text-white/60 mb-2">카드를 클릭하세요</div>
          <div className="text-center w-full">
            <div className={["font-semibold tracking-wide", FRONT_TEXT[fontSize]].join(" ")}>
              {plain}
            </div>
          </div>
        </div>

        {/* 뒷면 */}
        <div className="absolute inset-0 bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6 pt-2 overflow-visible [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-sm text-white/60 mb-3">정답</div>

          <div className="text-center w-full">
            <div className={["font-semibold tracking-wide", BACK_LINE[fontSize]].join(" ")}>
            {card.parts.map((p, i) => (
                <Furi key={`${i}-${p.text}`} {...p} textClassName={BACK_FURI_TEXT[fontSize]} />
            ))}
            </div>
          </div>

          <div className="mt-3 text-white/70 italic text-base md:text-lg">
            ({card.romaji})
          </div>
        </div>
      </div>
    </div>
  );
};
