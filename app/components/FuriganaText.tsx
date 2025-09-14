// app/components/FuriganaText.tsx

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { type Sentence } from "../data/sentences";

type Reading = Sentence["reading"];
type KanjiDetails = Sentence["kanjiDetails"];

interface FuriganaTextProps {
  reading: Reading;
  kanjiDetails: KanjiDetails;
  // --- ✨ 폰트 크기 prop 추가 (옵셔널) ---
  fontSize?: number;
}

export function FuriganaText({ reading, kanjiDetails, fontSize }: FuriganaTextProps) {
  const kanjiMap = new Map(kanjiDetails.map((k) => [k.kanji, k]));

  return (
    <TooltipProvider delayDuration={100}>
      <p 
        className="font-semibold leading-relaxed text-center tracking-wide"
        // --- ✨ 인라인 스타일로 폰트 크기 적용 ---
        style={{ fontSize: fontSize ? `${fontSize}px` : 'inherit' }}
      >
        {reading.map((part, i) => {
          if (typeof part === "string") {
            return <span key={i}>{part}</span>;
          }
          const detail = kanjiMap.get(part.text);
          return (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <ruby className="cursor-pointer hover:text-cyan-300 transition-colors">
                  {part.text}
                  <rt className="text-sm opacity-80 select-none">{part.furigana}</rt>
                </ruby>
              </TooltipTrigger>
              {detail && (
                <TooltipContent className="bg-slate-900 border-slate-700 text-white">
                  <div className="p-2 text-left">
                    <p className="text-lg font-bold">{detail.kanji} : {detail.meaning}</p>
                    <ul className="list-disc list-inside mt-1 text-sm text-white/80">
                      {detail.descriptions.map((desc, idx) => (
                        <li key={idx}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </p>
    </TooltipProvider>
  );
}

