// src/components/EmptyDeckMessage.tsx

import React from 'react';

interface EmptyDeckMessageProps {
  viewMode: 'single' | 'grid';
}

export const EmptyDeckMessage = ({ viewMode }: EmptyDeckMessageProps) => {
  const containerHeight = viewMode === 'single' ? 'h-64 md:h-72' : 'h-96';
  
  return (
    <div className={`relative ${containerHeight} bg-slate-800/60 flex flex-col items-center justify-center text-center px-6 rounded-2xl border border-white/10`}>
      <div className="text-lg font-semibold mb-2">학습할 카드가 없습니다</div>
      <p className="text-white/70">즐겨찾기한 카드가 없거나, 필터링된 카드가 없습니다.<br/>'⭐ Only' 필터를 끄거나 필터 옵션을 변경해보세요.</p>
    </div>
  );
};
