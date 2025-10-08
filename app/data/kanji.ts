// app/data/kanji.ts

export interface Kanji {
  id: number;
  kanji: string;              // 한자
  meaning: string;            // 한국어 뜻
  onyomi: string;             // 음독 (히라가나)
  kunyomi: string;            // 훈독 (히라가나)
  jlpt: number;               // ✨ JLPT 레벨 (N5 -> 5, N4 -> 4)
  exampleSentence: string;    // 예문 (일본어)
  exampleRomaji: string;      // 예문 (로마자)
  exampleTranslation: string; // 예문 (한국어 번역)
}

// ✨ 모든 데이터에 jlpt: 5 (N5) 레벨을 추가했습니다.
export const KANJI_WORDS: Kanji[] = [
  { id: 1, kanji: "日", meaning: "날, 해", onyomi: "にち, じつ", kunyomi: "ひ, -び, -か", jlpt: 5, exampleSentence: "今日はいい天気ですね。", exampleRomaji: "kyō wa ii tenki desu ne.", exampleTranslation: "오늘은 날씨가 좋네요." },
  { id: 2, kanji: "一", meaning: "하나", onyomi: "いち, いつ", kunyomi: "ひと-", jlpt: 5, exampleSentence: "一番好きな食べ物は何ですか。", exampleRomaji: "ichiban sukina tabemono wa nan desu ka.", exampleTranslation: "가장 좋아하는 음식은 무엇인가요?" },
  { id: 3, kanji: "国", meaning: "나라", onyomi: "こく", kunyomi: "くに", jlpt: 5, exampleSentence: "韓国は美しい国です。", exampleRomaji: "kankoku wa utsukushii kuni desu.", exampleTranslation: "한국은 아름다운 나라입니다." },
  { id: 4, kanji: "人", meaning: "사람", onyomi: "じん, にん", kunyomi: "ひと", jlpt: 5, exampleSentence: "あの人は誰ですか。", exampleRomaji: "ano hito wa dare desu ka.", exampleTranslation: "저 사람은 누구입니까?" },
  { id: 5, kanji: "年", meaning: "해, 년", onyomi: "ねん", kunyomi: "とし", jlpt: 5, exampleSentence: "来年、日本に行きます。", exampleRomaji: "rainen, nihon ni ikimasu.", exampleTranslation: "내년에 일본에 갑니다." },
  { id: 6, kanji: "大", meaning: "크다", onyomi: "だい, たい", kunyomi: "おお-", jlpt: 5, exampleSentence: "この犬はとても大きいです。", exampleRomaji: "kono inu wa totemo ōkii desu.", exampleTranslation: "이 개는 매우 큽니다." },
  { id: 7, kanji: "本", meaning: "책, 근본", onyomi: "ほん", kunyomi: "もと", jlpt: 5, exampleSentence: "図書館で本を読みます。", exampleRomaji: "toshokan de hon o yomimasu.", exampleTranslation: "도서관에서 책을 읽습니다." },
  { id: 8, kanji: "中", meaning: "가운데", onyomi: "ちゅう", kunyomi: "なか", jlpt: 5, exampleSentence: "彼は部屋の中にいます。", exampleRomaji: "kare wa heya no naka ni imasu.", exampleTranslation: "그는 방 안에 있습니다." },
  { id: 9, kanji: "長", meaning: "길다, 어른", onyomi: "ちょう", kunyomi: "なが-い", jlpt: 5, exampleSentence: "この川はとても長いです。", exampleRomaji: "kono kawa wa totemo nagai desu.", exampleTranslation: "이 강은 매우 깁니다." },
  { id: 10, kanji: "出", meaning: "나다, 나오다", onyomi: "しゅつ, すい", kunyomi: "で-る, だ-す", jlpt: 5, exampleSentence: "家から早く出ました。", exampleRomaji: "ie kara hayaku demashita.", exampleTranslation: "집에서 일찍 나왔습니다." },
];
