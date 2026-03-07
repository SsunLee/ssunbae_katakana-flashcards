export interface EnglishSentenceQuiz {
  id: number;
  prompt: string;
  answer: string;
  translation: string;
  choices: string[];
  explanation: string[];
}

export const ENGLISH_SENTENCE_QUIZ: EnglishSentenceQuiz[] = [
  {
    id: 1,
    prompt: "He _____ here three years ago.",
    answer: "worked",
    translation: "그는 3년 전에 여기서 일했다.",
    choices: ["working", "worked", "worker", "to work"],
    explanation: [
      "three years ago가 있으므로 과거 시제를 써야 합니다.",
      "주어 뒤 빈칸에는 동사 과거형이 들어가야 합니다.",
      "정답은 worked 입니다.",
    ],
  },
  {
    id: 2,
    prompt: "She _____ to school every morning.",
    answer: "walks",
    translation: "그녀는 매일 아침 학교에 걸어간다.",
    choices: ["walk", "walks", "walked", "walking"],
    explanation: [
      "every morning은 현재의 반복 습관을 나타냅니다.",
      "주어가 she이므로 일반동사에 -s가 붙습니다.",
      "정답은 walks 입니다.",
    ],
  },
  {
    id: 3,
    prompt: "We _____ dinner when the phone rang.",
    answer: "were having",
    translation: "전화가 울렸을 때 우리는 저녁을 먹고 있었다.",
    choices: ["had", "were having", "have", "are having"],
    explanation: [
      "한 동작이 진행 중일 때 다른 사건이 끼어든 상황입니다.",
      "진행 중이던 과거 동작은 과거진행형을 씁니다.",
      "정답은 were having 입니다.",
    ],
  },
  {
    id: 4,
    prompt: "If it rains tomorrow, we _____ at home.",
    answer: "will stay",
    translation: "내일 비가 오면 우리는 집에 있을 것이다.",
    choices: ["stayed", "stay", "will stay", "are staying"],
    explanation: [
      "if절이 현재시제이면 주절은 미래 표현을 자주 씁니다.",
      "조건의 결과를 말하므로 will stay가 자연스럽습니다.",
      "정답은 will stay 입니다.",
    ],
  },
  {
    id: 5,
    prompt: "This book is _____ than that one.",
    answer: "more interesting",
    translation: "이 책은 저 책보다 더 흥미롭다.",
    choices: ["interest", "interesting", "more interesting", "most interesting"],
    explanation: [
      "than이 있으므로 비교급이 필요합니다.",
      "interesting은 긴 형용사라 more를 붙여 비교급을 만듭니다.",
      "정답은 more interesting 입니다.",
    ],
  },
  {
    id: 6,
    prompt: "I don't have _____ money with me.",
    answer: "much",
    translation: "나는 지금 돈을 많이 가지고 있지 않다.",
    choices: ["many", "much", "a few", "several"],
    explanation: [
      "money는 셀 수 없는 명사입니다.",
      "부정문에서 셀 수 없는 양을 말할 때 much를 씁니다.",
      "정답은 much 입니다.",
    ],
  },
  {
    id: 7,
    prompt: "My brother is good _____ playing the piano.",
    answer: "at",
    translation: "내 남동생은 피아노를 잘 친다.",
    choices: ["to", "for", "at", "with"],
    explanation: [
      "be good at은 '~을 잘하다'라는 고정 표현입니다.",
      "전치사는 at이 와야 합니다.",
      "정답은 at 입니다.",
    ],
  },
  {
    id: 8,
    prompt: "The movie was so _____ that everyone laughed.",
    answer: "funny",
    translation: "그 영화는 너무 웃겨서 모두가 웃었다.",
    choices: ["fun", "funny", "funnily", "funnier"],
    explanation: [
      "be동사 뒤에는 형용사가 와야 합니다.",
      "영화의 성질을 설명하므로 funny가 적절합니다.",
      "정답은 funny 입니다.",
    ],
  },
  {
    id: 9,
    prompt: "She has lived in Seoul _____ 2019.",
    answer: "since",
    translation: "그녀는 2019년부터 서울에 살고 있다.",
    choices: ["for", "since", "during", "from"],
    explanation: [
      "2019처럼 시작 시점을 말할 때는 since를 씁니다.",
      "for는 기간, since는 시작 시점에 씁니다.",
      "정답은 since 입니다.",
    ],
  },
  {
    id: 10,
    prompt: "You _____ wear a seat belt while driving.",
    answer: "must",
    translation: "운전할 때는 안전벨트를 반드시 착용해야 한다.",
    choices: ["must", "might", "would", "could"],
    explanation: [
      "의무나 강한 필요를 말할 때 must를 씁니다.",
      "문맥상 선택이 아니라 규칙에 가깝습니다.",
      "정답은 must 입니다.",
    ],
  },
  {
    id: 11,
    prompt: "There aren't _____ apples left in the basket.",
    answer: "any",
    translation: "바구니에는 사과가 하나도 남아 있지 않다.",
    choices: ["some", "any", "much", "another"],
    explanation: [
      "부정문에서는 보통 some 대신 any를 씁니다.",
      "apples는 복수 셀 수 있는 명사입니다.",
      "정답은 any 입니다.",
    ],
  },
  {
    id: 12,
    prompt: "I was tired, _____ I finished the work.",
    answer: "but",
    translation: "나는 피곤했지만 그 일을 끝냈다.",
    choices: ["because", "but", "so", "unless"],
    explanation: [
      "앞뒤 의미가 반대이므로 역접 연결어가 필요합니다.",
      "피곤했지만 끝냈다는 뜻이므로 but이 맞습니다.",
      "정답은 but 입니다.",
    ],
  },
  {
    id: 13,
    prompt: "The teacher asked us _____ quiet.",
    answer: "to be",
    translation: "선생님은 우리에게 조용히 하라고 말했다.",
    choices: ["be", "being", "to be", "been"],
    explanation: [
      "ask + 목적어 + to부정사 구조를 씁니다.",
      "따라서 to be가 와야 문장이 완성됩니다.",
      "정답은 to be 입니다.",
    ],
  },
  {
    id: 14,
    prompt: "This is the best cake I have ever _____.",
    answer: "tasted",
    translation: "이것은 내가 이제까지 맛본 것 중 가장 맛있는 케이크다.",
    choices: ["taste", "tasted", "tasting", "to taste"],
    explanation: [
      "have ever 뒤에는 과거분사가 와야 현재완료가 됩니다.",
      "taste의 과거분사는 tasted입니다.",
      "정답은 tasted 입니다.",
    ],
  },
  {
    id: 15,
    prompt: "Neither my sister nor I _____ ready yet.",
    answer: "am",
    translation: "내 여동생도 나도 아직 준비되지 않았다.",
    choices: ["is", "are", "am", "be"],
    explanation: [
      "neither A nor B에서는 B에 가까운 주어에 동사를 맞추는 경우가 많습니다.",
      "I와 연결되므로 am이 자연스럽습니다.",
      "정답은 am 입니다.",
    ],
  },
];
