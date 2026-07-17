import type { Metadata } from "next";

import { QuizSeoPreview } from "@/app/components/QuizSeoPreview";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";
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
      <StudyPageGuide
        id="spanish-sentence-quiz-guide"
        eyebrow="SPANISH QUIZ GUIDE"
        title="성·수 일치와 동사 주어를 먼저 확인하세요"
        intro="스페인어 문장은 관사와 형용사가 명사의 성과 수에 맞고, 동사는 주어에 따라 형태가 달라집니다. 빈칸만 보지 말고 문장 전체에서 서로 연결되는 단어를 찾아보세요."
        sections={[
          { title: "관사와 형용사", body: "el·la, los·las와 명사의 관계를 먼저 확인하세요. 형용사도 명사의 성과 수에 맞춰 바뀌므로 빈칸 앞뒤 어미가 중요한 단서가 됩니다." },
          { title: "동사 활용", body: "문장에 주어가 생략되어도 동사 어미에서 인칭을 알 수 있습니다. 시간 표현을 확인해 현재, 과거, 가까운 미래 중 어떤 형태가 필요한지 판단하세요." },
          { title: "완성 문장 읽기", body: "정답을 넣은 뒤 자연스러운 강세로 문장 전체를 읽어 보세요. 틀린 문제는 동사 원형과 바뀐 형태를 나란히 적어 보면 활용 규칙이 선명해집니다." },
        ]}
      />
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
