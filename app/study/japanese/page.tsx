import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Languages,
  MessageSquareText,
  PenLine,
  SpellCheck2,
  WholeWord,
} from "lucide-react";

export const metadata: Metadata = {
  title: "일본어 공부 | JLPT 단어·문장·한자",
  description:
    "히라가나와 가타카나부터 JLPT 단어, 일본어 문장 퀴즈, 한자, 동사 활용까지 순서대로 연습하는 무료 일본어 학습 페이지입니다.",
  alternates: { canonical: "/study/japanese" },
};

const studyLinks = [
  {
    href: "/study/japanese/sentence-quiz",
    title: "일본어 JLPT 문제 풀이",
    description: "N5부터 N1까지 문장 빈칸 문제와 해설로 조사와 표현을 익힙니다.",
    icon: BookOpenCheck,
  },
  {
    href: "/study/japanese/katakana-words",
    title: "JLPT 단어",
    description: "가타카나와 한자 단어를 뜻, 읽기, 예문과 함께 카드로 복습합니다.",
    icon: WholeWord,
  },
  {
    href: "/study/japanese/kana-chars",
    title: "히라가나·가타카나",
    description: "청음, 탁음, 반탁음, 요음을 표에서 확인하고 소리로 구분합니다.",
    icon: Languages,
  },
  {
    href: "/study/japanese/sentences",
    title: "일본어 예문",
    description: "짧은 일상 문장을 읽고 한국어 뜻과 발음을 함께 확인합니다.",
    icon: MessageSquareText,
  },
  {
    href: "/study/japanese/verbs",
    title: "동사 활용",
    description: "사전형, ます형, て형, 과거형을 한 동사씩 비교하며 연습합니다.",
    icon: SpellCheck2,
  },
  {
    href: "/study/japanese/kanji",
    title: "한자 쓰기",
    description: "기초 한자의 음과 뜻을 확인하고 화면에 직접 따라 씁니다.",
    icon: PenLine,
  },
];

const learningSteps = [
  ["01", "문자 익히기", "히라가나와 가타카나의 모양과 소리를 먼저 연결합니다."],
  ["02", "단어 넓히기", "JLPT 단계별 단어를 읽기와 예문까지 묶어서 기억합니다."],
  ["03", "문장에 적용하기", "빈칸 문제와 해설로 실제 문장에서 쓰이는 방식을 확인합니다."],
];

export default function JapaneseStudyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/45">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
          <p className="text-sm font-semibold text-primary">JAPANESE STUDY</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">일본어 공부</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            문자를 처음 외우는 단계부터 JLPT 문장을 읽는 단계까지 이어서 연습할 수 있습니다.
            현재 수준에 맞는 메뉴를 골라 짧게 풀고, 소리와 해설로 다시 확인하세요.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/study/japanese/sentence-quiz"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              JLPT 문제 풀기
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/study/japanese/katakana-words"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-accent/40"
            >
              JLPT 단어 학습
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        <section aria-labelledby="learning-order-title">
          <h2 id="learning-order-title" className="text-xl font-semibold">추천 학습 순서</h2>
          <div className="mt-5 grid border-y border-border sm:grid-cols-3">
            {learningSteps.map(([number, title, description]) => (
              <div key={number} className="border-b border-border py-6 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                <p className="text-sm font-semibold text-primary">{number}</p>
                <h3 className="mt-2 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="study-menu-title">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="study-menu-title" className="text-xl font-semibold">학습 메뉴</h2>
              <p className="mt-2 text-sm text-muted-foreground">한 번에 한 영역을 골라 반복할 수 있습니다.</p>
            </div>
            <span className="text-sm text-muted-foreground">6개 과정</span>
          </div>
          <div className="mt-5 grid border-t border-border md:grid-cols-2">
            {studyLinks.map(({ href, title, description, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex min-h-32 items-start gap-4 border-b border-border py-6 transition-colors hover:bg-accent/25 md:px-5 md:odd:border-r md:odd:pl-0"
              >
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">{description}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-8" aria-labelledby="jlpt-guide-title">
          <h2 id="jlpt-guide-title" className="text-xl font-semibold">JLPT 단계별로 공부하는 방법</h2>
          <div className="mt-4 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              N5와 N4를 준비한다면 문자와 기본 어순을 먼저 익힌 뒤, 자주 쓰는 동사와 생활 단어를 문장 안에서 확인하는 편이 좋습니다.
              단어 카드에서 읽기를 익힌 다음 같은 난이도의 문장 퀴즈를 풀면 외운 표현이 실제로 어떻게 쓰이는지 연결할 수 있습니다.
            </p>
            <p>
              N3 이상에서는 단어의 뜻만 외우기보다 접속 표현, 조사, 동사 활용을 함께 살펴보세요.
              틀린 문제는 해설을 읽고 정답 문장을 소리 내어 반복하면 독해와 청해 연습을 함께 할 수 있습니다.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
