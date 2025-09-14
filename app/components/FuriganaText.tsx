// app/components/FuriganaText.tsx
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { type Sentence } from "@/app/data/sentences";

type FuriganaTextProps = {
  reading: Sentence["reading"];
  kanjiDetails: Sentence["kanjiDetails"];
};

// ruby 태그와 툴팁을 사용하여 후리가나 텍스트를 렌더링하는 컴포넌트
export function FuriganaText({ reading, kanjiDetails }: FuriganaTextProps) {
  // 한자(kanji)를 키로 사용하여 KanjiDetail 객체에 빠르게 접근할 수 있는 맵을 생성합니다.
  const kanjiMap = new Map(kanjiDetails.map((kd) => [kd.kanji, kd]));

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex flex-wrap items-end justify-center">
        {reading.map((segment, index) => {
          // 후리가나가 있는 세그먼트(한자)인 경우
          if (segment.furigana) {
            const detail = kanjiMap.get(segment.text);
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <ruby className="cursor-pointer hover:text-sky-300 transition-colors mx-0.5">
                    {segment.text}
                    <rt className="text-sm select-none">{segment.furigana}</rt>
                  </ruby>
                </TooltipTrigger>
                {/* 툴팁 내용 */}
                {detail && (
                  <TooltipContent
                    side="bottom"
                    className="bg-slate-900 border-sky-500/50 text-white"
                  >
                    <div className="p-2 text-left">
                      <p className="text-lg font-bold">
                        {detail.kanji} : {detail.meaning} ({detail.reading})
                      </p>
                      <ul className="mt-2 list-disc pl-5 space-y-1">
                        {detail.examples.map((ex, i) => (
                          <li key={i}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          }
          // 후리가나가 없는 일반 텍스트 세그먼트
          return <span key={index}>{segment.text}</span>;
        })}
      </div>
    </TooltipProvider>
  );
}
