// app/components/SpanishSingleCardView.tsx
"use client";

import React from 'react';
import { type SpanishWord } from '../data/spanish-words';
import { Button } from './ui/button';

interface SpanishSingleCardViewProps {
  card: SpanishWord;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  wordFontSize: number;
}

export const SpanishSingleCardView = ({ card, isFlipped, isFav, onFlip, onToggleFav, wordFontSize }: SpanishSingleCardViewProps) => {
  return (
    <div className="[perspective:1200px] w-full max-w-md mx-auto">
      <div
        role="button"
        tabIndex={0}
        aria-label="flip card"
        onClick={onFlip}
        className="relative h-64 md:h-72 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-slate-800/60 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
            className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 hover:bg-white/15 border border-white/10"
            title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <span className="text-xl flex items-center justify-center w-full h-full">{isFav ? "⭐" : "☆"}</span>
          </Button>
          <div className="text-sm text-white/60 mb-2">Haz clic para ver el significado</div>
          <div className="text-center w-full">
            <p 
              className="font-semibold leading-snug break-all"
              style={{ fontSize: `${wordFontSize}px` }}
            >
              {card.word}
            </p>
            {card.pronunciation && <p className="mt-2 text-lg text-white/70">[{card.pronunciation}]</p>}
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-center w-full">
            <p className="text-sm text-white/60 mb-2">Significado y Ejemplo</p>
            <p 
              className="font-bold text-cyan-300"
              style={{ fontSize: `${wordFontSize * 0.8}px` }}
            >
              {card.meaning}
            </p>
            <div className="w-full h-[1px] bg-white/10 my-4"></div>
            <div className="space-y-1 text-base text-white/90">
                <p>{card.exampleSentence}</p>
                <p className="text-sm text-white/70">{card.exampleTranslation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
