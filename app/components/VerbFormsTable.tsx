// app/components/VerbFormsTable.tsx
"use client";

import React, { useMemo } from "react";
import type { Verb, VerbForm, VerbFormKey } from "@/app/types/verbs";
import { Button } from "@/app/components/ui/button";

type Props = {
  verb: Verb;
  expanded: boolean;
  onToggleExpand: () => void;
  onSpeakExample?: (text: string) => void;
  canSpeak?: boolean;
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
  onSpeakExample,
  canSpeak = false,
  contentFontSize = 12,
}: Props) {
  const tableForms = useMemo<VerbFormKey[]>(() => {
    return expanded ? (Object.keys(verb.forms) as VerbFormKey[]) : COLLAPSED_FORMS;
  }, [expanded, verb.forms]);

  const size = Math.max(12, Math.round(contentFontSize));
  const exampleSize = Math.max(10, size - 2);
  const readingSize = Math.max(9, exampleSize - 1);

  const getRow = (key: VerbFormKey): VerbForm => {
    const row = (verb.forms as Partial<Record<VerbFormKey, VerbForm>>)[key];
    if (!row) return { jp: "—", ko: "—" };
    return row;
  };

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

        {/* 데스크탑 뷰: 테이블 (sm 스크린 이상) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full" style={{ fontSize: size }}>
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 w-[120px]">형태</th>
                <th className="px-4 py-3">일본어</th>
                <th className="px-4 py-3 w-[220px]">한국어 의미</th>
              </tr>
            </thead>
            <tbody>
              {tableForms.map((k) => {
                const row = getRow(k);
                const examples = Array.isArray(row.examples) ? row.examples : [];
                return (
                  <React.Fragment key={k}>
                    <tr className="border-t border-border">
                      <td className="px-4 py-2 font-medium whitespace-nowrap">{HEADERS[k]}</td>
                      <td className="px-4 py-2">
                        <span className="whitespace-pre-wrap break-words">{row.jp}</span>
                      </td>
                      <td className="px-4 py-2 text-muted-foreground">
                        <span className="whitespace-pre-wrap break-words">{row.ko}</span>
                      </td>
                    </tr>
                    {examples.length > 0 && (
                      <tr className="border-t border-border/60 bg-muted/20">
                        <td className="px-4 py-2 align-top text-muted-foreground" style={{ fontSize: exampleSize }}>
                          예문
                        </td>
                        <td className="px-4 py-2" colSpan={2}>
                          <ul className="space-y-2">
                            {examples.map((ex, idx) => (
                              <li key={`${k}-ex-${idx}`} className="rounded-md border border-border/60 px-2 py-1.5 text-left">
                                <div className="flex items-start gap-2">
                                  <p className="leading-snug text-foreground flex-1" style={{ fontSize: exampleSize }}>
                                    {ex.jp}
                                  </p>
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    className="h-6 px-2 text-[11px] shrink-0"
                                    onClick={() => onSpeakExample?.(ex.jp)}
                                    disabled={!canSpeak || !onSpeakExample}
                                  >
                                    🔊 듣기
                                  </Button>
                                </div>
                                {ex.hiragana && (
                                  <p className="mt-0.5 leading-snug text-muted-foreground" style={{ fontSize: readingSize }}>
                                    {ex.hiragana}
                                  </p>
                                )}
                                <p className="mt-0.5 leading-snug text-muted-foreground" style={{ fontSize: exampleSize }}>
                                  {ex.ko}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 모바일 뷰: 리스트 (sm 스크린 미만) */}
        <div className="block sm:hidden">
            <ul className="divide-y divide-border">
                {tableForms.map((k) => {
                    const row = getRow(k);
                    const examples = Array.isArray(row.examples) ? row.examples : [];
                    return(
                        <li key={k} className="py-3 px-1">
                            <div className="flex justify-between items-start space-x-4">
                                <span className="font-medium text-foreground/90 w-[70px] flex-shrink-0" style={{fontSize: size}}>
                                    {HEADERS[k]}
                                </span>
                                <div className="flex-grow text-right">
                                    <p className="text-foreground break-words leading-snug" style={{fontSize: size}}>
                                        {row.jp}
                                    </p>
                                    <p className="text-muted-foreground break-words mt-1 leading-snug" style={{fontSize: size-1}}>
                                        {row.ko}
                                    </p>
                                </div>
                            </div>
                            {examples.length > 0 && (
                              <ul className="mt-2 space-y-2">
                                {examples.map((ex, idx) => (
                                  <li key={`${k}-m-ex-${idx}`} className="rounded-md border border-border/60 px-2 py-1.5 bg-muted/20 text-left">
                                    <div className="flex items-start gap-2">
                                      <p className="text-foreground leading-snug break-words flex-1" style={{ fontSize: exampleSize }}>
                                        {ex.jp}
                                      </p>
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        className="h-6 px-2 text-[11px] shrink-0"
                                        onClick={() => onSpeakExample?.(ex.jp)}
                                        disabled={!canSpeak || !onSpeakExample}
                                      >
                                        🔊 듣기
                                      </Button>
                                    </div>
                                    {ex.hiragana && (
                                      <p className="text-muted-foreground mt-0.5 leading-snug break-words" style={{ fontSize: readingSize }}>
                                        {ex.hiragana}
                                      </p>
                                    )}
                                    <p className="text-muted-foreground mt-0.5 leading-snug break-words" style={{ fontSize: exampleSize }}>
                                      {ex.ko}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            )}
                        </li>
                    )
                })}
            </ul>
        </div>
        
        <div className="px-1 pt-3 text-xs text-muted-foreground hidden sm:block">
          좁은 화면에서는 가로 스크롤로 표를 확인하세요.
        </div>
      </div>
    </section>
  );
}
