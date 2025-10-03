"use client";

import React, { useMemo } from "react";
import type { Verb, VerbFormKey } from "@/app/data/verbs";
import { Button } from "@/app/components/ui/button";

type Props = {
  verb: Verb;
  expanded: boolean;
  onToggleExpand: () => void;
  /** 설정 다이얼로그에서 내려오는 폰트 크기 적용(표용 본문 크기) */
  contentFontSize?: number; // px
};

const COLLAPSED_FORMS: VerbFormKey[] = ["dictionary", "past", "negative", "te"];
const HEADERS: Record<VerbFormKey, string> = {
  dictionary:"기본형", polite:"정중형", negative:"부정형", past:"과거형", pastNegative:"과거부정",
  te:"て형", nai:"ない형", jisho:"사전형", potential:"가능형", passive:"수동형",
  causative:"사역형", causativePassive:"사역수동형", volitional:"의지형",
  conditional:"조건형(ば)", provisional:"가정형(たら)", imperative:"명령형", prohibitive:"금지형",
};

export default function VerbFormsTable({
  verb,
  expanded,
  onToggleExpand,
  contentFontSize = 12,
}: Props) {
  const tableForms = useMemo<VerbFormKey[]>(() => {
    return expanded ? (Object.keys(verb.forms) as VerbFormKey[]) : COLLAPSED_FORMS;
  }, [expanded, verb.forms]);

  const size = Math.max(12, Math.round(contentFontSize));

  return (
    <section className="w-full max-w-2xl md:max-w-3xl mx-auto mt-4">
      <div className="bg-card/95 border border-border rounded-2xl shadow p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-muted-foreground" style={{ fontSize: size - 1 }}>
            {expanded ? "모든 형태 보기" : "요약 보기 (기본형 / 과거형 / 부정형 / て형)"}
          </span>
          <Button size="sm" variant="secondary" onClick={onToggleExpand}>
            {expanded ? "접기" : "펼치기"}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full" style={{ fontSize: size }}>
            <thead style={{ fontSize: size }}>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 w-[120px]">형태</th>
                <th className="px-4 py-3">일본어</th>
                <th className="px-4 py-3 w-[220px]">한국어 의미</th>
              </tr>
            </thead>
            <tbody>
              {tableForms.map((k) => {
                const row = (verb.forms as any)[k] ?? { jp: "—", ko: "—" };
                return (
                  <tr key={k} className="border-t">
                    <td className="px-4 py-2 font-medium whitespace-nowrap">{HEADERS[k]}</td>
                    <td className="px-4 py-2"><span className="whitespace-pre-wrap break-words">{row.jp}</span></td>
                    <td className="px-4 py-2 text-muted-foreground"><span className="whitespace-pre-wrap break-words">{row.ko}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-1 pt-3 text-xs text-muted-foreground">
          좁은 화면에서는 가로 스크롤로 표를 확인하세요.
        </div>
      </div>
    </section>
  );
}
