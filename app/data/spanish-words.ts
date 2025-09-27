// app/data/spanish-words.ts

export interface SpanishWord {
  id: number;
  word: string;           // 스페인어 단어
  pronunciation: string;  // 발음 (로마자)
  meaning: string;        // 한국어 뜻
  exampleSentence: string;
  exampleTranslation: string;
}

export const SPANISH_WORDS: SpanishWord[] = [
  { id: 1, word: "Hola", pronunciation: "ola", meaning: "안녕", exampleSentence: "¿Hola, cómo estás?", exampleTranslation: "안녕, 어떻게 지내?" },
  { id: 2, word: "Gracias", pronunciation: "grasias", meaning: "고마워", exampleSentence: "Gracias por tu ayuda.", exampleTranslation: "도와줘서 고마워." },
  { id: 3, word: "Amigo", pronunciation: "amigo", meaning: "친구 (남성)", exampleSentence: "Él es mi mejor amigo.", exampleTranslation: "그는 나의 가장 친한 친구야." },
  { id: 4, word: "Familia", pronunciation: "familia", meaning: "가족", exampleSentence: "Mi familia es muy grande.", exampleTranslation: "우리 가족은 대가족이야." },
  { id: 5, word: "Comida", pronunciation: "komida", meaning: "음식", exampleSentence: "La comida española es deliciosa.", exampleTranslation: "스페인 음식은 맛있어." },
  { id: 6, word: "Agua", pronunciation: "agua", meaning: "물", exampleSentence: "Necesito un vaso de agua.", exampleTranslation: "물 한 잔 필요해요." },
  { id: 7, word: "Casa", pronunciation: "kasa", meaning: "집", exampleSentence: "Mi casa está cerca de aquí.", exampleTranslation: "우리 집은 여기서 가까워." },
  { id: 8, word: "Libro", pronunciation: "libro", meaning: "책", exampleSentence: "Estoy leyendo un libro interesante.", exampleTranslation: "나는 재미있는 책을 읽고 있어." },
  { id: 9, word: "Sol", pronunciation: "sol", meaning: "태양", exampleSentence: "El sol brilla hoy.", exampleTranslation: "오늘 해가 빛나네." },
  { id: 10, word: "Feliz", pronunciation: "felis", meaning: "행복한", exampleSentence: "Estoy muy feliz de verte.", exampleTranslation: "너를 보니 정말 행복해." },
  { id: 11, word: "Viajar", pronunciation: "biakhar", meaning: "여행하다", exampleSentence: "Me gusta viajar a otros países.", exampleTranslation: "나는 다른 나라로 여행하는 것을 좋아해." },
  { id: 12, word: "Música", pronunciation: "musika", meaning: "음악", exampleSentence: "¿Qué tipo de música te gusta?", exampleTranslation: "어떤 종류의 음악을 좋아해?" },
  { id: 13, word: "Ciudad", pronunciation: "siudad", meaning: "도시", exampleSentence: "Madrid es la capital de España.", exampleTranslation: "마드리드는 스페인의 수도야." },
  { id: 14, word: "Trabajo", pronunciation: "trabakho", meaning: "일", exampleSentence: "Tengo mucho trabajo hoy.", exampleTranslation: "나 오늘 일이 많아." },
  { id: 15, word: "Estudiar", pronunciation: "estudiar", meaning: "공부하다", exampleSentence: "Voy a estudiar español.", exampleTranslation: "나는 스페인어를 공부할 거야." },
];

