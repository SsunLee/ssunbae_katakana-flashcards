import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JLPT 일본어 문장 빈칸 퀴즈 | SSUN EDU",
  description:
    "JLPT N5부터 N1까지 일본어 문장 빈칸 문제를 풀며 어휘, 조사, 동사 활용, 문장 패턴을 연습하는 무료 일본어 문장 퀴즈입니다.",
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
  alternates: {
    canonical: "/study/japanese/sentence-quiz",
  },
  openGraph: {
    title: "JLPT 일본어 문장 빈칸 퀴즈 | SSUN EDU",
    description:
      "일본어 문장을 읽고 빈칸에 들어갈 표현을 고르며 JLPT 문장 이해력과 기초 문법을 반복 학습합니다.",
    url: "/study/japanese/sentence-quiz",
    type: "article",
  },
};

export default function JapaneseSentenceQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="mx-auto w-full max-w-[760px] px-4 pb-2 pt-6 sm:px-6">
        <div className="rounded-lg border border-border bg-card p-5">
          <p className="text-sm font-semibold text-primary">일본어 문장 학습</p>
          <h1 className="mt-2 text-2xl font-bold text-foreground">
            JLPT 일본어 문장 빈칸 퀴즈
          </h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            이 페이지는 일본어 문장을 읽고 빈칸에 들어갈 알맞은 표현을 고르는 학습 도구입니다.
            JLPT N5부터 N1까지 난이도별 문장을 반복해서 풀며 조사, 동사 활용, 기본 어순,
            자주 쓰이는 표현을 자연스럽게 익힐 수 있습니다. 각 문제는 일본어 원문, 후리가나,
            한국어 뜻, 선택지, 해설을 함께 제공하여 초급 학습자도 문장 구조를 확인하며 복습할 수 있습니다.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            비로그인 사용자는 기본 문제를 체험할 수 있고, 로그인 사용자는 JLPT 레벨 필터와 학습 기록 저장을
            사용할 수 있습니다. 문장 듣기 기능을 함께 사용하면 읽기뿐 아니라 발음과 청해 감각도 같이 연습할 수 있습니다.
          </p>
        </div>
      </section>
      {children}
      <section className="mx-auto w-full max-w-[760px] px-4 pb-10 pt-4 sm:px-6">
        <article className="rounded-lg border border-border bg-card p-5 text-sm leading-7 text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">학습 팁</h2>
          <p className="mt-3">
            먼저 후리가나를 켜고 문장을 천천히 읽은 뒤, 빈칸 앞뒤의 조사와 시제를 확인해 보세요.
            정답을 고른 후에는 해설을 읽고 같은 문장을 소리 내어 말하면 문장 패턴이 더 오래 남습니다.
            익숙해진 문제는 후리가나를 끄고 다시 풀어 실제 독해 상황에 가깝게 연습하는 것이 좋습니다.
          </p>
          <p className="mt-3">
            N5와 N4 단계에서는 기본 동사, 형용사, 시간 표현, 장소 표현을 중심으로 학습하고,
            N3 이상에서는 접속 표현과 문맥에 맞는 어휘 선택을 함께 확인하세요. 틀린 문제는 바로 넘기지 말고
            정답 문장을 한 번 더 읽어 문장 전체의 의미를 확인하는 방식으로 복습하면 효과적입니다.
          </p>
        </article>
      </section>
    </>
  );
}
