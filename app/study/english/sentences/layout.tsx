import type { Metadata } from "next";

import { QuizSeoPreview } from "@/app/components/QuizSeoPreview";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";
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
      <StudyPageGuide
        id="english-sentence-quiz-guide"
        eyebrow="ENGLISH QUIZ GUIDE"
        title="빈칸 앞뒤의 단서로 문법과 뜻을 함께 판단하세요"
        intro="영어 문장 퀴즈는 단어 뜻만 묻지 않고 시제, 수 일치, 전치사, 문맥을 함께 확인합니다. 먼저 문장을 끝까지 읽고 빈칸에 필요한 품사를 정한 뒤 선택지를 비교해 보세요."
        sections={[
          { title: "난이도별 학습", body: "초급에서는 be동사와 기본 시제, 중급에서는 완료형과 관계사, 고급에서는 문맥에 맞는 어휘와 복합 문장 표현을 중심으로 풉니다." },
          { title: "문법 단서 찾기", body: "주어의 수, 시간 표현, 빈칸 뒤 전치사를 먼저 표시하세요. yesterday는 과거 시제, since와 기간은 완료형을 판단하는 단서가 될 수 있습니다." },
          { title: "오답 복습", body: "정답만 외우지 말고 다른 선택지가 왜 맞지 않는지 한 가지씩 확인하세요. 완성된 문장을 소리 내어 읽으면 어순과 표현을 함께 익힐 수 있습니다." },
        ]}
      />
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
