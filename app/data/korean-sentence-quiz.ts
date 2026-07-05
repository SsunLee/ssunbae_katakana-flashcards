import type { SentenceQuizItem } from "@/app/data/sentence-quiz-types";

export type KoreanSentenceQuiz = SentenceQuizItem;

export const KOREAN_SENTENCE_QUIZ: KoreanSentenceQuiz[] = [
  {
    "id": 1,
    "level": "초급",
    "prompt": "저는 한국어를 _____.",
    "answer": "공부해요",
    "translation": "I study Korean.",
    "choices": [
      "공부해요",
      "먹어요",
      "일해요",
      "살아요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"공부해요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 2,
    "level": "초급",
    "prompt": "어제 저는 한국어를 _____.",
    "answer": "공부했어요",
    "translation": "I study Korean yesterday.",
    "choices": [
      "먹었어요",
      "공부했어요",
      "일했어요",
      "살았어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"공부했어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 3,
    "level": "초급",
    "prompt": "내일 저는 한국어를 _____.",
    "answer": "공부할 거예요",
    "translation": "I study Korean tomorrow.",
    "choices": [
      "먹을 거예요",
      "일할 거예요",
      "공부할 거예요",
      "살 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"공부할 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 4,
    "level": "초급",
    "prompt": "지금 저는 한국어를 _____ 있어요.",
    "answer": "공부하고",
    "translation": "I study Korean now.",
    "choices": [
      "먹고",
      "일하고",
      "살고",
      "공부하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"공부하고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 5,
    "level": "초급",
    "prompt": "저는 한국어를 _____ 않아요.",
    "answer": "공부하지",
    "translation": "Negative: I study Korean.",
    "choices": [
      "공부하지",
      "먹지",
      "일하지",
      "살지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"공부하지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 6,
    "level": "초급",
    "prompt": "동생은 빵을 _____.",
    "answer": "먹어요",
    "translation": "My younger sibling eats bread.",
    "choices": [
      "공부해요",
      "먹어요",
      "일해요",
      "살아요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"먹어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 7,
    "level": "초급",
    "prompt": "어제 동생은 빵을 _____.",
    "answer": "먹었어요",
    "translation": "My younger sibling eats bread yesterday.",
    "choices": [
      "공부했어요",
      "일했어요",
      "먹었어요",
      "살았어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"먹었어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 8,
    "level": "초급",
    "prompt": "내일 동생은 빵을 _____.",
    "answer": "먹을 거예요",
    "translation": "My younger sibling eats bread tomorrow.",
    "choices": [
      "공부할 거예요",
      "일할 거예요",
      "살 거예요",
      "먹을 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"먹을 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 9,
    "level": "초급",
    "prompt": "지금 동생은 빵을 _____ 있어요.",
    "answer": "먹고",
    "translation": "My younger sibling eats bread now.",
    "choices": [
      "먹고",
      "공부하고",
      "일하고",
      "살고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"먹고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 10,
    "level": "초급",
    "prompt": "동생은 빵을 _____ 않아요.",
    "answer": "먹지",
    "translation": "Negative: My younger sibling eats bread.",
    "choices": [
      "공부하지",
      "먹지",
      "일하지",
      "살지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"먹지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 11,
    "level": "초급",
    "prompt": "그녀는 사무실에서 _____.",
    "answer": "일해요",
    "translation": "She works at the office.",
    "choices": [
      "공부해요",
      "먹어요",
      "일해요",
      "살아요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"일해요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 12,
    "level": "초급",
    "prompt": "어제 그녀는 사무실에서 _____.",
    "answer": "일했어요",
    "translation": "She works at the office yesterday.",
    "choices": [
      "공부했어요",
      "먹었어요",
      "살았어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"일했어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 13,
    "level": "초급",
    "prompt": "내일 그녀는 사무실에서 _____.",
    "answer": "일할 거예요",
    "translation": "She works at the office tomorrow.",
    "choices": [
      "일할 거예요",
      "공부할 거예요",
      "먹을 거예요",
      "살 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"일할 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 14,
    "level": "초급",
    "prompt": "지금 그녀는 사무실에서 _____ 있어요.",
    "answer": "일하고",
    "translation": "She works at the office now.",
    "choices": [
      "공부하고",
      "일하고",
      "먹고",
      "살고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"일하고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 15,
    "level": "초급",
    "prompt": "그녀는 사무실에서 _____ 않아요.",
    "answer": "일하지",
    "translation": "Negative: She works at the office.",
    "choices": [
      "공부하지",
      "먹지",
      "일하지",
      "살지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"일하지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 16,
    "level": "초급",
    "prompt": "우리는 서울에 _____.",
    "answer": "살아요",
    "translation": "We live in Seoul.",
    "choices": [
      "공부해요",
      "먹어요",
      "일해요",
      "살아요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살아요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 17,
    "level": "초급",
    "prompt": "어제 우리는 서울에 _____.",
    "answer": "살았어요",
    "translation": "We live in Seoul yesterday.",
    "choices": [
      "살았어요",
      "공부했어요",
      "먹었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살았어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 18,
    "level": "초급",
    "prompt": "내일 우리는 서울에 _____.",
    "answer": "살 거예요",
    "translation": "We live in Seoul tomorrow.",
    "choices": [
      "공부할 거예요",
      "살 거예요",
      "먹을 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 19,
    "level": "초급",
    "prompt": "지금 우리는 서울에 _____ 있어요.",
    "answer": "살고",
    "translation": "We live in Seoul now.",
    "choices": [
      "공부하고",
      "먹고",
      "살고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 20,
    "level": "초급",
    "prompt": "우리는 서울에 _____ 않아요.",
    "answer": "살지",
    "translation": "Negative: We live in Seoul.",
    "choices": [
      "공부하지",
      "먹지",
      "일하지",
      "살지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 21,
    "level": "초급",
    "prompt": "그들은 박물관을 _____.",
    "answer": "방문해요",
    "translation": "They visit the museum.",
    "choices": [
      "방문해요",
      "공부해요",
      "먹어요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"방문해요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 22,
    "level": "초급",
    "prompt": "어제 그들은 박물관을 _____.",
    "answer": "방문했어요",
    "translation": "They visit the museum yesterday.",
    "choices": [
      "공부했어요",
      "방문했어요",
      "먹었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"방문했어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 23,
    "level": "초급",
    "prompt": "내일 그들은 박물관을 _____.",
    "answer": "방문할 거예요",
    "translation": "They visit the museum tomorrow.",
    "choices": [
      "공부할 거예요",
      "먹을 거예요",
      "방문할 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"방문할 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 24,
    "level": "초급",
    "prompt": "지금 그들은 박물관을 _____ 있어요.",
    "answer": "방문하고",
    "translation": "They visit the museum now.",
    "choices": [
      "공부하고",
      "먹고",
      "일하고",
      "방문하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"방문하고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 25,
    "level": "초급",
    "prompt": "그들은 박물관을 _____ 않아요.",
    "answer": "방문하지",
    "translation": "Negative: They visit the museum.",
    "choices": [
      "방문하지",
      "공부하지",
      "먹지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"방문하지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 26,
    "level": "초급",
    "prompt": "제 동생은 책을 _____.",
    "answer": "읽어요",
    "translation": "My sibling reads a book.",
    "choices": [
      "공부해요",
      "읽어요",
      "먹어요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"읽어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 27,
    "level": "초급",
    "prompt": "어제 제 동생은 책을 _____.",
    "answer": "읽었어요",
    "translation": "My sibling reads a book yesterday.",
    "choices": [
      "공부했어요",
      "먹었어요",
      "읽었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"읽었어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 28,
    "level": "초급",
    "prompt": "내일 제 동생은 책을 _____.",
    "answer": "읽을 거예요",
    "translation": "My sibling reads a book tomorrow.",
    "choices": [
      "공부할 거예요",
      "먹을 거예요",
      "일할 거예요",
      "읽을 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"읽을 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 29,
    "level": "초급",
    "prompt": "지금 제 동생은 책을 _____ 있어요.",
    "answer": "읽고",
    "translation": "My sibling reads a book now.",
    "choices": [
      "읽고",
      "공부하고",
      "먹고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"읽고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 30,
    "level": "초급",
    "prompt": "제 동생은 책을 _____ 않아요.",
    "answer": "읽지",
    "translation": "Negative: My sibling reads a book.",
    "choices": [
      "공부하지",
      "읽지",
      "먹지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"읽지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 31,
    "level": "초급",
    "prompt": "선생님은 문법을 _____.",
    "answer": "설명해요",
    "translation": "The teacher explains grammar.",
    "choices": [
      "공부해요",
      "먹어요",
      "설명해요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"설명해요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 32,
    "level": "초급",
    "prompt": "어제 선생님은 문법을 _____.",
    "answer": "설명했어요",
    "translation": "The teacher explains grammar yesterday.",
    "choices": [
      "공부했어요",
      "먹었어요",
      "일했어요",
      "설명했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"설명했어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 33,
    "level": "초급",
    "prompt": "내일 선생님은 문법을 _____.",
    "answer": "설명할 거예요",
    "translation": "The teacher explains grammar tomorrow.",
    "choices": [
      "설명할 거예요",
      "공부할 거예요",
      "먹을 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"설명할 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 34,
    "level": "초급",
    "prompt": "지금 선생님은 문법을 _____ 있어요.",
    "answer": "설명하고",
    "translation": "The teacher explains grammar now.",
    "choices": [
      "공부하고",
      "설명하고",
      "먹고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"설명하고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 35,
    "level": "초급",
    "prompt": "선생님은 문법을 _____ 않아요.",
    "answer": "설명하지",
    "translation": "Negative: The teacher explains grammar.",
    "choices": [
      "공부하지",
      "먹지",
      "설명하지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"설명하지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 36,
    "level": "초급",
    "prompt": "학생은 음악을 _____.",
    "answer": "들어요",
    "translation": "The student listens to music.",
    "choices": [
      "공부해요",
      "먹어요",
      "일해요",
      "들어요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"들어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 37,
    "level": "초급",
    "prompt": "어제 학생은 음악을 _____.",
    "answer": "들었어요",
    "translation": "The student listens to music yesterday.",
    "choices": [
      "들었어요",
      "공부했어요",
      "먹었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"들었어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 38,
    "level": "초급",
    "prompt": "내일 학생은 음악을 _____.",
    "answer": "들을 거예요",
    "translation": "The student listens to music tomorrow.",
    "choices": [
      "공부할 거예요",
      "들을 거예요",
      "먹을 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"들을 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 39,
    "level": "초급",
    "prompt": "지금 학생은 음악을 _____ 있어요.",
    "answer": "듣고",
    "translation": "The student listens to music now.",
    "choices": [
      "공부하고",
      "먹고",
      "듣고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"듣고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 40,
    "level": "초급",
    "prompt": "학생은 음악을 _____ 않아요.",
    "answer": "듣지",
    "translation": "Negative: The student listens to music.",
    "choices": [
      "공부하지",
      "먹지",
      "일하지",
      "듣지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"듣지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 41,
    "level": "초급",
    "prompt": "친구들은 과일을 _____.",
    "answer": "사요",
    "translation": "My friends buy fruit.",
    "choices": [
      "사요",
      "공부해요",
      "먹어요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"사요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 42,
    "level": "초급",
    "prompt": "어제 친구들은 과일을 _____.",
    "answer": "샀어요",
    "translation": "My friends buy fruit yesterday.",
    "choices": [
      "공부했어요",
      "샀어요",
      "먹었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"샀어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 43,
    "level": "초급",
    "prompt": "내일 친구들은 과일을 _____.",
    "answer": "살 거예요",
    "translation": "My friends buy fruit tomorrow.",
    "choices": [
      "공부할 거예요",
      "먹을 거예요",
      "살 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 44,
    "level": "초급",
    "prompt": "지금 친구들은 과일을 _____ 있어요.",
    "answer": "사고",
    "translation": "My friends buy fruit now.",
    "choices": [
      "공부하고",
      "먹고",
      "일하고",
      "사고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"사고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 45,
    "level": "초급",
    "prompt": "친구들은 과일을 _____ 않아요.",
    "answer": "사지",
    "translation": "Negative: My friends buy fruit.",
    "choices": [
      "사지",
      "공부하지",
      "먹지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"사지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 46,
    "level": "초급",
    "prompt": "그 가게는 아홉 시에 문을 _____.",
    "answer": "열어요",
    "translation": "The store opens at nine.",
    "choices": [
      "공부해요",
      "열어요",
      "먹어요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"열어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 47,
    "level": "초급",
    "prompt": "어제 그 가게는 아홉 시에 문을 _____.",
    "answer": "열었어요",
    "translation": "The store opens at nine yesterday.",
    "choices": [
      "공부했어요",
      "먹었어요",
      "열었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"열었어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 48,
    "level": "초급",
    "prompt": "내일 그 가게는 아홉 시에 문을 _____.",
    "answer": "열 거예요",
    "translation": "The store opens at nine tomorrow.",
    "choices": [
      "공부할 거예요",
      "먹을 거예요",
      "일할 거예요",
      "열 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"열 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 49,
    "level": "초급",
    "prompt": "지금 그 가게는 아홉 시에 문을 _____ 있어요.",
    "answer": "열고",
    "translation": "The store opens at nine now.",
    "choices": [
      "열고",
      "공부하고",
      "먹고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"열고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 50,
    "level": "초급",
    "prompt": "그 가게는 아홉 시에 문을 _____ 않아요.",
    "answer": "열지",
    "translation": "Negative: The store opens at nine.",
    "choices": [
      "공부하지",
      "열지",
      "먹지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"열지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 51,
    "level": "초급",
    "prompt": "아버지는 신문을 _____.",
    "answer": "봐요",
    "translation": "Father reads the newspaper.",
    "choices": [
      "공부해요",
      "먹어요",
      "봐요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"봐요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 52,
    "level": "초급",
    "prompt": "어제 아버지는 신문을 _____.",
    "answer": "봤어요",
    "translation": "Father reads the newspaper yesterday.",
    "choices": [
      "공부했어요",
      "먹었어요",
      "일했어요",
      "봤어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"봤어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 53,
    "level": "초급",
    "prompt": "내일 아버지는 신문을 _____.",
    "answer": "볼 거예요",
    "translation": "Father reads the newspaper tomorrow.",
    "choices": [
      "볼 거예요",
      "공부할 거예요",
      "먹을 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"볼 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 54,
    "level": "초급",
    "prompt": "지금 아버지는 신문을 _____ 있어요.",
    "answer": "보고",
    "translation": "Father reads the newspaper now.",
    "choices": [
      "공부하고",
      "보고",
      "먹고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 55,
    "level": "초급",
    "prompt": "아버지는 신문을 _____ 않아요.",
    "answer": "보지",
    "translation": "Negative: Father reads the newspaper.",
    "choices": [
      "공부하지",
      "먹지",
      "보지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 56,
    "level": "초급",
    "prompt": "어머니는 저녁을 _____.",
    "answer": "만들어요",
    "translation": "Mother makes dinner.",
    "choices": [
      "공부해요",
      "먹어요",
      "일해요",
      "만들어요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"만들어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 57,
    "level": "초급",
    "prompt": "어제 어머니는 저녁을 _____.",
    "answer": "만들었어요",
    "translation": "Mother makes dinner yesterday.",
    "choices": [
      "만들었어요",
      "공부했어요",
      "먹었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"만들었어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 58,
    "level": "초급",
    "prompt": "내일 어머니는 저녁을 _____.",
    "answer": "만들 거예요",
    "translation": "Mother makes dinner tomorrow.",
    "choices": [
      "공부할 거예요",
      "만들 거예요",
      "먹을 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"만들 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 59,
    "level": "초급",
    "prompt": "지금 어머니는 저녁을 _____ 있어요.",
    "answer": "만들고",
    "translation": "Mother makes dinner now.",
    "choices": [
      "공부하고",
      "먹고",
      "만들고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"만들고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 60,
    "level": "초급",
    "prompt": "어머니는 저녁을 _____ 않아요.",
    "answer": "만들지",
    "translation": "Negative: Mother makes dinner.",
    "choices": [
      "공부하지",
      "먹지",
      "일하지",
      "만들지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"만들지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 61,
    "level": "초급",
    "prompt": "아이는 우유를 _____.",
    "answer": "마셔요",
    "translation": "The child drinks milk.",
    "choices": [
      "마셔요",
      "공부해요",
      "먹어요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"마셔요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 62,
    "level": "초급",
    "prompt": "어제 아이는 우유를 _____.",
    "answer": "마셨어요",
    "translation": "The child drinks milk yesterday.",
    "choices": [
      "공부했어요",
      "마셨어요",
      "먹었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"마셨어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 63,
    "level": "초급",
    "prompt": "내일 아이는 우유를 _____.",
    "answer": "마실 거예요",
    "translation": "The child drinks milk tomorrow.",
    "choices": [
      "공부할 거예요",
      "먹을 거예요",
      "마실 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"마실 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 64,
    "level": "초급",
    "prompt": "지금 아이는 우유를 _____ 있어요.",
    "answer": "마시고",
    "translation": "The child drinks milk now.",
    "choices": [
      "공부하고",
      "먹고",
      "일하고",
      "마시고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"마시고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 65,
    "level": "초급",
    "prompt": "아이는 우유를 _____ 않아요.",
    "answer": "마시지",
    "translation": "Negative: The child drinks milk.",
    "choices": [
      "마시지",
      "공부하지",
      "먹지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"마시지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 66,
    "level": "초급",
    "prompt": "저는 운동을 _____.",
    "answer": "해요",
    "translation": "I exercise.",
    "choices": [
      "공부해요",
      "해요",
      "먹어요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"해요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 67,
    "level": "초급",
    "prompt": "어제 저는 운동을 _____.",
    "answer": "했어요",
    "translation": "I exercise yesterday.",
    "choices": [
      "공부했어요",
      "먹었어요",
      "했어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"했어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 68,
    "level": "초급",
    "prompt": "내일 저는 운동을 _____.",
    "answer": "할 거예요",
    "translation": "I exercise tomorrow.",
    "choices": [
      "공부할 거예요",
      "먹을 거예요",
      "일할 거예요",
      "할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"할 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 69,
    "level": "초급",
    "prompt": "지금 저는 운동을 _____ 있어요.",
    "answer": "하고",
    "translation": "I exercise now.",
    "choices": [
      "하고",
      "공부하고",
      "먹고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"하고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 70,
    "level": "초급",
    "prompt": "저는 운동을 _____ 않아요.",
    "answer": "하지",
    "translation": "Negative: I exercise.",
    "choices": [
      "공부하지",
      "하지",
      "먹지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"하지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 71,
    "level": "초급",
    "prompt": "언니는 새 옷을 _____.",
    "answer": "입어요",
    "translation": "My older sister wears new clothes.",
    "choices": [
      "공부해요",
      "먹어요",
      "입어요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"입어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 72,
    "level": "초급",
    "prompt": "어제 언니는 새 옷을 _____.",
    "answer": "입었어요",
    "translation": "My older sister wears new clothes yesterday.",
    "choices": [
      "공부했어요",
      "먹었어요",
      "일했어요",
      "입었어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"입었어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 73,
    "level": "초급",
    "prompt": "내일 언니는 새 옷을 _____.",
    "answer": "입을 거예요",
    "translation": "My older sister wears new clothes tomorrow.",
    "choices": [
      "입을 거예요",
      "공부할 거예요",
      "먹을 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"입을 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 74,
    "level": "초급",
    "prompt": "지금 언니는 새 옷을 _____ 있어요.",
    "answer": "입고",
    "translation": "My older sister wears new clothes now.",
    "choices": [
      "공부하고",
      "입고",
      "먹고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"입고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 75,
    "level": "초급",
    "prompt": "언니는 새 옷을 _____ 않아요.",
    "answer": "입지",
    "translation": "Negative: My older sister wears new clothes.",
    "choices": [
      "공부하지",
      "먹지",
      "입지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"입지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 76,
    "level": "초급",
    "prompt": "친구가 우리 집에 _____.",
    "answer": "와요",
    "translation": "A friend comes to my house.",
    "choices": [
      "공부해요",
      "먹어요",
      "일해요",
      "와요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"와요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 77,
    "level": "초급",
    "prompt": "어제 친구가 우리 집에 _____.",
    "answer": "왔어요",
    "translation": "A friend comes to my house yesterday.",
    "choices": [
      "왔어요",
      "공부했어요",
      "먹었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"왔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 78,
    "level": "초급",
    "prompt": "내일 친구가 우리 집에 _____.",
    "answer": "올 거예요",
    "translation": "A friend comes to my house tomorrow.",
    "choices": [
      "공부할 거예요",
      "올 거예요",
      "먹을 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"올 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 79,
    "level": "초급",
    "prompt": "지금 친구가 우리 집에 _____ 있어요.",
    "answer": "오고",
    "translation": "A friend comes to my house now.",
    "choices": [
      "공부하고",
      "먹고",
      "오고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"오고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 80,
    "level": "초급",
    "prompt": "친구가 우리 집에 _____ 않아요.",
    "answer": "오지",
    "translation": "Negative: A friend comes to my house.",
    "choices": [
      "공부하지",
      "먹지",
      "일하지",
      "오지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"오지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 81,
    "level": "초급",
    "prompt": "저는 이름을 한국어로 _____.",
    "answer": "써요",
    "translation": "I write my name in Korean.",
    "choices": [
      "써요",
      "공부해요",
      "먹어요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"써요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 82,
    "level": "초급",
    "prompt": "어제 저는 이름을 한국어로 _____.",
    "answer": "썼어요",
    "translation": "I write my name in Korean yesterday.",
    "choices": [
      "공부했어요",
      "썼어요",
      "먹었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"썼어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 83,
    "level": "초급",
    "prompt": "내일 저는 이름을 한국어로 _____.",
    "answer": "쓸 거예요",
    "translation": "I write my name in Korean tomorrow.",
    "choices": [
      "공부할 거예요",
      "먹을 거예요",
      "쓸 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"쓸 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 84,
    "level": "초급",
    "prompt": "지금 저는 이름을 한국어로 _____ 있어요.",
    "answer": "쓰고",
    "translation": "I write my name in Korean now.",
    "choices": [
      "공부하고",
      "먹고",
      "일하고",
      "쓰고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"쓰고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 85,
    "level": "초급",
    "prompt": "저는 이름을 한국어로 _____ 않아요.",
    "answer": "쓰지",
    "translation": "Negative: I write my name in Korean.",
    "choices": [
      "쓰지",
      "공부하지",
      "먹지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"쓰지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 86,
    "level": "초급",
    "prompt": "아이는 그림을 _____.",
    "answer": "그려요",
    "translation": "The child draws a picture.",
    "choices": [
      "공부해요",
      "그려요",
      "먹어요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"그려요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 87,
    "level": "초급",
    "prompt": "어제 아이는 그림을 _____.",
    "answer": "그렸어요",
    "translation": "The child draws a picture yesterday.",
    "choices": [
      "공부했어요",
      "먹었어요",
      "그렸어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"그렸어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 88,
    "level": "초급",
    "prompt": "내일 아이는 그림을 _____.",
    "answer": "그릴 거예요",
    "translation": "The child draws a picture tomorrow.",
    "choices": [
      "공부할 거예요",
      "먹을 거예요",
      "일할 거예요",
      "그릴 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"그릴 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 89,
    "level": "초급",
    "prompt": "지금 아이는 그림을 _____ 있어요.",
    "answer": "그리고",
    "translation": "The child draws a picture now.",
    "choices": [
      "그리고",
      "공부하고",
      "먹고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"그리고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 90,
    "level": "초급",
    "prompt": "아이는 그림을 _____ 않아요.",
    "answer": "그리지",
    "translation": "Negative: The child draws a picture.",
    "choices": [
      "공부하지",
      "그리지",
      "먹지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"그리지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 91,
    "level": "초급",
    "prompt": "우리는 노래를 _____.",
    "answer": "불러요",
    "translation": "We sing a song.",
    "choices": [
      "공부해요",
      "먹어요",
      "불러요",
      "일해요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"불러요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 92,
    "level": "초급",
    "prompt": "어제 우리는 노래를 _____.",
    "answer": "불렀어요",
    "translation": "We sing a song yesterday.",
    "choices": [
      "공부했어요",
      "먹었어요",
      "일했어요",
      "불렀어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"불렀어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 93,
    "level": "초급",
    "prompt": "내일 우리는 노래를 _____.",
    "answer": "부를 거예요",
    "translation": "We sing a song tomorrow.",
    "choices": [
      "부를 거예요",
      "공부할 거예요",
      "먹을 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"부를 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 94,
    "level": "초급",
    "prompt": "지금 우리는 노래를 _____ 있어요.",
    "answer": "부르고",
    "translation": "We sing a song now.",
    "choices": [
      "공부하고",
      "부르고",
      "먹고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"부르고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 95,
    "level": "초급",
    "prompt": "우리는 노래를 _____ 않아요.",
    "answer": "부르지",
    "translation": "Negative: We sing a song.",
    "choices": [
      "공부하지",
      "먹지",
      "부르지",
      "일하지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"부르지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 96,
    "level": "초급",
    "prompt": "저는 지하철을 _____.",
    "answer": "타요",
    "translation": "I take the subway.",
    "choices": [
      "공부해요",
      "먹어요",
      "일해요",
      "타요"
    ],
    "explanation": [
      "현재 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"타요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 97,
    "level": "초급",
    "prompt": "어제 저는 지하철을 _____.",
    "answer": "탔어요",
    "translation": "I take the subway yesterday.",
    "choices": [
      "탔어요",
      "공부했어요",
      "먹었어요",
      "일했어요"
    ],
    "explanation": [
      "과거 시제을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"탔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 98,
    "level": "초급",
    "prompt": "내일 저는 지하철을 _____.",
    "answer": "탈 거예요",
    "translation": "I take the subway tomorrow.",
    "choices": [
      "공부할 거예요",
      "탈 거예요",
      "먹을 거예요",
      "일할 거예요"
    ],
    "explanation": [
      "미래 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"탈 거예요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 99,
    "level": "초급",
    "prompt": "지금 저는 지하철을 _____ 있어요.",
    "answer": "타고",
    "translation": "I take the subway now.",
    "choices": [
      "공부하고",
      "먹고",
      "타고",
      "일하고"
    ],
    "explanation": [
      "진행 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"타고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 100,
    "level": "초급",
    "prompt": "저는 지하철을 _____ 않아요.",
    "answer": "타지",
    "translation": "Negative: I take the subway.",
    "choices": [
      "공부하지",
      "먹지",
      "일하지",
      "타지"
    ],
    "explanation": [
      "부정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"타지\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 101,
    "level": "중급",
    "prompt": "비가 와서 등산을 _____ 했어요.",
    "answer": "취소하기로",
    "translation": "It rained, so we decided to cancel hiking.",
    "choices": [
      "취소하기로",
      "취소하려고",
      "취소하면서",
      "취소하느라고"
    ],
    "explanation": [
      "결정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"취소하기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 102,
    "level": "중급",
    "prompt": "한국어를 잘하려면 매일 _____ 해요.",
    "answer": "연습해야",
    "translation": "To speak Korean well, you have to practice every day.",
    "choices": [
      "연습해서",
      "연습해야",
      "연습하고",
      "연습하지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"연습해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 103,
    "level": "중급",
    "prompt": "친구를 만나러 카페에 _____.",
    "answer": "갔어요",
    "translation": "I went to a cafe to meet a friend.",
    "choices": [
      "가면",
      "가지만",
      "갔어요",
      "가니까"
    ],
    "explanation": [
      "목적 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"갔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 104,
    "level": "중급",
    "prompt": "숙제를 하다가 잠깐 전화를 _____.",
    "answer": "받았어요",
    "translation": "While doing homework, I briefly answered the phone.",
    "choices": [
      "받으려고",
      "받으면",
      "받지만",
      "받았어요"
    ],
    "explanation": [
      "중단 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"받았어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 105,
    "level": "중급",
    "prompt": "길이 막혀서 약속에 _____ 말았어요.",
    "answer": "늦고",
    "translation": "The traffic was bad, so I ended up being late.",
    "choices": [
      "늦고",
      "늦기",
      "늦도록",
      "늦으면"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"늦고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 106,
    "level": "중급",
    "prompt": "감기에 걸렸는데도 회사에 _____.",
    "answer": "갔어요",
    "translation": "Even though I caught a cold, I went to work.",
    "choices": [
      "가려고",
      "갔어요",
      "가거나",
      "가느라고"
    ],
    "explanation": [
      "양보 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"갔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 107,
    "level": "중급",
    "prompt": "문제를 다 풀고 나서 답을 _____.",
    "answer": "확인하세요",
    "translation": "After solving all questions, check the answers.",
    "choices": [
      "확인하느라",
      "확인하려면",
      "확인하세요",
      "확인하자마자"
    ],
    "explanation": [
      "순서 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"확인하세요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 108,
    "level": "중급",
    "prompt": "저는 매운 음식을 먹을 _____ 있어요.",
    "answer": "수",
    "translation": "I can eat spicy food.",
    "choices": [
      "줄",
      "뿐",
      "만",
      "수"
    ],
    "explanation": [
      "가능 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 109,
    "level": "중급",
    "prompt": "이 기계는 사용하기가 조금 _____.",
    "answer": "어려워요",
    "translation": "This machine is a little difficult to use.",
    "choices": [
      "어려워요",
      "어려운",
      "어렵게",
      "어려우면"
    ],
    "explanation": [
      "형용사 활용을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"어려워요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 110,
    "level": "중급",
    "prompt": "늦을 것 같아서 친구에게 미리 _____.",
    "answer": "연락했어요",
    "translation": "I thought I would be late, so I contacted my friend in advance.",
    "choices": [
      "연락하려면",
      "연락했어요",
      "연락하지만",
      "연락하다가"
    ],
    "explanation": [
      "이유 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"연락했어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 111,
    "level": "중급",
    "prompt": "수업이 시작되기 전에 휴대폰을 _____ 주세요.",
    "answer": "꺼",
    "translation": "Please turn off your phone before class starts.",
    "choices": [
      "끄고",
      "끄면",
      "꺼",
      "끄지"
    ],
    "explanation": [
      "요청 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"꺼\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 112,
    "level": "중급",
    "prompt": "한국에 온 지 벌써 세 달이 _____.",
    "answer": "됐어요",
    "translation": "It has already been three months since I came to Korea.",
    "choices": [
      "했어요",
      "있어요",
      "갔어요",
      "됐어요"
    ],
    "explanation": [
      "경과 시간을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"됐어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 113,
    "level": "중급",
    "prompt": "친구가 추천해 준 식당에 가 _____ 했어요.",
    "answer": "보기로",
    "translation": "I decided to try going to the restaurant my friend recommended.",
    "choices": [
      "보기로",
      "보느라",
      "보다가",
      "보지만"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 114,
    "level": "중급",
    "prompt": "날씨가 추우니까 따뜻하게 _____ 나가세요.",
    "answer": "입고",
    "translation": "It is cold, so dress warmly before going out.",
    "choices": [
      "입으면",
      "입고",
      "입지만",
      "입도록"
    ],
    "explanation": [
      "상태 유지을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"입고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 115,
    "level": "중급",
    "prompt": "이번 주말에는 집에서 쉬거나 영화를 _____ 거예요.",
    "answer": "볼",
    "translation": "This weekend I will rest at home or watch a movie.",
    "choices": [
      "본",
      "보는",
      "볼",
      "보던"
    ],
    "explanation": [
      "관형형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"볼\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 116,
    "level": "중급",
    "prompt": "선생님께서 내일 시험이 있다고 _____.",
    "answer": "말씀하셨어요",
    "translation": "The teacher said there is an exam tomorrow.",
    "choices": [
      "말했어요",
      "말씀했어요",
      "알려 주셨어요",
      "말씀하셨어요"
    ],
    "explanation": [
      "높임 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"말씀하셨어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 117,
    "level": "중급",
    "prompt": "할머니께 생신 선물을 _____.",
    "answer": "드렸어요",
    "translation": "I gave my grandmother a birthday present.",
    "choices": [
      "드렸어요",
      "줬어요",
      "받았어요",
      "전해 드렸어요"
    ],
    "explanation": [
      "수여 높임을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"드렸어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 118,
    "level": "중급",
    "prompt": "부모님께서는 지금 거실에 _____.",
    "answer": "계세요",
    "translation": "My parents are in the living room now.",
    "choices": [
      "있어요",
      "계세요",
      "하세요",
      "되세요"
    ],
    "explanation": [
      "존재 높임을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"계세요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 119,
    "level": "중급",
    "prompt": "회의 자료를 미리 읽어 _____ 오세요.",
    "answer": "보고",
    "translation": "Please read the meeting materials before coming.",
    "choices": [
      "보면",
      "보지만",
      "보고",
      "보려고"
    ],
    "explanation": [
      "준비 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 120,
    "level": "중급",
    "prompt": "한국어로 발표해야 해서 많이 _____.",
    "answer": "긴장돼요",
    "translation": "I am nervous because I have to present in Korean.",
    "choices": [
      "긴장한",
      "긴장하게",
      "긴장되면",
      "긴장돼요"
    ],
    "explanation": [
      "심리 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"긴장돼요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 121,
    "level": "중급",
    "prompt": "이 옷은 디자인은 예쁜데 가격이 너무 _____.",
    "answer": "비싸요",
    "translation": "This clothing has a pretty design, but it is too expensive.",
    "choices": [
      "비싸요",
      "비싼",
      "비싸게",
      "비싸면"
    ],
    "explanation": [
      "대조 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"비싸요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 122,
    "level": "중급",
    "prompt": "시간이 없으니까 택시를 _____ 갑시다.",
    "answer": "타고",
    "translation": "We do not have time, so let us take a taxi.",
    "choices": [
      "타면",
      "타고",
      "타지만",
      "타도록"
    ],
    "explanation": [
      "수단 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"타고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 123,
    "level": "중급",
    "prompt": "어제 너무 피곤해서 저녁도 못 먹고 _____.",
    "answer": "잤어요",
    "translation": "I was so tired yesterday that I slept without eating dinner.",
    "choices": [
      "자려고",
      "자지만",
      "잤어요",
      "자니까"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"잤어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 124,
    "level": "중급",
    "prompt": "한국 드라마를 보면서 듣기 연습을 _____.",
    "answer": "해요",
    "translation": "I practice listening while watching Korean dramas.",
    "choices": [
      "하면",
      "해서",
      "하지만",
      "해요"
    ],
    "explanation": [
      "동시 동작을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"해요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 125,
    "level": "중급",
    "prompt": "약속 장소를 잘 몰라서 지도를 _____ 봤어요.",
    "answer": "찾아",
    "translation": "I looked up the map because I did not know the meeting place well.",
    "choices": [
      "찾아",
      "찾고",
      "찾으면",
      "찾지만"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"찾아\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 126,
    "level": "중급",
    "prompt": "오늘도 비가 와서 등산을 _____ 했어요.",
    "answer": "취소하기로",
    "translation": "It rained, so we decided to cancel hiking.",
    "choices": [
      "취소하려고",
      "취소하기로",
      "취소하면서",
      "취소하느라고"
    ],
    "explanation": [
      "결정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"취소하기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 127,
    "level": "중급",
    "prompt": "오늘도 한국어를 잘하려면 매일 _____ 해요.",
    "answer": "연습해야",
    "translation": "To speak Korean well, you have to practice every day.",
    "choices": [
      "연습해서",
      "연습하고",
      "연습해야",
      "연습하지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"연습해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 128,
    "level": "중급",
    "prompt": "오늘도 친구를 만나러 카페에 _____.",
    "answer": "갔어요",
    "translation": "I went to a cafe to meet a friend.",
    "choices": [
      "가면",
      "가지만",
      "가니까",
      "갔어요"
    ],
    "explanation": [
      "목적 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"갔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 129,
    "level": "중급",
    "prompt": "오늘도 숙제를 하다가 잠깐 전화를 _____.",
    "answer": "받았어요",
    "translation": "While doing homework, I briefly answered the phone.",
    "choices": [
      "받았어요",
      "받으려고",
      "받으면",
      "받지만"
    ],
    "explanation": [
      "중단 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"받았어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 130,
    "level": "중급",
    "prompt": "오늘도 길이 막혀서 약속에 _____ 말았어요.",
    "answer": "늦고",
    "translation": "The traffic was bad, so I ended up being late.",
    "choices": [
      "늦기",
      "늦고",
      "늦도록",
      "늦으면"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"늦고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 131,
    "level": "중급",
    "prompt": "오늘도 감기에 걸렸는데도 회사에 _____.",
    "answer": "갔어요",
    "translation": "Even though I caught a cold, I went to work.",
    "choices": [
      "가려고",
      "가거나",
      "갔어요",
      "가느라고"
    ],
    "explanation": [
      "양보 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"갔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 132,
    "level": "중급",
    "prompt": "오늘도 문제를 다 풀고 나서 답을 _____.",
    "answer": "확인하세요",
    "translation": "After solving all questions, check the answers.",
    "choices": [
      "확인하느라",
      "확인하려면",
      "확인하자마자",
      "확인하세요"
    ],
    "explanation": [
      "순서 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"확인하세요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 133,
    "level": "중급",
    "prompt": "오늘도 저는 매운 음식을 먹을 _____ 있어요.",
    "answer": "수",
    "translation": "I can eat spicy food.",
    "choices": [
      "수",
      "줄",
      "뿐",
      "만"
    ],
    "explanation": [
      "가능 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 134,
    "level": "중급",
    "prompt": "오늘도 이 기계는 사용하기가 조금 _____.",
    "answer": "어려워요",
    "translation": "This machine is a little difficult to use.",
    "choices": [
      "어려운",
      "어려워요",
      "어렵게",
      "어려우면"
    ],
    "explanation": [
      "형용사 활용을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"어려워요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 135,
    "level": "중급",
    "prompt": "오늘도 늦을 것 같아서 친구에게 미리 _____.",
    "answer": "연락했어요",
    "translation": "I thought I would be late, so I contacted my friend in advance.",
    "choices": [
      "연락하려면",
      "연락하지만",
      "연락했어요",
      "연락하다가"
    ],
    "explanation": [
      "이유 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"연락했어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 136,
    "level": "중급",
    "prompt": "오늘도 수업이 시작되기 전에 휴대폰을 _____ 주세요.",
    "answer": "꺼",
    "translation": "Please turn off your phone before class starts.",
    "choices": [
      "끄고",
      "끄면",
      "끄지",
      "꺼"
    ],
    "explanation": [
      "요청 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"꺼\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 137,
    "level": "중급",
    "prompt": "오늘도 한국에 온 지 벌써 세 달이 _____.",
    "answer": "됐어요",
    "translation": "It has already been three months since I came to Korea.",
    "choices": [
      "됐어요",
      "했어요",
      "있어요",
      "갔어요"
    ],
    "explanation": [
      "경과 시간을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"됐어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 138,
    "level": "중급",
    "prompt": "오늘도 친구가 추천해 준 식당에 가 _____ 했어요.",
    "answer": "보기로",
    "translation": "I decided to try going to the restaurant my friend recommended.",
    "choices": [
      "보느라",
      "보기로",
      "보다가",
      "보지만"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 139,
    "level": "중급",
    "prompt": "오늘도 날씨가 추우니까 따뜻하게 _____ 나가세요.",
    "answer": "입고",
    "translation": "It is cold, so dress warmly before going out.",
    "choices": [
      "입으면",
      "입지만",
      "입고",
      "입도록"
    ],
    "explanation": [
      "상태 유지을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"입고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 140,
    "level": "중급",
    "prompt": "오늘도 이번 주말에는 집에서 쉬거나 영화를 _____ 거예요.",
    "answer": "볼",
    "translation": "This weekend I will rest at home or watch a movie.",
    "choices": [
      "본",
      "보는",
      "보던",
      "볼"
    ],
    "explanation": [
      "관형형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"볼\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 141,
    "level": "중급",
    "prompt": "오늘도 선생님께서 내일 시험이 있다고 _____.",
    "answer": "말씀하셨어요",
    "translation": "The teacher said there is an exam tomorrow.",
    "choices": [
      "말씀하셨어요",
      "말했어요",
      "말씀했어요",
      "알려 주셨어요"
    ],
    "explanation": [
      "높임 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"말씀하셨어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 142,
    "level": "중급",
    "prompt": "오늘도 할머니께 생신 선물을 _____.",
    "answer": "드렸어요",
    "translation": "I gave my grandmother a birthday present.",
    "choices": [
      "줬어요",
      "드렸어요",
      "받았어요",
      "전해 드렸어요"
    ],
    "explanation": [
      "수여 높임을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"드렸어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 143,
    "level": "중급",
    "prompt": "오늘도 부모님께서는 지금 거실에 _____.",
    "answer": "계세요",
    "translation": "My parents are in the living room now.",
    "choices": [
      "있어요",
      "하세요",
      "계세요",
      "되세요"
    ],
    "explanation": [
      "존재 높임을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"계세요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 144,
    "level": "중급",
    "prompt": "오늘도 회의 자료를 미리 읽어 _____ 오세요.",
    "answer": "보고",
    "translation": "Please read the meeting materials before coming.",
    "choices": [
      "보면",
      "보지만",
      "보려고",
      "보고"
    ],
    "explanation": [
      "준비 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 145,
    "level": "중급",
    "prompt": "오늘도 한국어로 발표해야 해서 많이 _____.",
    "answer": "긴장돼요",
    "translation": "I am nervous because I have to present in Korean.",
    "choices": [
      "긴장돼요",
      "긴장한",
      "긴장하게",
      "긴장되면"
    ],
    "explanation": [
      "심리 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"긴장돼요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 146,
    "level": "중급",
    "prompt": "오늘도 이 옷은 디자인은 예쁜데 가격이 너무 _____.",
    "answer": "비싸요",
    "translation": "This clothing has a pretty design, but it is too expensive.",
    "choices": [
      "비싼",
      "비싸요",
      "비싸게",
      "비싸면"
    ],
    "explanation": [
      "대조 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"비싸요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 147,
    "level": "중급",
    "prompt": "오늘도 시간이 없으니까 택시를 _____ 갑시다.",
    "answer": "타고",
    "translation": "We do not have time, so let us take a taxi.",
    "choices": [
      "타면",
      "타지만",
      "타고",
      "타도록"
    ],
    "explanation": [
      "수단 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"타고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 148,
    "level": "중급",
    "prompt": "오늘도 어제 너무 피곤해서 저녁도 못 먹고 _____.",
    "answer": "잤어요",
    "translation": "I was so tired yesterday that I slept without eating dinner.",
    "choices": [
      "자려고",
      "자지만",
      "자니까",
      "잤어요"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"잤어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 149,
    "level": "중급",
    "prompt": "오늘도 한국 드라마를 보면서 듣기 연습을 _____.",
    "answer": "해요",
    "translation": "I practice listening while watching Korean dramas.",
    "choices": [
      "해요",
      "하면",
      "해서",
      "하지만"
    ],
    "explanation": [
      "동시 동작을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"해요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 150,
    "level": "중급",
    "prompt": "오늘도 약속 장소를 잘 몰라서 지도를 _____ 봤어요.",
    "answer": "찾아",
    "translation": "I looked up the map because I did not know the meeting place well.",
    "choices": [
      "찾고",
      "찾아",
      "찾으면",
      "찾지만"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"찾아\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 151,
    "level": "중급",
    "prompt": "이번에도 비가 와서 등산을 _____ 했어요.",
    "answer": "취소하기로",
    "translation": "It rained, so we decided to cancel hiking.",
    "choices": [
      "취소하려고",
      "취소하면서",
      "취소하기로",
      "취소하느라고"
    ],
    "explanation": [
      "결정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"취소하기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 152,
    "level": "중급",
    "prompt": "이번에도 한국어를 잘하려면 매일 _____ 해요.",
    "answer": "연습해야",
    "translation": "To speak Korean well, you have to practice every day.",
    "choices": [
      "연습해서",
      "연습하고",
      "연습하지만",
      "연습해야"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"연습해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 153,
    "level": "중급",
    "prompt": "이번에도 친구를 만나러 카페에 _____.",
    "answer": "갔어요",
    "translation": "I went to a cafe to meet a friend.",
    "choices": [
      "갔어요",
      "가면",
      "가지만",
      "가니까"
    ],
    "explanation": [
      "목적 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"갔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 154,
    "level": "중급",
    "prompt": "이번에도 숙제를 하다가 잠깐 전화를 _____.",
    "answer": "받았어요",
    "translation": "While doing homework, I briefly answered the phone.",
    "choices": [
      "받으려고",
      "받았어요",
      "받으면",
      "받지만"
    ],
    "explanation": [
      "중단 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"받았어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 155,
    "level": "중급",
    "prompt": "이번에도 길이 막혀서 약속에 _____ 말았어요.",
    "answer": "늦고",
    "translation": "The traffic was bad, so I ended up being late.",
    "choices": [
      "늦기",
      "늦도록",
      "늦고",
      "늦으면"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"늦고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 156,
    "level": "중급",
    "prompt": "이번에도 감기에 걸렸는데도 회사에 _____.",
    "answer": "갔어요",
    "translation": "Even though I caught a cold, I went to work.",
    "choices": [
      "가려고",
      "가거나",
      "가느라고",
      "갔어요"
    ],
    "explanation": [
      "양보 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"갔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 157,
    "level": "중급",
    "prompt": "이번에도 문제를 다 풀고 나서 답을 _____.",
    "answer": "확인하세요",
    "translation": "After solving all questions, check the answers.",
    "choices": [
      "확인하세요",
      "확인하느라",
      "확인하려면",
      "확인하자마자"
    ],
    "explanation": [
      "순서 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"확인하세요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 158,
    "level": "중급",
    "prompt": "이번에도 저는 매운 음식을 먹을 _____ 있어요.",
    "answer": "수",
    "translation": "I can eat spicy food.",
    "choices": [
      "줄",
      "수",
      "뿐",
      "만"
    ],
    "explanation": [
      "가능 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 159,
    "level": "중급",
    "prompt": "이번에도 이 기계는 사용하기가 조금 _____.",
    "answer": "어려워요",
    "translation": "This machine is a little difficult to use.",
    "choices": [
      "어려운",
      "어렵게",
      "어려워요",
      "어려우면"
    ],
    "explanation": [
      "형용사 활용을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"어려워요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 160,
    "level": "중급",
    "prompt": "이번에도 늦을 것 같아서 친구에게 미리 _____.",
    "answer": "연락했어요",
    "translation": "I thought I would be late, so I contacted my friend in advance.",
    "choices": [
      "연락하려면",
      "연락하지만",
      "연락하다가",
      "연락했어요"
    ],
    "explanation": [
      "이유 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"연락했어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 161,
    "level": "중급",
    "prompt": "이번에도 수업이 시작되기 전에 휴대폰을 _____ 주세요.",
    "answer": "꺼",
    "translation": "Please turn off your phone before class starts.",
    "choices": [
      "꺼",
      "끄고",
      "끄면",
      "끄지"
    ],
    "explanation": [
      "요청 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"꺼\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 162,
    "level": "중급",
    "prompt": "이번에도 한국에 온 지 벌써 세 달이 _____.",
    "answer": "됐어요",
    "translation": "It has already been three months since I came to Korea.",
    "choices": [
      "했어요",
      "됐어요",
      "있어요",
      "갔어요"
    ],
    "explanation": [
      "경과 시간을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"됐어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 163,
    "level": "중급",
    "prompt": "이번에도 친구가 추천해 준 식당에 가 _____ 했어요.",
    "answer": "보기로",
    "translation": "I decided to try going to the restaurant my friend recommended.",
    "choices": [
      "보느라",
      "보다가",
      "보기로",
      "보지만"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 164,
    "level": "중급",
    "prompt": "이번에도 날씨가 추우니까 따뜻하게 _____ 나가세요.",
    "answer": "입고",
    "translation": "It is cold, so dress warmly before going out.",
    "choices": [
      "입으면",
      "입지만",
      "입도록",
      "입고"
    ],
    "explanation": [
      "상태 유지을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"입고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 165,
    "level": "중급",
    "prompt": "이번에도 이번 주말에는 집에서 쉬거나 영화를 _____ 거예요.",
    "answer": "볼",
    "translation": "This weekend I will rest at home or watch a movie.",
    "choices": [
      "볼",
      "본",
      "보는",
      "보던"
    ],
    "explanation": [
      "관형형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"볼\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 166,
    "level": "중급",
    "prompt": "이번에도 선생님께서 내일 시험이 있다고 _____.",
    "answer": "말씀하셨어요",
    "translation": "The teacher said there is an exam tomorrow.",
    "choices": [
      "말했어요",
      "말씀하셨어요",
      "말씀했어요",
      "알려 주셨어요"
    ],
    "explanation": [
      "높임 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"말씀하셨어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 167,
    "level": "중급",
    "prompt": "이번에도 할머니께 생신 선물을 _____.",
    "answer": "드렸어요",
    "translation": "I gave my grandmother a birthday present.",
    "choices": [
      "줬어요",
      "받았어요",
      "드렸어요",
      "전해 드렸어요"
    ],
    "explanation": [
      "수여 높임을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"드렸어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 168,
    "level": "중급",
    "prompt": "이번에도 부모님께서는 지금 거실에 _____.",
    "answer": "계세요",
    "translation": "My parents are in the living room now.",
    "choices": [
      "있어요",
      "하세요",
      "되세요",
      "계세요"
    ],
    "explanation": [
      "존재 높임을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"계세요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 169,
    "level": "중급",
    "prompt": "이번에도 회의 자료를 미리 읽어 _____ 오세요.",
    "answer": "보고",
    "translation": "Please read the meeting materials before coming.",
    "choices": [
      "보고",
      "보면",
      "보지만",
      "보려고"
    ],
    "explanation": [
      "준비 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 170,
    "level": "중급",
    "prompt": "이번에도 한국어로 발표해야 해서 많이 _____.",
    "answer": "긴장돼요",
    "translation": "I am nervous because I have to present in Korean.",
    "choices": [
      "긴장한",
      "긴장돼요",
      "긴장하게",
      "긴장되면"
    ],
    "explanation": [
      "심리 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"긴장돼요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 171,
    "level": "중급",
    "prompt": "이번에도 이 옷은 디자인은 예쁜데 가격이 너무 _____.",
    "answer": "비싸요",
    "translation": "This clothing has a pretty design, but it is too expensive.",
    "choices": [
      "비싼",
      "비싸게",
      "비싸요",
      "비싸면"
    ],
    "explanation": [
      "대조 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"비싸요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 172,
    "level": "중급",
    "prompt": "이번에도 시간이 없으니까 택시를 _____ 갑시다.",
    "answer": "타고",
    "translation": "We do not have time, so let us take a taxi.",
    "choices": [
      "타면",
      "타지만",
      "타도록",
      "타고"
    ],
    "explanation": [
      "수단 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"타고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 173,
    "level": "중급",
    "prompt": "이번에도 어제 너무 피곤해서 저녁도 못 먹고 _____.",
    "answer": "잤어요",
    "translation": "I was so tired yesterday that I slept without eating dinner.",
    "choices": [
      "잤어요",
      "자려고",
      "자지만",
      "자니까"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"잤어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 174,
    "level": "중급",
    "prompt": "이번에도 한국 드라마를 보면서 듣기 연습을 _____.",
    "answer": "해요",
    "translation": "I practice listening while watching Korean dramas.",
    "choices": [
      "하면",
      "해요",
      "해서",
      "하지만"
    ],
    "explanation": [
      "동시 동작을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"해요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 175,
    "level": "중급",
    "prompt": "이번에도 약속 장소를 잘 몰라서 지도를 _____ 봤어요.",
    "answer": "찾아",
    "translation": "I looked up the map because I did not know the meeting place well.",
    "choices": [
      "찾고",
      "찾으면",
      "찾아",
      "찾지만"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"찾아\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 176,
    "level": "중급",
    "prompt": "비가 와서 등산을 _____ 했어요.",
    "answer": "취소하기로",
    "translation": "It rained, so we decided to cancel hiking.",
    "choices": [
      "취소하려고",
      "취소하면서",
      "취소하느라고",
      "취소하기로"
    ],
    "explanation": [
      "결정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"취소하기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 177,
    "level": "중급",
    "prompt": "한국어를 잘하려면 매일 _____ 해요.",
    "answer": "연습해야",
    "translation": "To speak Korean well, you have to practice every day.",
    "choices": [
      "연습해야",
      "연습해서",
      "연습하고",
      "연습하지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"연습해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 178,
    "level": "중급",
    "prompt": "친구를 만나러 카페에 _____.",
    "answer": "갔어요",
    "translation": "I went to a cafe to meet a friend.",
    "choices": [
      "가면",
      "갔어요",
      "가지만",
      "가니까"
    ],
    "explanation": [
      "목적 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"갔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 179,
    "level": "중급",
    "prompt": "숙제를 하다가 잠깐 전화를 _____.",
    "answer": "받았어요",
    "translation": "While doing homework, I briefly answered the phone.",
    "choices": [
      "받으려고",
      "받으면",
      "받았어요",
      "받지만"
    ],
    "explanation": [
      "중단 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"받았어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 180,
    "level": "중급",
    "prompt": "길이 막혀서 약속에 _____ 말았어요.",
    "answer": "늦고",
    "translation": "The traffic was bad, so I ended up being late.",
    "choices": [
      "늦기",
      "늦도록",
      "늦으면",
      "늦고"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"늦고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 181,
    "level": "중급",
    "prompt": "감기에 걸렸는데도 회사에 _____.",
    "answer": "갔어요",
    "translation": "Even though I caught a cold, I went to work.",
    "choices": [
      "갔어요",
      "가려고",
      "가거나",
      "가느라고"
    ],
    "explanation": [
      "양보 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"갔어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 182,
    "level": "중급",
    "prompt": "문제를 다 풀고 나서 답을 _____.",
    "answer": "확인하세요",
    "translation": "After solving all questions, check the answers.",
    "choices": [
      "확인하느라",
      "확인하세요",
      "확인하려면",
      "확인하자마자"
    ],
    "explanation": [
      "순서 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"확인하세요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 183,
    "level": "중급",
    "prompt": "저는 매운 음식을 먹을 _____ 있어요.",
    "answer": "수",
    "translation": "I can eat spicy food.",
    "choices": [
      "줄",
      "뿐",
      "수",
      "만"
    ],
    "explanation": [
      "가능 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 184,
    "level": "중급",
    "prompt": "이 기계는 사용하기가 조금 _____.",
    "answer": "어려워요",
    "translation": "This machine is a little difficult to use.",
    "choices": [
      "어려운",
      "어렵게",
      "어려우면",
      "어려워요"
    ],
    "explanation": [
      "형용사 활용을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"어려워요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 185,
    "level": "중급",
    "prompt": "늦을 것 같아서 친구에게 미리 _____.",
    "answer": "연락했어요",
    "translation": "I thought I would be late, so I contacted my friend in advance.",
    "choices": [
      "연락했어요",
      "연락하려면",
      "연락하지만",
      "연락하다가"
    ],
    "explanation": [
      "이유 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"연락했어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 186,
    "level": "중급",
    "prompt": "수업이 시작되기 전에 휴대폰을 _____ 주세요.",
    "answer": "꺼",
    "translation": "Please turn off your phone before class starts.",
    "choices": [
      "끄고",
      "꺼",
      "끄면",
      "끄지"
    ],
    "explanation": [
      "요청 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"꺼\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 187,
    "level": "중급",
    "prompt": "한국에 온 지 벌써 세 달이 _____.",
    "answer": "됐어요",
    "translation": "It has already been three months since I came to Korea.",
    "choices": [
      "했어요",
      "있어요",
      "됐어요",
      "갔어요"
    ],
    "explanation": [
      "경과 시간을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"됐어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 188,
    "level": "중급",
    "prompt": "친구가 추천해 준 식당에 가 _____ 했어요.",
    "answer": "보기로",
    "translation": "I decided to try going to the restaurant my friend recommended.",
    "choices": [
      "보느라",
      "보다가",
      "보지만",
      "보기로"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 189,
    "level": "중급",
    "prompt": "날씨가 추우니까 따뜻하게 _____ 나가세요.",
    "answer": "입고",
    "translation": "It is cold, so dress warmly before going out.",
    "choices": [
      "입고",
      "입으면",
      "입지만",
      "입도록"
    ],
    "explanation": [
      "상태 유지을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"입고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 190,
    "level": "중급",
    "prompt": "이번 주말에는 집에서 쉬거나 영화를 _____ 거예요.",
    "answer": "볼",
    "translation": "This weekend I will rest at home or watch a movie.",
    "choices": [
      "본",
      "볼",
      "보는",
      "보던"
    ],
    "explanation": [
      "관형형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"볼\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 191,
    "level": "중급",
    "prompt": "선생님께서 내일 시험이 있다고 _____.",
    "answer": "말씀하셨어요",
    "translation": "The teacher said there is an exam tomorrow.",
    "choices": [
      "말했어요",
      "말씀했어요",
      "말씀하셨어요",
      "알려 주셨어요"
    ],
    "explanation": [
      "높임 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"말씀하셨어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 192,
    "level": "중급",
    "prompt": "할머니께 생신 선물을 _____.",
    "answer": "드렸어요",
    "translation": "I gave my grandmother a birthday present.",
    "choices": [
      "줬어요",
      "받았어요",
      "전해 드렸어요",
      "드렸어요"
    ],
    "explanation": [
      "수여 높임을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"드렸어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 193,
    "level": "중급",
    "prompt": "부모님께서는 지금 거실에 _____.",
    "answer": "계세요",
    "translation": "My parents are in the living room now.",
    "choices": [
      "계세요",
      "있어요",
      "하세요",
      "되세요"
    ],
    "explanation": [
      "존재 높임을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"계세요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 194,
    "level": "중급",
    "prompt": "회의 자료를 미리 읽어 _____ 오세요.",
    "answer": "보고",
    "translation": "Please read the meeting materials before coming.",
    "choices": [
      "보면",
      "보고",
      "보지만",
      "보려고"
    ],
    "explanation": [
      "준비 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 195,
    "level": "중급",
    "prompt": "한국어로 발표해야 해서 많이 _____.",
    "answer": "긴장돼요",
    "translation": "I am nervous because I have to present in Korean.",
    "choices": [
      "긴장한",
      "긴장하게",
      "긴장돼요",
      "긴장되면"
    ],
    "explanation": [
      "심리 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"긴장돼요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 196,
    "level": "중급",
    "prompt": "이 옷은 디자인은 예쁜데 가격이 너무 _____.",
    "answer": "비싸요",
    "translation": "This clothing has a pretty design, but it is too expensive.",
    "choices": [
      "비싼",
      "비싸게",
      "비싸면",
      "비싸요"
    ],
    "explanation": [
      "대조 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"비싸요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 197,
    "level": "중급",
    "prompt": "시간이 없으니까 택시를 _____ 갑시다.",
    "answer": "타고",
    "translation": "We do not have time, so let us take a taxi.",
    "choices": [
      "타고",
      "타면",
      "타지만",
      "타도록"
    ],
    "explanation": [
      "수단 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"타고\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 198,
    "level": "중급",
    "prompt": "어제 너무 피곤해서 저녁도 못 먹고 _____.",
    "answer": "잤어요",
    "translation": "I was so tired yesterday that I slept without eating dinner.",
    "choices": [
      "자려고",
      "잤어요",
      "자지만",
      "자니까"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"잤어요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 199,
    "level": "중급",
    "prompt": "한국 드라마를 보면서 듣기 연습을 _____.",
    "answer": "해요",
    "translation": "I practice listening while watching Korean dramas.",
    "choices": [
      "하면",
      "해서",
      "해요",
      "하지만"
    ],
    "explanation": [
      "동시 동작을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"해요\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 200,
    "level": "중급",
    "prompt": "약속 장소를 잘 몰라서 지도를 _____ 봤어요.",
    "answer": "찾아",
    "translation": "I looked up the map because I did not know the meeting place well.",
    "choices": [
      "찾고",
      "찾으면",
      "찾지만",
      "찾아"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"찾아\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 201,
    "level": "고급",
    "prompt": "충분히 검토하지 않은 채 결론을 _____ 어렵습니다.",
    "answer": "내리기는",
    "translation": "It is difficult to draw a conclusion without sufficient review.",
    "choices": [
      "내리기는",
      "내리도록",
      "내리느라",
      "내린다면"
    ],
    "explanation": [
      "관용적 문형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"내리기는\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 202,
    "level": "고급",
    "prompt": "자료가 부족한 만큼 추가 조사가 _____ 보입니다.",
    "answer": "필요해",
    "translation": "Since the data is insufficient, additional research seems necessary.",
    "choices": [
      "필요한",
      "필요해",
      "필요하면",
      "필요하지만"
    ],
    "explanation": [
      "추론 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"필요해\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 203,
    "level": "고급",
    "prompt": "문제의 원인을 파악해야 적절한 대책을 _____ 수 있습니다.",
    "answer": "세울",
    "translation": "Only by identifying the cause can we establish proper measures.",
    "choices": [
      "세운",
      "세우는",
      "세울",
      "세우던"
    ],
    "explanation": [
      "조건 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"세울\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 204,
    "level": "고급",
    "prompt": "겉으로는 간단해 보여도 실제로는 고려할 점이 적지 _____.",
    "answer": "않습니다",
    "translation": "Although it seems simple, there are quite a few things to consider.",
    "choices": [
      "아닙니다",
      "없습니다",
      "못합니다",
      "않습니다"
    ],
    "explanation": [
      "부분 부정을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"않습니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 205,
    "level": "고급",
    "prompt": "회의에서는 비용보다 효과를 우선적으로 _____ 했습니다.",
    "answer": "따지기로",
    "translation": "In the meeting, we decided to consider effectiveness before cost.",
    "choices": [
      "따지기로",
      "따지느라",
      "따지다가",
      "따지지만"
    ],
    "explanation": [
      "결정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"따지기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 206,
    "level": "고급",
    "prompt": "그 제안은 현실성이 떨어진다는 점에서 다시 _____ 필요가 있습니다.",
    "answer": "검토할",
    "translation": "The proposal needs to be reviewed again because it lacks feasibility.",
    "choices": [
      "검토한",
      "검토할",
      "검토하는",
      "검토하던"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"검토할\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 207,
    "level": "고급",
    "prompt": "상황이 급하다고 해서 절차를 무시해서는 _____ 됩니다.",
    "answer": "안",
    "translation": "Even if the situation is urgent, procedures must not be ignored.",
    "choices": [
      "못",
      "덜",
      "안",
      "잘"
    ],
    "explanation": [
      "금지 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"안\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 208,
    "level": "고급",
    "prompt": "사용자 입장에서 보면 이 기능은 오히려 혼란을 _____ 수 있습니다.",
    "answer": "줄",
    "translation": "From the user perspective, this feature may actually cause confusion.",
    "choices": [
      "받을",
      "낼",
      "볼",
      "줄"
    ],
    "explanation": [
      "가능성 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"줄\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 209,
    "level": "고급",
    "prompt": "기존 데이터를 그대로 쓰기에는 오류가 너무 많이 _____.",
    "answer": "발견됩니다",
    "translation": "Too many errors are found to use the existing data as is.",
    "choices": [
      "발견됩니다",
      "발견합니다",
      "발견시킵니다",
      "발견해집니다"
    ],
    "explanation": [
      "피동 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"발견됩니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 210,
    "level": "고급",
    "prompt": "정확한 판단을 위해서는 근거를 명확히 _____ 합니다.",
    "answer": "제시해야",
    "translation": "For accurate judgment, evidence must be presented clearly.",
    "choices": [
      "제시해서",
      "제시해야",
      "제시하고",
      "제시하지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"제시해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 211,
    "level": "고급",
    "prompt": "이 표현은 문맥에 따라 다르게 _____ 수 있습니다.",
    "answer": "해석될",
    "translation": "This expression can be interpreted differently depending on context.",
    "choices": [
      "해석한",
      "해석하는",
      "해석될",
      "해석하던"
    ],
    "explanation": [
      "피동 가능을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"해석될\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 212,
    "level": "고급",
    "prompt": "단순히 문항 수를 늘리는 것만으로는 품질을 _____ 어렵습니다.",
    "answer": "보장하기",
    "translation": "It is difficult to guarantee quality simply by increasing the number of questions.",
    "choices": [
      "보장하도록",
      "보장하느라",
      "보장하자마자",
      "보장하기"
    ],
    "explanation": [
      "명사형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보장하기\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 213,
    "level": "고급",
    "prompt": "학습자가 헷갈릴 만한 선택지는 신중하게 _____ 합니다.",
    "answer": "구성해야",
    "translation": "Choices that may confuse learners must be carefully constructed.",
    "choices": [
      "구성해야",
      "구성해서",
      "구성하고",
      "구성하지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"구성해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 214,
    "level": "고급",
    "prompt": "문장이 자연스러운지 확인하려면 실제 사용 맥락을 _____ 봐야 합니다.",
    "answer": "살펴",
    "translation": "To check whether a sentence is natural, you must examine the actual usage context.",
    "choices": [
      "살피고",
      "살펴",
      "살피면",
      "살피지만"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살펴\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 215,
    "level": "고급",
    "prompt": "오류를 줄이려면 생성 후 검수 과정을 반드시 _____ 합니다.",
    "answer": "거쳐야",
    "translation": "To reduce errors, the review process must be performed after generation.",
    "choices": [
      "거쳐서",
      "거치고",
      "거쳐야",
      "거치지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"거쳐야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 216,
    "level": "고급",
    "prompt": "표현이 어색하면 학습자가 잘못된 문형을 _____ 위험이 있습니다.",
    "answer": "익힐",
    "translation": "If expressions are awkward, learners risk acquiring incorrect sentence patterns.",
    "choices": [
      "익힌",
      "익히는",
      "익히던",
      "익힐"
    ],
    "explanation": [
      "위험 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"익힐\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 217,
    "level": "고급",
    "prompt": "그 설명은 핵심을 짚고 있어서 이해하기가 훨씬 _____.",
    "answer": "수월합니다",
    "translation": "That explanation points out the key issue, so it is much easier to understand.",
    "choices": [
      "수월합니다",
      "수월한",
      "수월하게",
      "수월하면"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수월합니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 218,
    "level": "고급",
    "prompt": "예외가 많기 때문에 규칙 하나로 모두 설명하기는 _____.",
    "answer": "어렵습니다",
    "translation": "Because there are many exceptions, it is difficult to explain everything with one rule.",
    "choices": [
      "어려운",
      "어렵습니다",
      "어렵게",
      "어려우면"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"어렵습니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 219,
    "level": "고급",
    "prompt": "초안을 그대로 공개하기보다는 일부 표현을 _____ 좋겠습니다.",
    "answer": "다듬는 편이",
    "translation": "It would be better to polish some expressions rather than publish the draft as is.",
    "choices": [
      "다듬기 위해",
      "다듬느라",
      "다듬는 편이",
      "다듬자마자"
    ],
    "explanation": [
      "선호 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"다듬는 편이\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 220,
    "level": "고급",
    "prompt": "의미가 비슷하더라도 실제 쓰임은 서로 _____ 수 있습니다.",
    "answer": "다를",
    "translation": "Even if meanings are similar, actual usage may differ.",
    "choices": [
      "다른",
      "다르게",
      "다르던",
      "다를"
    ],
    "explanation": [
      "가능성 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"다를\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 221,
    "level": "고급",
    "prompt": "정답이 지나치게 뻔하면 문제로서의 가치가 _____ 됩니다.",
    "answer": "떨어지게",
    "translation": "If the answer is too obvious, the value as a question decreases.",
    "choices": [
      "떨어지게",
      "떨어진",
      "떨어지는",
      "떨어지던"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"떨어지게\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 222,
    "level": "고급",
    "prompt": "이 문항은 조사 선택을 묻는다는 점에서 초급자에게도 _____ 수 있습니다.",
    "answer": "유용할",
    "translation": "This question can be useful even for beginners because it asks about particle choice.",
    "choices": [
      "유용한",
      "유용할",
      "유용하게",
      "유용하던"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"유용할\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 223,
    "level": "고급",
    "prompt": "내용을 확장하되 난이도 구분이 흐려지지 않도록 _____ 합니다.",
    "answer": "관리해야",
    "translation": "Content should be expanded while ensuring difficulty distinctions do not blur.",
    "choices": [
      "관리해서",
      "관리하고",
      "관리해야",
      "관리하지만"
    ],
    "explanation": [
      "관리 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"관리해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 224,
    "level": "고급",
    "prompt": "반복되는 유형은 일부러 선택지를 바꾸어 단조로움을 _____ 했습니다.",
    "answer": "줄이고자",
    "translation": "For repeated types, I changed choices intentionally to reduce monotony.",
    "choices": [
      "줄이느라",
      "줄이자마자",
      "줄이지만",
      "줄이고자"
    ],
    "explanation": [
      "목적 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"줄이고자\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 225,
    "level": "고급",
    "prompt": "검수 기준이 없으면 오류를 발견하더라도 일관되게 _____ 어렵습니다.",
    "answer": "수정하기",
    "translation": "Without review criteria, it is difficult to correct errors consistently even if found.",
    "choices": [
      "수정하기",
      "수정하도록",
      "수정하느라",
      "수정하자마자"
    ],
    "explanation": [
      "명사형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수정하기\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 226,
    "level": "고급",
    "prompt": "실제 서비스에서는 충분히 검토하지 않은 채 결론을 _____ 어렵습니다.",
    "answer": "내리기는",
    "translation": "It is difficult to draw a conclusion without sufficient review.",
    "choices": [
      "내리도록",
      "내리기는",
      "내리느라",
      "내린다면"
    ],
    "explanation": [
      "관용적 문형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"내리기는\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 227,
    "level": "고급",
    "prompt": "실제 서비스에서는 자료가 부족한 만큼 추가 조사가 _____ 보입니다.",
    "answer": "필요해",
    "translation": "Since the data is insufficient, additional research seems necessary.",
    "choices": [
      "필요한",
      "필요하면",
      "필요해",
      "필요하지만"
    ],
    "explanation": [
      "추론 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"필요해\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 228,
    "level": "고급",
    "prompt": "실제 서비스에서는 문제의 원인을 파악해야 적절한 대책을 _____ 수 있습니다.",
    "answer": "세울",
    "translation": "Only by identifying the cause can we establish proper measures.",
    "choices": [
      "세운",
      "세우는",
      "세우던",
      "세울"
    ],
    "explanation": [
      "조건 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"세울\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 229,
    "level": "고급",
    "prompt": "실제 서비스에서는 겉으로는 간단해 보여도 실제로는 고려할 점이 적지 _____.",
    "answer": "않습니다",
    "translation": "Although it seems simple, there are quite a few things to consider.",
    "choices": [
      "않습니다",
      "아닙니다",
      "없습니다",
      "못합니다"
    ],
    "explanation": [
      "부분 부정을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"않습니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 230,
    "level": "고급",
    "prompt": "실제 서비스에서는 회의에서는 비용보다 효과를 우선적으로 _____ 했습니다.",
    "answer": "따지기로",
    "translation": "In the meeting, we decided to consider effectiveness before cost.",
    "choices": [
      "따지느라",
      "따지기로",
      "따지다가",
      "따지지만"
    ],
    "explanation": [
      "결정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"따지기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 231,
    "level": "고급",
    "prompt": "실제 서비스에서는 그 제안은 현실성이 떨어진다는 점에서 다시 _____ 필요가 있습니다.",
    "answer": "검토할",
    "translation": "The proposal needs to be reviewed again because it lacks feasibility.",
    "choices": [
      "검토한",
      "검토하는",
      "검토할",
      "검토하던"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"검토할\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 232,
    "level": "고급",
    "prompt": "실제 서비스에서는 상황이 급하다고 해서 절차를 무시해서는 _____ 됩니다.",
    "answer": "안",
    "translation": "Even if the situation is urgent, procedures must not be ignored.",
    "choices": [
      "못",
      "덜",
      "잘",
      "안"
    ],
    "explanation": [
      "금지 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"안\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 233,
    "level": "고급",
    "prompt": "실제 서비스에서는 사용자 입장에서 보면 이 기능은 오히려 혼란을 _____ 수 있습니다.",
    "answer": "줄",
    "translation": "From the user perspective, this feature may actually cause confusion.",
    "choices": [
      "줄",
      "받을",
      "낼",
      "볼"
    ],
    "explanation": [
      "가능성 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"줄\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 234,
    "level": "고급",
    "prompt": "실제 서비스에서는 기존 데이터를 그대로 쓰기에는 오류가 너무 많이 _____.",
    "answer": "발견됩니다",
    "translation": "Too many errors are found to use the existing data as is.",
    "choices": [
      "발견합니다",
      "발견됩니다",
      "발견시킵니다",
      "발견해집니다"
    ],
    "explanation": [
      "피동 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"발견됩니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 235,
    "level": "고급",
    "prompt": "실제 서비스에서는 정확한 판단을 위해서는 근거를 명확히 _____ 합니다.",
    "answer": "제시해야",
    "translation": "For accurate judgment, evidence must be presented clearly.",
    "choices": [
      "제시해서",
      "제시하고",
      "제시해야",
      "제시하지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"제시해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 236,
    "level": "고급",
    "prompt": "실제 서비스에서는 이 표현은 문맥에 따라 다르게 _____ 수 있습니다.",
    "answer": "해석될",
    "translation": "This expression can be interpreted differently depending on context.",
    "choices": [
      "해석한",
      "해석하는",
      "해석하던",
      "해석될"
    ],
    "explanation": [
      "피동 가능을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"해석될\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 237,
    "level": "고급",
    "prompt": "실제 서비스에서는 단순히 문항 수를 늘리는 것만으로는 품질을 _____ 어렵습니다.",
    "answer": "보장하기",
    "translation": "It is difficult to guarantee quality simply by increasing the number of questions.",
    "choices": [
      "보장하기",
      "보장하도록",
      "보장하느라",
      "보장하자마자"
    ],
    "explanation": [
      "명사형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보장하기\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 238,
    "level": "고급",
    "prompt": "실제 서비스에서는 학습자가 헷갈릴 만한 선택지는 신중하게 _____ 합니다.",
    "answer": "구성해야",
    "translation": "Choices that may confuse learners must be carefully constructed.",
    "choices": [
      "구성해서",
      "구성해야",
      "구성하고",
      "구성하지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"구성해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 239,
    "level": "고급",
    "prompt": "실제 서비스에서는 문장이 자연스러운지 확인하려면 실제 사용 맥락을 _____ 봐야 합니다.",
    "answer": "살펴",
    "translation": "To check whether a sentence is natural, you must examine the actual usage context.",
    "choices": [
      "살피고",
      "살피면",
      "살펴",
      "살피지만"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살펴\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 240,
    "level": "고급",
    "prompt": "실제 서비스에서는 오류를 줄이려면 생성 후 검수 과정을 반드시 _____ 합니다.",
    "answer": "거쳐야",
    "translation": "To reduce errors, the review process must be performed after generation.",
    "choices": [
      "거쳐서",
      "거치고",
      "거치지만",
      "거쳐야"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"거쳐야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 241,
    "level": "고급",
    "prompt": "실제 서비스에서는 표현이 어색하면 학습자가 잘못된 문형을 _____ 위험이 있습니다.",
    "answer": "익힐",
    "translation": "If expressions are awkward, learners risk acquiring incorrect sentence patterns.",
    "choices": [
      "익힐",
      "익힌",
      "익히는",
      "익히던"
    ],
    "explanation": [
      "위험 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"익힐\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 242,
    "level": "고급",
    "prompt": "실제 서비스에서는 그 설명은 핵심을 짚고 있어서 이해하기가 훨씬 _____.",
    "answer": "수월합니다",
    "translation": "That explanation points out the key issue, so it is much easier to understand.",
    "choices": [
      "수월한",
      "수월합니다",
      "수월하게",
      "수월하면"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수월합니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 243,
    "level": "고급",
    "prompt": "실제 서비스에서는 예외가 많기 때문에 규칙 하나로 모두 설명하기는 _____.",
    "answer": "어렵습니다",
    "translation": "Because there are many exceptions, it is difficult to explain everything with one rule.",
    "choices": [
      "어려운",
      "어렵게",
      "어렵습니다",
      "어려우면"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"어렵습니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 244,
    "level": "고급",
    "prompt": "실제 서비스에서는 초안을 그대로 공개하기보다는 일부 표현을 _____ 좋겠습니다.",
    "answer": "다듬는 편이",
    "translation": "It would be better to polish some expressions rather than publish the draft as is.",
    "choices": [
      "다듬기 위해",
      "다듬느라",
      "다듬자마자",
      "다듬는 편이"
    ],
    "explanation": [
      "선호 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"다듬는 편이\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 245,
    "level": "고급",
    "prompt": "실제 서비스에서는 의미가 비슷하더라도 실제 쓰임은 서로 _____ 수 있습니다.",
    "answer": "다를",
    "translation": "Even if meanings are similar, actual usage may differ.",
    "choices": [
      "다를",
      "다른",
      "다르게",
      "다르던"
    ],
    "explanation": [
      "가능성 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"다를\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 246,
    "level": "고급",
    "prompt": "실제 서비스에서는 정답이 지나치게 뻔하면 문제로서의 가치가 _____ 됩니다.",
    "answer": "떨어지게",
    "translation": "If the answer is too obvious, the value as a question decreases.",
    "choices": [
      "떨어진",
      "떨어지게",
      "떨어지는",
      "떨어지던"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"떨어지게\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 247,
    "level": "고급",
    "prompt": "실제 서비스에서는 이 문항은 조사 선택을 묻는다는 점에서 초급자에게도 _____ 수 있습니다.",
    "answer": "유용할",
    "translation": "This question can be useful even for beginners because it asks about particle choice.",
    "choices": [
      "유용한",
      "유용하게",
      "유용할",
      "유용하던"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"유용할\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 248,
    "level": "고급",
    "prompt": "실제 서비스에서는 내용을 확장하되 난이도 구분이 흐려지지 않도록 _____ 합니다.",
    "answer": "관리해야",
    "translation": "Content should be expanded while ensuring difficulty distinctions do not blur.",
    "choices": [
      "관리해서",
      "관리하고",
      "관리하지만",
      "관리해야"
    ],
    "explanation": [
      "관리 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"관리해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 249,
    "level": "고급",
    "prompt": "실제 서비스에서는 반복되는 유형은 일부러 선택지를 바꾸어 단조로움을 _____ 했습니다.",
    "answer": "줄이고자",
    "translation": "For repeated types, I changed choices intentionally to reduce monotony.",
    "choices": [
      "줄이고자",
      "줄이느라",
      "줄이자마자",
      "줄이지만"
    ],
    "explanation": [
      "목적 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"줄이고자\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 250,
    "level": "고급",
    "prompt": "실제 서비스에서는 검수 기준이 없으면 오류를 발견하더라도 일관되게 _____ 어렵습니다.",
    "answer": "수정하기",
    "translation": "Without review criteria, it is difficult to correct errors consistently even if found.",
    "choices": [
      "수정하도록",
      "수정하기",
      "수정하느라",
      "수정하자마자"
    ],
    "explanation": [
      "명사형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수정하기\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 251,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 충분히 검토하지 않은 채 결론을 _____ 어렵습니다.",
    "answer": "내리기는",
    "translation": "It is difficult to draw a conclusion without sufficient review.",
    "choices": [
      "내리도록",
      "내리느라",
      "내리기는",
      "내린다면"
    ],
    "explanation": [
      "관용적 문형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"내리기는\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 252,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 자료가 부족한 만큼 추가 조사가 _____ 보입니다.",
    "answer": "필요해",
    "translation": "Since the data is insufficient, additional research seems necessary.",
    "choices": [
      "필요한",
      "필요하면",
      "필요하지만",
      "필요해"
    ],
    "explanation": [
      "추론 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"필요해\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 253,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 문제의 원인을 파악해야 적절한 대책을 _____ 수 있습니다.",
    "answer": "세울",
    "translation": "Only by identifying the cause can we establish proper measures.",
    "choices": [
      "세울",
      "세운",
      "세우는",
      "세우던"
    ],
    "explanation": [
      "조건 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"세울\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 254,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 겉으로는 간단해 보여도 실제로는 고려할 점이 적지 _____.",
    "answer": "않습니다",
    "translation": "Although it seems simple, there are quite a few things to consider.",
    "choices": [
      "아닙니다",
      "않습니다",
      "없습니다",
      "못합니다"
    ],
    "explanation": [
      "부분 부정을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"않습니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 255,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 회의에서는 비용보다 효과를 우선적으로 _____ 했습니다.",
    "answer": "따지기로",
    "translation": "In the meeting, we decided to consider effectiveness before cost.",
    "choices": [
      "따지느라",
      "따지다가",
      "따지기로",
      "따지지만"
    ],
    "explanation": [
      "결정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"따지기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 256,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 그 제안은 현실성이 떨어진다는 점에서 다시 _____ 필요가 있습니다.",
    "answer": "검토할",
    "translation": "The proposal needs to be reviewed again because it lacks feasibility.",
    "choices": [
      "검토한",
      "검토하는",
      "검토하던",
      "검토할"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"검토할\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 257,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 상황이 급하다고 해서 절차를 무시해서는 _____ 됩니다.",
    "answer": "안",
    "translation": "Even if the situation is urgent, procedures must not be ignored.",
    "choices": [
      "안",
      "못",
      "덜",
      "잘"
    ],
    "explanation": [
      "금지 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"안\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 258,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 사용자 입장에서 보면 이 기능은 오히려 혼란을 _____ 수 있습니다.",
    "answer": "줄",
    "translation": "From the user perspective, this feature may actually cause confusion.",
    "choices": [
      "받을",
      "줄",
      "낼",
      "볼"
    ],
    "explanation": [
      "가능성 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"줄\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 259,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 기존 데이터를 그대로 쓰기에는 오류가 너무 많이 _____.",
    "answer": "발견됩니다",
    "translation": "Too many errors are found to use the existing data as is.",
    "choices": [
      "발견합니다",
      "발견시킵니다",
      "발견됩니다",
      "발견해집니다"
    ],
    "explanation": [
      "피동 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"발견됩니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 260,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 정확한 판단을 위해서는 근거를 명확히 _____ 합니다.",
    "answer": "제시해야",
    "translation": "For accurate judgment, evidence must be presented clearly.",
    "choices": [
      "제시해서",
      "제시하고",
      "제시하지만",
      "제시해야"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"제시해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 261,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 이 표현은 문맥에 따라 다르게 _____ 수 있습니다.",
    "answer": "해석될",
    "translation": "This expression can be interpreted differently depending on context.",
    "choices": [
      "해석될",
      "해석한",
      "해석하는",
      "해석하던"
    ],
    "explanation": [
      "피동 가능을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"해석될\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 262,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 단순히 문항 수를 늘리는 것만으로는 품질을 _____ 어렵습니다.",
    "answer": "보장하기",
    "translation": "It is difficult to guarantee quality simply by increasing the number of questions.",
    "choices": [
      "보장하도록",
      "보장하기",
      "보장하느라",
      "보장하자마자"
    ],
    "explanation": [
      "명사형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보장하기\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 263,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 학습자가 헷갈릴 만한 선택지는 신중하게 _____ 합니다.",
    "answer": "구성해야",
    "translation": "Choices that may confuse learners must be carefully constructed.",
    "choices": [
      "구성해서",
      "구성하고",
      "구성해야",
      "구성하지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"구성해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 264,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 문장이 자연스러운지 확인하려면 실제 사용 맥락을 _____ 봐야 합니다.",
    "answer": "살펴",
    "translation": "To check whether a sentence is natural, you must examine the actual usage context.",
    "choices": [
      "살피고",
      "살피면",
      "살피지만",
      "살펴"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살펴\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 265,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 오류를 줄이려면 생성 후 검수 과정을 반드시 _____ 합니다.",
    "answer": "거쳐야",
    "translation": "To reduce errors, the review process must be performed after generation.",
    "choices": [
      "거쳐야",
      "거쳐서",
      "거치고",
      "거치지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"거쳐야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 266,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 표현이 어색하면 학습자가 잘못된 문형을 _____ 위험이 있습니다.",
    "answer": "익힐",
    "translation": "If expressions are awkward, learners risk acquiring incorrect sentence patterns.",
    "choices": [
      "익힌",
      "익힐",
      "익히는",
      "익히던"
    ],
    "explanation": [
      "위험 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"익힐\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 267,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 그 설명은 핵심을 짚고 있어서 이해하기가 훨씬 _____.",
    "answer": "수월합니다",
    "translation": "That explanation points out the key issue, so it is much easier to understand.",
    "choices": [
      "수월한",
      "수월하게",
      "수월합니다",
      "수월하면"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수월합니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 268,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 예외가 많기 때문에 규칙 하나로 모두 설명하기는 _____.",
    "answer": "어렵습니다",
    "translation": "Because there are many exceptions, it is difficult to explain everything with one rule.",
    "choices": [
      "어려운",
      "어렵게",
      "어려우면",
      "어렵습니다"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"어렵습니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 269,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 초안을 그대로 공개하기보다는 일부 표현을 _____ 좋겠습니다.",
    "answer": "다듬는 편이",
    "translation": "It would be better to polish some expressions rather than publish the draft as is.",
    "choices": [
      "다듬는 편이",
      "다듬기 위해",
      "다듬느라",
      "다듬자마자"
    ],
    "explanation": [
      "선호 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"다듬는 편이\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 270,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 의미가 비슷하더라도 실제 쓰임은 서로 _____ 수 있습니다.",
    "answer": "다를",
    "translation": "Even if meanings are similar, actual usage may differ.",
    "choices": [
      "다른",
      "다를",
      "다르게",
      "다르던"
    ],
    "explanation": [
      "가능성 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"다를\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 271,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 정답이 지나치게 뻔하면 문제로서의 가치가 _____ 됩니다.",
    "answer": "떨어지게",
    "translation": "If the answer is too obvious, the value as a question decreases.",
    "choices": [
      "떨어진",
      "떨어지는",
      "떨어지게",
      "떨어지던"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"떨어지게\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 272,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 이 문항은 조사 선택을 묻는다는 점에서 초급자에게도 _____ 수 있습니다.",
    "answer": "유용할",
    "translation": "This question can be useful even for beginners because it asks about particle choice.",
    "choices": [
      "유용한",
      "유용하게",
      "유용하던",
      "유용할"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"유용할\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 273,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 내용을 확장하되 난이도 구분이 흐려지지 않도록 _____ 합니다.",
    "answer": "관리해야",
    "translation": "Content should be expanded while ensuring difficulty distinctions do not blur.",
    "choices": [
      "관리해야",
      "관리해서",
      "관리하고",
      "관리하지만"
    ],
    "explanation": [
      "관리 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"관리해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 274,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 반복되는 유형은 일부러 선택지를 바꾸어 단조로움을 _____ 했습니다.",
    "answer": "줄이고자",
    "translation": "For repeated types, I changed choices intentionally to reduce monotony.",
    "choices": [
      "줄이느라",
      "줄이고자",
      "줄이자마자",
      "줄이지만"
    ],
    "explanation": [
      "목적 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"줄이고자\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 275,
    "level": "고급",
    "prompt": "학습 콘텐츠에서는 검수 기준이 없으면 오류를 발견하더라도 일관되게 _____ 어렵습니다.",
    "answer": "수정하기",
    "translation": "Without review criteria, it is difficult to correct errors consistently even if found.",
    "choices": [
      "수정하도록",
      "수정하느라",
      "수정하기",
      "수정하자마자"
    ],
    "explanation": [
      "명사형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수정하기\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 276,
    "level": "고급",
    "prompt": "검수 과정에서는 충분히 검토하지 않은 채 결론을 _____ 어렵습니다.",
    "answer": "내리기는",
    "translation": "It is difficult to draw a conclusion without sufficient review.",
    "choices": [
      "내리도록",
      "내리느라",
      "내린다면",
      "내리기는"
    ],
    "explanation": [
      "관용적 문형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"내리기는\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 277,
    "level": "고급",
    "prompt": "검수 과정에서는 자료가 부족한 만큼 추가 조사가 _____ 보입니다.",
    "answer": "필요해",
    "translation": "Since the data is insufficient, additional research seems necessary.",
    "choices": [
      "필요해",
      "필요한",
      "필요하면",
      "필요하지만"
    ],
    "explanation": [
      "추론 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"필요해\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 278,
    "level": "고급",
    "prompt": "검수 과정에서는 문제의 원인을 파악해야 적절한 대책을 _____ 수 있습니다.",
    "answer": "세울",
    "translation": "Only by identifying the cause can we establish proper measures.",
    "choices": [
      "세운",
      "세울",
      "세우는",
      "세우던"
    ],
    "explanation": [
      "조건 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"세울\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 279,
    "level": "고급",
    "prompt": "검수 과정에서는 겉으로는 간단해 보여도 실제로는 고려할 점이 적지 _____.",
    "answer": "않습니다",
    "translation": "Although it seems simple, there are quite a few things to consider.",
    "choices": [
      "아닙니다",
      "없습니다",
      "않습니다",
      "못합니다"
    ],
    "explanation": [
      "부분 부정을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"않습니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 280,
    "level": "고급",
    "prompt": "검수 과정에서는 회의에서는 비용보다 효과를 우선적으로 _____ 했습니다.",
    "answer": "따지기로",
    "translation": "In the meeting, we decided to consider effectiveness before cost.",
    "choices": [
      "따지느라",
      "따지다가",
      "따지지만",
      "따지기로"
    ],
    "explanation": [
      "결정 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"따지기로\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 281,
    "level": "고급",
    "prompt": "검수 과정에서는 그 제안은 현실성이 떨어진다는 점에서 다시 _____ 필요가 있습니다.",
    "answer": "검토할",
    "translation": "The proposal needs to be reviewed again because it lacks feasibility.",
    "choices": [
      "검토할",
      "검토한",
      "검토하는",
      "검토하던"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"검토할\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 282,
    "level": "고급",
    "prompt": "검수 과정에서는 상황이 급하다고 해서 절차를 무시해서는 _____ 됩니다.",
    "answer": "안",
    "translation": "Even if the situation is urgent, procedures must not be ignored.",
    "choices": [
      "못",
      "안",
      "덜",
      "잘"
    ],
    "explanation": [
      "금지 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"안\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 283,
    "level": "고급",
    "prompt": "검수 과정에서는 사용자 입장에서 보면 이 기능은 오히려 혼란을 _____ 수 있습니다.",
    "answer": "줄",
    "translation": "From the user perspective, this feature may actually cause confusion.",
    "choices": [
      "받을",
      "낼",
      "줄",
      "볼"
    ],
    "explanation": [
      "가능성 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"줄\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 284,
    "level": "고급",
    "prompt": "검수 과정에서는 기존 데이터를 그대로 쓰기에는 오류가 너무 많이 _____.",
    "answer": "발견됩니다",
    "translation": "Too many errors are found to use the existing data as is.",
    "choices": [
      "발견합니다",
      "발견시킵니다",
      "발견해집니다",
      "발견됩니다"
    ],
    "explanation": [
      "피동 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"발견됩니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 285,
    "level": "고급",
    "prompt": "검수 과정에서는 정확한 판단을 위해서는 근거를 명확히 _____ 합니다.",
    "answer": "제시해야",
    "translation": "For accurate judgment, evidence must be presented clearly.",
    "choices": [
      "제시해야",
      "제시해서",
      "제시하고",
      "제시하지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"제시해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 286,
    "level": "고급",
    "prompt": "검수 과정에서는 이 표현은 문맥에 따라 다르게 _____ 수 있습니다.",
    "answer": "해석될",
    "translation": "This expression can be interpreted differently depending on context.",
    "choices": [
      "해석한",
      "해석될",
      "해석하는",
      "해석하던"
    ],
    "explanation": [
      "피동 가능을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"해석될\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 287,
    "level": "고급",
    "prompt": "검수 과정에서는 단순히 문항 수를 늘리는 것만으로는 품질을 _____ 어렵습니다.",
    "answer": "보장하기",
    "translation": "It is difficult to guarantee quality simply by increasing the number of questions.",
    "choices": [
      "보장하도록",
      "보장하느라",
      "보장하기",
      "보장하자마자"
    ],
    "explanation": [
      "명사형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"보장하기\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 288,
    "level": "고급",
    "prompt": "검수 과정에서는 학습자가 헷갈릴 만한 선택지는 신중하게 _____ 합니다.",
    "answer": "구성해야",
    "translation": "Choices that may confuse learners must be carefully constructed.",
    "choices": [
      "구성해서",
      "구성하고",
      "구성하지만",
      "구성해야"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"구성해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 289,
    "level": "고급",
    "prompt": "검수 과정에서는 문장이 자연스러운지 확인하려면 실제 사용 맥락을 _____ 봐야 합니다.",
    "answer": "살펴",
    "translation": "To check whether a sentence is natural, you must examine the actual usage context.",
    "choices": [
      "살펴",
      "살피고",
      "살피면",
      "살피지만"
    ],
    "explanation": [
      "시도 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"살펴\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 290,
    "level": "고급",
    "prompt": "검수 과정에서는 오류를 줄이려면 생성 후 검수 과정을 반드시 _____ 합니다.",
    "answer": "거쳐야",
    "translation": "To reduce errors, the review process must be performed after generation.",
    "choices": [
      "거쳐서",
      "거쳐야",
      "거치고",
      "거치지만"
    ],
    "explanation": [
      "의무 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"거쳐야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 291,
    "level": "고급",
    "prompt": "검수 과정에서는 표현이 어색하면 학습자가 잘못된 문형을 _____ 위험이 있습니다.",
    "answer": "익힐",
    "translation": "If expressions are awkward, learners risk acquiring incorrect sentence patterns.",
    "choices": [
      "익힌",
      "익히는",
      "익힐",
      "익히던"
    ],
    "explanation": [
      "위험 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"익힐\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 292,
    "level": "고급",
    "prompt": "검수 과정에서는 그 설명은 핵심을 짚고 있어서 이해하기가 훨씬 _____.",
    "answer": "수월합니다",
    "translation": "That explanation points out the key issue, so it is much easier to understand.",
    "choices": [
      "수월한",
      "수월하게",
      "수월하면",
      "수월합니다"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수월합니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 293,
    "level": "고급",
    "prompt": "검수 과정에서는 예외가 많기 때문에 규칙 하나로 모두 설명하기는 _____.",
    "answer": "어렵습니다",
    "translation": "Because there are many exceptions, it is difficult to explain everything with one rule.",
    "choices": [
      "어렵습니다",
      "어려운",
      "어렵게",
      "어려우면"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"어렵습니다\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 294,
    "level": "고급",
    "prompt": "검수 과정에서는 초안을 그대로 공개하기보다는 일부 표현을 _____ 좋겠습니다.",
    "answer": "다듬는 편이",
    "translation": "It would be better to polish some expressions rather than publish the draft as is.",
    "choices": [
      "다듬기 위해",
      "다듬는 편이",
      "다듬느라",
      "다듬자마자"
    ],
    "explanation": [
      "선호 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"다듬는 편이\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 295,
    "level": "고급",
    "prompt": "검수 과정에서는 의미가 비슷하더라도 실제 쓰임은 서로 _____ 수 있습니다.",
    "answer": "다를",
    "translation": "Even if meanings are similar, actual usage may differ.",
    "choices": [
      "다른",
      "다르게",
      "다를",
      "다르던"
    ],
    "explanation": [
      "가능성 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"다를\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 296,
    "level": "고급",
    "prompt": "검수 과정에서는 정답이 지나치게 뻔하면 문제로서의 가치가 _____ 됩니다.",
    "answer": "떨어지게",
    "translation": "If the answer is too obvious, the value as a question decreases.",
    "choices": [
      "떨어진",
      "떨어지는",
      "떨어지던",
      "떨어지게"
    ],
    "explanation": [
      "결과 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"떨어지게\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 297,
    "level": "고급",
    "prompt": "검수 과정에서는 이 문항은 조사 선택을 묻는다는 점에서 초급자에게도 _____ 수 있습니다.",
    "answer": "유용할",
    "translation": "This question can be useful even for beginners because it asks about particle choice.",
    "choices": [
      "유용할",
      "유용한",
      "유용하게",
      "유용하던"
    ],
    "explanation": [
      "평가 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"유용할\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 298,
    "level": "고급",
    "prompt": "검수 과정에서는 내용을 확장하되 난이도 구분이 흐려지지 않도록 _____ 합니다.",
    "answer": "관리해야",
    "translation": "Content should be expanded while ensuring difficulty distinctions do not blur.",
    "choices": [
      "관리해서",
      "관리해야",
      "관리하고",
      "관리하지만"
    ],
    "explanation": [
      "관리 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"관리해야\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 299,
    "level": "고급",
    "prompt": "검수 과정에서는 반복되는 유형은 일부러 선택지를 바꾸어 단조로움을 _____ 했습니다.",
    "answer": "줄이고자",
    "translation": "For repeated types, I changed choices intentionally to reduce monotony.",
    "choices": [
      "줄이느라",
      "줄이자마자",
      "줄이고자",
      "줄이지만"
    ],
    "explanation": [
      "목적 표현을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"줄이고자\"가 가장 자연스럽습니다."
    ]
  },
  {
    "id": 300,
    "level": "고급",
    "prompt": "검수 과정에서는 검수 기준이 없으면 오류를 발견하더라도 일관되게 _____ 어렵습니다.",
    "answer": "수정하기",
    "translation": "Without review criteria, it is difficult to correct errors consistently even if found.",
    "choices": [
      "수정하도록",
      "수정하느라",
      "수정하자마자",
      "수정하기"
    ],
    "explanation": [
      "명사형을 확인하는 문제입니다.",
      "문맥상 빈칸에는 \"수정하기\"가 가장 자연스럽습니다."
    ]
  }
];

