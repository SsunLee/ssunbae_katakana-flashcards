// 완성형 한글(가~하) 데이터 예시
export interface KoreanSyllable {
  id: number;
  char: string;
  meaning?: string;
  example?: string;
}

export const KOREAN_SYLLABLES: KoreanSyllable[] = [
  { id: 1, char: "가", meaning: "go; family name; song (contextual)", example: "가는 길 입니다." },
  { id: 2, char: "나", meaning: "I, me", example: "나는 학생입니다." },
  { id: 3, char: "다", meaning: "all, everything", example: "다 모였어요." },
  { id: 4, char: "라", meaning: "(used in grammar)", example: "라디오를 듣다." },
  { id: 5, char: "마", meaning: "(exclamation, also 'horse')", example: "마! 이리 와봐." },
  { id: 6, char: "바", meaning: "bar, look, see", example: "바다가 보인다." },
  { id: 7, char: "사", meaning: "four; to buy; person (in compounds)", example: "사과를 샀어요." },
  { id: 8, char: "아", meaning: "ah; child", example: "아, 알겠어요." },
  { id: 9, char: "자", meaning: "let's; to sleep", example: "자, 출발하자!" },
  { id: 10, char: "차", meaning: "car; tea", example: "차를 마셔요." },
  { id: 11, char: "카", meaning: "car (loanword)", example: "카드를 사용하세요." },
  { id: 12, char: "타", meaning: "to ride", example: "버스를 타요." },
  { id: 13, char: "파", meaning: "green onion; to dig", example: "파를 샀어요." },
  { id: 14, char: "하", meaning: "to do", example: "공부를 하다." },
  { id: 15, char: "거", meaning: "thing (것)", example: "이거 뭐예요?" },
  { id: 16, char: "너", meaning: "you", example: "너는 누구니?" },
  { id: 17, char: "더", meaning: "more", example: "더 주세요." },
  { id: 18, char: "러", meaning: "(used in grammar)", example: "러시아에 가다." },
  { id: 19, char: "머", meaning: "head", example: "머리가 아파요." },
  { id: 20, char: "버", meaning: "(used in 버스, 버리다)", example: "버스를 기다려요." },
  { id: 21, char: "서", meaning: "stand; from", example: "여기서 기다리세요." },
  { id: 22, char: "어", meaning: "language; how", example: "어떻게 해요?" },
  { id: 23, char: "저", meaning: "I (formal); that", example: "저는 선생님입니다." },
  { id: 24, char: "처", meaning: "(used in 처럼)", example: "아이처럼 웃어요." },
  { id: 25, char: "커", meaning: "big (커다랗다)", example: "커피를 마셔요." },
  { id: 26, char: "터", meaning: "site, place", example: "공사 터입니다." },
  { id: 27, char: "퍼", meaning: "scoop", example: "물을 퍼 올리다." },
  { id: 28, char: "허", meaning: "permit; 허락", example: "허락을 받다." },
  { id: 29, char: "고", meaning: "and (grammar)", example: "먹고 마시다." },
  { id: 30, char: "노", meaning: "play; 노래(song)", example: "노래를 부르다." },
  { id: 31, char: "도", meaning: "also, too", example: "나도 가고 싶어요." },
  { id: 32, char: "로", meaning: "to, toward (grammar)", example: "학교로 가요." },
  { id: 33, char: "모", meaning: "all; 모자(hat)", example: "모자를 써요." },
  { id: 34, char: "보", meaning: "see, look", example: "영화를 보다." },
  { id: 35, char: "소", meaning: "cow; 소리(sound)", example: "소가 풀을 먹어요." },
  { id: 36, char: "오", meaning: "come", example: "여기로 오세요." },
  { id: 37, char: "조", meaning: "group; 조용하다(quiet)", example: "조용히 하세요." },
  { id: 38, char: "초", meaning: "beginning; 초등학교(elementary school)", example: "초등학생입니다." },
  { id: 39, char: "코", meaning: "nose", example: "코가 막혔어요." },
  { id: 40, char: "토", meaning: "soil; Saturday", example: "토요일에 만나요." },
  { id: 41, char: "포", meaning: "grape (포도)", example: "포도를 먹어요." },
  { id: 42, char: "호", meaning: "lake; 호수(lake)", example: "호수에서 놀아요." },
  // ... 더 추가 가능
];
