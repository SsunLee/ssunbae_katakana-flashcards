// app/components/controls/PageControls.tsx

"use client";

import { Button } from "@/app/components/ui/button";
import { useLocale } from "@/app/context/LocaleContext";

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
  const { t } = useLocale();
  const btn = "border-white/10 bg-white/5 hover:bg-white/10";

  if (totalPages <= 1) return null;

  return (
    <div className={`mt-6 flex items-center justify-center gap-4 text-white ${className}`}>
      <Button onClick={onPrevPage} disabled={currentPage === 1} size="sm" variant="outline" className={btn}>
        {t("common.previous")}
      </Button>
      <span>{currentPage} / {totalPages}</span>
      <Button onClick={onNextPage} disabled={currentPage === totalPages} size="sm" variant="outline" className={btn}>
        {t("common.next")}
      </Button>
    </div>
  );
}
