export type SentenceQuizLevel = "초급" | "중급" | "고급";

export interface SentenceQuizItem {
  id: number;
  level: SentenceQuizLevel;
  prompt: string;
  answer: string;
  translation: string;
  choices: string[];
  explanation: string[];
}

