// app/components/WelcomeBanner.tsx
"use client";

import React, { useEffect, useState } from "react";
import { generateRandomNickname } from "@/app/utils/nickname";

type WelcomeBannerProps = {
  /** 로그인 사용자 닉네임. 없으면 게스트 닉네임을 자동 생성/복원 */
  name?: string;
  /** 문장 자동 구성용 과목/페이지 라벨 (예: "가타카나 단어") */
  subject?: string;
  /** 직접 문구를 주면 subject 기반 자동 문구 대신 이 값 사용 */
  subtitle?: string;
  className?: string;

  /** 게스트 닉네임을 localStorage에 저장/복원할지 */
  persistGuest?: boolean;      // default: true
  /** 저장 키 커스터마이즈 */
  storageKey?: string;        // default: "ssunbae-guest-name"
};

export function WelcomeBanner({
  name,
  subject,
  subtitle,
  className = "",
  persistGuest = true,
  storageKey = "ssunbae-guest-name",
}: WelcomeBannerProps) {
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    if (name && name.trim()) {
      setGuestName("");
      return;
    }
    try {
      if (persistGuest) {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          setGuestName(saved);
        } else {
          const gn = generateRandomNickname();
          setGuestName(gn);
          localStorage.setItem(storageKey, gn);
        }
      } else {
        setGuestName(generateRandomNickname());
      }
    } catch {
      setGuestName(generateRandomNickname());
    }
  }, [name, persistGuest, storageKey]);

  const displayName = (name && name.trim()) || guestName || "게스트";
  const finalSubtitle =
    subtitle ??
    (subject
      ? `아래 카드를 클릭하여 ${subject} 학습을 시작하세요.`
      : "아래 카드를 클릭하여 학습을 시작하세요.");

  return (
    <header className={`w-full max-w-md mx-auto mb-6 ${className}`}>
      <div className="text-sm text-muted-foreground bg-card/50 border border-border rounded-lg p-4 text-center">
        <p>
          <strong className="font-semibold text-foreground">{displayName}</strong>님, 환영합니다!
          <br />
          {finalSubtitle}
        </p>
      </div>
    </header>
  );
}
