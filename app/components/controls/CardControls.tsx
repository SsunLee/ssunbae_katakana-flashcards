// app/components/controls/CardControls.tsx

"use client";

import { Button } from "@/app/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/app/context/LocaleContext";

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
  const { t } = useLocale();
  // 기존 페이지들에서 쓰던 shadcn 버튼 스타일을 그대로 이식
  const btn = "border-white/10 bg-white/5 hover:bg-white/10";

  return (
    <div className={`mt-4 flex flex-wrap items-center justify-center gap-2 text-sm ${className}`}>
      <Button size="sm" variant="outline" className={btn} onClick={onPrev}>
        <ChevronLeft className="mr-1 h-4 w-4" />{t("common.previous")}
      </Button>
      <Button size="sm" variant="outline" className={btn} onClick={onNext}>
        {t("common.next")}<ChevronRight className="ml-1 h-4 w-4" />
      </Button>
      <Button size="sm" variant="outline" className={btn} onClick={onShuffle} title={t("controls.shuffleTitle")}>
        {t("common.shuffle")}
      </Button>
      <Button size="sm" variant="outline" className={btn} onClick={onReset} title={t("controls.resetTitle")}>
        {t("common.reset")}
      </Button>
    </div>
  );
}
