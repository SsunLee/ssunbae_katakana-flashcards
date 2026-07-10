import type { Metadata } from "next";

import { QuizSeoPreview } from "@/app/components/QuizSeoPreview";
import { createQuizMetadata } from "@/app/lib/quiz-seo";

const path = "/study/japanese/sentence-quiz";
const image = "/images/quiz-previews/japanese-sentence-quiz-preview.png";
const title = "JLPT 일본어 문장 빈칸 퀴즈";
const description = "JLPT N5부터 N1까지 일본어 문장 빈칸 문제를 풀며 어휘, 조사, 동사 활용, 문장 패턴을 연습하는 무료 일본어 문장 퀴즈입니다.";
const imageAlt = "SSUN EDU JLPT 일본어 문장 빈칸 퀴즈와 후리가나 선택지 화면";

export const metadata: Metadata = createQuizMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  imageHeight: 688,
  keywords: [
    "JLPT 문장 퀴즈",
    "일본어 문장 문제",
    "일본어 빈칸 퀴즈",
    "일본어 공부 사이트",
    "무료 일본어 사이트",
    "JLPT N5",
    "JLPT N4",
    "JLPT N3",
    "일본어 독학",
  ],
});

export default function JapaneseSentenceQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <section className="mx-auto w-full max-w-[660px] px-4 pb-10 pt-6 sm:px-6">
        <article className="space-y-3 border-t border-border pt-5 text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
          <h2 className="text-sm font-semibold text-foreground sm:text-base">
            일본어 문장 퀴즈 학습 안내
          </h2>
          <p>
            JLPT 문장 빈칸 퀴즈는 일본어 문장을 읽고 빈칸에 맞는 표현을 고르며 문장 패턴을 연습하는 퀴즈입니다.
            JLPT N5부터 N1까지 난이도별 문장을 풀면서 조사, 동사 활용, 기본 어순,
            자주 쓰이는 표현을 함께 확인할 수 있습니다. 문제마다 원문, 후리가나,
            한국어 뜻, 선택지, 해설을 넣어 초급 학습자도 문장 구조를 짚어가며 복습할 수 있습니다.
          </p>
          <p>
            로그인하지 않아도 기본 문제를 풀 수 있습니다. 로그인하면 JLPT 레벨 필터와 학습 기록 저장을
            사용할 수 있고, 문장 듣기 기능으로 발음과 청해 감각도 함께 연습할 수 있습니다.
          </p>
          <p>
            먼저 후리가나를 켜고 문장을 천천히 읽은 뒤, 빈칸 앞뒤의 조사와 시제를 확인해 보세요.
            정답을 고른 뒤에는 해설을 읽고 같은 문장을 소리 내어 말해 보세요.
            익숙해진 문제는 후리가나를 끄고 다시 풀면 실제 독해에 더 가까운 연습이 됩니다.
          </p>
          <p>
            N5와 N4 단계에서는 기본 동사, 형용사, 시간 표현, 장소 표현을 중심으로 학습하고,
            N3 이상에서는 접속 표현과 문맥에 맞는 어휘 선택까지 함께 확인하세요. 틀린 문제는 바로 넘기지 말고
            정답 문장을 한 번 더 읽으면서 문장 전체의 의미를 확인하는 편이 좋습니다.
          </p>
        </article>
      </section>
      <QuizSeoPreview
        heading="JLPT 일본어 문장 퀴즈 화면"
        description="후리가나와 JLPT 레벨을 확인하며 문장의 빈칸에 들어갈 표현을 고르고, 정답과 해설로 문장 구조를 복습할 수 있습니다."
        path={path}
        image={image}
        imageAlt={imageAlt}
        imageHeight={688}
        language="ko-KR"
      />
    </>
  );
}
