// app/components/SentenceCardView.tsx

import React from "react";
import { type Sentence } from "../data/sentences";
import { FuriganaText } from "./FuriganaText";
import { Button } from "./ui/button";

interface SentenceCardViewProps {
  card: Sentence;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  sentenceFontSize: number;
}

export const SentenceCardView = ({ card, isFlipped, isFav, onFlip, onToggleFav, sentenceFontSize }: SentenceCardViewProps) => {
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
        {/* ✅ 배경, 테두리 색상을 테마에 맞게 변경 */}
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav();
            }}
            // ✅ variant="secondary"를 사용하므로 직접 스타일링하는 클래스는 제거합니다.
            className="absolute top-4 right-4 h-9 w-9 rounded-full"
            title={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          >
            <span className="text-xl flex items-center justify-center w-full h-full">
              {isFav ? "⭐" : "☆"}
            </span>
          </Button>
          {/* ✅ 텍스트 색상을 테마에 맞게 변경 */}
          <div className="text-sm text-muted-foreground mb-4">카드를 클릭하여 뜻을 확인하세요</div>
          <p 
            className="font-semibold leading-relaxed text-center tracking-wide"
            style={{ fontSize: `${sentenceFontSize}px` }}
          >
            {card.sentence}
          </p>
        </div>

        {/* Back */}
        {/* ✅ 배경, 테두리 색상을 테마에 맞게 변경 */}
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="w-full text-center">
            <FuriganaText 
              reading={card.reading} 
              kanjiDetails={card.kanjiDetails} 
              fontSize={sentenceFontSize}
            />
          </div>
          {/* ✅ ui-divider 클래스를 사용하여 테마에 맞는 구분선 적용 */}
          <div className="w-full border-t ui-divider my-4"></div>
          <div className="w-full text-center space-y-1">
            {/* ✅ 텍스트 색상을 테마에 맞게 변경 */}
            <p className="text-base text-foreground/80 tracking-wide">{card.furigana}</p>
            <p className="text-sm text-muted-foreground tracking-wide">({card.romaji})</p>
            {/* ✅ answer-text 클래스를 사용하여 테마에 맞는 정답 색상 적용 */}
            <p className="text-lg font-bold answer-text">{card.translation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
