// app/data/korean-words.ts

export type KoreanWord = {
  id: number;
  word: string;          // 한글 단어
  meaning: string;       // 영어/일본어 뜻
  pronunciation?: string; // 발음 (필요시)
  example?: string;      // 예문
  category?: string;     // 카테고리 (기초, 중급 등)
  hanja?: string;        // 한자 표기 (있는 경우)
};

/** 외국인을 위한 기초 한국어 단어 50개 */
export const KOREAN_WORDS: KoreanWord[] = [
  // 인사 & 기본 표현
  {
    id: 1,
    word: "안녕하세요",
    meaning: "Hello / こんにちは",
    pronunciation: "annyeonghaseyo",
    example: "안녕하세요? 만나서 반갑습니다.",
    category: "인사"
  },
  {
    id: 2,
    word: "감사합니다",
    meaning: "Thank you / ありがとうございます",
    pronunciation: "gamsahamnida",
    example: "도와주셔서 감사합니다.",
    category: "인사"
  },
  {
    id: 3,
    word: "죄송합니다",
    meaning: "I'm sorry / すみません",
    pronunciation: "joesonghamnida",
    example: "늦어서 죄송합니다.",
    category: "인사"
  },
  {
    id: 4,
    word: "네",
    meaning: "Yes / はい",
    pronunciation: "ne",
    example: "네, 알겠습니다.",
    category: "기본"
  },
  {
    id: 5,
    word: "아니요",
    meaning: "No / いいえ",
    pronunciation: "aniyo",
    example: "아니요, 괜찮습니다.",
    category: "기본"
  },

  // 숫자
  {
    id: 6,
    word: "하나",
    meaning: "One / 一つ",
    pronunciation: "hana",
    example: "사과 하나 주세요.",
    category: "숫자"
  },
  {
    id: 7,
    word: "둘",
    meaning: "Two / 二つ",
    pronunciation: "dul",
    example: "커피 둘이요.",
    category: "숫자"
  },
  {
    id: 8,
    word: "셋",
    meaning: "Three / 三つ",
    pronunciation: "set",
    example: "친구가 셋 있어요.",
    category: "숫자"
  },

  // 가족
  {
    id: 9,
    word: "가족",
    meaning: "Family / 家族",
    pronunciation: "gajok",
    hanja: "家族",
    example: "우리 가족은 네 명입니다.",
    category: "가족"
  },
  {
    id: 10,
    word: "어머니",
    meaning: "Mother / お母さん",
    pronunciation: "eomeoni",
    example: "어머니께서 요리하세요.",
    category: "가족"
  },
  {
    id: 11,
    word: "아버지",
    meaning: "Father / お父さん",
    pronunciation: "abeoji",
    example: "아버지는 회사원이에요.",
    category: "가족"
  },

  // 음식
  {
    id: 12,
    word: "밥",
    meaning: "Rice / ご飯",
    pronunciation: "bap",
    example: "밥 먹었어요?",
    category: "음식"
  },
  {
    id: 13,
    word: "김치",
    meaning: "Kimchi / キムチ",
    pronunciation: "gimchi",
    example: "김치가 맵지 않아요.",
    category: "음식"
  },
  {
    id: 14,
    word: "물",
    meaning: "Water / 水",
    pronunciation: "mul",
    example: "물 한 잔 주세요.",
    category: "음식"
  },
  {
    id: 15,
    word: "커피",
    meaning: "Coffee / コーヒー",
    pronunciation: "keopi",
    example: "커피 좋아해요.",
    category: "음식"
  },

  // 장소
  {
    id: 16,
    word: "학교",
    meaning: "School / 学校",
    pronunciation: "hakgyo",
    hanja: "學校",
    example: "학교에 가요.",
    category: "장소"
  },
  {
    id: 17,
    word: "집",
    meaning: "Home / 家",
    pronunciation: "jip",
    example: "집에 있어요.",
    category: "장소"
  },
  {
    id: 18,
    word: "회사",
    meaning: "Company / 会社",
    pronunciation: "hoesa",
    hanja: "會社",
    example: "회사에서 일해요.",
    category: "장소"
  },

  // 시간
  {
    id: 19,
    word: "오늘",
    meaning: "Today / 今日",
    pronunciation: "oneul",
    example: "오늘 날씨가 좋아요.",
    category: "시간"
  },
  {
    id: 20,
    word: "내일",
    meaning: "Tomorrow / 明日",
    pronunciation: "naeil",
    example: "내일 만나요.",
    category: "시간"
  },
  {
    id: 21,
    word: "어제",
    meaning: "Yesterday / 昨日",
    pronunciation: "eoje",
    example: "어제 비가 왔어요.",
    category: "시간"
  },

  // 동사
  {
    id: 22,
    word: "가다",
    meaning: "To go / 行く",
    pronunciation: "gada",
    example: "학교에 가요.",
    category: "동사"
  },
  {
    id: 23,
    word: "오다",
    meaning: "To come / 来る",
    pronunciation: "oda",
    example: "친구가 와요.",
    category: "동사"
  },
  {
    id: 24,
    word: "먹다",
    meaning: "To eat / 食べる",
    pronunciation: "meokda",
    example: "밥을 먹어요.",
    category: "동사"
  },
  {
    id: 25,
    word: "보다",
    meaning: "To see / 見る",
    pronunciation: "boda",
    example: "영화를 봐요.",
    category: "동사"
  },
  {
    id: 26,
    word: "읽다",
    meaning: "To read / 読む",
    pronunciation: "ikda",
    example: "책을 읽어요.",
    category: "동사"
  },

  // 형용사
  {
    id: 27,
    word: "좋다",
    meaning: "Good / 良い",
    pronunciation: "jota",
    example: "날씨가 좋아요.",
    category: "형용사"
  },
  {
    id: 28,
    word: "나쁘다",
    meaning: "Bad / 悪い",
    pronunciation: "nappeuda",
    example: "기분이 나빠요.",
    category: "형용사"
  },
  {
    id: 29,
    word: "크다",
    meaning: "Big / 大きい",
    pronunciation: "keuda",
    example: "집이 커요.",
    category: "형용사"
  },
  {
    id: 30,
    word: "작다",
    meaning: "Small / 小さい",
    pronunciation: "jakda",
    example: "방이 작아요.",
    category: "형용사"
  },

  // 색깔
  {
    id: 31,
    word: "빨강",
    meaning: "Red / 赤",
    pronunciation: "ppalgang",
    example: "빨간색 옷이에요.",
    category: "색깔"
  },
  {
    id: 32,
    word: "파랑",
    meaning: "Blue / 青",
    pronunciation: "parang",
    example: "파란 하늘이에요.",
    category: "색깔"
  },

  // 일상
  {
    id: 33,
    word: "사람",
    meaning: "Person / 人",
    pronunciation: "saram",
    example: "저 사람 누구예요?",
    category: "일상"
  },
  {
    id: 34,
    word: "친구",
    meaning: "Friend / 友達",
    pronunciation: "chingu",
    example: "친구를 만나요.",
    category: "일상"
  },
  {
    id: 35,
    word: "이름",
    meaning: "Name / 名前",
    pronunciation: "ireum",
    example: "이름이 뭐예요?",
    category: "일상"
  },
  {
    id: 36,
    word: "나이",
    meaning: "Age / 年齢",
    pronunciation: "nai",
    example: "나이가 어떻게 되세요?",
    category: "일상"
  },
  {
    id: 37,
    word: "전화",
    meaning: "Phone / 電話",
    pronunciation: "jeonhwa",
    hanja: "電話",
    example: "전화 주세요.",
    category: "일상"
  },
  {
    id: 38,
    word: "시간",
    meaning: "Time / 時間",
    pronunciation: "sigan",
    hanja: "時間",
    example: "시간이 없어요.",
    category: "일상"
  },
  {
    id: 39,
    word: "돈",
    meaning: "Money / お金",
    pronunciation: "don",
    example: "돈이 필요해요.",
    category: "일상"
  },
  {
    id: 40,
    word: "책",
    meaning: "Book / 本",
    pronunciation: "chaek",
    example: "책을 읽어요.",
    category: "일상"
  },

  // 질문 단어
  {
    id: 41,
    word: "누구",
    meaning: "Who / 誰",
    pronunciation: "nugu",
    example: "누구세요?",
    category: "질문"
  },
  {
    id: 42,
    word: "뭐",
    meaning: "What / 何",
    pronunciation: "mwo",
    example: "뭐 해요?",
    category: "질문"
  },
  {
    id: 43,
    word: "어디",
    meaning: "Where / どこ",
    pronunciation: "eodi",
    example: "어디 가요?",
    category: "질문"
  },
  {
    id: 44,
    word: "언제",
    meaning: "When / いつ",
    pronunciation: "eonje",
    example: "언제 와요?",
    category: "질문"
  },
  {
    id: 45,
    word: "왜",
    meaning: "Why / なぜ",
    pronunciation: "wae",
    example: "왜 안 와요?",
    category: "질문"
  },

  // 추가 필수 단어
  {
    id: 46,
    word: "사랑",
    meaning: "Love / 愛",
    pronunciation: "sarang",
    example: "사랑해요.",
    category: "감정"
  },
  {
    id: 47,
    word: "행복",
    meaning: "Happiness / 幸せ",
    pronunciation: "haengbok",
    hanja: "幸福",
    example: "행복해요.",
    category: "감정"
  },
  {
    id: 48,
    word: "한국어",
    meaning: "Korean language / 韓国語",
    pronunciation: "hangugeo",
    hanja: "韓國語",
    example: "한국어를 배워요.",
    category: "언어"
  },
  {
    id: 49,
    word: "공부",
    meaning: "Study / 勉強",
    pronunciation: "gongbu",
    hanja: "工夫",
    example: "한국어 공부해요.",
    category: "학습"
  },
  {
    id: 50,
    word: "선생님",
    meaning: "Teacher / 先生",
    pronunciation: "seonsaengnim",
    example: "선생님께 물어봐요.",
    category: "학습"
  },
];