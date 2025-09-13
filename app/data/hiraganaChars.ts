import type { Word } from "@/app/data/words";
import { KATAKANA_CHARS } from "@/app/data/katakanaChars";

// カタカナ → ひらがな
const kataToHira = (s: string) =>
  s.replace(/[\u30A1-\u30F6]/g, ch =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );

export const HIRAGANA_CHARS: (Word & { type: string })[] = KATAKANA_CHARS.map(c => ({
  ...c,
  id: (c.id as number) + 10000,       // 숫자 유지(충돌 방지)
  katakana: kataToHira(c.katakana),   // ★ 앞면: 히라가나 (例: ア → あ)
  furigana: c.furigana,               // ★ 뒷면: 대응 카타카나 (例: あ の裏に ア)
  answer: kataToHira(c.answer),         // 例: ウイスキー → うぃすきー
}));
