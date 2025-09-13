// src/components/SingleCardView.tsx

import React from 'react';
import { type Word } from '../data/words';
import { Button } from './ui/button';
import { kanaToRomaji } from '../utils/kana';

interface SingleCardViewProps {
  card: Word;
  deckType: string;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
}

export const SingleCardView = ({ card, deckType, isFlipped, isFav, onFlip, onToggleFav }: SingleCardViewProps) => {
  const romaji = kanaToRomaji(card?.furigana || '');
  const isCharsMode = deckType.endsWith("-chars");  // ← 변경
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
        <div className="absolute inset-0 bg-slate-800/60 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6 [backface-visibility:hidden]">
          <Button type="button" size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); onToggleFav(); }} className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/10 hover:bg-white/15 border border-white/10" title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}>
            <span className="text-lg flex items-center justify-center w-full h-full">{isFav ? "⭐" : "☆"}</span>
          </Button>
          <div className="text-sm text-white/60 mb-2">카드를 클릭하세요</div>
          <div className="text-center w-full">
            <div className="flex flex-col items-center">
              {isCharsMode ? (
                <div className="text-9xl font-semibold leading-snug">{card.katakana}</div>
              ) : (
                <>
                  <div className="text-5xl md:text-6xl font-semibold leading-snug">{card.katakana}</div>
                  <div className="mt-2 text-base md:text-lg font-normal text-white/80">{card.furigana}</div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-center w-full">
            <div className="text-sm text-white/60 mb-2">정답</div>
            {isCharsMode ? (
              <div>
                <div className="text-8xl font-semibold">{card.furigana}</div>
                <div className="text-2xl mt-1">{card.emoji}</div>
                <div className="text-lg text-white/70 mt-2">{card.answer}</div>
              </div>
            ) : (
              <div className="text-4xl md:text-5xl font-semibold">
                {card.answer} <span className="align-middle">{card.emoji}</span>
                <span className="block text-lg md:text-xl font-normal text-white/80 mt-2">({romaji})</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
