// src/utils/nickname.ts

const KOREAN_ADJECTIVES = [
  '귀여운', '용감한', '똑똑한', '재미있는', '행복한', '신비로운',
  '빛나는', '상냥한', '고요한', '활기찬', '우아한', '명랑한'
];
const KOREAN_NOUNS = [
  '사자', '호랑이', '코끼리', '토끼', '고양이', '강아지', '돌고래',
  '판다', '기린', '원숭이', '부엉이', '다람쥐'
];

export const generateRandomNickname = (): string => {
  const adj = KOREAN_ADJECTIVES[Math.floor(Math.random() * KOREAN_ADJECTIVES.length)];
  const noun = KOREAN_NOUNS[Math.floor(Math.random() * KOREAN_NOUNS.length)];
  return `${adj} ${noun}`;
};