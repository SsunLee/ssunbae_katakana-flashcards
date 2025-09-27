// app/components/controls/CardControls.tsx

"use client";

import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  onPrev: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onReset: () => void;
  className?: string;
};

export default function CardControls({
  onPrev, onNext, onShuffle, onReset, className = ""
}: Props) {
  // 기존 페이지들에서 쓰던 shadcn 버튼 스타일을 그대로 이식
  const btn = "border-white/10 bg-white/5 hover:bg-white/10";

  return (
    <div className={`mt-4 flex flex-wrap items-center justify-center gap-2 text-sm ${className}`}>
      <Button size="sm" variant="outline" className={btn} onClick={onPrev}>
        <ChevronLeft className="mr-1 h-4 w-4" />이전
      </Button>
      <Button size="sm" variant="outline" className={btn} onClick={onNext}>
        다음<ChevronRight className="ml-1 h-4 w-4" />
      </Button>
      <Button size="sm" variant="outline" className={btn} onClick={onShuffle} title="카드를 섞습니다">
        섞기
      </Button>
      <Button size="sm" variant="outline" className={btn} onClick={onReset} title="처음 상태로 되돌립니다">
        리셋
      </Button>
    </div>
  );
}
