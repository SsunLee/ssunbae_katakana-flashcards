// app/components/VerbGridcardView.tsx

"use client";

import React, { useMemo } from "react";
import { GridCardView } from "@/app/components/GridCardView";
import type { Verb } from "@/app/data/verbs";
import type { Word } from "@/app/data/words";

type CardId = number;

type Props = {
  verbs: Verb[];
  favs: Record<CardId, boolean>;
  flippedStates: Record<CardId, boolean>;
  onToggleFav: (id: CardId) => void;
  onToggleCardFlip: (id: CardId) => void;
  page?: { current: number; total: number; onPrev: () => void; onNext: () => void };

  /** 폰트 사이즈 옵션 */
  titleFontSize?: number;   // 앞면 한자 크기
  readingFontSize?: number; // 뒷면 히라가나 크기
  meaningFontSize?: number; // 뒷면 한국어 뜻 크기
};

export default function VerbGridMode({
  verbs,
  favs,
  flippedStates,
  onToggleFav,
  onToggleCardFlip,
  page,
  titleFontSize = 20,
  readingFontSize,
  meaningFontSize,
}: Props) {
  // GridCardView의 Word 형태로 매핑 (id만 맞으면 됩니다)
  const cards: Word[] = useMemo(
    () =>
      verbs.map((v) => ({
        id: v.id,
        katakana: v.kanji,          // 앞면 큰 텍스트
        furigana: v.reading || "",  // 앞면 보조(히라가나)
        answer: v.gloss || "",      // 뒷면 한국어 뜻
        emoji: "📝",
      })),
    [verbs]
  );

  const frontSize = Math.max(14, Math.round(titleFontSize));
  const backReadingSize = Math.max(14, Math.round(readingFontSize ?? frontSize - 2));
  const backMeaningSize = Math.max(12, Math.round(meaningFontSize ?? Math.floor(frontSize * 0.8)));

  return (
    <GridCardView
      cards={cards}
      favs={favs}
      flippedStates={flippedStates}
      onToggleFav={onToggleFav}
      onToggleCardFlip={onToggleCardFlip}
      page={page}
      variant="words"
      /* 앞면: 한자 크게 + 히라가나 작은 보조 */
      renderFront={(c) => (
        <>
          <div
            className="font-semibold break-all px-2 leading-snug"
            style={{ fontSize: frontSize }}
          >
            {c.katakana}
          </div>
          {c.furigana && (
            <div className="text-xs text-muted-foreground mt-1">{c.furigana}</div>
          )}
        </>
      )}
      /* 뒷면: 정답 라벨 + 히라가나 크게 + 한국어 뜻 */
      renderBack={(c) => (
        <div className="w-full text-center px-1">
          <div className="text-[11px] text-muted-foreground mb-1">정답</div>

          {/* 히라가나 */}
          <div
            className="font-semibold leading-snug break-all"
            style={{ fontSize: backReadingSize }}
          >
            {c.furigana || "—"}
          </div>

          {/* 구분선 */}
          <div className="w-full my-2 ui-divider" />

          {/* 한국어 뜻 */}
          <div
            className="font-medium answer-text"
            style={{ fontSize: backMeaningSize }}
          >
            {c.answer || "뜻 없음"}
          </div>
        </div>
      )}
    />
  );
}

