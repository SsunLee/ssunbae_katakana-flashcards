// app/components/FuriganaText.tsx

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { type Sentence } from "../data/sentences";

type Reading = Sentence["reading"];
type KanjiDetails = Sentence["kanjiDetails"];

interface FuriganaTextProps {
  reading: Reading;
  kanjiDetails: KanjiDetails;
  fontSize?: number;
}

export function FuriganaText({ reading, kanjiDetails, fontSize }: FuriganaTextProps) {
  const kanjiMap = new Map(kanjiDetails.map((k) => [k.kanji, k]));

  return (
    <p 
      className="font-semibold leading-relaxed text-center tracking-wide"
      style={{ fontSize: fontSize ? `${fontSize}px` : 'inherit' }}
    >
      {reading.map((part, i) => {
        if (typeof part === "string") {
          return <span key={i}>{part}</span>;
        }
        const detail = kanjiMap.get(part.text);
        return (
          <Popover key={i}>
            <PopoverTrigger asChild>
              <ruby 
                className="cursor-pointer hover:text-cyan-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {part.text}
                <rt className="text-sm opacity-80 select-none">{part.furigana}</rt>
              </ruby>
            </PopoverTrigger>
            {detail && (
              <PopoverContent 
                className="bg-slate-900 border-slate-700 text-white w-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* --- ✨ 팝업 UI를 새 디자인에 맞게 수정 --- */}
                <div className="p-2 text-left">
                  <p className="text-lg font-bold">{detail.kanji} : {detail.meaning}</p>
                  {/* --- ✨ usages가 있을 때만 목록을 렌더링하도록 수정 --- */}
                  {detail.usages && detail.usages.length > 0 && (
                    <ol className="list-decimal list-inside mt-2 pl-2 text-sm text-white/90 space-y-1">
                      {detail.usages.map((usage, idx) => (
                        <li key={idx}>{usage}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </PopoverContent>
            )}
          </Popover>
        );
      })}
    </p>
  );
}

