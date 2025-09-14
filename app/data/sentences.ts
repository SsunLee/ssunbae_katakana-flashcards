// app/data/sentences.ts

export interface KanjiDetail {
  kanji: string;
  meaning: string;
  descriptions: string[];
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

export const SENTENCES: Sentence[] = [
  // 기존 문장 1-15
  {
    id: 1,
    sentence: "今日はいい天気ですね。",
    reading: [ {text:"今日", furigana:"きょう"}, "はいい", {text:"天気", furigana:"てんき"}, "ですね。"],
    furigana: "きょうは いいてんきですね。",
    romaji: "kyō wa ii tenki desu ne.",
    translation: "오늘은 날씨가 좋네요.",
    kanjiDetails: [
      { kanji: '今日', meaning: '오늘', descriptions: ['금일', '현재'] },
      { kanji: '天気', meaning: '날씨', descriptions: ['기상 상태'] },
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
      { kanji: '日本語', meaning: '일본어', descriptions: ['일본의 언어'] },
      { kanji: '勉強', meaning: '공부', descriptions: ['학문이나 기술을 배우고 익힘'] },
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
      { kanji: '駅', meaning: '역', descriptions: ['기차나 전철이 정차하는 곳'] },
    ],
  },
  {
    id: 4,
    sentence: "これをください。",
    reading: ["これ", "をください。"],
    furigana: "これをください。",
    romaji: "kore o kudasai.",
    translation: "이것을 주세요.",
    kanjiDetails: [],
  },
  {
    id: 5,
    sentence: "お名前は何ですか。",
    reading: ["お",{text:"名前", furigana:"なまえ"}, "は", {text:"何", furigana:"なん"}, "ですか。"],
    furigana: "おなまえはなんですか。",
    romaji: "o namae wa nan desu ka.",
    translation: "이름이 무엇입니까?",
    kanjiDetails: [
      { kanji: '名前', meaning: '이름', descriptions: ['사람이나 사물을 부르는 말'] },
      { kanji: '何', meaning: '무엇', descriptions: ['모르는 사실이나 사물을 물을 때 쓰는 말'] },
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
        { kanji: '映画', meaning: '영화', descriptions: ['연속적인 영상을 기록한 것'] },
        { kanji: '見', meaning: '보다', descriptions: ['눈으로 사물을 파악하다'] },
        { kanji: '行', meaning: '가다', descriptions: ['한 장소에서 다른 장소로 옮기다'] },
    ],
  },
  {
    id: 7,
    sentence: "趣味は何ですか。",
    reading: [{text:"趣味", furigana:"しゅみ"}, "は", {text:"何", furigana:"なん"}, "ですか。"],
    furigana: "しゅみはなんですか。",
    romaji: "shumi wa nan desu ka.",
    translation: "취미는 무엇인가요?",
    kanjiDetails: [
        { kanji: '趣味', meaning: '취미', descriptions: ['전문이 아닌 즐거움을 위해 하는 일'] },
        { kanji: '何', meaning: '무엇', descriptions: ['모르는 사실이나 사물을 물을 때 쓰는 말'] },
    ],
  },
  {
    id: 8,
    sentence: "また会いましょう。",
    reading: ["また", {text:"会", furigana:"あ"}, "いましょう。"],
    furigana: "またあいましょう。",
    romaji: "mata aimashō.",
    translation: "또 만나요.",
    kanjiDetails: [
        { kanji: '会', meaning: '만나다', descriptions: ['사람을 대면하다'] },
    ],
  },
  {
    id: 9,
    sentence: "週末は何をしますか。",
    reading: [{text:"週末", furigana:"しゅうまつ"}, "は", {text:"何", furigana:"なに"}, "をしますか。"],
    furigana: "しゅうまつはなにをしますか。",
    romaji: "shūmatsu wa nani o shimasu ka.",
    translation: "주말에는 무엇을 합니까?",
    kanjiDetails: [
        { kanji: '週末', meaning: '주말', descriptions: ['한 주의 끝 부분'] },
        { kanji: '何', meaning: '무엇', descriptions: ['모르는 사실이나 사물을 물을 때 쓰는 말'] },
    ],
  },
  {
    id: 10,
    sentence: "それは面白いですね。",
    reading: ["それは", {text:"面白", furigana:"おもしろ"}, "いですね。"],
    furigana: "それはおもしろいですね。",
    romaji: "sore wa omoshiroi desu ne.",
    translation: "그것은 재미있네요.",
    kanjiDetails: [
        { kanji: '面白', meaning: '재미있다', descriptions: ['흥미롭고 즐겁다'] },
    ],
  },
  {
    id: 11,
    sentence: "写真を撮ってもいいですか。",
    reading: [{text:"写真", furigana:"しゃしん"}, "を", {text:"撮", furigana:"と"}, "ってもいいですか。"],
    furigana: "しゃしんをとってもいいですか。",
    romaji: "shashin o totte mo ii desu ka.",
    translation: "사진을 찍어도 괜찮을까요?",
    kanjiDetails: [
        { kanji: '写真', meaning: '사진', descriptions: ['빛을 이용하여 이미지를 기록한 것'] },
        { kanji: '撮', meaning: '찍다', descriptions: ['카메라로 촬영하다'] },
    ],
  },
  {
    id: 12,
    sentence: "お手伝いしましょうか。",
    reading: ["お", {text:"手伝", furigana:"てつだ"}, "いしましょうか。"],
    furigana: "おてつだいしましょうか。",
    romaji: "otetsudai shimashō ka.",
    translation: "도와드릴까요?",
    kanjiDetails: [
        { kanji: '手伝', meaning: '도움', descriptions: ['남의 일을 거들어 주는 것'] },
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
        { kanji: '猫', meaning: '고양이', descriptions: ['포유류의 한 종류'] },
        { kanji: '好', meaning: '좋아함', descriptions: ['마음에 들어 즐기는 마음'] },
    ],
  },
  {
    id: 14,
    sentence: "バスはいつ来ますか。",
    reading: ["バスはいつ", {text:"来", furigana:"き"}, "ますか。"],
    furigana: "バスはいつきますか。",
    romaji: "basu wa itsu kimasu ka.",
    translation: "버스는 언제 오나요?",
    kanjiDetails: [
        { kanji: '来', meaning: '오다', descriptions: ['어떤 장소로 움직여 이르다'] },
    ],
  },
  {
    id: 15,
    sentence: "読書が趣味です。",
    reading: [{text:"読書", furigana:"どくしょ"}, "が", {text:"趣味", furigana:"しゅみ"}, "です。"],
    furigana: "どくしょがしゅみです。",
    romaji: "dokusho ga shumi desu.",
    translation: "독서가 취미입니다.",
    kanjiDetails: [
        { kanji: '読書', meaning: '독서', descriptions: ['책을 읽는 것'] },
        { kanji: '趣味', meaning: '취미', descriptions: ['전문이 아닌 즐거움을 위해 하는 일'] },
    ],
  },
  // --- ✨ 추가된 문장 16-30 ---
  {
    id: 16,
    sentence: "図書館は静かです。",
    reading: [{text:"図書館", furigana:"としょかん"}, "は", {text:"静", furigana:"しず"}, "かです。"],
    furigana: "としょかんはしずかです。",
    romaji: "toshokan wa shizuka desu.",
    translation: "도서관은 조용합니다.",
    kanjiDetails: [
        { kanji: '図書館', meaning: '도서관', descriptions: ['책을 모아두고 빌려주는 곳'] },
        { kanji: '静', meaning: '조용함', descriptions: ['소리가 나지 않아 잠잠한 상태'] },
    ],
  },
  {
    id: 17,
    sentence: "これはいくらですか。",
    reading: ["これはいくらですか。"],
    furigana: "これはいくらですか。",
    romaji: "kore wa ikura desu ka.",
    translation: "이것은 얼마입니까?",
    kanjiDetails: [],
  },
  {
    id: 18,
    sentence: "トイレはどこですか。",
    reading: ["トイレはどこですか。"],
    furigana: "トイレはどこですか。",
    romaji: "toire wa doko desu ka.",
    translation: "화장실은 어디입니까?",
    kanjiDetails: [],
  },
  {
    id: 19,
    sentence: "いただきます。",
    reading: ["いただきます。"],
    furigana: "いただきます。",
    romaji: "itadakimasu.",
    translation: "잘 먹겠습니다.",
    kanjiDetails: [],
  },
  {
    id: 20,
    sentence: "ごちそうさまでした。",
    reading: ["ごちそうさまでした。"],
    furigana: "ごちそうさまでした。",
    romaji: "gochisōsama deshita.",
    translation: "잘 먹었습니다.",
    kanjiDetails: [],
  },
  {
    id: 21,
    sentence: "始めましょう。",
    reading: [{text:"始", furigana:"はじ"}, "めましょう。"],
    furigana: "はじめましょう。",
    romaji: "hajimemashō.",
    translation: "시작합시다.",
    kanjiDetails: [
        { kanji: '始', meaning: '시작', descriptions: ['어떤 일이나 행동의 처음'] },
    ],
  },
  {
    id: 22,
    sentence: "もう一度お願いします。",
    reading: [{text:"一度", furigana:"いちど"}, {text:"願", furigana:"ねが"}, "いします。"],
    furigana: "もういちどおねがいします。",
    romaji: "mō ichido onegai shimasu.",
    translation: "다시 한번 부탁합니다.",
    kanjiDetails: [
        { kanji: '一度', meaning: '한 번', descriptions: ['횟수가 하나임'] },
        { kanji: '願', meaning: '부탁', descriptions: ['바라는 바를 청함'] },
    ],
  },
  {
    id: 23,
    sentence: "ゆっくり話してください。",
    reading: ["ゆっくり", {text:"話", furigana:"はな"}, "してください。"],
    furigana: "ゆっくりはなしてください。",
    romaji: "yukkuri hanashite kudasai.",
    translation: "천천히 말해주세요.",
    kanjiDetails: [
        { kanji: '話', meaning: '말해', descriptions: ['생각이나 느낌을 말로 나타내다'] },
    ],
  },
  {
    id: 24,
    sentence: "分かりましたか。",
    reading: [{text:"分", furigana:"わ"}, "かりましたか。"],
    furigana: "わかりましたか。",
    romaji: "wakarimashita ka.",
    translation: "알겠습니까?",
    kanjiDetails: [
        { kanji: '分', meaning: '앎', descriptions: ['내용을 이해함'] },
    ],
  },
  {
    id: 25,
    sentence: "はい、分かりました。",
    reading: ["はい、", {text:"分", furigana:"わ"}, "かりました。"],
    furigana: "はい、わかりました。",
    romaji: "hai, wakarimashita.",
    translation: "네, 알겠습니다.",
    kanjiDetails: [
        { kanji: '分', meaning: '앎', descriptions: ['내용을 이해함'] },
    ],
  },
  {
    id: 26,
    sentence: "いいえ、分かりません。",
    reading: ["いいえ、", {text:"分", furigana:"わ"}, "かりません。"],
    furigana: "いいえ、わかりません。",
    romaji: "iie, wakarimasen.",
    translation: "아니요, 모르겠습니다.",
    kanjiDetails: [
        { kanji: '分', meaning: '앎', descriptions: ['내용을 이해함'] },
    ],
  },
  {
    id: 27,
    sentence: "傘を持っていますか。",
    reading: [{text:"傘", furigana:"かさ"}, "を", {text:"持", furigana:"も"}, "っていますか。"],
    furigana: "かさをもっていますか。",
    romaji: "kasa o motte imasu ka.",
    translation: "우산을 가지고 있습니까?",
    kanjiDetails: [
        { kanji: '傘', meaning: '우산', descriptions: ['비나 눈을 막기 위해 쓰는 물건'] },
        { kanji: '持', meaning: '가지고', descriptions: ['손에 쥐거나 몸에 지니다'] },
    ],
  },
  {
    id: 28,
    sentence: "電話番号は何番ですか。",
    reading: [{text:"電話番号", furigana:"でんわばんごう"}, "は", {text:"何番", furigana:"なんばん"}, "ですか。"],
    furigana: "でんわばんごうはなんばんですか。",
    romaji: "denwa bangō wa nanban desu ka.",
    translation: "전화번호는 몇 번입니까?",
    kanjiDetails: [
        { kanji: '電話番号', meaning: '전화번호', descriptions: ['전화를 걸기 위한 숫자 조합'] },
        { kanji: '何番', meaning: '몇 번', descriptions: ['순서나 번호를 물을 때 사용'] },
    ],
  },
  {
    id: 29,
    sentence: "水を一杯ください。",
    reading: [{text:"水", furigana:"みず"}, "を", {text:"一杯", furigana:"いっぴ"}, "ください。"],
    furigana: "みずをいっぱいください。",
    romaji: "mizu o ippai kudasai.",
    translation: "물 한 잔 주세요.",
    kanjiDetails: [
        { kanji: '水', meaning: '물', descriptions: ['생물이 살아가는 데 필수적인 액체'] },
        { kanji: '一杯', meaning: '한 잔', descriptions: ['잔이나 그릇에 가득 찬 분량'] },
    ],
  },
  {
    id: 30,
    sentence: "会議は三時からです。",
    reading: [{text:"会議", furigana:"かいぎ"}, "は", {text:"三時", furigana:"さんじ"}, "からです。"],
    furigana: "かいぎはさんじからです。",
    romaji: "kaigi wa sanji kara desu.",
    translation: "회의는 세 시부터입니다.",
    kanjiDetails: [
        { kanji: '会議', meaning: '회의', descriptions: ['어떤 문제에 대해 의논하는 모임'] },
        { kanji: '三時', meaning: '세 시', descriptions: ['시간의 한 시점'] },
    ],
  },
];