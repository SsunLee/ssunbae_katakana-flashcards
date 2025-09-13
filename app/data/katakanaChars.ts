import type { Word } from './words';

// Word 타입에 type 속성을 추가하는 것을 잊지 마세요.
// 예: export type Word = { ...; type?: string; };

export const KATAKANA_CHARS: (Word & { type: string })[] = [
  // ==========================================================
  // Gojūon (50음도)
  // ==========================================================
  // ア行 (a-gyō)
  { id: 1, katakana: "ア", furigana: "a", answer: "アイスクリーム (ice cream)", emoji: "🍨", type: "gojuon" },
  { id: 2, katakana: "イ", furigana: "i", answer: "イス (chair)", emoji: "🪑", type: "gojuon" },
  { id: 3, katakana: "ウ", furigana: "u", answer: "ウイスキー (whiskey)", emoji: "🥃", type: "gojuon" },
  { id: 4, katakana: "エ", furigana: "e", answer: "エアコン (air conditioner)", emoji: "💨", type: "gojuon" },
  { id: 5, katakana: "オ", furigana: "o", answer: "オレンジ (orange)", emoji: "🍊", type: "gojuon" },
  
  // カ行 (ka-gyō)
  { id: 6, katakana: "カ", furigana: "ka", answer: "カメラ (camera)", emoji: "📷", type: "gojuon" },
  { id: 7, katakana: "キ", furigana: "ki", answer: "キロ (kilo)", emoji: "⚖️", type: "gojuon" },
  { id: 8, katakana: "ク", furigana: "ku", answer: "クラス (class)", emoji: "🏫", type: "gojuon" },
  { id: 9, katakana: "ケ", furigana: "ke", answer: "ケーキ (cake)", emoji: "🍰", type: "gojuon" },
  { id: 10, katakana: "コ", furigana: "ko", answer: "コーヒー (coffee)", emoji: "☕️", type: "gojuon" },
  
  // サ行 (sa-gyō)
  { id: 11, katakana: "サ", furigana: "sa", answer: "サービス (service)", emoji: "🈂️", type: "gojuon" },
  { id: 12, katakana: "シ", furigana: "shi", answer: "システム (system)", emoji: "💻", type: "gojuon" },
  { id: 13, katakana: "ス", furigana: "su", answer: "スポーツ (sports)", emoji: "⚽", type: "gojuon" },
  { id: 14, katakana: "セ", furigana: "se", answer: "セーター (sweater)", emoji: "👕", type: "gojuon" },
  { id: 15, katakana: "ソ", furigana: "so", answer: "ソファ (sofa)", emoji: "🛋️", type: "gojuon" },

  // タ行 (ta-gyō)
  { id: 16, katakana: "タ", furigana: "ta", answer: "タクシー (taxi)", emoji: "🚖", type: "gojuon" },
  { id: 17, katakana: "チ", furigana: "chi", answer: "チケット (ticket)", emoji: "🎫", type: "gojuon" },
  { id: 18, katakana: "ツ", furigana: "tsu", answer: "ツアー (tour)", emoji: "🗺️", type: "gojuon" },
  { id: 19, katakana: "テ", furigana: "te", answer: "テスト (test)", emoji: "📝", type: "gojuon" },
  { id: 20, katakana: "ト", furigana: "to", answer: "トイレ (toilet)", emoji: "🚻", type: "gojuon" },

  // ナ行 (na-gyō)
  { id: 21, katakana: "ナ", furigana: "na", answer: "ナイフ (knife)", emoji: "🔪", type: "gojuon" },
  { id: 22, katakana: "ニ", furigana: "ni", answer: "ニュース (news)", emoji: "📰", type: "gojuon" },
  { id: 23, katakana: "ヌ", furigana: "nu", answer: "ヌードル (noodle)", emoji: "🍜", type: "gojuon" },
  { id: 24, katakana: "ネ", furigana: "ne", answer: "ネクタイ (necktie)", emoji: "👔", type: "gojuon" },
  { id: 25, katakana: "ノ", furigana: "no", answer: "ノート (notebook)", emoji: "📒", type: "gojuon" },

  // ハ行 (ha-gyō)
  { id: 26, katakana: "ハ", furigana: "ha", answer: "ハンバーガー (hamburger)", emoji: "🍔", type: "gojuon" },
  { id: 27, katakana: "ヒ", furigana: "hi", answer: "ヒーター (heater)", emoji: "🔥", type: "gojuon" },
  { id: 28, katakana: "フ", furigana: "fu", answer: "フライパン (frying pan)", emoji: "🍳", type: "gojuon" },
  { id: 29, katakana: "ヘ", furigana: "he", answer: "ヘルメット (helmet)", emoji: "⛑️", type: "gojuon" },
  { id: 30, katakana: "ホ", furigana: "ho", answer: "ホテル (hotel)", emoji: "🏨", type: "gojuon" },

  // マ行 (ma-gyō)
  { id: 31, katakana: "マ", furigana: "ma", answer: "マイク (microphone)", emoji: "🎤", type: "gojuon" },
  { id: 32, katakana: "ミ", furigana: "mi", answer: "ミルク (milk)", emoji: "🥛", type: "gojuon" },
  { id: 33, katakana: "ム", furigana: "mu", answer: "ムード (mood)", emoji: "😊", type: "gojuon" },
  { id: 34, katakana: "メ", furigana: "me", answer: "メロン (melon)", emoji: "🍈", type: "gojuon" },
  { id: 35, katakana: "モ", furigana: "mo", answer: "モーター (motor)", emoji: "⚙️", type: "gojuon" },

  // ヤ行 (ya-gyō)
  { id: 36, katakana: "ヤ", furigana: "ya", answer: "タイヤ (tire)", emoji: "🛞", type: "gojuon" },
  { id: 37, katakana: "ユ", furigana: "yu", answer: "ユニーク (unique)", emoji: "✨", type: "gojuon" },
  { id: 38, katakana: "ヨ", furigana: "yo", answer: "ヨーグルト (yogurt)", emoji: "🍦", type: "gojuon" },

  // ラ行 (ra-gyō)
  { id: 39, katakana: "ラ", furigana: "ra", answer: "ラジオ (radio)", emoji: "📻", type: "gojuon" },
  { id: 40, katakana: "リ", furigana: "ri", answer: "リスト (list)", emoji: "📋", type: "gojuon" },
  { id: 41, katakana: "ル", furigana: "ru", answer: "ルール (rule)", emoji: "📜", type: "gojuon" },
  { id: 42, katakana: "レ", furigana: "re", answer: "レモン (lemon)", emoji: "🍋", type: "gojuon" },
  { id: 43, katakana: "ロ", furigana: "ro", answer: "ロボット (robot)", emoji: "🤖", type: "gojuon" },

  // ワ行 (wa-gyō)
  { id: 44, katakana: "ワ", furigana: "wa", answer: "ワイン (wine)", emoji: "🍷", type: "gojuon" },
  { id: 45, katakana: "ヲ", furigana: "wo", answer: "(object particle)", emoji: "🔘", type: "gojuon" },
  { id: 46, katakana: "ン", furigana: "n", answer: "(ends words)", emoji: "🔚", type: "gojuon" },

  // ==========================================================
  // Dakuten (탁음)
  // ==========================================================
  // ガ行 (ga-gyō)
  { id: 47, katakana: "ガ", furigana: "ga", answer: "ガス (gas)", emoji: "⛽", type: "dakuten" },
  { id: 48, katakana: "ギ", furigana: "gi", answer: "ギター (guitar)", emoji: "🎸", type: "dakuten" },
  { id: 49, katakana: "グ", furigana: "gu", answer: "グループ (group)", emoji: "👥", type: "dakuten" },
  { id: 50, katakana: "ゲ", furigana: "ge", answer: "ゲーム (game)", emoji: "🎮", type: "dakuten" },
  { id: 51, katakana: "ゴ", furigana: "go", answer: "ゴルフ (golf)", emoji: "🏌️", type: "dakuten" },

  // ザ行 (za-gyō)
  { id: 52, katakana: "ザ", furigana: "za", answer: "デザイン (design)", emoji: "🎨", type: "dakuten" },
  { id: 53, katakana: "ジ", furigana: "ji", answer: "ジーンズ (jeans)", emoji: "👖", type: "dakuten" },
  { id: 54, katakana: "ズ", furigana: "zu", answer: "チーズ (cheese)", emoji: "🧀", type: "dakuten" },
  { id: 55, katakana: "ゼ", furigana: "ze", answer: "ゼロ (zero)", emoji: "0️⃣", type: "dakuten" },
  { id: 56, katakana: "ゾ", furigana: "zo", answer: "ゾーン (zone)", emoji: "📍", type: "dakuten" },

  // ダ行 (da-gyō)
  { id: 57, katakana: "ダ", furigana: "da", answer: "ダンス (dance)", emoji: "💃", type: "dakuten" },
  { id: 58, katakana: "ヂ", furigana: "ji", answer: "(rarely used)", emoji: "🤔", type: "dakuten" },
  { id: 59, katakana: "ヅ", furigana: "zu", answer: "(rarely used)", emoji: "🤔", type: "dakuten" },
  { id: 60, katakana: "デ", furigana: "de", answer: "データ (data)", emoji: "📊", type: "dakuten" },
  { id: 61, katakana: "ド", furigana: "do", answer: "ドア (door)", emoji: "🚪", type: "dakuten" },

  // バ行 (ba-gyō)
  { id: 62, katakana: "バ", furigana: "ba", answer: "バス (bus)", emoji: "🚌", type: "dakuten" },
  { id: 63, katakana: "ビ", furigana: "bi", answer: "ビール (beer)", emoji: "🍺", type: "dakuten" },
  { id: 64, katakana: "ブ", furigana: "bu", answer: "ブレーキ (brake)", emoji: "🛑", type: "dakuten" },
  { id: 65, katakana: "ベ", furigana: "be", answer: "ベッド (bed)", emoji: "🛏️", type: "dakuten" },
  { id: 66, katakana: "ボ", furigana: "bo", answer: "ボール (ball)", emoji: "⚾", type: "dakuten" },

  // ==========================================================
  // Handakuten (반탁음)
  // ==========================================================
  // パ行 (pa-gyō)
  { id: 67, katakana: "パ", furigana: "pa", answer: "パン (bread)", emoji: "🍞", type: "handakuten" },
  { id: 68, katakana: "ピ", furigana: "pi", answer: "ピアノ (piano)", emoji: "🎹", type: "handakuten" },
  { id: 69, katakana: "プ", furigana: "pu", answer: "プール (pool)", emoji: "🏊", type: "handakuten" },
  { id: 70, katakana: "ペ", furigana: "pe", answer: "ペン (pen)", emoji: "🖊️", type: "handakuten" },
  { id: 71, katakana: "ポ", furigana: "po", answer: "ポスト (post)", emoji: "📮", type: "handakuten" },

  // ==========================================================
  // Yōon (요음)
  // ==========================================================
  { id: 72, katakana: "キャ", furigana: "kya", answer: "キャンプ (camp)", emoji: "🏕️", type: "yoon" },
  { id: 73, katakana: "キュ", furigana: "kyu", answer: "キュー (cue)", emoji: "🎱", type: "yoon" },
  { id: 74, katakana: "キョ", furigana: "kyo", answer: "キョリ (distance)", emoji: "📏", type: "yoon" },
  
  { id: 75, katakana: "シャ", furigana: "sha", answer: "シャツ (shirt)", emoji: "👕", type: "yoon" },
  { id: 76, katakana: "シュ", furigana: "shu", answer: "シュート (shoot)", emoji: "⚽", type: "yoon" },
  { id: 77, katakana: "ショ", furigana: "sho", answer: "ショップ (shop)", emoji: "🛍️", type: "yoon" },

  { id: 78, katakana: "チャ", furigana: "cha", answer: "チャンス (chance)", emoji: "✨", type: "yoon" },
  { id: 79, katakana: "チュ", furigana: "chu", answer: "チューブ (tube)", emoji: "🧪", type: "yoon" },
  { id: 80, katakana: "チョ", furigana: "cho", answer: "チョコレート (chocolate)", emoji: "🍫", type: "yoon" },

  { id: 81, katakana: "ニャ", furigana: "nya", answer: "ニャー (meow)", emoji: "🐈", type: "yoon" },
  { id: 82, katakana: "ニュ", furigana: "nyu", answer: "ニュース (news)", emoji: "📰", type: "yoon" },
  { id: 83, katakana: "ニョ", furigana: "nyo", answer: "(rarely used)", emoji: "🤔", type: "yoon" },

  { id: 84, katakana: "ヒャ", furigana: "hya", answer: "百 (hyaku)", emoji: "💯", type: "yoon" },
  { id: 85, katakana: "ヒュ", furigana: "hyu", answer: "ヒューマン (human)", emoji: "🧑", type: "yoon" },
  { id: 86, katakana: "ヒョ", furigana: "hyo", answer: "ヒョウ (leopard)", emoji: "🐆", type: "yoon" },

  { id: 87, katakana: "ミャ", furigana: "mya", answer: "ミャンマー (Myanmar)", emoji: "🇲🇲", type: "yoon" },
  { id: 88, katakana: "ミュ", furigana: "myu", answer: "ミュージック (music)", emoji: "🎵", type: "yoon" },
  { id: 89, katakana: "ミョ", furigana: "myo", answer: "ミョウジ (surname)", emoji: "📛", type: "yoon" },

  { id: 90, katakana: "リャ", furigana: "rya", answer: "(rarely used)", emoji: "🤔", type: "yoon" },
  { id: 91, katakana: "リュ", furigana: "ryu", answer: "リュック (rucksack)", emoji: "🎒", type: "yoon" },
  { id: 92, katakana: "リョ", furigana: "ryo", answer: "リョウリ (cooking)", emoji: "🍳", type: "yoon" },

  { id: 93, katakana: "ギャ", furigana: "gya", answer: "ギャンブル (gamble)", emoji: "🎲", type: "yoon" },
  { id: 94, katakana: "ギュ", furigana: "gyu", answer: "ギュウニュウ (milk)", emoji: "🥛", type: "yoon" },
  { id: 95, katakana: "ギョ", furigana: "gyo", answer: "ギョウザ (gyoza)", emoji: "🥟", type: "yoon" },

  { id: 96, katakana: "ジャ", furigana: "ja", answer: "ジャズ (jazz)", emoji: "🎷", type: "yoon" },
  { id: 97, katakana: "ジュ", furigana: "ju", answer: "ジュース (juice)", emoji: "🧃", type: "yoon" },
  { id: 98, katakana: "ジョ", furigana: "jo", answer: "ジョギング (jogging)", emoji: "🏃", type: "yoon" },

  { id: 99, katakana: "ビャ", furigana: "bya", answer: "三百 (sanbyaku)", emoji: "3️⃣", type: "yoon" },
  { id: 100, katakana: "ビュ", furigana: "byu", answer: "ビュー (view)", emoji: "🏞️", type: "yoon" },
  { id: 101, katakana: "ビョ", furigana: "byo", answer: "病院 (byōin)", emoji: "🏥", type: "yoon" },

  { id: 102, katakana: "ピャ", furigana: "pya", answer: "(rarely used)", emoji: "🤔", type: "yoon" },
  { id: 103, katakana: "ピュ", furigana: "pyu", answer: "コンピュータ (computer)", emoji: "💻", type: "yoon" },
  { id: 104, katakana: "ピョ", furigana: "pyo", answer: "(rarely used)", emoji: "🤔", type: "yoon" },
];