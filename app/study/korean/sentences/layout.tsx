import type { Metadata } from "next";

import { QuizSeoPreview } from "@/app/components/QuizSeoPreview";
import { createQuizMetadata } from "@/app/lib/quiz-seo";

const path = "/study/korean/sentences";
const image = "/images/quiz-previews/korean-sentence-quiz-preview.png";
const title = "한국어 문장 빈칸 퀴즈";
const description = "한국어 문장의 빈칸에 알맞은 동사와 표현을 고르며 기초 어휘, 조사, 문장 구조를 반복 학습하는 무료 한국어 퀴즈입니다.";
const imageAlt = "SSUN EDU 한국어 문장 빈칸 퀴즈 문제와 선택지 화면";

export const metadata: Metadata = createQuizMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords: ["한국어 문장 퀴즈", "한국어 빈칸 문제", "한국어 동사 퀴즈", "무료 한국어 공부", "한국어 문장 연습"],
});

export default function KoreanSentenceQuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <QuizSeoPreview
        heading="한국어 문장 퀴즈 화면"
        description="자연스러운 한국어 문장을 읽고 알맞은 표현을 선택하며 기본 어휘와 문장 구성을 단계별로 확인할 수 있습니다."
        path={path}
        image={image}
        imageAlt={imageAlt}
        language="ko-KR"
      />
    </>
  );
}
