// app/data/korean-chars.ts

export type KoreanChar = {
  id: number;
  char: string;
  romanization: string;
  meaning: string;
  type: "vowel" | "consonant";
  strokes: number;
  example?: string;
};

export const KOREAN_CHARS: KoreanChar[] = [
  // 기본 자음 (14자)
  { id: 1, char: "ㄱ", romanization: "g/k", meaning: "g as in 'go' / gの音", type: "consonant", strokes: 2, example: "가 (ga)" },
  { id: 2, char: "ㄴ", romanization: "n", meaning: "n as in 'no' / nの音", type: "consonant", strokes: 2, example: "나 (na)" },
  { id: 3, char: "ㄷ", romanization: "d/t", meaning: "d as in 'do' / dの音", type: "consonant", strokes: 3, example: "다 (da)" },
  { id: 4, char: "ㄹ", romanization: "r/l", meaning: "r/l sound / rの音", type: "consonant", strokes: 5, example: "라 (ra)" },
  { id: 5, char: "ㅁ", romanization: "m", meaning: "m as in 'mom' / mの音", type: "consonant", strokes: 4, example: "마 (ma)" },
  { id: 6, char: "ㅂ", romanization: "b/p", meaning: "b as in 'big' / bの音", type: "consonant", strokes: 4, example: "바 (ba)" },
  { id: 7, char: "ㅅ", romanization: "s", meaning: "s as in 'sea' / sの音", type: "consonant", strokes: 2, example: "사 (sa)" },
  { id: 8, char: "ㅇ", romanization: "ng/silent", meaning: "silent (initial) / 無音", type: "consonant", strokes: 1, example: "아 (a)" },
  { id: 9, char: "ㅈ", romanization: "j", meaning: "j as in 'jump' / jの音", type: "consonant", strokes: 3, example: "자 (ja)" },
  { id: 10, char: "ㅊ", romanization: "ch", meaning: "ch as in 'church' / chの音", type: "consonant", strokes: 4, example: "차 (cha)" },
  { id: 11, char: "ㅋ", romanization: "k", meaning: "k as in 'key' / kの音", type: "consonant", strokes: 3, example: "카 (ka)" },
  { id: 12, char: "ㅌ", romanization: "t", meaning: "t as in 'top' / tの音", type: "consonant", strokes: 4, example: "타 (ta)" },
  { id: 13, char: "ㅍ", romanization: "p", meaning: "p as in 'pop' / pの音", type: "consonant", strokes: 4, example: "파 (pa)" },
  { id: 14, char: "ㅎ", romanization: "h", meaning: "h as in 'hot' / hの音", type: "consonant", strokes: 3, example: "하 (ha)" },

  // 기본 모음 (10자)
  { id: 15, char: "ㅏ", romanization: "a", meaning: "a as in 'father' / aの音", type: "vowel", strokes: 2, example: "아 (a)" },
  { id: 16, char: "ㅑ", romanization: "ya", meaning: "ya as in 'yard' / yaの音", type: "vowel", strokes: 3, example: "야 (ya)" },
  { id: 17, char: "ㅓ", romanization: "eo", meaning: "o as in 'box' / oの音", type: "vowel", strokes: 2, example: "어 (eo)" },
  { id: 18, char: "ㅕ", romanization: "yeo", meaning: "yo sound / yoの音", type: "vowel", strokes: 3, example: "여 (yeo)" },
  { id: 19, char: "ㅗ", romanization: "o", meaning: "o as in 'go' / oの音", type: "vowel", strokes: 2, example: "오 (o)" },
  { id: 20, char: "ㅛ", romanization: "yo", meaning: "yo as in 'yolk' / yoの音", type: "vowel", strokes: 3, example: "요 (yo)" },
  { id: 21, char: "ㅜ", romanization: "u", meaning: "u as in 'food' / uの音", type: "vowel", strokes: 2, example: "우 (u)" },
  { id: 22, char: "ㅠ", romanization: "yu", meaning: "yu sound / yuの音", type: "vowel", strokes: 3, example: "유 (yu)" },
  { id: 23, char: "ㅡ", romanization: "eu", meaning: "eu sound (like 'uh') / euの音", type: "vowel", strokes: 1, example: "으 (eu)" },
  { id: 24, char: "ㅣ", romanization: "i", meaning: "i as in 'see' / iの音", type: "vowel", strokes: 1, example: "이 (i)" },

  // 쌍자음 (5자)
  { id: 25, char: "ㄲ", romanization: "kk", meaning: "double k / 濃音k", type: "consonant", strokes: 4, example: "까 (kka)" },
  { id: 26, char: "ㄸ", romanization: "tt", meaning: "double t / 濃音t", type: "consonant", strokes: 6, example: "따 (tta)" },
  { id: 27, char: "ㅃ", romanization: "pp", meaning: "double p / 濃音p", type: "consonant", strokes: 8, example: "빠 (ppa)" },
  { id: 28, char: "ㅆ", romanization: "ss", meaning: "double s / 濃音s", type: "consonant", strokes: 4, example: "싸 (ssa)" },
  { id: 29, char: "ㅉ", romanization: "jj", meaning: "double j / 濃音j", type: "consonant", strokes: 6, example: "짜 (jja)" },

  // 복합 모음 (11자)
  { id: 30, char: "ㅐ", romanization: "ae", meaning: "ae as in 'cat' / aeの音", type: "vowel", strokes: 3, example: "애 (ae)" },
  { id: 31, char: "ㅒ", romanization: "yae", meaning: "yae sound / yaeの音", type: "vowel", strokes: 4, example: "얘 (yae)" },
  { id: 32, char: "ㅔ", romanization: "e", meaning: "e as in 'bed' / eの音", type: "vowel", strokes: 3, example: "에 (e)" },
  { id: 33, char: "ㅖ", romanization: "ye", meaning: "ye as in 'yes' / yeの音", type: "vowel", strokes: 4, example: "예 (ye)" },
  { id: 34, char: "ㅘ", romanization: "wa", meaning: "wa sound / waの音", type: "vowel", strokes: 4, example: "와 (wa)" },
  { id: 35, char: "ㅙ", romanization: "wae", meaning: "wae sound / waeの音", type: "vowel", strokes: 5, example: "왜 (wae)" },
  { id: 36, char: "ㅚ", romanization: "oe", meaning: "oe sound / oeの音", type: "vowel", strokes: 3, example: "외 (oe)" },
  { id: 37, char: "ㅝ", romanization: "wo", meaning: "wo sound / woの音", type: "vowel", strokes: 4, example: "워 (wo)" },
  { id: 38, char: "ㅞ", romanization: "we", meaning: "we sound / weの音", type: "vowel", strokes: 5, example: "웨 (we)" },
  { id: 39, char: "ㅟ", romanization: "wi", meaning: "wi sound / wiの音", type: "vowel", strokes: 3, example: "위 (wi)" },
  { id: 40, char: "ㅢ", romanization: "ui", meaning: "ui sound / uiの音", type: "vowel", strokes: 2, example: "의 (ui)" },
];