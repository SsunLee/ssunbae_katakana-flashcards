
export {};

// api로 가져올 단어 항목 타입
export type Word = {
  id: number;
  katakana: string;
  furigana: string;
  answer: string;
  emoji: string;
  korean?: string;
  jlpt?: "N5" | "N4" | "N3" | "N2" | "N1";
};

// Dataset (100 words)
export const WORDS: Word[] = [
  { id: 1, katakana: "タクシー", furigana: "たくしー", answer: "Taxi", emoji: "🚖", korean: "택시", jlpt: "N5" },
  { id: 2, katakana: "バス", furigana: "ばす", answer: "Bus", emoji: "🚌", korean: "버스", jlpt: "N5" },
  { id: 3, katakana: "コーヒー", furigana: "こーひー", answer: "Coffee", emoji: "☕", korean: "커피", jlpt: "N5" },
  { id: 4, katakana: "レストラン", furigana: "れすとらん", answer: "Restaurant", emoji: "🍽️", korean: "레스토랑", jlpt: "N5" },
  { id: 5, katakana: "コンピューター", furigana: "こんぴゅーたー", answer: "Computer", emoji: "💻", korean: "컴퓨터", jlpt: "N5" },
  { id: 6, katakana: "ドア", furigana: "どあ", answer: "Door", emoji: "🚪", korean: "문", jlpt: "N5" },
  { id: 7, katakana: "ノート", furigana: "のーと", answer: "Notebook", emoji: "📒", korean: "노트", jlpt: "N5" },
  { id: 8, katakana: "エレベーター", furigana: "えれべーたー", answer: "Elevator", emoji: "🛗", korean: "엘리베이터", jlpt: "N5" },
  { id: 9, katakana: "エスカレーター", furigana: "えすかれーたー", answer: "Escalator", emoji: "⬆️", korean: "에스컬레이터", jlpt: "N5" },
  { id: 10, katakana: "アイスクリーム", furigana: "あいすくりーむ", answer: "Ice cream", emoji: "🍨", korean: "아이스크림", jlpt: "N5" },
  { id: 11, katakana: "サンドイッチ", furigana: "さんどいっち", answer: "Sandwich", emoji: "🥪", korean: "샌드위치", jlpt: "N5" },
  { id: 12, katakana: "テーブル", furigana: "てーぶる", answer: "Table", emoji: "🪑", korean: "테이블", jlpt: "N5" },
  { id: 13, katakana: "テレビ", furigana: "てれび", answer: "Television", emoji: "📺", korean: "텔레비전", jlpt: "N5" },
  { id: 14, katakana: "ラジオ", furigana: "らじお", answer: "Radio", emoji: "📻", korean: "라디오", jlpt: "N5" },
  { id: 15, katakana: "カメラ", furigana: "かめら", answer: "Camera", emoji: "📷", korean: "카메라", jlpt: "N5" },
  { id: 16, katakana: "スマホ", furigana: "すまほ", answer: "Smartphone", emoji: "📱", korean: "스마트폰", jlpt: "N5" },
  { id: 17, katakana: "メール", furigana: "めーる", answer: "Mail", emoji: "✉️", korean: "메일", jlpt: "N5" },
  { id: 18, katakana: "ゲーム", furigana: "げーむ", answer: "Game", emoji: "🎮", korean: "게임", jlpt: "N5" },
  { id: 19, katakana: "アプリ", furigana: "あぷり", answer: "App", emoji: "📲", korean: "앱", jlpt: "N5" },
  { id: 20, katakana: "ホテル", furigana: "ほてる", answer: "Hotel", emoji: "🏨", korean: "호텔", jlpt: "N5" },
  { id: 21, katakana: "コンビニ", furigana: "こんびに", answer: "Convenience store", emoji: "🏪", korean: "편의점", jlpt: "N5" },
  { id: 22, katakana: "スーパー", furigana: "すーぱー", answer: "Supermarket", emoji: "🛒", korean: "슈퍼마켓", jlpt: "N5" },
  { id: 23, katakana: "デパート", furigana: "でぱーと", answer: "Department store", emoji: "🏬", korean: "백화점", jlpt: "N5" },
  { id: 24, katakana: "ショッピング", furigana: "しょっぴんぐ", answer: "Shopping", emoji: "🛍️", korean: "쇼핑", jlpt: "N5" },
  { id: 25, katakana: "パン", furigana: "ぱん", answer: "Bread", emoji: "🍞", korean: "빵", jlpt: "N5" },
  { id: 26, katakana: "ピザ", furigana: "ぴざ", answer: "Pizza", emoji: "🍕", korean: "피자", jlpt: "N5" },
  { id: 27, katakana: "ハンバーガー", furigana: "はんばーがー", answer: "Hamburger", emoji: "🍔", korean: "햄버거", jlpt: "N5" },
  { id: 28, katakana: "ステーキ", furigana: "すてーき", answer: "Steak", emoji: "🥩", korean: "스테이크", jlpt: "N5" },
  { id: 29, katakana: "サラダ", furigana: "さらだ", answer: "Salad", emoji: "🥗", korean: "샐러드", jlpt: "N5" },
  { id: 30, katakana: "フルーツ", furigana: "ふるーつ", answer: "Fruits", emoji: "🍎", korean: "과일", jlpt: "N5" },
  { id: 31, katakana: "オレンジ", furigana: "おれんじ", answer: "Orange", emoji: "🍊", korean: "오렌지", jlpt: "N5" },
  { id: 32, katakana: "バナナ", furigana: "ばなな", answer: "Banana", emoji: "🍌", korean: "바나나", jlpt: "N5" },
  { id: 33, katakana: "イチゴ", furigana: "いちご", answer: "Strawberry", emoji: "🍓", korean: "딸기", jlpt: "N5" },
  { id: 34, katakana: "スイカ", furigana: "すいか", answer: "Watermelon", emoji: "🍉", korean: "수박", jlpt: "N5" },
  { id: 35, katakana: "レモン", furigana: "れもん", answer: "Lemon", emoji: "🍋", korean: "레몬", jlpt: "N5" },
  { id: 36, katakana: "ミルク", furigana: "みるく", answer: "Milk", emoji: "🥛", korean: "우유", jlpt: "N5" },
  { id: 37, katakana: "ジュース", furigana: "じゅーす", answer: "Juice", emoji: "🧃", korean: "주스", jlpt: "N5" },
  { id: 38, katakana: "ビール", furigana: "びーる", answer: "Beer", emoji: "🍺", korean: "맥주", jlpt: "N5" },
  { id: 39, katakana: "ワイン", furigana: "わいん", answer: "Wine", emoji: "🍷", korean: "와인", jlpt: "N5" },
  { id: 40, katakana: "ウイスキー", furigana: "ういすきー", answer: "Whiskey", emoji: "🥃", korean: "위스키", jlpt: "N5" },
  { id: 41, katakana: "タバコ", furigana: "たばこ", answer: "Cigarette", emoji: "🚬", korean: "담배", jlpt: "N4" },
  { id: 42, katakana: "ニュース", furigana: "にゅーす", answer: "News", emoji: "📰", korean: "뉴스", jlpt: "N4" },
  { id: 43, katakana: "スポーツ", furigana: "すぽーつ", answer: "Sports", emoji: "⚽", korean: "스포츠", jlpt: "N4" },
  { id: 44, katakana: "サッカー", furigana: "さっかー", answer: "Soccer", emoji: "⚽", korean: "축구", jlpt: "N4" },
  { id: 45, katakana: "テニス", furigana: "てにす", answer: "Tennis", emoji: "🎾", korean: "테니스", jlpt: "N4" },
  { id: 46, katakana: "ゴルフ", furigana: "ごるふ", answer: "Golf", emoji: "🏌️", korean: "골프", jlpt: "N4" },
  { id: 47, katakana: "バレーボール", furigana: "ばれーぼーる", answer: "Volleyball", emoji: "🏐", korean: "배구", jlpt: "N4" },
  { id: 48, katakana: "バスケットボール", furigana: "ばすけっとぼーる", answer: "Basketball", emoji: "🏀", korean: "농구", jlpt: "N4" },
  { id: 49, katakana: "ランニング", furigana: "らんにんぐ", answer: "Running", emoji: "🏃", korean: "러닝", jlpt: "N4" },
  { id: 50, katakana: "ヨガ", furigana: "よが", answer: "Yoga", emoji: "🧘", korean: "요가", jlpt: "N4" },
  { id: 51, katakana: "トレーニング", furigana: "とれーにんぐ", answer: "Training", emoji: "🏋️", korean: "트레이닝", jlpt: "N4" },
  { id: 52, katakana: "サウナ", furigana: "さうな", answer: "Sauna", emoji: "🧖", korean: "사우나", jlpt: "N4" },
  { id: 53, katakana: "プール", furigana: "ぷーる", answer: "Pool", emoji: "🏊", korean: "수영장", jlpt: "N4" },
  { id: 54, katakana: "ビーチ", furigana: "びーち", answer: "Beach", emoji: "🏖️", korean: "해변", jlpt: "N4" },
  { id: 55, katakana: "ホテル", furigana: "ほてる", answer: "Hotel", emoji: "🏨", korean: "호텔", jlpt: "N4" },
  { id: 56, katakana: "パスポート", furigana: "ぱすぽーと", answer: "Passport", emoji: "🛂", korean: "여권", jlpt: "N4" },
  { id: 57, katakana: "チケット", furigana: "ちけっと", answer: "Ticket", emoji: "🎫", korean: "티켓", jlpt: "N4" },
  { id: 58, katakana: "バッグ", furigana: "ばっぐ", answer: "Bag", emoji: "👜", korean: "가방", jlpt: "N4" },
  { id: 59, katakana: "スーツケース", furigana: "すーつけーす", answer: "Suitcase", emoji: "🧳", korean: "여행가방", jlpt: "N4" },
  { id: 60, katakana: "マップ", furigana: "まっぷ", answer: "Map", emoji: "🗺️", korean: "지도", jlpt: "N4" },
  { id: 61, katakana: "タクシー", furigana: "たくしー", answer: "Taxi", emoji: "🚖", korean: "택시", jlpt: "N4" },
  { id: 62, katakana: "トラック", furigana: "とらっく", answer: "Truck", emoji: "🚚", korean: "트럭", jlpt: "N4" },
  { id: 63, katakana: "バイク", furigana: "ばいく", answer: "Bike", emoji: "🏍️", korean: "오토바이", jlpt: "N4" },
  { id: 64, katakana: "モーター", furigana: "もーたー", answer: "Motor", emoji: "⚙️", korean: "모터", jlpt: "N4" },
  { id: 65, katakana: "エンジン", furigana: "えんじん", answer: "Engine", emoji: "🔧", korean: "엔진", jlpt: "N4" },
  { id: 66, katakana: "ガソリン", furigana: "がそりん", answer: "Gasoline", emoji: "⛽", korean: "가솔린", jlpt: "N4" },
  { id: 67, katakana: "バッテリー", furigana: "ばってりー", answer: "Battery", emoji: "🔋", korean: "배터리", jlpt: "N4" },
  { id: 68, katakana: "エネルギー", furigana: "えねるぎー", answer: "Energy", emoji: "⚡", korean: "에너지", jlpt: "N4" },
  { id: 69, katakana: "ソフト", furigana: "そふと", answer: "Software", emoji: "💾", korean: "소프트웨어", jlpt: "N4" },
  { id: 70, katakana: "ハード", furigana: "はーど", answer: "Hardware", emoji: "🖥️", korean: "하드웨어", jlpt: "N4" },
  { id: 71, katakana: "クラウド", furigana: "くらうど", answer: "Cloud", emoji: "☁️", korean: "클라우드", jlpt: "N4" },
  { id: 72, katakana: "データ", furigana: "でーた", answer: "Data", emoji: "📊", korean: "데이터", jlpt: "N4" },
  { id: 73, katakana: "ネット", furigana: "ねっと", answer: "Net", emoji: "🌐", korean: "인터넷", jlpt: "N4" },
  { id: 74, katakana: "サイト", furigana: "さいと", answer: "Site", emoji: "💻", korean: "사이트", jlpt: "N4" },
  { id: 75, katakana: "ブログ", furigana: "ぶろぐ", answer: "Blog", emoji: "📝", korean: "블로그", jlpt: "N4" },
  { id: 76, katakana: "ニュース", furigana: "にゅーす", answer: "News", emoji: "📰", korean: "뉴스", jlpt: "N4" },
  { id: 77, katakana: "ストーリー", furigana: "すとーりー", answer: "Story", emoji: "📖", korean: "스토리", jlpt: "N4" },
  { id: 78, katakana: "メモ", furigana: "めも", answer: "Memo", emoji: "🗒️", korean: "메모", jlpt: "N4" },
  { id: 79, katakana: "カレンダー", furigana: "かれんだー", answer: "Calendar", emoji: "📆", korean: "캘린더", jlpt: "N4" },
  { id: 80, katakana: "スケジュール", furigana: "すけじゅーる", answer: "Schedule", emoji: "🗓️", korean: "스케줄", jlpt: "N4" },
  { id: 81, katakana: "ミーティング", furigana: "みーてぃんぐ", answer: "Meeting", emoji: "👥", korean: "미팅", jlpt: "N3" },
  { id: 82, katakana: "プロジェクト", furigana: "ぷろじぇくと", answer: "Project", emoji: "📂", korean: "프로젝트", jlpt: "N3" },
  { id: 83, katakana: "タスク", furigana: "たすく", answer: "Task", emoji: "✅", korean: "작업", jlpt: "N3" },
  { id: 84, katakana: "チェック", furigana: "ちぇっく", answer: "Check", emoji: "✔️", korean: "체크", jlpt: "N3" },
  { id: 85, katakana: "リスト", furigana: "りすと", answer: "List", emoji: "📋", korean: "리스트", jlpt: "N3" },
  { id: 86, katakana: "ゴール", furigana: "ごーる", answer: "Goal", emoji: "🥅", korean: "목표", jlpt: "N3" },
  { id: 87, katakana: "プラン", furigana: "ぷらん", answer: "Plan", emoji: "📝", korean: "계획", jlpt: "N3" },
  { id: 88, katakana: "アイデア", furigana: "あいであ", answer: "Idea", emoji: "💡", korean: "아이디어", jlpt: "N3" },
  { id: 89, katakana: "デザイン", furigana: "でざいん", answer: "Design", emoji: "🎨", korean: "디자인", jlpt: "N3" },
  { id: 90, katakana: "カラー", furigana: "からー", answer: "Color", emoji: "🎨", korean: "색상", jlpt: "N3" },
  { id: 91, katakana: "システム", furigana: "しすてむ", answer: "System", emoji: "🖥️", korean: "시스템", jlpt: "N3" },
  { id: 92, katakana: "プログラム", furigana: "ぷろぐらむ", answer: "Program", emoji: "💻", korean: "프로그램", jlpt: "N3" },
  { id: 93, katakana: "コード", furigana: "こーど", answer: "Code", emoji: "👨‍💻", korean: "코드", jlpt: "N3" },
  { id: 94, katakana: "テスト", furigana: "てすと", answer: "Test", emoji: "🧪", korean: "테스트", jlpt: "N3" },
  { id: 95, katakana: "バグ", furigana: "ばぐ", answer: "Bug", emoji: "🐞", korean: "버그", jlpt: "N3" },
  { id: 96, katakana: "アップデート", furigana: "あっぷでーと", answer: "Update", emoji: "🔄", korean: "업데이트", jlpt: "N3" },
  { id: 97, katakana: "バージョン", furigana: "ばーじょん", answer: "Version", emoji: "🔢", korean: "버전", jlpt: "N3" },
  { id: 98, katakana: "ログイン", furigana: "ろぐいん", answer: "Login", emoji: "🔑", korean: "로그인", jlpt: "N3" },
  { id: 99, katakana: "パスワード", furigana: "ぱすわーど", answer: "Password", emoji: "🔐", korean: "비밀번호", jlpt: "N3" },
  { id: 100, katakana: "ユーザー", furigana: "ゆーざー", answer: "User", emoji: "👤", korean: "사용자", jlpt: "N3" },
];


// 일본어 웹 폰트 스택(이름 → font-family 문자열)
export const FONT_STACKS: Record<string, string> = {
    'Noto Sans JP':
      `'Noto Sans JP','Hiragino Kaku Gothic ProN','Meiryo','Yu Gothic UI',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial`,
    'Zen Kaku Gothic New':
      `'Zen Kaku Gothic New','Hiragino Kaku Gothic ProN','Meiryo','Yu Gothic UI',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial`,
    'Noto Serif JP':
      `'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif`,
    'Kosugi Maru':
      `'Kosugi Maru','Hiragino Kaku Gothic ProN','Meiryo','Yu Gothic UI',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial`,
  };
