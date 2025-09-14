// app/components/controls/PageControls.tsx

"use client";

import { Button } from "@/app/components/ui/button";

type Props = {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  className?: string;
};

export default function PageControls({
  currentPage, totalPages, onPrevPage, onNextPage, className = ""
}: Props) {
  const btn = "border-white/10 bg-white/5 hover:bg-white/10";

  if (totalPages <= 1) return null;

  return (
    <div className={`mt-6 flex items-center justify-center gap-4 text-white ${className}`}>
      <Button onClick={onPrevPage} disabled={currentPage === 1} size="sm" variant="outline" className={btn}>
        이전
      </Button>
      <span>{currentPage} / {totalPages}</span>
      <Button onClick={onNextPage} disabled={currentPage === totalPages} size="sm" variant="outline" className={btn}>
        다음
      </Button>
    </div>
  );
}
