// app/data/sentences.ts

// 한자 툴팁에 표시될 정보 타입
export interface KanjiDetail {
  kanji: string; // 한자
  reading: string; // 읽는 법 (히라가나)
  meaning: string; // 대표 뜻 (예: '원할 원')
  examples: string[]; // 뜻 풀이 또는 예문 배열
}

// 문장 카드 데이터 타입
export interface Sentence {
  id: number;
  sentence: string; // 한자가 포함된 원본 문장 (카드 앞면)
  // [ { text: '漢字', furigana: 'かんじ' }, { text: 'の' } ] 형식
  // furigana가 있으면 ruby 태그로, 없으면 일반 텍스트로 렌더링됩니다.
  reading: { text: string; furigana?: string }[];
  furigana: string; // 문장 전체의 후리가나 (카드 뒷면)
  romaji: string; // 후리가나의 영문(로마자) 표기 (카드 뒷면)
  translation: string; // 한글 번역 (카드 뒷면)
  kanjiDetails: KanjiDetail[]; // 문장에 포함된 한자 상세 정보 배열
}

// 초기 학습 데이터 (짧은 문장 위주)
export const SENTENCES: Sentence[] = [
  {
    id: 1,
    sentence: "日本語を勉強します。",
    reading: [
      { text: "日", furigana: "に" },
      { text: "本", furigana: "ほん" },
      { text: "語", furigana: "ご" },
      { text: "を" },
      { text: "勉", furigana: "べん" },
      { text: "強", furigana: "きょう" },
      { text: "します。" },
    ],
    furigana: "にほんごをべんきょうします。",
    romaji: "nihongo o benkyō shimasu.",
    translation: "일본어를 공부합니다.",
    kanjiDetails: [
      { kanji: "日", reading: "に", meaning: "날 일", examples: ["일본 (日本, にほん)", "일요일 (日曜日, にちようび)"] },
      { kanji: "本", reading: "ほん", meaning: "근본 본", examples: ["책 (本, ほん)", "일본 (日本, にほん)"] },
      { kanji: "語", reading: "ご", meaning: "말씀 어", examples: ["언어 (言語, げんご)", "영어 (英語, えいご)"] },
      { kanji: "勉", reading: "べん", meaning: "힘쓸 면", examples: ["노력함, 힘씀"] },
      { kanji: "強", reading: "きょう", meaning: "굳셀 강", examples: ["강하다 (強い, つよい)", "공부 (勉強, べんきょう)"] },
    ],
  },
  {
    id: 2,
    sentence: "今日はいい天気ですね。",
    reading: [
      { text: "今", furigana: "きょう" },
      { text: "日", furigana: "は" },
      { text: "いい" },
      { text: "天", furigana: "てん" },
      { text: "気", furigana: "き" },
      { text: "ですね。" },
    ],
    furigana: "きょうはいいてんきですね。",
    romaji: "kyō wa ii tenki desu ne.",
    translation: "오늘은 날씨가 좋네요.",
    kanjiDetails: [
      { kanji: "今", reading: "きょう", meaning: "이제 금", examples: ["오늘 (今日, きょう)", "지금 (今, いま)"] },
      { kanji: "日", reading: "は", meaning: "날 일", examples: ["날, 해 (日, ひ)", "일본 (日本, にほん)"] },
      { kanji: "天", reading: "てん", meaning: "하늘 천", examples: ["하늘 (天, あめ)", "천국 (天国, てんごく)"] },
      { kanji: "気", reading: "き", meaning: "기운 기", examples: ["기분 (気分, きぶん)", "공기 (空気, くうき)"] },
    ],
  },
  {
    id: 3,
    sentence: "猫が好きです。",
    reading: [{ text: "猫", furigana: "ねこ" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きです。" }],
    furigana: "ねこがすきです。",
    romaji: "neko ga suki desu.",
    translation: "고양이를 좋아합니다.",
    kanjiDetails: [
      { kanji: "猫", reading: "ねこ", meaning: "고양이 묘", examples: ["고양이 (猫, ねこ)"] },
      { kanji: "好", reading: "す", meaning: "좋을 호", examples: ["좋아하다 (好き, すき)", "취향 (好み, このみ)"] },
    ],
  },
  {
    id: 4,
    sentence: "水をください。",
    reading: [{ text: "水", furigana: "みず" }, { text: "をください。" }],
    furigana: "みずをください。",
    romaji: "mizu o kudasai.",
    translation: "물을 주세요.",
    kanjiDetails: [
        { kanji: "水", reading: "みず", meaning: "물 수", examples: ["물 (水, みず)", "수요일 (水曜日, すいようび)"] },
    ]
  },
  {
    id: 5,
    sentence: "駅までお願いします。",
    reading: [
      { text: "駅", furigana: "えき" },
      { text: "までお" },
      { text: "願", furigana: "ねが" },
      { text: "いします。" },
    ],
    furigana: "えきまでおねがいします。",
    romaji: "eki made onegai shimasu.",
    translation: "역까지 부탁합니다.",
    kanjiDetails: [
        { kanji: "駅", reading: "えき", meaning: "역 역", examples: ["역 (駅, えき)", "역무원 (駅員, えきいん)"] },
        { kanji: "願", reading: "ねが", meaning: "원할 원", examples: ["부탁하다 (願う, ねがう)", "소원 (願い, ねがい)"] },
    ]
  },
  {
    id: 6,
    sentence: "写真を撮ってもいいですか。",
    reading: [
      { text: "写", furigana: "しゃ" },
      { text: "真", furigana: "しん" },
      { text: "を" },
      { text: "撮", furigana: "と" },
      { text: "ってもいいですか。" },
    ],
    furigana: "しゃしんをとってもいいですか。",
    romaji: "shashin o totte mo ii desu ka.",
    translation: "사진을 찍어도 될까요?",
    kanjiDetails: [
      { kanji: "写", reading: "しゃ", meaning: "베낄 사", examples: ["비추다 (写す, うつす)"] },
      { kanji: "真", reading: "しん", meaning: "참 진", examples: ["진실 (真実, しんじつ)", "중심 (真ん中, まんなか)"] },
      { kanji: "撮", reading: "と", meaning: "찍을 촬", examples: ["찍다 (撮る, とる)", "촬영 (撮影, さつえい)"] },
    ],
  },
  {
    id: 7,
    sentence: "趣味は何ですか。",
    reading: [{ text: "趣", furigana: "しゅ" }, { text: "味", furigana: "み" }, { text: "は" }, { text: "何", furigana: "なん" }, { text: "ですか。" }],
    furigana: "しゅみはなんですか。",
    romaji: "shumi wa nan desu ka.",
    translation: "취미는 무엇인가요?",
    kanjiDetails: [
      { kanji: "趣", reading: "しゅ", meaning: "뜻 취", examples: ["취지 (趣旨, しゅし)", "정취 (風情, ふぜい)"] },
      { kanji: "味", reading: "み", meaning: "맛 미", examples: ["맛 (味, あじ)", "의미 (意味, いみ)"] },
      { kanji: "何", reading: "なん", meaning: "어찌 하", examples: ["무엇 (何, なに/なん)"] },
    ],
  },
  {
    id: 8,
    sentence: "日本の食べ物は美味しいです。",
    reading: [
      { text: "日", furigana: "に" },
      { text: "本", furigana: "ほん" },
      { text: "の" },
      { text: "食", furigana: "た" },
      { text: "べ" },
      { text: "物", furigana: "もの" },
      { text: "は" },
      { text: "美", furigana: "おい" },
      { text: "しいです。" },
    ],
    furigana: "にほんのたべものはおいしいです。",
    romaji: "nihon no tabemono wa oishii desu.",
    translation: "일본 음식은 맛있습니다.",
    kanjiDetails: [
      { kanji: "日", reading: "に", meaning: "날 일", examples: ["일본 (日本, にほん)"] },
      { kanji: "本", reading: "ほん", meaning: "근본 본", examples: ["책 (本, ほん)"] },
      { kanji: "食", reading: "た", meaning: "밥 식", examples: ["먹다 (食べる, たべる)", "식사 (食事, しょくじ)"] },
      { kanji: "物", reading: "もの", meaning: "만물 물", examples: ["물건 (物, もの)", "동물 (動物, どうぶつ)"] },
      { kanji: "美", reading: "おい", meaning: "아름다울 미", examples: ["아름답다 (美しい, うつくしい)", "미술 (美術, びじゅつ)"] },
    ],
  },
  {
    id: 9,
    sentence: "週末は何をしますか。",
    reading: [
      { text: "週", furigana: "しゅう" },
      { text: "末", furigana: "まつ" },
      { text: "は" },
      { text: "何", furigana: "なに" },
      { text: "をしますか。" },
    ],
    furigana: "しuumatsu wa nani o shimasu ka.",
    romaji: "shūmatsu wa nani o shimasu ka.",
    translation: "주말에는 무엇을 하세요?",
    kanjiDetails: [
      { kanji: "週", reading: "しゅう", meaning: "주일 주", examples: ["이번 주 (今週, こんしゅう)", "매주 (毎週, まいしゅう)"] },
      { kanji: "末", reading: "まつ", meaning: "끝 말", examples: ["끝 (末, すえ)", "연말 (年末, ねんまつ)"] },
      { kanji: "何", reading: "なに", meaning: "어찌 하", examples: ["무엇 (何, なに/なん)"] },
    ],
  },
  {
    id: 10,
    sentence: "映画を見に行きます。",
    reading: [
      { text: "映", furigana: "えい" },
      { text: "画", furigana: "が" },
      { text: "を" },
      { text: "見", furigana: "み" },
      { text: "に" },
      { text: "行", furigana: "い" },
      { text: "きます。" },
    ],
    furigana: "えいがをみにいきます。",
    romaji: "eiga o mi ni ikimasu.",
    translation: "영화를 보러 갑니다.",
    kanjiDetails: [
      { kanji: "映", reading: "えい", meaning: "비칠 영", examples: ["비추다 (映る, うつる)"] },
      { kanji: "画", reading: "が", meaning: "그림 화", examples: ["계획 (計画, けいかく)", "만화 (漫画, まんが)"] },
      { kanji: "見", reading: "み", meaning: "볼 견", examples: ["보다 (見る, みる)", "의견 (意見, いけん)"] },
      { kanji: "行", reading: "い", meaning: "다닐 행", examples: ["가다 (行く, いく)", "여행 (旅行, りょこう)"] },
    ],
  },
  {
    id: 11,
    sentence: "読書が好きです。",
    reading: [{ text: "読", furigana: "どく" }, { text: "書", furigana: "しょ" }, { text: "が" }, { text: "好", furigana: "す" }, { text: "きです。" }],
    furigana: "どくしょがすきです。",
    romaji: "dokusho ga suki desu.",
    translation: "독서를 좋아합니다.",
    kanjiDetails: [
      { kanji: "読", reading: "どく", meaning: "읽을 독", examples: ["읽다 (読む, よむ)"] },
      { kanji: "書", reading: "しょ", meaning: "글 서", examples: ["쓰다 (書く, かく)", "도서관 (図書館, としょかん)"] },
      { kanji: "好", reading: "す", meaning: "좋을 호", examples: ["좋아하다 (好き, すき)"] },
    ],
  },
  {
    id: 12,
    sentence: "これは私の本です。",
    reading: [
      { text: "これは" },
      { text: "私", furigana: "わたし" },
      { text: "の" },
      { text: "本", furigana: "ほん" },
      { text: "です。" },
    ],
    furigana: "これはわたしのほんです。",
    romaji: "kore wa watashi no hon desu.",
    translation: "이것은 제 책입니다.",
    kanjiDetails: [
      { kanji: "私", reading: "わたし", meaning: "사사 사", examples: ["나, 저 (私, わたし)", "사립 (私立, しりつ)"] },
      { kanji: "本", reading: "ほん", meaning: "근본 본", examples: ["책 (本, ほん)", "일본 (日本, にほん)"] },
    ],
  },
  {
    id: 13,
    sentence: "電話をしてもいいですか。",
    reading: [
      { text: "電", furigana: "でん" },
      { text: "話", furigana: "わ" },
      { text: "をしてもいいですか。" },
    ],
    furigana: "でんわをしてもいいですか。",
    romaji: "denwa o shite mo ii desu ka.",
    translation: "전화해도 괜찮을까요?",
    kanjiDetails: [
      { kanji: "電", reading: "でん", meaning: "번개 전", examples: ["전기 (電気, でんき)"] },
      { kanji: "話", reading: "わ", meaning: "말씀 화", examples: ["이야기 (話, はなし)", "대화 (会話, かいわ)"] },
    ],
  },
  {
    id: 14,
    sentence: "仕事は何をしていますか。",
    reading: [
      { text: "仕", furigana: "し" },
      { text: "事", furigana: "ごと" },
      { text: "は" },
      { text: "何", furigana: "なに" },
      { text: "をしていますか。" },
    ],
    furigana: "しごとはなにをしていますか。",
    romaji: "shigoto wa nani o shite imasu ka.",
    translation: "일은 무엇을 하고 계신가요?",
    kanjiDetails: [
      { kanji: "仕", reading: "し", meaning: "섬길 사", examples: ["섬기다 (仕える, つかえる)"] },
      { kanji: "事", reading: "ごと", meaning: "일 사", examples: ["일 (事, こと)", "식사 (食事, しょくじ)"] },
      { kanji: "何", reading: "なに", meaning: "어찌 하", examples: ["무엇 (何, なに/なん)"] },
    ],
  },
  {
    id: 15,
    sentence: "また明日会いましょう。",
    reading: [
      { text: "また" },
      { text: "明", furigana: "あし" },
      { text: "日", furigana: "た" },
      { text: "会", furigana: "あ" },
      { text: "いましょう。" },
    ],
    furigana: "またあしたあいましょう。",
    romaji: "mata ashita aimashō.",
    translation: "내일 또 만나요.",
    kanjiDetails: [
      { kanji: "明", reading: "あし", meaning: "밝을 명", examples: ["밝다 (明るい, あかるい)", "설명 (説明, せつめい)"] },
      { kanji: "日", reading: "た", meaning: "날 일", examples: ["날 (日, ひ)", "휴일 (休日, きゅうじつ)"] },
      { kanji: "会", reading: "あ", meaning: "모일 회", examples: ["만나다 (会う, あう)", "회사 (会社, かいしゃ)"] },
    ],
  },
];

