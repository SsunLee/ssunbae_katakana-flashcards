// app/page.tsx
import type { Metadata } from "next";
import HomePageContent from "@/app/components/HomePageContent";

export const metadata: Metadata = {
  title: "SSUN EDU - 무료 언어 학습 플랫폼",
  description:
    "SSUN EDU에서 일본어, 영어, 스페인어, 한국어를 카드와 문장 퀴즈로 짧게 반복해 보세요. 혼자 공부하는 흐름에 맞춘 무료 언어 학습 사이트입니다.",
  alternates: {
    canonical: "/",
  },
};

export default function Root() {
  return <HomePageContent />;
}

