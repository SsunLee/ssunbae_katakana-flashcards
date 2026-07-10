// app/components/LoginPromptCard.tsx
"use client";

import React from "react";
import { Button } from "@/app/components/ui/button";
import { useLocale } from "@/app/context/LocaleContext";

type LoginPromptCardProps = {
  onLoginClick: () => void;
  className?: string;
  title?: string;
  features?: string[];
  ctaLabel?: string;
};

export function LoginPromptCard({
  onLoginClick,
  className = "",
  title,
  features,
  ctaLabel,
}: LoginPromptCardProps) {
  const { t } = useLocale();
  const resolvedFeatures = features ?? [
    t("nudge.featureCloud"),
    t("nudge.featureSync"),
    t("nudge.featureJlpt"),
    t("nudge.featureGrid"),
  ];

  return (
    <section className={`w-full max-w-md mx-auto p-4 mb-6 bg-card/50 border border-border rounded-lg text-sm ${className}`}>
      <p className="font-semibold text-foreground">{title ?? t("nudge.defaultTitle")}</p>
      <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
        {resolvedFeatures.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <Button
        size="sm"
        onClick={onLoginClick}
        className="w-full mt-4" // variant="default" 가 기본 primary 색상을 적용합니다.
      >
        <span className="font-bold">{ctaLabel ?? t("nudge.cta")}</span>
      </Button>
    </section>
  );
}
