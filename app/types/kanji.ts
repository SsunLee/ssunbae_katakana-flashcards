// app/types/kanji.ts

export interface Kanji {
  id: number;
  kanji: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  jlpt: number;
  exampleSentence: string;
  exampleRomaji: string;
  exampleTranslation: string;
}
