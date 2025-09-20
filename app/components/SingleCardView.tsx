// app/components/SingleCardView.tsx

"use client";

import React from 'react';
import { type Word } from '../data/words';
import { Button } from './ui/button';

interface SingleCardViewProps {
  card: Word;
  deckType: string;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  // --- ✨ 폰트 크기 prop 추가 (옵션) ---
  fontSize?: number;
}

export const SingleCardView = ({ card, deckType, isFlipped, isFav, onFlip, onToggleFav, fontSize }: SingleCardViewProps) => {
  const isCharsMode = deckType.endsWith("-chars");
  const defaultCharSize = 96; // 6rem
  const defaultWordSize = 48; // 3rem

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
          <div className="text-sm text-white/60 mb-10">카드를 클릭하여 뜻을 확인하세요</div>
          <div className="text-center w-full">
            {isCharsMode ? (
              <p 
                className="font-semibold leading-none"
                style={{ fontSize: `${fontSize || defaultCharSize}px` }}
              >
                {card.katakana} 
              </p>
            ) : (
              <>
                <p 
                  className="font-semibold leading-snug"
                  style={{ fontSize: `${fontSize || defaultWordSize}px` }}
                >
                  {card.katakana}
                </p>
                <p className="mt-2 text-lg text-white/70">{card.furigana}</p>
              </>
            )}
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-center w-full">
            <p className="text-sm text-white/60 mb-2">정답</p>
            {isCharsMode ? (
              <div className="flex flex-col items-center">
                <p className="font-bold text-cyan-300" style={{ fontSize: `${(fontSize || defaultCharSize) * 0.8}px` }}>{card.furigana}</p>
                <div className="w-full h-[1px] bg-white/10 my-4"></div>
                <p className="text-xl text-white/80 mt-2">{card.emoji}{card.answer}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="font-bold text-cyan-300" style={{ fontSize: `${(fontSize || defaultWordSize) * 0.9}px` }}>
                  {card.answer} <span className="align-middle text-3xl">{card.emoji}</span>
                </p>
                <div className="w-full h-[1px] bg-white/10 my-4"></div>
                <p className="text-base text-white/70 mt-1">({card.katakana})</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
