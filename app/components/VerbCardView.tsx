"use client";

import React from "react";
import type { Verb } from "@/app/data/verbs";
import { Button } from "@/app/components/ui/button";

type Props = {
  verb: Verb;
  isFlipped: boolean;
  isFav: boolean;
  onFlip: () => void;
  onToggleFav: () => void;
  titleFontSize?: number;
  sentenceFontSize?: number;
};

export default function VerbCardView({
  verb,
  isFlipped,
  isFav,
  onFlip,
  onToggleFav,
  titleFontSize,
  sentenceFontSize,
}: Props) {
  const baseFontSize = titleFontSize ?? sentenceFontSize ?? 28;

  return (
    <div className="[perspective:1200px] w-full max-w-md mx-auto select-none">
      <div
        role="button"
        tabIndex={0}
        aria-label="flip card"
        onClick={onFlip}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onFlip(); } }}
        className="relative h-64 md:h-72 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
        style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
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
            <span className="text-xl">{isFav ? "⭐" : "☆"}</span>
          </Button>

          {/* 전면: 중앙 배치 */}
          <div className="text-center w-full text-foreground">
            <p className="font-semibold leading-snug" style={{ fontSize: `${Math.max(22, baseFontSize)}px` }}>
              {verb.kanji}
            </p>
            {verb.reading && (
              <p className="mt-2 text-lg text-muted-foreground">（{verb.reading}）</p>
            )}
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-card/95 backdrop-blur rounded-2xl shadow-xl border border-border flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-center w-full text-foreground">
            <p className="text-sm text-muted-foreground mb-2">활용형은 하단 표에서 확인</p>
            <p className="font-semibold leading-snug" style={{ fontSize: `${Math.max(20, baseFontSize - 2)}px` }}>
              {verb.kanji}{verb.reading && <span className="text-base">（{verb.reading}）</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
