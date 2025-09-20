// app/data/spanish-sentences.ts

export interface SpanishSentence {
  id: number;
  sentence: string;
  translation: string;
  pronunciation?: string;
}

export const SPANISH_SENTENCES: SpanishSentence[] = [
  { id: 1, sentence: "¿Qué tal?", translation: "어떻게 지내?", pronunciation: "Que tal?" },
  { id: 2, sentence: "Me llamo Ssun.", translation: "내 이름은 쑨이야.", pronunciation: "Me llamo Ssun." },
  { id: 3, sentence: "Mucho gusto.", translation: "만나서 반가워.", pronunciation: "Mucho gusto." },
  { id: 4, sentence: "El tiempo está bueno hoy.", translation: "오늘 날씨가 좋네요.", pronunciation: "El tiempo esta bueno hoy." },
  { id: 5, sentence: "Tengo hambre.", translation: "배고파요.", pronunciation: "Tengo hambre." },
  { id: 6, sentence: "¿Dónde está el baño?", translation: "화장실이 어디에 있나요?", pronunciation: "Donde esta el bano?" },
  { id: 7, sentence: "La cuenta, por favor.", translation: "계산서 주세요.", pronunciation: "La cuenta, por favor." },
  { id: 8, sentence: "Este es mi amigo.", translation: "이 사람은 제 친구예요.", pronunciation: "Este es mi amigo." },
  { id: 9, sentence: "Me gusta la música pop.", translation: "저는 팝 음악을 좋아해요.", pronunciation: "Me gusta la musica pop." },
  { id: 10, sentence: "Es muy interesante.", translation: "그것은 매우 흥미롭네요.", pronunciation: "Es muy interesante." },
  { id: 11, sentence: "¿Puedes ayudarme?", translation: "저를 도와주실 수 있나요?", pronunciation: "Puedes ayudarme?" },
  { id: 12, sentence: "No entiendo.", translation: "이해가 안 돼요.", pronunciation: "No entiendo." },
  { id: 13, sentence: "Hablo un poco de español.", translation: "저는 스페인어를 조금 할 수 있어요.", pronunciation: "Hablo un poco de espanol." },
  { id: 14, sentence: "¡Qué tengas un buen día!", translation: "좋은 하루 보내세요!", pronunciation: "Que tengas un buen dia!" },
  { id: 15, sentence: "Nos vemos mañana.", translation: "내일 만나요.", pronunciation: "Nos vemos manana." },
];

