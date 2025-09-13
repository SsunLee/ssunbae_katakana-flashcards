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

  // 어떤 표시 모드인지
  variant?: Variant; // 기본값: "words"

  // 페이지네이션 (옵션)
  page?: {
    current: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
  };

  // 완전 커스텀하고 싶을 때(옵션). 제공되면 variant보다 우선합니다.
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
      // 가타카나 '글자' 모드 (front: 카타카나 크게)
      return (
        <>
          <div className="text-6xl font-semibold break-all px-2">{card.katakana}</div>
        </>
      );
    }
    // '단어' 모드 (front: 카타카나 + 후리가나)
    return (
      <>
        <div className="text-2xl font-semibold break-all px-2">{card.katakana}</div>
        <div className="text-sm text-white/70 mt-1">{card.furigana}</div>
      </>
    );
  };

  const defaultBack = (card: Word) => {
    if (variant === "chars") {
      // 글자 모드 (back: 후리가나 크게 + 이모지 + 정답 작은 글자)
      return (
        <>
          <div className="text-5xl font-semibold break-all">{card.furigana}</div>
          <div className="text-2xl mt-1">{card.emoji}</div>
          <div className="text-sm text-white/70 mt-1 text-center">{card.answer}</div>
        </>
      );
    }
    // 단어 모드 (back: 정답 크게 + 이모지 + 로마자)
    return (
      <>
        <div className="text-lg font-semibold break-all">{card.answer}</div>
        <div className="text-2xl mt-1">{card.emoji}</div>
        <div className="text-xs text-white/70 mt-2">({kanaToRomaji(card.furigana)})</div>
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
              <div className="absolute inset-0 bg-slate-800/60 flex flex-col items-center justify-center text-center p-2 rounded-lg border border-white/10 [backface-visibility:hidden]">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFav(card.id);
                  }}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/20 hover:bg-black/30 border-none"
                  title={favs[card.id] ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                >
                  <span className="text-md flex items-center justify-center w-full h-full">
                    {favs[card.id] ? "⭐" : "☆"}
                  </span>
                </Button>

                {renderFront ? renderFront(card) : defaultFront(card)}
              </div>

              {/* Back */}
              <div className="absolute inset-0 bg-slate-800/80 flex flex-col items-center justify-center text-center p-2 rounded-lg border border-white/10 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                {renderBack ? renderBack(card) : defaultBack(card)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {page && page.total > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4 text-white">
          <Button
            onClick={page.onPrev}
            disabled={page.current === 1}
            size="sm"
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10"
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
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10"
          >
            다음
          </Button>
        </div>
      )}
    </>
  );
}
