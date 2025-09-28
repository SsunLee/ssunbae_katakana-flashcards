// app/components/KanjiSingleCardView.tsx

"use client";

import React from 'react';
import { type Kanji } from '../data/kanji';
import { Button } from './ui/button';

interface KanjiSingleCardViewProps {
  card: Kanji;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  kanjiFontSize: number;
}

export const KanjiSingleCardView = ({ card, isFlipped, isFav, onFlip, onToggleFav, kanjiFontSize }: KanjiSingleCardViewProps) => {
  return (
    <div className="[perspective:1200px] w-full max-w-md mx-auto">
      <div
        role="button"
        tabIndex={0}
        aria-label="flip card"
        onClick={onFlip}
        className="relative h-80 md:h-96 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        {/* ✅ 배경, 테두리, 텍스트 색상을 테마에 맞게 변경 */}
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
            className="absolute top-4 right-4 h-9 w-9 rounded-full"
            title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <span className="text-xl flex items-center justify-center w-full h-full">{isFav ? "⭐" : "☆"}</span>
          </Button>
          <div className="text-sm text-muted-foreground mb-4">카드를 클릭하여 뜻을 확인하세요</div>
          <p 
            className="font-semibold leading-none text-center"
            style={{ fontSize: `${kanjiFontSize * 2}px` }}
          >
            {card.kanji}
          </p>
        </div>

        {/* Back */}
        {/* ✅ 배경, 테두리, 텍스트 색상을 테마에 맞게 변경 */}
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="w-full text-center">
            {/* 한자 및 발음 */}
            <div className="mb-4">
              {/* ✅ answer-text 클래스 적용 */}
              <p className="text-lg answer-text">음독: {card.onyomi}</p>
              <div 
                className="my-1 font-bold"
                style={{ fontSize: `${kanjiFontSize * 1.5}px` }}
              >
                {card.kanji}
              </div>
              <p className="text-lg answer-text">훈독: {card.kunyomi}</p>
            </div>
            
            {/* ✅ ui-divider 클래스 적용 */}
            <div className="w-full border-t ui-divider my-4"></div>

            {/* 예문 */}
            <div className="w-full text-center space-y-1">
              <p className="text-lg font-semibold text-foreground/90">{card.exampleSentence}</p>
              <p className="text-base text-muted-foreground">({card.exampleRomaji})</p>
              <p className="text-base text-foreground/90 mt-1">{card.exampleTranslation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
