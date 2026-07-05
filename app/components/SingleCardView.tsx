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
  fontSize?: number;
  showFurigana?: boolean;
}

export const SingleCardView = ({ card, deckType, isFlipped, isFav, onFlip, onToggleFav, fontSize, showFurigana = true }: SingleCardViewProps) => {
  const isCharsMode = deckType.endsWith("-chars");
  const isKanjiWordsMode = deckType === "kanji-words";
  const defaultCharSize = 96;
  const defaultWordSize = 48;

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
        {/* ✅ 테마에 반응하도록 bg-card, border-border 등 semantic 클래스로 변경 */}
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          <Button
            type="button"
            size="icon"
            variant="secondary" // `secondary` variant가 테마에 따라 스타일이 지정되어 있다고 가정
            onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
            className="absolute top-4 right-4 h-9 w-9 rounded-full" // 색상 관련 클래스 제거, variant에 위임
            title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            {/* ✅ 텍스트 색상도 테마에 반응하도록 변경 */}
            <span className="text-xl flex items-center justify-center w-full h-full text-foreground">{isFav ? "⭐" : "☆"}</span>
          </Button>
          {/* ✅ text-muted-foreground로 변경 */}
          <div className="text-sm text-muted-foreground mb-10">카드를 클릭하여 뜻을 확인하세요</div>
          <div className="text-center w-full text-foreground">
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
                {/* ✅ text-muted-foreground로 변경 */}
                {showFurigana ? (
                  <p className="mt-2 text-lg text-muted-foreground">{card.furigana}</p>
                ) : null}
              </>
            )}
          </div>
        </div>
        
        {/* Back */}
        {/* ✅ 테마에 반응하도록 bg-card, border-border 등 semantic 클래스로 변경 */}
        <div className="absolute inset-0 bg-card/95 backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-center w-full text-foreground">
            {/* ✅ text-muted-foreground로 변경 */}
            <p className="text-sm text-muted-foreground mb-2">정답</p>
            {isCharsMode ? (
              <div className="flex flex-col items-center">
                {/* ✅ globals.css에 정의한 `answer-text` 클래스 사용 */}
                <p className="font-bold answer-text" style={{ fontSize: `${(fontSize || defaultCharSize) * 0.8}px` }}>{card.furigana}</p>
                {/* ✅ globals.css에 정의한 `ui-divider` 클래스 사용 */}
                <div className="w-full my-4 ui-divider"></div>
                {/* ✅ text-secondary-foreground로 변경 */}
                <p className="text-xl text-secondary-foreground mt-2">{card.emoji}{card.answer}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {/* ✅ globals.css에 정의한 `answer-text` 클래스 사용 */}
                <p className="font-bold answer-text" style={{ fontSize: `${(fontSize || defaultWordSize) * 0.9}px` }}>
                  {card.answer} <span className="align-middle text-3xl">{card.emoji}</span>
                </p>
                {/* ✅ globals.css에 정의한 `ui-divider` 클래스 사용 */}
                <div className="w-full my-4 ui-divider"></div>
                {/* ✅ text-muted-foreground로 변경 */}
                <p className="text-base text-muted-foreground mt-1">
                  ({isKanjiWordsMode ? card.furigana : card.katakana})
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
