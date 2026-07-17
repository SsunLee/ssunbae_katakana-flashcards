import type { Metadata } from "next";

import { QuizSeoPreview } from "@/app/components/QuizSeoPreview";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";
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
      <StudyPageGuide
        id="korean-sentence-quiz-guide"
        eyebrow="KOREAN QUIZ GUIDE"
        title="조사와 어미를 문장 의미에 맞게 연결하세요"
        intro="한국어 문장은 어순이 바뀔 수 있지만 조사와 문장 끝의 어미가 각 말의 역할과 말하는 태도를 보여 줍니다. 빈칸 주변의 명사와 동사를 함께 읽고 가장 자연스러운 표현을 골라 보세요."
        sections={[
          { title: "조사 구분", body: "은·는은 화제를, 이·가는 주어를, 을·를은 목적어를 표시합니다. 받침 유무뿐 아니라 문장에서 어떤 역할을 하는 말인지 먼저 확인하세요." },
          { title: "동사와 어미", body: "시간 표현에 따라 가요, 갔어요, 갈 거예요처럼 동사 끝이 바뀝니다. 부탁, 이유, 추측 등 문장의 기능도 어미를 고르는 단서가 됩니다." },
          { title: "자연스러움 확인", body: "문법적으로 가능한 선택지가 여러 개라면 실제 상황과 높임 정도를 비교하세요. 정답 문장을 한 번 말해 보고 비슷한 단어로 바꿔 새 문장을 만들어 보세요." },
        ]}
      />
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
