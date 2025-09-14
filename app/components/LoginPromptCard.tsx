// app/components/LoginPromptCard.tsx
"use client";

import React from "react";
import { Button } from "@/app/components/ui/button";

type LoginPromptCardProps = {
  onLoginClick: () => void;       // 로그인/회원가입 모달 열기
  className?: string;
  title?: string;
  features?: string[];            // 표시할 기능 목록 (원하면 교체)
  ctaLabel?: string;
};

const DEFAULT_FEATURES = [
  "나만의 단어장 클라우드 저장",
  "즐겨찾기 목록 동기화",
  "여러 장 모아보기 & 단어 생성 기능",
  "OpenAI를 이용한 AI 단어 가져오기",
];

export function LoginPromptCard({
  onLoginClick,
  className = "",
  title = "로그인하고 더 많은 기능을 이용해보세요! (무료)",
  features = DEFAULT_FEATURES,
  ctaLabel = "로그인 / 회원가입",
}: LoginPromptCardProps) {
  return (
    <section className={`w-full max-w-md mx-auto p-4 mb-6 bg-slate-800/50 border border-white/10 rounded-lg text-sm ${className}`}>
      <p className="font-semibold text-white">{title}</p>
      <ul className="list-disc list-inside text-white/80 mt-2 space-y-1">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <Button
        size="sm"
        onClick={onLoginClick}
        className="w-full text-white mt-4 bg-blue-600 hover:bg-blue-500"
      >
        <span className="font-bold">{ctaLabel}</span>
      </Button>
    </section>
  );
}
