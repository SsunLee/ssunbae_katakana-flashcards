// ssunbae_katakana-flashcards/app/components/EmptyDeckMessage.tsx
import React from 'react';

interface EmptyDeckMessageProps {
  viewMode: 'single' | 'grid';
}

export const EmptyDeckMessage = ({ viewMode }: EmptyDeckMessageProps) => {
  // ✅ 수정된 부분: single view일 때 다른 카드와 높이를 맞추기 위해 min-h-[300px] 사용
  const containerHeight = viewMode === 'single' ? 'min-h-[300px]' : 'h-96';
  
  return (
    <div 
      className={`
        relative 
        ${containerHeight} 
        w-full 
        max-w-md 
        mx-auto 
        flex 
        flex-col 
        items-center 
        justify-center 
        text-center 
        p-6 
        rounded-2xl 
        border 
        bg-card 
        text-card-foreground
        border-border
      `}
    >
      <div className="text-lg font-semibold mb-2 text-foreground">
        학습할 카드가 없습니다
      </div>
      <p className="text-muted-foreground">
        즐겨찾기한 카드가 없거나, 현재 필터에 맞는 카드가 없습니다.
        <br/>
        '⭐ Only' 필터를 끄거나 다른 학습 덱을 선택해보세요.
      </p>
    </div>
  );
};
