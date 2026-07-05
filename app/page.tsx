// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SSUN EDU - 무료 언어 학습 플랫폼",
  description:
    "SSUN EDU는 일본어, 영어, 스페인어, 한국어를 카드와 문장 퀴즈로 공부할 수 있는 무료 언어 학습 사이트입니다.",
  alternates: {
    canonical: "/",
  },
};

const learningSections = [
  {
    title: "일본어 학습",
    description:
      "히라가나, 가타카나, 기초 단어, JLPT 문장 퀴즈, 한자 쓰기, 동사 활용을 한 곳에서 연습합니다.",
    href: "/study/japanese",
  },
  {
    title: "영어 단어",
    description:
      "일상 회화와 기초 독해에 자주 쓰이는 영어 단어를 예문과 함께 반복 학습합니다.",
    href: "/study/english/words",
  },
  {
    title: "스페인어 학습",
    description:
      "기초 스페인어 단어와 문장을 카드 형식으로 확인하며 발음과 뜻을 함께 익힙니다.",
    href: "/study/spanish/words",
  },
  {
    title: "한국어 학습",
    description:
      "한글 자모, 음절, 한국어 기초 단어를 단계별 카드로 학습할 수 있습니다.",
    href: "/study/korean/words",
  },
];

export default function Root() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">무료 언어 학습 사이트</p>
        <h1 className="mt-3 text-3xl font-bold tracking-normal text-foreground sm:text-5xl">
          SSUN EDU
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
          SSUN EDU는 일본어, 영어, 스페인어, 한국어를 짧은 카드와 문장 퀴즈로 반복 학습하는
          무료 공부 사이트입니다. 학습자는 문자, 단어, 예문, 발음, 한자 쓰기, JLPT 문장 문제를
          단계별로 확인하며 독학 루틴을 만들 수 있습니다.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/study/japanese/katakana-words"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            일본어 단어 시작
          </Link>
          <Link
            href="/study/japanese/sentence-quiz"
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold"
          >
            JLPT 문장 퀴즈
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        {learningSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-accent/30"
          >
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{section.description}</p>
          </Link>
        ))}
      </section>

      <section className="mt-12 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
        <h2 className="text-xl font-semibold text-foreground">학습 방식</h2>
        <p>
          각 학습 페이지는 정답 확인, 발음 듣기, 글자 크기 조절, 복습 기록 저장을 중심으로
          구성되어 있습니다. 로그인하지 않아도 기본 문제를 체험할 수 있고, 로그인하면 학습
          기록과 대시보드가 연결되어 어떤 영역을 더 연습해야 하는지 확인할 수 있습니다.
        </p>
        <p>
          일본어 학습자는 히라가나와 가타카나부터 시작해 단어, 문장, 동사 활용, 한자 쓰기로
          확장할 수 있습니다. 영어와 스페인어, 한국어 학습 페이지도 같은 카드 기반 흐름을
          사용하므로 처음 방문한 사용자도 쉽게 이동하고 반복 학습할 수 있습니다.
        </p>
      </section>
    </main>
  );
}


