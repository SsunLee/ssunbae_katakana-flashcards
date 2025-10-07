// ssunbae_katakana-flashcards/app/components/VerbCardSkeleton.tsx
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";

/**
 * 동사 카드 데이터 로딩 중에 표시될 스켈레톤 UI 컴포넌트입니다.
 * 사용자에게 콘텐츠가 로드되고 있음을 시각적으로 알려줍니다.
 */
export const VerbCardSkeleton = () => {
  return (
    <Card className="w-full max-w-md mx-auto min-h-[300px] flex flex-col justify-between animate-pulse">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="h-6 w-24 bg-muted rounded-md"></div>
        <div className="h-8 w-8 bg-muted rounded-full"></div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center flex-grow">
        <div className="h-12 w-48 bg-muted rounded-md mb-4"></div>
        <div className="h-6 w-32 bg-muted rounded-md"></div>
      </CardContent>
      <div className="flex justify-center items-center p-4 border-t border-border space-x-2">
        <div className="h-10 w-20 bg-muted rounded-md"></div>
        <div className="h-10 w-20 bg-muted rounded-md"></div>
        <div className="h-10 w-20 bg-muted rounded-md"></div>
        <div className="h-10 w-20 bg-muted rounded-md"></div>
      </div>
    </Card>
  );
};

