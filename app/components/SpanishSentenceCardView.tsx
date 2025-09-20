import React from "react";
import { type SpanishSentence } from "../data/spanish-sentences";
import { Button } from "./ui/button";

interface SpanishSentenceCardViewProps {
  card: SpanishSentence;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  sentenceFontSize: number;
}

export const SpanishSentenceCardView = ({ card, isFlipped, isFav, onFlip, onToggleFav, sentenceFontSize }: SpanishSentenceCardViewProps) => {
  return (
    <div className="[perspective:1200px] w-full max-w-md mx-auto">
      <div
        role="button"
        tabIndex={0}
        aria-label="flip card"
        onClick={onFlip}
        className="relative h-64 md:h-72 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-slate-800/60 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav();
            }}
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/10"
            title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <span className="text-xl flex items-center justify-center w-full h-full">
              {isFav ? "⭐" : "☆"}
            </span>
          </Button>
          <div className="text-sm text-white/60 mb-4">카드를 눌러 정답을 확인하세요</div>
          <p 
            className="font-semibold leading-relaxed text-center tracking-wide"
            style={{ fontSize: `${sentenceFontSize}px` }}
          >
            {card.sentence}
          </p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="w-full text-center space-y-2">
            <p className="text-lg font-bold" style={{ fontSize: `${sentenceFontSize}px` }}>
              {card.sentence}
            </p>
            <div className="w-full h-[1px] bg-white/10 my-3"></div>
            <p className="text-xl font-bold text-cyan-300">{card.translation}</p>
            <p className="text-base text-white/70 tracking-wide">({card.pronunciation})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

