// app/components/FuriganaText.tsx

import React from "react";
// --- ✨ Tooltip 대신 Popover를 import 합니다 ---
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
          // --- ✨ Tooltip을 Popover로 교체합니다 ---
          <Popover key={i}>
            <PopoverTrigger asChild>
              {/* --- ✨ onClick 이벤트 전파를 막는 로직 추가 --- */}
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
                onClick={(e) => e.stopPropagation()} // Popover 내부 클릭도 전파 방지
              >
                <div className="p-2 text-left">
                  <p className="text-lg font-bold">{detail.kanji} : {detail.meaning}</p>
                  <ul className="list-disc list-inside mt-1 text-sm text-white/80">
                    {detail.descriptions.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </PopoverContent>
            )}
          </Popover>
        );
      })}
    </p>
  );
}

