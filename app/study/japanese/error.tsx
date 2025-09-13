// app/study/japanese/error.tsx
"use client"; // 에러 컴포넌트는 반드시 클라이언트 컴포넌트여야 합니다.

import { Button } from "@/app/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h2 className="text-2xl font-semibold text-white">이런, 문제가 발생했어요!</h2>
      <p className="text-lg text-white/70 mt-2">
        페이지를 불러오는 중 예기치 못한 오류가 발생했습니다.
      </p>
      <Button
        onClick={() => reset()} // 이 함수는 페이지를 다시 렌더링하려고 시도합니다.
        className="mt-6"
      >
        다시 시도하기
      </Button>
    </div>
  );
}
