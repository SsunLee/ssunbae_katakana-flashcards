// app/components/KanjiSingleCardView.tsx
"use client";

import React from 'react';
import { type Kanji } from '../data/kanji';
import { Button } from './ui/button'; // ✨ 오류 수정을 위해 경로를 수정합니다.
import { Pencil } from 'lucide-react';
import KanjiWritingCanvas from './KanjiWritingCanvas'; // ✨ 오류 수정을 위해 경로를 수정합니다.

// 쓰기 모드 관련 props를 추가합니다.
interface KanjiSingleCardViewProps {
  card: Kanji;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  kanjiFontSize: number;
  isWritingMode: boolean; // 쓰기 모드 활성화 여부
  onToggleWritingMode: () => void; // 쓰기 모드 전환 함수
  // KanjiWritingCanvas에 전달할 이벤트 핸들러들
  onNext?: () => void;
  onPrev?: () => void;
  onShuffle?: () => void;
  onReset?: () => void;
}

export const KanjiSingleCardView = ({ 
  card, 
  isFlipped, 
  isFav, 
  onFlip, 
  onToggleFav, 
  kanjiFontSize,
  isWritingMode,
  onToggleWritingMode,
  onNext,
  onPrev,
  onShuffle,
  onReset
}: KanjiSingleCardViewProps) => {

  // isWritingMode가 true이면 한자 쓰기 캔버스를 렌더링합니다.
  if (isWritingMode) {
    return (
      <div className="w-full max-w-md mx-auto">
        <KanjiWritingCanvas
          kanji={card.kanji}
          onClose={onToggleWritingMode} // 닫기 버튼 클릭 시 쓰기 모드 종료
          onNext={onNext}
          onPrev={onPrev}
          onShuffle={onShuffle}
          onReset={onReset}
        />
      </div>
    );
  }

  // isWritingMode가 false이면 기존의 뒤집히는 카드를 렌더링합니다.
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
          
          {/* 쓰기 모드로 전환하는 연필 아이콘 버튼을 추가합니다. */}
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={(e) => { 
              e.stopPropagation(); // 카드 뒤집기 방지
              onToggleWritingMode(); 
            }}
            className="absolute top-4 left-4 h-9 w-9 rounded-full"
            title="쓰기 모드"
          >
            <Pencil className="h-4 w-4" />
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
        <div className="absolute inset-0 bg-card backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="w-full text-center">
            {/* 한자 및 발음 */}
            <div className="mb-4">
              <p className="text-lg answer-text">음독: {card.onyomi}</p>
              <div 
                className="my-1 font-bold"
                style={{ fontSize: `${kanjiFontSize * 1.5}px` }}
              >
                {card.kanji}
              </div>
              <p className="text-lg answer-text">훈독: {card.kunyomi}</p>
            </div>
            
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

