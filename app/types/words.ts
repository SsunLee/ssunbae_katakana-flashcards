

export type Word = {
  id: number;
  katakana: string;
  furigana: string;
  answer: string;
  emoji: string;
  korean?: string;
  jlpt?: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
};
