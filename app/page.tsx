// app/page.tsx
import type { Metadata } from "next";
import HomePageContent from "@/app/components/HomePageContent";

export const metadata: Metadata = {
  title: "무료 일본어 공부·JLPT 문제 풀이 | SSUN EDU",
  description:
    "SSUN EDU에서 히라가나, 가타카나, JLPT 단어, 일본어 문장 빈칸 퀴즈와 영어·스페인어·한국어 단어 카드를 무료로 반복 학습하세요.",
  keywords: [
    "무료 일본어 공부",
    "일본어 공부 사이트",
    "JLPT 문제 풀이",
    "JLPT 단어 공부",
    "일본어 문장 퀴즈",
    "히라가나 공부",
    "가타카나 공부",
    "무료 언어 학습",
    "SSUN EDU",
    "쑨에듀",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "무료 일본어 공부·JLPT 문제 풀이 | SSUN EDU",
    description:
      "히라가나, 가타카나, JLPT 단어, 일본어 문장 퀴즈부터 영어·스페인어·한국어까지 카드로 반복 학습하세요.",
    url: "/",
  },
};

export default function Root() {
  return <HomePageContent />;
}

