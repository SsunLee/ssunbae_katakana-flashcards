import type { Metadata } from "next";

import { QuizSeoPreview } from "@/app/components/QuizSeoPreview";
import { createQuizMetadata } from "@/app/lib/quiz-seo";

const path = "/study/spanish/sentences";
const image = "/images/quiz-previews/spanish-sentence-quiz-preview.png";
const title = "스페인어 문장 빈칸 퀴즈";
const description = "스페인어 문장의 빈칸에 들어갈 단어와 표현을 고르며 기본 어휘, 동사 활용, 문장 구조를 연습하는 무료 스페인어 퀴즈입니다.";
const imageAlt = "SSUN EDU 스페인어 문장 빈칸 퀴즈 문제와 선택지 화면";

export const metadata: Metadata = createQuizMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords: ["스페인어 문장 퀴즈", "스페인어 빈칸 문제", "스페인어 동사 퀴즈", "무료 스페인어 공부", "스페인어 문장 연습"],
});

export default function SpanishSentenceQuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <QuizSeoPreview
        heading="스페인어 문장 퀴즈 화면"
        description="스페인어 문장을 읽고 알맞은 선택지를 고르며 자주 쓰는 단어와 동사 활용을 단계별로 복습할 수 있습니다."
        path={path}
        image={image}
        imageAlt={imageAlt}
        language="ko-KR"
      />
    </>
  );
}
