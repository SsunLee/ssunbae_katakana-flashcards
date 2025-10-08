// app/types/verbs.ts

export type VerbFormKey =
  | "dictionary" | "polite" | "negative" | "past" | "pastNegative"
  | "te" | "nai" | "jisho" | "potential" | "passive"
  | "causative" | "causativePassive" | "volitional"
  | "conditional" | "provisional" | "imperative" | "prohibitive";

export type VerbForm = { jp: string; ko: string };

export type Verb = {
  id: number;
  kanji: string;
  reading?: string;
  gloss?: string;
  group: "五段" | "一段" | "不規則";
  forms: Record<VerbFormKey, VerbForm>;
};