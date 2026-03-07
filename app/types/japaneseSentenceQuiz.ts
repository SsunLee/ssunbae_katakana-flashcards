export type JapaneseSentenceQuizReadingPart =
  | string
  | {
      text: string;
      furigana: string;
    };

export type JapaneseSentenceQuizChoice = {
  text: string;
  furigana?: string;
};

export type JapaneseSentenceQuiz = {
  id: number;
  jlpt: "N5" | "N4" | "N3" | "N2" | "N1";
  prompt: string;
  answer: string;
  translation: string;
  promptReading?: JapaneseSentenceQuizReadingPart[];
  choices: JapaneseSentenceQuizChoice[];
  explanation: string[];
};
