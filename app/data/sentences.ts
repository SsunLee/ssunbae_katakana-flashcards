// app/data/sentences.ts

export interface KanjiDetail {
  kanji: string;
  meaning: string;
  usages: string[];
}

export interface Sentence {
  id: number;
  sentence: string;
  reading: (string | { text: string; furigana: string })[];
  furigana: string;
  romaji: string;
  translation: string;
  kanjiDetails: KanjiDetail[];
}

// --- ✨ 모든 항목에 usages 배열을 포함하도록 전체 데이터 업데이트 ---
export const SENTENCES: Sentence[] = [
  {
    id: 1,
    sentence: "今日はいい天気ですね。",
    reading: [ {text:"今日", furigana:"きょう"}, "はいい", {text:"天気", furigana:"てんき"}, "ですね。"],
    furigana: "きょうは いいてんきですね。",
    romaji: "kyō wa ii tenki desu ne.",
    translation: "오늘은 날씨가 좋네요.",
    kanjiDetails: [
      { kanji: '今日', meaning: '오늘 (きょう)', usages: ['바로 지금 지나가고 있는 이날'] },
      { kanji: '天気', meaning: '날씨 (てんき)', usages: ['기온, 습도, 바람 따위의 상태'] },
    ],
  },
  {
    id: 2,
    sentence: "日本語を勉強します。",
    reading: [{text:"日本語", furigana:"にほんご"}, "を", {text:"勉強", furigana:"べんきょう"}, "します。"],
    furigana: "にほんごをべんきょうします。",
    romaji: "nihongo o benkyō shimasu.",
    translation: "일본어를 공부합니다.",
    kanjiDetails: [
      { kanji: '日本語', meaning: '일본어 (にほんご)', usages: ['일본 사람들이 쓰는 언어'] },
      { kanji: '勉強', meaning: '공부 (べんきょう)', usages: ['학문이나 기술을 배우고 익힘'] },
    ],
  },
  {
    id: 3,
    sentence: "駅はどこですか。",
    reading: [{text:"駅", furigana:"えき"}, "はどこですか。"],
    furigana: "えきはどこですか。",
    romaji: "eki wa doko desu ka.",
    translation: "역은 어디인가요?",
    kanjiDetails: [
      { kanji: '駅', meaning: '역 (えき)', usages: ['기차나 전철을 타고 내리는 곳'] },
    ],
  },
  {
    id: 4,
    sentence: "趣味は何ですか。",
    reading: [{ text: "趣味", furigana: "しゅみ" }, "は", { text: "何", furigana: "なん" }, "ですか。"],
    furigana: "しゅみはなんですか。",
    romaji: "shumi wa nan desu ka.",
    translation: "취미는 무엇인가요?",
    kanjiDetails: [
        { kanji: "趣味", meaning: "취미 (しゅみ)", usages: ["전문이 아닌, 즐기기 위하여 하는 일"] },
        { kanji: "何", meaning: "무엇 (なん)", usages: ["모르는 사물을 물을 때 씀"] },
    ],
  },
  {
    id: 5,
    sentence: "お名前は何ですか。",
    reading: ["お",{text:"名前", furigana:"なまえ"}, "は", {text:"何", furigana:"なん"}, "ですか。"],
    furigana: "おなまえはなんですか。",
    romaji: "o namae wa nan desu ka.",
    translation: "이름이 무엇입니까?",
    kanjiDetails: [
      { kanji: '名前', meaning: '이름 (なまえ)', usages: ['사람이나 사물을 부르는 말'] },
      { kanji: '何', meaning: '무엇 (なん)', usages: ['모르는 사물을 물을 때 씀', '어떤, 어느 (何時, 何曜日)'] },
    ],
  },
  {
    id: 6,
    sentence: "映画を見に行きます。",
    reading: [{text:"映画", furigana:"えいが"}, "を", {text:"見", furigana:"み"}, "に", {text:"行", furigana:"い"}, "きます。"],
    furigana: "えいがをみにいきます。",
    romaji: "eiga o mi ni ikimasu.",
    translation: "영화를 보러 갑니다.",
    kanjiDetails: [
        { kanji: '映画', meaning: '영화 (えいが)', usages: ['연속적인 영상을 기록하여 만든 작품'] },
        { kanji: '見', meaning: '볼 견 (み)', usages: ['눈으로 사물을 파악하다'] },
        { kanji: '行', meaning: '갈 행 (い)', usages: ['한 장소에서 다른 장소로 옮기다'] },
    ],
  },
  {
    id: 7,
    sentence: "図書館で本を読みます。",
    reading: [
        { text: "図書館", furigana: "としょかん" },
        "で",
        { text: "本", furigana: "ほん" },
        "を",
        { text: "読", furigana: "よ" },
        "みます。",
    ],
    furigana: "としょかんでほんをよみます。",
    romaji: "toshokan de hon o yomimasu.",
    translation: "도서관에서 책을 읽습니다.",
    kanjiDetails: [
        { kanji: "図書館", meaning: "도서관 (としょかん)", usages: ["책을 모아두고 빌려주는 곳"] },
        { kanji: "本", meaning: "책 (ほん)", usages: ["글이나 그림을 묶어놓은 것"] },
        { kanji: "読", meaning: "읽을 독 (よ)", usages: ["글을 보고 그 의미를 파악하다"] },
    ],
  },
  {
    id: 8,
    sentence: "コーヒーを一杯ください。",
    reading: [
        "コーヒーを",
        { text: "一杯", furigana: "いっぱイ" },
        "ください。",
    ],
    furigana: "コーヒーをいっぱイください。",
    romaji: "kōhī o ippai kudasai.",
    translation: "커피 한 잔 주세요.",
    kanjiDetails: [
        { kanji: "一杯", meaning: "한 잔 (いっぱイ)", usages: ["음료를 세는 단위"] },
    ],
  },
  {
    id: 9,
    sentence: "毎朝七時に起きます。",
    reading: [
        { text: "毎朝", furigana: "まいあさ" },
        { text: "七時", furigana: "しちじ" },
        "に",
        { text: "起", furigana: "お" },
        "きます。",
    ],
    furigana: "まいあさしちじにおきます。",
    romaji: "maiasa shichiji ni okimasu.",
    translation: "매일 아침 7시에 일어납니다.",
    kanjiDetails: [
        { kanji: "毎朝", meaning: "매일 아침 (まいあさ)", usages: ["하루도 빠짐없이 아침마다"] },
        { kanji: "七時", meaning: "7시 (しちじ)", usages: ["시간을 나타내는 말"] },
        { kanji: "起", meaning: "일어날 기 (お)", usages: ["잠에서 깨어나다", "몸을 일으키다"] },
    ],
  },
  {
    id: 10,
    sentence: "週末は何をしますか。",
    reading: [
        { text: "週末", furigana: "しゅうまつ" },
        "は",
        { text: "何", furigana: "なに" },
        "をしますか。",
    ],
    furigana: "しゅうまつはなにをしますか。",
    romaji: "shūmatsu wa nani o shimasu ka.",
    translation: "주말에는 무엇을 합니까?",
    kanjiDetails: [
        { kanji: "週末", meaning: "주말 (しゅうまつ)", usages: ["한 주의 끝 부분, 주로 토요일과 일요일"] },
        { kanji: "何", meaning: "무엇 (なに)", usages: ["모르는 사물을 물을 때 씀"] },
    ],
  },
  {
    id: 11,
    sentence: "また明日会いましょう。",
    reading: [
        "また",
        { text: "明日", furigana: "あした" },
        { text: "会", furigana: "あ" },
        "いましょう。",
    ],
    furigana: "またあしたあいましょう。",
    romaji: "mata ashita aimashō.",
    translation: "내일 또 만나요.",
    kanjiDetails: [
        { kanji: "明日", meaning: "내일 (あした)", usages: ["오늘의 바로 다음 날"] },
        { kanji: "会", meaning: "만날 회 (あ)", usages: ["사람을 마주 대하다"] },
    ],
  },
  {
    id: 12,
    sentence: "電話番号は何番ですか。",
    reading: [
        { text: "電話番号", furigana: "でんわばんごう" },
        "は",
        { text: "何番", furigana: "なんばん" },
        "ですか。",
    ],
    furigana: "でんわばんごうはなんばんですか。",
    romaji: "denwa bangō wa nanban desu ka.",
    translation: "전화번호는 몇 번입니까?",
    kanjiDetails: [
        { kanji: "電話番号", meaning: "전화번호 (でんわばんごう)", usages: ["전화를 걸기 위한 숫자 조합"] },
        { kanji: "何番", meaning: "몇 번 (なんばん)", usages: ["순서나 번호를 물을 때 사용"] },
    ],
  },
  {
    id: 13,
    sentence: "猫が好きです。",
    reading: [{text:"猫", furigana:"ねこ"}, "が", {text:"好", furigana:"す"}, "きです。"],
    furigana: "ねこがすきです。",
    romaji: "neko ga suki desu.",
    translation: "고양이를 좋아합니다.",
    kanjiDetails: [
        { kanji: '猫', meaning: '고양이 (ねこ)', usages: ['포유류의 한 종류'] },
        { kanji: '好', meaning: '좋을 호 (す)', usages: ['마음에 들어 즐겁다', '취향에 맞다'] },
    ],
  },
  {
    id: 14,
    sentence: "バスはいつ来ますか。",
    reading: ["バスはいつ", { text: "来", furigana: "き" }, "ますか。"],
    furigana: "バスはいつきますか。",
    romaji: "basu wa itsu kimasu ka.",
    translation: "버스는 언제 오나요?",
    kanjiDetails: [
        { kanji: "来", meaning: "올 래 (き)", usages: ["어떤 장소로 움직여 이르다"] },
    ],
  },
  {
    id: 15,
    sentence: "写真を撮ってもいいですか。",
    reading: [
        { text: "写真", furigana: "しゃしん" },
        "を",
        { text: "撮", furigana: "と" },
        "ってもいいですか。",
    ],
    furigana: "しゃしんをとってもいいですか。",
    romaji: "shashin o totte mo ii desu ka.",
    translation: "사진을 찍어도 될까요?",
    kanjiDetails: [
        { kanji: "写真", meaning: "사진 (しゃしん)", usages: ["카메라로 찍은 영상"] },
        { kanji: "撮", meaning: "찍을 촬 (と)", usages: ["카메라로 촬영하다"] },
    ],
  },
  {
    id: 16,
    sentence: "道に迷いました。",
    reading: [{ text: "道", furigana: "みち" }, "に", { text: "迷", furigana: "まよ" }, "いました。"],
    furigana: "みちにまよいました。",
    romaji: "michi ni mayoimashita.",
    translation: "길을 잃었어요.",
    kanjiDetails: [
      { kanji: "道", meaning: "길 (みち)", usages: ["사람이나 차가 다니는 곳"] },
      { kanji: "迷", meaning: "헤맬 미 (まよ)", usages: ["갈 바를 몰라 헤매다"] },
    ],
  },
  {
    id: 17,
    sentence: "お手洗いはどこですか。",
    reading: ["お", { text: "手洗", furigana: "てあら" }, "いはどこですか。"],
    furigana: "おてあらいはどこですか。",
    romaji: "otearai wa doko desu ka.",
    translation: "화장실은 어디인가요?",
    kanjiDetails: [
      { kanji: "手洗", meaning: "화장실 (てあらい)", usages: ["손을 씻는 곳", "용변을 보는 곳"] },
    ],
  },
  {
    id: 18,
    sentence: "もう一度お願いします。",
    reading: [
      { text: "一度", furigana: "いちど" },
      "お",
      { text: "願", furigana: "ねが" },
      "いします。",
    ],
    furigana: "もういちどおねがいします。",
    romaji: "mō ichido onegai shimasu.",
    translation: "다시 한번 부탁합니다.",
    kanjiDetails: [
      { kanji: "一度", meaning: "한 번 (いちど)", usages: ["횟수가 하나임을 나타냄"] },
      { kanji: "願", meaning: "원할 원 (ねが)", usages: ["바라고 희망하다"] },
    ],
  },
  {
    id: 19,
    sentence: "これはいくらですか。",
    reading: ["これはいくらですか。"],
    furigana: "これはいくらですか。",
    romaji: "kore wa ikura desu ka.",
    translation: "이것은 얼마입니까?",
    kanjiDetails: [],
  },
  {
    id: 20,
    sentence: "気をつけてください。",
    reading: [{ text: "気", furigana: "き" }, "をつけてください。"],
    furigana: "きをつけてください。",
    romaji: "ki o tsukete kudasai.",
    translation: "조심하세요.",
    kanjiDetails: [
        { kanji: "気", meaning: "기운 기 (き)", usages: ["'마음', '정신' 등을 의미하는 관용구에 쓰임"] },
    ],
  },
  {
    id: 21,
    sentence: "電車で会社に行きます。",
    reading: [
      { text: "電車", furigana: "でんしゃ" },
      "で",
      { text: "会社", furigana: "かいしゃ" },
      "に",
      { text: "行", furigana: "い" },
      "きます。",
    ],
    furigana: "でんしゃでかいしゃにいきます。",
    romaji: "densha de kaisha ni ikimasu.",
    translation: "전철로 회사에 갑니다.",
    kanjiDetails: [
      { kanji: "電車", meaning: "전철 (でんしゃ)", usages: ["전기를 동력으로 하여 움직이는 차"] },
      { kanji: "会社", meaning: "회사 (かいしゃ)", usages: ["이익을 목적으로 하는 단체"] },
      { kanji: "行", meaning: "갈 행 (い)", usages: ["다른 장소로 이동하다"] },
    ],
  },
  {
    id: 22,
    sentence: "昨日は雨でした。",
    reading: [{ text: "昨日", furigana: "きのう" }, "は", { text: "雨", furigana: "あめ" }, "でした。"],
    furigana: "きのうはあめでした。",
    romaji: "kinō wa ame deshita.",
    translation: "어제는 비가 왔습니다.",
    kanjiDetails: [
      { kanji: "昨日", meaning: "어제 (きのう)", usages: ["오늘의 바로 하루 전 날"] },
      { kanji: "雨", meaning: "비 (あめ)", usages: ["하늘에서 물방울이 떨어지는 현상"] },
    ],
  },
  {
    id: 23,
    sentence: "朝ご飯を食べましたか。",
    reading: [
      { text: "朝", furigana: "あさ" },
      { text: "ご飯", furigana: "はん" },
      "を",
      { text: "食", furigana: "た" },
      "べましたか。",
    ],
    furigana: "あさごはんをたべましたか。",
    romaji: "asagohan o tabemashita ka.",
    translation: "아침밥 먹었어요?",
    kanjiDetails: [
      { kanji: "朝", meaning: "아침 (あさ)", usages: ["해가 뜰 때부터 오전 반나절까지의 시간"] },
      { kanji: "ご飯", meaning: "밥 (ごはん)", usages: ["끼니로 먹는 음식"] },
      { kanji: "食", meaning: "먹을 식 (た)", usages: ["음식물을 입을 통해 넘기다"] },
    ],
  },
  {
    id: 24,
    sentence: "この本は面白いです。",
    reading: [
      "この",
      { text: "本", furigana: "ほん" },
      "は",
      { text: "面白", furigana: "おもしろ" },
      "いです。",
    ],
    furigana: "このほんはおもしろいです。",
    romaji: "kono hon wa omoshiroi desu.",
    translation: "이 책은 재미있습니다.",
    kanjiDetails: [
      { kanji: "本", meaning: "책 (ほん)", usages: ["글이나 그림을 묶어놓은 것"] },
      { kanji: "面白", meaning: "재미있다 (おもしろい)", usages: ["즐겁고 흥미롭다"] },
    ],
  },
  {
    id: 25,
    sentence: "アレルギーがありますか。",
    reading: ["アレルギーがありますか。"],
    furigana: "アレルギーがありますか。",
    romaji: "arerugī ga arimasu ka.",
    translation: "알레르기가 있습니까?",
    kanjiDetails: [],
  },
  {
    id: 26,
    sentence: "仕事は何時までですか。",
    reading: [
      { text: "仕事", furigana: "しごと" },
      "は",
      { text: "何時", furigana: "なんじ" },
      "までですか。",
    ],
    furigana: "しごとはなんじまでですか。",
    romaji: "shigoto wa nanji made desu ka.",
    translation: "일은 몇 시까지입니까?",
    kanjiDetails: [
      { kanji: "仕事", meaning: "일 (しごと)", usages: ["어떤 목적을 위해 하는 활동"] },
      { kanji: "何時", meaning: "몇 시 (なんじ)", usages: ["시간을 물을 때 사용"] },
    ],
  },
  {
    id: 27,
    sentence: "家族は何人ですか。",
    reading: [
      { text: "家族", furigana: "かぞく" },
      "は",
      { text: "何人", furigana: "なんにん" },
      "ですか。",
    ],
    furigana: "かぞくはなんにんですか。",
    romaji: "kazoku wa nannin desu ka.",
    translation: "가족은 몇 명입니까?",
    kanjiDetails: [
      { kanji: "家族", meaning: "가족 (かぞく)", usages: ["주로 부부를 중심으로 한 친족 집단"] },
      { kanji: "何人", meaning: "몇 명 (なんにん)", usages: ["사람의 수를 물을 때 사용"] },
    ],
  },
  {
    id: 28,
    sentence: "新しい靴を買いました。",
    reading: [
      { text: "新", furigana: "あたら" },
      "しい",
      { text: "靴", furigana: "くつ" },
      "を",
      { text: "買", furigana: "か" },
      "いました。",
    ],
    furigana: "あたらしいくつをかいました。",
    romaji: "atarashii kutsu o kaimashita.",
    translation: "새 신발을 샀습니다.",
    kanjiDetails: [
      { kanji: "新", meaning: "새로울 신 (あたら)", usages: ["처음 사용하거나 만든 것"] },
      { kanji: "靴", meaning: "신발 (くつ)", usages: ["발에 신는 물건"] },
      { kanji: "買", meaning: "살 매 (か)", usages: ["돈을 주고 물건을 얻다"] },
    ],
  },
  {
    id: 29,
    sentence: "日本に行ったことがありますか。",
    reading: [
      { text: "日本", furigana: "にほん" },
      "に",
      { text: "行", furigana: "い" },
      "ったことがありますか。",
    ],
    furigana: "にほんにいったことがありますか。",
    romaji: "nihon ni itta koto ga arimasu ka.",
    translation: "일본에 가본 적이 있습니까?",
    kanjiDetails: [
      { kanji: "日本", meaning: "일본 (にほん)", usages: ["아시아 동쪽에 있는 나라"] },
      { kanji: "行", meaning: "갈 행 (い)", usages: ["다른 장소로 이동하다"] },
    ],
  },
  {
    id: 30,
    sentence: "彼は約束の時間に必ず来ます。",
    reading: [{text:"彼", furigana:"かれ"}, "は", {text:"約束", furigana:"やくそく"}, "の", {text:"時間", furigana:"じかん"}, "に", {text:"必", furigana:"かなら"}, "ず", {text:"来", furigana:"き"}, "ます。"],
    furigana: "かれはやくそくのじかんにかならずきます。",
    romaji: "kare wa yakusoku no jikan ni kanarazu kimasu.",
    translation: "그는 약속 시간에 반드시 와요.",
    kanjiDetails: [
        { kanji: '彼', meaning: '저 피 (かれ)', usages: ['그 (3인칭 남성)', '그녀 (彼女, かのじょ)'] },
        { kanji: '約束', meaning: '약속 (やくそく)', usages: ['만날 시간과 장소를 정함'] },
        { kanji: '時間', meaning: '시간 (じかん)', usages: ['어떤 시각에서 어떤 시각까지의 사이'] },
        { kanji: '必', meaning: '반드시 필 (かなら)', usages: ['틀림없이 꼭'] },
        { kanji: '来', meaning: '올 래 (き)', usages: ['어떤 장소로 움직여 이르다'] },
    ]
  }
];

