import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, RefreshCw, SearchCheck } from "lucide-react";

import { HomeNavigation } from "@/app/components/HomeNavigation";

export const metadata: Metadata = {
  title: "사이트 소개",
  description: "SSUN EDU의 언어 학습 콘텐츠 구성 방식, 검토 기준, 업데이트와 오류 제보 방법을 안내합니다.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "짧게 반복할 수 있는 구성",
    description: "한 화면에서 단어 또는 문장 하나에 집중하고, 뜻과 발음, 예문, 해설을 같은 학습 흐름 안에서 다시 확인할 수 있게 구성합니다.",
    icon: BookOpenCheck,
  },
  {
    title: "문맥을 포함한 문제",
    description: "단순 번역만 제시하지 않고 선택지의 차이, 조사와 시제, 동사 활용처럼 정답을 판단하는 데 필요한 문맥과 설명을 함께 제공합니다.",
    icon: SearchCheck,
  },
  {
    title: "오류 제보를 반영한 업데이트",
    description: "표현이 어색하거나 뜻과 발음이 맞지 않는 항목은 제보 내용을 확인한 뒤 웹 콘텐츠와 앱 업데이트에 순서대로 반영합니다.",
    icon: RefreshCw,
  },
];

export default function AboutPage() {
  return (
    <>
      <HomeNavigation />
      <main className="bg-background text-foreground">
        <header className="border-b border-border bg-card/45">
          <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
            <p className="text-sm font-semibold text-primary">ABOUT SSUN EDU</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">혼자 공부할 때 다시 펼쳐 보기 쉬운 학습 도구</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              SSUN EDU는 일본어, 영어, 스페인어, 한국어를 카드와 문장 퀴즈로 반복하는 무료 학습 서비스입니다.
              긴 강의를 대신하기보다 모르는 표현을 짧게 확인하고, 듣고, 다시 풀어 보는 과정에 집중합니다.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
          <section aria-labelledby="content-principles-title">
            <h2 id="content-principles-title" className="text-xl font-semibold sm:text-2xl">콘텐츠 구성 원칙</h2>
            <div className="mt-6 border-y border-border">
              {principles.map(({ title, description, icon: Icon }) => (
                <article key={title} className="grid gap-4 border-b border-border py-6 last:border-b-0 sm:grid-cols-[48px_1fr]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/25 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 border-t border-border pt-8" aria-labelledby="review-title">
            <h2 id="review-title" className="text-xl font-semibold">문제와 해설을 만드는 과정</h2>
            <div className="mt-4 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                학습 항목은 SSUN EDU에서 직접 구성하고, 문장과 선택지의 정답 관계, 한국어 번역의 자연스러움,
                발음 표기와 해설이 서로 맞는지 확인합니다. 같은 문형이 반복되더라도 상황과 어휘가 지나치게 겹치지 않도록 조정합니다.
              </p>
              <p>
                음성 듣기는 기기와 브라우저가 제공하는 음성 합성 기능을 사용하므로 운영체제에 따라 목소리와 억양이 달라질 수 있습니다.
                JLPT 단계 표시는 학습 범위를 구분하기 위한 참고 기준이며, SSUN EDU는 JLPT 주관기관의 공식 서비스나 제휴 서비스가 아닙니다.
              </p>
            </div>
          </section>

          <section className="mt-12 border-t border-border pt-8" aria-labelledby="feedback-title">
            <h2 id="feedback-title" className="text-xl font-semibold">오류 제보와 문의</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              문제 번호와 잘못된 문구, 기대한 표현을 함께 보내 주시면 확인하기 쉽습니다.
              개인정보와 계정 삭제, 서비스 이용 문의도 고객지원 페이지에서 접수할 수 있습니다.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/support" className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                고객지원 열기
              </Link>
              <Link href="/study/japanese/sentence-quiz" className="rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/50 hover:bg-accent/40">
                JLPT 문제 풀기
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
