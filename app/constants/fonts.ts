// app/constants/fonts.ts

// 여러 폰트를 fallback으로 지정해두면 사용자 환경에 해당 폰트가 없어도
// 다음 순서의 폰트를 보여주므로 안정성이 높아집니다.
export const FONT_STACKS: Record<string, string> = {
  // Japanese Fonts
  "Noto Sans JP": '"Noto Sans JP", sans-serif',
  "Zen Kaku Gothic New": '"Zen Kaku Gothic New", sans-serif',
  "Noto Serif JP": '"Noto Serif JP", serif',
  "Kosugi Maru": '"Kosugi Maru", sans-serif',

  // --- ✨ 영어 폰트 스택 추가 ---
  "Inter": '"Inter", sans-serif',
  "Roboto": '"Roboto", sans-serif',
  "Lato": '"Lato", sans-serif',
  "Times New Roman": '"Times New Roman", serif',
};
