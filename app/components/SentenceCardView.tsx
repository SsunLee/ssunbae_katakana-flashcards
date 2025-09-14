// app/components/SentenceCardView.tsx
"use client";
import * as React from "react";
import { Button } from "@/app/components/ui/button";
import { FuriganaText, joinSurface } from "./FuriganaText";
import type { SentenceCard } from "@/app/data/sentences";

type Props = {
  card: SentenceCard;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
};

export function SentenceCardView({ card, isFlipped, isFav, onFlip, onToggleFav }: Props) {
  const surface = joinSurface(card.parts);
  return (
    <div className="[perspective:1200px] w-full max-w-2xl mx-auto">
      <div
        role="button"
        tabIndex={0}
        aria-label="flip card"
        onClick={onFlip}
        className="relative h-64 md:h-72 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 bg-slate-800/60 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6 [backface-visibility:hidden]">
          <Button type="button" size="icon" variant="secondary"
            onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 border border-white/10">
            <span className="text-lg">{isFav ? "⭐" : "☆"}</span>
          </Button>
          <div className="text-sm text-white/60 mb-2">카드를 클릭하세요</div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-semibold">{surface}</div>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 bg-slate-800/80 rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-sm text-white/60 mb-1">정답</div>
          <FuriganaText parts={card.parts} withTooltips className="text-4xl md:text-5xl font-semibold" />
          {card.romaji && (
            <div className="text-center mt-2 text-sm md:text-base text-white/80">
              ({card.romaji})
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
