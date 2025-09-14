// app/data/sentences.ts

export type FuriPart = {
  /** 표면 문자(칸지/가나 조각) */
  text: string;
  /** 칸지일 때만: 위에 얹을 히라가나 */
  rt?: string;
  /** 툴팁 설명: [제목, 설명1, 설명2, ...] */
  gloss?: string[];
};

export type SentenceCard = {
  id: number;            // 고유 ID
  parts: FuriPart[];     // 문장 구성(칸지만 rt/gloss)
  romaji: string;        // 로마자
};

export const JP_SENTENCES: SentenceCard[] = [
  {
    id: 1,
    parts: [
      { text: "お" },
      { text: "願", rt: "ねが", gloss: ["願 · 원할 원", "원하다(願-), 바라다", "(소원을) 빌다, 기원하다", "마음에 품다"] },
      { text: "いします" },
    ],
    romaji: "onegaishimasu",
  },
  {
    id: 2,
    parts: [{ text: "ありがとう" }, { text: "ございます" }],
    romaji: "arigatou gozaimasu",
  },
  {
    id: 3,
    parts: [{ text: "大丈夫", rt: "だいじょうぶ", gloss: ["大丈夫 · 괜찮다", "문제없음/멀쩡함을 뜻함"] }, { text: "です" }],
    romaji: "daijoubu desu",
  },
  {
    id: 4,
    parts: [{ text: "初", rt: "はじ", gloss: ["初 · 처음 초", "처음/첫- 을 뜻함"] }, { text: "めまして" }],
    romaji: "hajimemashite",
  },
  {
    id: 5,
    parts: [{ text: "駅", rt: "えき", gloss: ["駅 · 역", "기차역"] }, { text: "はどこですか" }],
    romaji: "eki wa doko desu ka",
  },
  {
    id: 6,
    parts: [{ text: "トイレ" }, { text: "はどこですか" }],
    romaji: "toire wa doko desu ka",
  },
  {
    id: 7,
    parts: [
      { text: "写", rt: "しゃ", gloss: ["写 · 베낄 사", "복사/비추다의 뜻"] },
      { text: "真", rt: "しん", gloss: ["真 · 참 진", "참됨/진실"] },
      { text: "を" },
      { text: "撮", rt: "と", gloss: ["撮 · 찍다", "사진을 찍다(撮る)"] },
      { text: "ってもいいですか" },
    ],
    romaji: "shashin wo totte mo ii desu ka",
  },
  {
    id: 8,
    parts: [{ text: "ゆっくり" }, { text: "話", rt: "はな", gloss: ["話 · 말할 화", "대화/이야기"] }, { text: "してください" }],
    romaji: "yukkuri hanashite kudasai",
  },
  {
    id: 9,
    parts: [{ text: "病院", rt: "びょういん", gloss: ["病院 · 병원", "의료 기관"] }, { text: "はどこですか" }],
    romaji: "byouin wa doko desu ka",
  },
  {
    id: 10,
    parts: [
      { text: "予", rt: "よ", gloss: ["予 · 미리 예", "사전/미리"] },
      { text: "約", rt: "やく", gloss: ["約 · 약속할 약", "약속/예약"] },
      { text: "を" },
      { text: "お" },
      { text: "願", rt: "ねが", gloss: ["願 · 원할 원", "부탁/요청"] },
      { text: "いします" },
    ],
    romaji: "yoyaku wo onegaishimasu",
  },
  {
    id: 11,
    parts: [
      { text: "電車", rt: "でんしゃ", gloss: ["電車 · 전차", "기차/지하철"] },
      { text: "は" },
      { text: "何時", rt: "なんじ", gloss: ["何時 · 몇 시", "시간을 물을 때"] },
      { text: "に" },
      { text: "来", rt: "き", gloss: ["来 · 올 래", "오다(来る)"] },
      { text: "ますか" },
    ],
    romaji: "densha wa nanji ni kimasu ka",
  },
  {
    id: 12,
    parts: [{ text: "助", rt: "たす", gloss: ["助 · 도울 조", "도움/구조"] }, { text: "けてください" }],
    romaji: "tasukete kudasai",
  },
  {
    id: 13,
    parts: [{ text: "郵便局", rt: "ゆうびんきょく", gloss: ["郵便局 · 우편국", "우체국"] }, { text: "はどこですか" }],
    romaji: "yuubinkyoku wa doko desu ka",
  },
  {
    id: 14,
    parts: [{ text: "出", rt: "で", gloss: ["出 · 날 출", "나가다/나오다"] }, { text: "口", rt: "ぐち", gloss: ["口 · 입 구", "입구/출구"] }, { text: "はどこですか" }],
    romaji: "deguchi wa doko desu ka",
  },
];
