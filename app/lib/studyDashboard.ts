import { STUDY_LABELS } from "@/app/constants/studyLabels";
import { ENGLISH_WORDS } from "@/app/data/english-words";
import { HIRAGANA_CHARS } from "@/app/data/hiraganaChars";
import { KANJI_WORDS } from "@/app/data/kanji";
import { KATAKANA_CHARS } from "@/app/data/katakanaChars";
import { KOREAN_CHARS } from "@/app/data/korean-chars";
import { KOREAN_SYLLABLES } from "@/app/data/korean-syllables";
import { KOREAN_WORDS } from "@/app/data/korean-words";
import { SENTENCES } from "@/app/data/sentences";
import { SPANISH_SENTENCES } from "@/app/data/spanish-sentences";
import { SPANISH_WORDS } from "@/app/data/spanish-words";
import { VERBS } from "@/app/data/verbs";
import { WORDS } from "@/app/data/words";

export type LearningDeckData = {
  deckIds?: number[];
  favs?: Record<string, boolean> | Record<number, true>;
};

export type AnalyticsDeckSummary = {
  studySeconds?: number;
  sessions?: number;
  cardsViewed?: number;
  lastStudiedOn?: string;
};

export type AnalyticsDailyDeckSummary = {
  studySeconds?: number;
  sessions?: number;
  cardsViewed?: number;
};

export type AnalyticsDailySummary = {
  studySeconds?: number;
  sessions?: number;
  cardsViewed?: number;
  decks?: Record<string, AnalyticsDailyDeckSummary>;
};

export type UserAnalyticsPayload = {
  dailySummary?: Record<string, AnalyticsDailySummary>;
  deckStats?: Record<string, AnalyticsDeckSummary>;
  summary?: {
    totalStudySeconds?: number;
    totalSessions?: number;
    totalCardsViewed?: number;
  };
};

type FavoritePreview = {
  id: number;
  title: string;
  subtitle?: string;
};

export const DASHBOARD_DECK_ORDER = [
  "katakana-words",
  "japanese-verbs",
  "japanese-kanji",
  "sentences",
  "japanese-sentence-quiz",
  "katakana-chars",
  "hiragana-chars",
  "english-words",
  "spanish-words",
  "spanish-sentences",
  "korean-words",
  "korean-chars",
  "korean-syllables",
] as const;

export const DECK_PATHS: Record<string, string> = {
  "katakana-words": "/study/japanese/katakana-words",
  "japanese-verbs": "/study/japanese/verbs",
  "japanese-kanji": "/study/japanese/kanji",
  sentences: "/study/japanese/sentences",
  "japanese-sentence-quiz": "/study/japanese/sentence-quiz",
  "katakana-chars": "/study/japanese/katakana-chars",
  "hiragana-chars": "/study/japanese/hiragana-chars",
  "english-words": "/study/english/words",
  "spanish-words": "/study/spanish/words",
  "spanish-sentences": "/study/spanish/sentences",
  "korean-words": "/study/korean/words",
  "korean-chars": "/study/korean/chars",
  "korean-syllables": "/study/korean/syllables",
};

const DECK_COLORS: Record<string, string> = {
  "katakana-words": "#0f766e",
  "japanese-verbs": "#2563eb",
  "japanese-kanji": "#9333ea",
  sentences: "#db2777",
  "japanese-sentence-quiz": "#7c3aed",
  "katakana-chars": "#d97706",
  "hiragana-chars": "#f59e0b",
  "english-words": "#16a34a",
  "spanish-words": "#dc2626",
  "spanish-sentences": "#f97316",
  "korean-words": "#0891b2",
  "korean-chars": "#4f46e5",
  "korean-syllables": "#7c3aed",
};

function buildFavoriteLookup<T extends { id: number }>(
  cards: T[],
  getPreview: (card: T) => FavoritePreview
) {
  return new Map<number, FavoritePreview>(cards.map((card) => [card.id, getPreview(card)]));
}

const FAVORITE_LOOKUPS: Record<string, Map<number, FavoritePreview>> = {
  "katakana-words": buildFavoriteLookup(WORDS, (card) => ({
    id: card.id,
    title: card.katakana,
    subtitle: card.korean ?? card.answer,
  })),
  "japanese-verbs": buildFavoriteLookup(VERBS, (card) => ({
    id: card.id,
    title: card.kanji,
    subtitle: card.gloss ?? card.reading,
  })),
  "japanese-kanji": buildFavoriteLookup(KANJI_WORDS, (card) => ({
    id: card.id,
    title: card.kanji,
    subtitle: card.meaning,
  })),
  sentences: buildFavoriteLookup(SENTENCES, (card) => ({
    id: card.id,
    title: card.sentence,
    subtitle: card.translation,
  })),
  "katakana-chars": buildFavoriteLookup(KATAKANA_CHARS, (card) => ({
    id: card.id,
    title: card.katakana,
    subtitle: card.answer,
  })),
  "hiragana-chars": buildFavoriteLookup(HIRAGANA_CHARS, (card) => ({
    id: card.id,
    title: card.katakana,
    subtitle: card.furigana,
  })),
  "english-words": buildFavoriteLookup(ENGLISH_WORDS, (card) => ({
    id: card.id,
    title: card.word,
    subtitle: card.meaning,
  })),
  "spanish-words": buildFavoriteLookup(SPANISH_WORDS, (card) => ({
    id: card.id,
    title: card.word,
    subtitle: card.meaning,
  })),
  "spanish-sentences": buildFavoriteLookup(SPANISH_SENTENCES, (card) => ({
    id: card.id,
    title: card.sentence,
    subtitle: card.translation,
  })),
  "korean-words": buildFavoriteLookup(KOREAN_WORDS, (card) => ({
    id: card.id,
    title: card.word,
    subtitle: card.meaning,
  })),
  "korean-chars": buildFavoriteLookup(KOREAN_CHARS, (card) => ({
    id: card.id,
    title: card.char,
    subtitle: card.meaning,
  })),
  "korean-syllables": buildFavoriteLookup(KOREAN_SYLLABLES, (card) => ({
    id: card.id,
    title: card.char,
    subtitle: card.meaning,
  })),
};

export function getDeckLabel(deckType: string) {
  return STUDY_LABELS[deckType] ?? deckType;
}

export function getDeckPath(deckType: string) {
  return DECK_PATHS[deckType] ?? "/study/dashboard";
}

export function getDeckColor(deckType: string) {
  return DECK_COLORS[deckType] ?? "#64748b";
}

export function getFavoriteIds(deckData?: LearningDeckData) {
  if (!deckData?.favs) return [];

  return Object.entries(deckData.favs)
    .filter(([, isFav]) => Boolean(isFav))
    .map(([id]) => Number(id))
    .filter((id) => Number.isInteger(id))
    .sort((a, b) => a - b);
}

export function getFavoritePreview(deckType: string, id: number) {
  const lookup = FAVORITE_LOOKUPS[deckType];
  const match = lookup?.get(id);

  if (match) {
    return match;
  }

  return {
    id,
    title: `카드 #${id}`,
    subtitle: "원격 데이터 또는 숨겨진 카드",
  };
}

export function formatStudyMinutes(studySeconds: number) {
  if (studySeconds <= 0) return "0분";

  const hours = Math.floor(studySeconds / 3600);
  const minutes = Math.round((studySeconds % 3600) / 60);

  if (hours <= 0) {
    return `${Math.max(1, minutes)}분`;
  }

  if (minutes <= 0) {
    return `${hours}시간`;
  }

  return `${hours}시간 ${minutes}분`;
}
