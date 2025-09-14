// app/components/WelcomeBanner.tsx
"use client";

import React from "react";

type WelcomeBannerProps = {
  name: string;               // 닉네임(게스트 포함)
  className?: string;
  subtitle?: string;          // 필요 시 문구 커스터마이즈
};

export function WelcomeBanner({
  name,
  className = "",
  subtitle = "아래 카드를 클릭하여 학습을 시작하세요.",
}: WelcomeBannerProps) {
  return (
    <header className={`w-full max-w-md mx-auto mb-6 ${className}`}>
      <div className="text-sm text-white/80 bg-slate-800/50 border border-white/10 rounded-lg p-4 text-center">
        <p>
          <strong>{name}</strong>님, 환영합니다!
          <br />
          {subtitle}
        </p>
      </div>
    </header>
  );
}
