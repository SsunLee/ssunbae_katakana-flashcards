// app/components/GridCardView.tsx
"use client";

import React from "react";
import { Button } from "./ui/button";
import { kanaToRomaji } from "@/app/utils/kana";
import { type Word } from "@/app/data/words";

type CardId = number;

type Variant = "words" | "chars";

interface GridCardViewProps {
  cards: Word[];
  favs: Record<CardId, boolean>;
  flippedStates: Record<CardId, boolean>;
  onToggleFav: (id: CardId) => void;
  onToggleCardFlip: (id: CardId) => void;
  variant?: Variant;
  page?: {
    current: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
  };
  renderFront?: (card: Word) => React.ReactNode;
  renderBack?: (card: Word) => React.ReactNode;
}

export function GridCardView({
  cards,
  favs,
  flippedStates,
  onToggleFav,
  onToggleCardFlip,
  page,
  variant = "words",
  renderFront,
  renderBack,
}: GridCardViewProps) {
  const defaultFront = (card: Word) => {
    if (variant === "chars") {
      return (
        <>
          <div className="text-6xl font-semibold break-all px-2">{card.katakana}</div>
        </>
      );
    }
    return (
      <>
        <div className="text-2xl font-semibold break-all px-2">{card.katakana}</div>
        {/* ✅ 테마에 맞게 텍스트 색상 변경 */}
        <div className="text-sm text-muted-foreground mt-1">{card.furigana}</div>
      </>
    );
  };

  const defaultBack = (card: Word) => {
    if (variant === "chars") {
      return (
        <>
          <div className="text-5xl font-semibold break-all">{card.furigana}</div>
          <div className="text-2xl mt-1">{card.emoji}</div>
          {/* ✅ 테마에 맞게 텍스트 색상 변경 */}
          <div className="text-sm text-muted-foreground mt-1 text-center">{card.answer}</div>
        </>
      );
    }
    return (
      <>
        <div className="text-lg font-semibold break-all">{card.answer}</div>
        <div className="text-2xl mt-1">{card.emoji}</div>
        {/* ✅ 테마에 맞게 텍스트 색상 변경 */}
        <div className="text-xs text-muted-foreground mt-2">({kanaToRomaji(card.furigana)})</div>
      </>
    );
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="w-40 [perspective:1200px] cursor-pointer group"
            onClick={() => onToggleCardFlip(card.id)}
          >
            <div
              className="relative h-48 w-full transition-transform duration-500 [transform-style:preserve-3d] rounded-lg"
              style={{ transform: flippedStates[card.id] ? "rotateY(180deg)" : "rotateY(0deg)" }}
            >
              {/* Front */}
              {/* ✅ 배경, 테두리 색상을 테마에 맞게 변경 */}
              <div className="absolute inset-0 bg-card flex flex-col items-center justify-center text-center p-2 rounded-lg border border-border [backface-visibility:hidden]">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav(card.id);
                  }}
                  // ✅ variant="secondary"를 사용하므로 직접 스타일링하는 클래스는 제거합니다.
                  className="absolute top-2 right-2 h-7 w-7 rounded-full"
                  title={favs[card.id] ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                >
                  <span className="text-md flex items-center justify-center w-full h-full">
                    {favs[card.id] ? "⭐" : "☆"}
                  </span>
                </Button>

                {renderFront ? renderFront(card) : defaultFront(card)}
              </div>

              {/* Back */}
              {/* ✅ 배경, 테두리 색상을 테마에 맞게 변경 */}
              <div className="absolute inset-0 bg-card flex flex-col items-center justify-center text-center p-2 rounded-lg border border-border [transform:rotateY(180deg)] [backface-visibility:hidden]">
                {renderBack ? renderBack(card) : defaultBack(card)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {page && page.total > 1 && (
        // ✅ 페이지네이션 텍스트 색상 변경
        <div className="mt-6 flex items-center justify-center gap-4 text-foreground">
          <Button
            onClick={page.onPrev}
            disabled={page.current === 1}
            size="sm"
            variant="outline" // ✅ variant="outline"을 사용하면 클래스 없이도 테마가 적용됩니다.
          >
            이전
          </Button>
          <span>
            {page.current} / {page.total}
          </span>
          <Button
            onClick={page.onNext}
            disabled={page.current === page.total}
            size="sm"
            variant="outline" // ✅ variant="outline"을 사용하면 클래스 없이도 테마가 적용됩니다.
          >
            다음
          </Button>
        </div>
      )}
    </>
  );
}
