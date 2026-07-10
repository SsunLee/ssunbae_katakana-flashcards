import type { Metadata } from "next";

import { QuizSeoPreview } from "@/app/components/QuizSeoPreview";
import { createQuizMetadata } from "@/app/lib/quiz-seo";

const path = "/study/english/sentences";
const image = "/images/quiz-previews/english-sentence-quiz-preview.png";
const title = "영어 문장 빈칸 퀴즈";
const description = "초급부터 고급까지 영어 문장의 빈칸에 알맞은 표현을 고르며 문법, 어휘, 시제를 반복 연습하는 무료 영어 문장 퀴즈입니다.";
const imageAlt = "SSUN EDU 영어 문장 빈칸 퀴즈 문제와 선택지 화면";

export const metadata: Metadata = createQuizMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  keywords: ["영어 문장 퀴즈", "영어 빈칸 문제", "영어 문법 퀴즈", "무료 영어 공부", "영어 문장 연습"],
});

export default function EnglishSentenceQuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <QuizSeoPreview
        heading="영어 문장 퀴즈 화면"
        description="문장을 읽고 네 개의 선택지에서 알맞은 표현을 고르며 난이도별 영어 문법과 어휘를 확인할 수 있습니다."
        path={path}
        image={image}
        imageAlt={imageAlt}
        language="ko-KR"
      />
    </>
  );
}
