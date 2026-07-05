// app/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SSUN EDU - 무료 언어 학습 플랫폼",
  description:
    "SSUN EDU에서 일본어, 영어, 스페인어, 한국어를 카드와 문장 퀴즈로 짧게 반복해 보세요. 혼자 공부하는 흐름에 맞춘 무료 언어 학습 사이트입니다.",
  alternates: {
    canonical: "/",
  },
};

const learningSections = [
  {
    title: "일본어 학습",
    label: "Kana, JLPT, Kanji",
    description: "문자부터 문장까지",
    href: "/study/japanese",
  },
  {
    title: "영어 단어",
    label: "Words, Examples",
    description: "예문으로 반복",
    href: "/study/english/words",
  },
  {
    title: "스페인어 학습",
    label: "Basic Spanish",
    description: "발음과 뜻을 함께",
    href: "/study/spanish/words",
  },
  {
    title: "한국어 학습",
    label: "Hangul, Words",
    description: "자모부터 단어까지",
    href: "/study/korean/words",
  },
];

export default function Root() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative isolate min-h-[760px] overflow-hidden px-5 pb-24 pt-20 sm:min-h-[680px] sm:px-8 sm:py-14 lg:px-12">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-[position:58%_center] sm:bg-center"
          style={{ backgroundImage: "url('/home-hero-study-desk.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.9)_33%,rgba(10,10,10,0.58)_60%,rgba(10,10,10,0.22)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="mx-auto flex min-h-[640px] max-w-6xl flex-col justify-between gap-12 sm:min-h-[580px] sm:gap-8">
          <div className="max-w-[21rem] sm:max-w-2xl sm:pt-16">
            <p className="text-sm font-semibold text-primary">무료 언어 학습 사이트</p>
            <h1 className="mt-4 text-5xl font-bold tracking-normal text-white sm:text-7xl">
              SSUN EDU
            </h1>
            <p className="mt-6 max-w-[21rem] text-base leading-8 text-zinc-200 sm:max-w-xl sm:text-lg">
              일본어, 영어, 스페인어, 한국어를 짧은 카드와 문장 퀴즈로 반복합니다.
              혼자 공부할 때도 보고, 듣고, 다시 풀어볼 수 있게 구성했습니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/study/japanese/katakana-words"
                className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_34px_rgba(59,130,246,0.38)] transition-transform hover:-translate-y-0.5"
              >
                JLPT 단어 시작
              </Link>
              <Link
                href="/study/japanese/sentence-quiz"
                className="rounded-md border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                JLPT 문장 퀴즈
              </Link>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 backdrop-blur-md sm:grid-cols-4">
            {learningSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group bg-black/38 p-5 transition-colors hover:bg-primary/20 sm:p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-normal text-primary">
                  {section.label}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-white">{section.title}</h2>
                <p className="mt-2 text-sm text-zinc-300">{section.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div>
          <p className="text-sm font-semibold text-primary">Study Flow</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">짧게 풀고, 바로 복습합니다.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {["정답 확인", "발음 듣기", "복습 기록"].map((item, index) => (
            <div key={item} className="border-l border-border pl-5">
              <p className="text-sm font-semibold text-primary">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                로그인하지 않아도 기본 문제를 풀 수 있고, 로그인하면 이어서 복습할 수 있습니다.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
        <div className="border-t border-border pt-8">
          <div className="max-w-3xl text-sm leading-7 text-muted-foreground">
            <h2 className="text-xl font-semibold text-foreground">학습 방식</h2>
            <p className="mt-4">
              일본어는 히라가나와 가타카나에서 시작해 단어, 문장, 동사 활용, 한자 쓰기로
              이어집니다. 영어와 스페인어, 한국어도 같은 카드 흐름을 따르기 때문에 처음 온
              사용자도 메뉴를 헤매지 않고 바로 반복 학습을 시작할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}


