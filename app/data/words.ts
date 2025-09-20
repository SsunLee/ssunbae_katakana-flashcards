
export {};

// api로 가져올 단어 항목 타입
export type Word = {
  id: number;
  katakana: string;
  furigana: string;
  answer: string;
  emoji: string;
  korean?: string;
};

// Dataset (100 words)
export const WORDS: Word[] = [
  { id: 1, katakana: "タクシー", furigana: "たくしー", answer: "Taxi", emoji: "🚖", korean: "택시" },
  { id: 2, katakana: "バス", furigana: "ばす", answer: "Bus", emoji: "🚌", korean: "버스" },
  { id: 3, katakana: "コーヒー", furigana: "こーひー", answer: "Coffee", emoji: "☕", korean: "커피" },
  { id: 4, katakana: "レストラン", furigana: "れすとらん", answer: "Restaurant", emoji: "🍽️", korean: "레스토랑" },
  { id: 5, katakana: "コンピューター", furigana: "こんぴゅーたー", answer: "Computer", emoji: "💻", korean: "컴퓨터" },
  { id: 6, katakana: "ドア", furigana: "どあ", answer: "Door", emoji: "🚪", korean: "문" },
  { id: 7, katakana: "ノート", furigana: "のーと", answer: "Notebook", emoji: "📒", korean: "노트" },
  { id: 8, katakana: "エレベーター", furigana: "えれべーたー", answer: "Elevator", emoji: "🛗", korean: "엘리베이터" },
  { id: 9, katakana: "エスカレーター", furigana: "えすかれーたー", answer: "Escalator", emoji: "⬆️", korean: "에스컬레이터" },
  { id: 10, katakana: "アイスクリーム", furigana: "あいすくりーむ", answer: "Ice cream", emoji: "🍨", korean: "아이스크림" },
  { id: 11, katakana: "サンドイッチ", furigana: "さんどいっち", answer: "Sandwich", emoji: "🥪", korean: "샌드위치" },
  { id: 12, katakana: "テーブル", furigana: "てーぶる", answer: "Table", emoji: "🪑", korean: "테이블" },
  { id: 13, katakana: "テレビ", furigana: "てれび", answer: "Television", emoji: "📺", korean: "텔레비전" },
  { id: 14, katakana: "ラジオ", furigana: "らじお", answer: "Radio", emoji: "📻", korean: "라디오" },
  { id: 15, katakana: "カメラ", furigana: "かめら", answer: "Camera", emoji: "📷", korean: "카메라" },
  { id: 16, katakana: "スマホ", furigana: "すまほ", answer: "Smartphone", emoji: "📱", korean: "스마트폰" },
  { id: 17, katakana: "メール", furigana: "めーる", answer: "Mail", emoji: "✉️", korean: "메일" },
  { id: 18, katakana: "ゲーム", furigana: "げーむ", answer: "Game", emoji: "🎮", korean: "게임" },
  { id: 19, katakana: "アプリ", furigana: "あぷり", answer: "App", emoji: "📲", korean: "앱" },
  { id: 20, katakana: "ホテル", furigana: "ほてる", answer: "Hotel", emoji: "🏨", korean: "호텔" },
  { id: 21, katakana: "コンビニ", furigana: "こんびに", answer: "Convenience store", emoji: "🏪", korean: "편의점" },
  { id: 22, katakana: "スーパー", furigana: "すーぱー", answer: "Supermarket", emoji: "🛒", korean: "슈퍼마켓" },
  { id: 23, katakana: "デパート", furigana: "でぱーと", answer: "Department store", emoji: "🏬", korean: "백화점" },
  { id: 24, katakana: "ショッピング", furigana: "しょっぴんぐ", answer: "Shopping", emoji: "🛍️", korean: "쇼핑" },
  { id: 25, katakana: "パン", furigana: "ぱん", answer: "Bread", emoji: "🍞", korean: "빵" },
  { id: 26, katakana: "ピザ", furigana: "ぴざ", answer: "Pizza", emoji: "🍕", korean: "피자" },
  { id: 27, katakana: "ハンバーガー", furigana: "はんばーがー", answer: "Hamburger", emoji: "🍔", korean: "햄버거" },
  { id: 28, katakana: "ステーキ", furigana: "すてーき", answer: "Steak", emoji: "🥩", korean: "스테이크" },
  { id: 29, katakana: "サラダ", furigana: "さらだ", answer: "Salad", emoji: "🥗", korean: "샐러드" },
  { id: 30, katakana: "フルーツ", furigana: "ふるーつ", answer: "Fruits", emoji: "🍎", korean: "과일" },
  { id: 31, katakana: "オレンジ", furigana: "おれんじ", answer: "Orange", emoji: "🍊", korean: "오렌지" },
  { id: 32, katakana: "バナナ", furigana: "ばなな", answer: "Banana", emoji: "🍌", korean: "바나나" },
  { id: 33, katakana: "イチゴ", furigana: "いちご", answer: "Strawberry", emoji: "🍓", korean: "딸기" },
  { id: 34, katakana: "スイカ", furigana: "すいか", answer: "Watermelon", emoji: "🍉", korean: "수박" },
  { id: 35, katakana: "レモン", furigana: "れもん", answer: "Lemon", emoji: "🍋", korean: "레몬" },
  { id: 36, katakana: "ミルク", furigana: "みるく", answer: "Milk", emoji: "🥛", korean: "우유" },
  { id: 37, katakana: "ジュース", furigana: "じゅーす", answer: "Juice", emoji: "🧃", korean: "주스" },
  { id: 38, katakana: "ビール", furigana: "びーる", answer: "Beer", emoji: "🍺", korean: "맥주" },
  { id: 39, katakana: "ワイン", furigana: "わいん", answer: "Wine", emoji: "🍷", korean: "와인" },
  { id: 40, katakana: "ウイスキー", furigana: "ういすきー", answer: "Whiskey", emoji: "🥃", korean: "위스키" },
  { id: 41, katakana: "タバコ", furigana: "たばこ", answer: "Cigarette", emoji: "🚬", korean: "담배" },
  { id: 42, katakana: "ニュース", furigana: "にゅーす", answer: "News", emoji: "📰", korean: "뉴스" },
  { id: 43, katakana: "スポーツ", furigana: "すぽーつ", answer: "Sports", emoji: "⚽", korean: "스포츠" },
  { id: 44, katakana: "サッカー", furigana: "さっかー", answer: "Soccer", emoji: "⚽", korean: "축구" },
  { id: 45, katakana: "テニス", furigana: "てにす", answer: "Tennis", emoji: "🎾", korean: "테니스" },
  { id: 46, katakana: "ゴルフ", furigana: "ごるふ", answer: "Golf", emoji: "🏌️", korean: "골프" },
  { id: 47, katakana: "バレーボール", furigana: "ばれーぼーる", answer: "Volleyball", emoji: "🏐", korean: "배구" },
  { id: 48, katakana: "バスケットボール", furigana: "ばすけっとぼーる", answer: "Basketball", emoji: "🏀", korean: "농구" },
  { id: 49, katakana: "ランニング", furigana: "らんにんぐ", answer: "Running", emoji: "🏃", korean: "러닝" },
  { id: 50, katakana: "ヨガ", furigana: "よが", answer: "Yoga", emoji: "🧘", korean: "요가" },
  { id: 51, katakana: "トレーニング", furigana: "とれーにんぐ", answer: "Training", emoji: "🏋️", korean: "트레이닝" },
  { id: 52, katakana: "サウナ", furigana: "さうな", answer: "Sauna", emoji: "🧖", korean: "사우나" },
  { id: 53, katakana: "プール", furigana: "ぷーる", answer: "Pool", emoji: "🏊", korean: "수영장" },
  { id: 54, katakana: "ビーチ", furigana: "びーち", answer: "Beach", emoji: "🏖️", korean: "해변" },
  { id: 55, katakana: "ホテル", furigana: "ほてる", answer: "Hotel", emoji: "🏨", korean: "호텔" },
  { id: 56, katakana: "パスポート", furigana: "ぱすぽーと", answer: "Passport", emoji: "🛂", korean: "여권" },
  { id: 57, katakana: "チケット", furigana: "ちけっと", answer: "Ticket", emoji: "🎫", korean: "티켓" },
  { id: 58, katakana: "バッグ", furigana: "ばっぐ", answer: "Bag", emoji: "👜", korean: "가방" },
  { id: 59, katakana: "スーツケース", furigana: "すーつけーす", answer: "Suitcase", emoji: "🧳", korean: "여행가방" },
  { id: 60, katakana: "マップ", furigana: "まっぷ", answer: "Map", emoji: "🗺️", korean: "지도" },
  { id: 61, katakana: "タクシー", furigana: "たくしー", answer: "Taxi", emoji: "🚖", korean: "택시" },
  { id: 62, katakana: "トラック", furigana: "とらっく", answer: "Truck", emoji: "🚚", korean: "트럭" },
  { id: 63, katakana: "バイク", furigana: "ばいく", answer: "Bike", emoji: "🏍️", korean: "오토바이" },
  { id: 64, katakana: "モーター", furigana: "もーたー", answer: "Motor", emoji: "⚙️", korean: "모터" },
  { id: 65, katakana: "エンジン", furigana: "えんじん", answer: "Engine", emoji: "🔧", korean: "엔진" },
  { id: 66, katakana: "ガソリン", furigana: "がそりん", answer: "Gasoline", emoji: "⛽", korean: "가솔린" },
  { id: 67, katakana: "バッテリー", furigana: "ばってりー", answer: "Battery", emoji: "🔋", korean: "배터리" },
  { id: 68, katakana: "エネルギー", furigana: "えねるぎー", answer: "Energy", emoji: "⚡", korean: "에너지" },
  { id: 69, katakana: "ソフト", furigana: "そふと", answer: "Software", emoji: "💾", korean: "소프트웨어" },
  { id: 70, katakana: "ハード", furigana: "はーど", answer: "Hardware", emoji: "🖥️", korean: "하드웨어" },
  { id: 71, katakana: "クラウド", furigana: "くらうど", answer: "Cloud", emoji: "☁️", korean: "클라우드" },
  { id: 72, katakana: "データ", furigana: "でーた", answer: "Data", emoji: "📊", korean: "데이터" },
  { id: 73, katakana: "ネット", furigana: "ねっと", answer: "Net", emoji: "🌐", korean: "인터넷" },
  { id: 74, katakana: "サイト", furigana: "さいと", answer: "Site", emoji: "💻", korean: "사이트" },
  { id: 75, katakana: "ブログ", furigana: "ぶろぐ", answer: "Blog", emoji: "📝", korean: "블로그" },
  { id: 76, katakana: "ニュース", furigana: "にゅーす", answer: "News", emoji: "📰", korean: "뉴스" },
  { id: 77, katakana: "ストーリー", furigana: "すとーりー", answer: "Story", emoji: "📖", korean: "스토리" },
  { id: 78, katakana: "メモ", furigana: "めも", answer: "Memo", emoji: "🗒️", korean: "메모" },
  { id: 79, katakana: "カレンダー", furigana: "かれんだー", answer: "Calendar", emoji: "📆", korean: "캘린더" },
  { id: 80, katakana: "スケジュール", furigana: "すけじゅーる", answer: "Schedule", emoji: "🗓️", korean: "스케줄" },
  { id: 81, katakana: "ミーティング", furigana: "みーてぃんぐ", answer: "Meeting", emoji: "👥", korean: "미팅" },
  { id: 82, katakana: "プロジェクト", furigana: "ぷろじぇくと", answer: "Project", emoji: "📂", korean: "프로젝트" },
  { id: 83, katakana: "タスク", furigana: "たすく", answer: "Task", emoji: "✅", korean: "작업" },
  { id: 84, katakana: "チェック", furigana: "ちぇっく", answer: "Check", emoji: "✔️", korean: "체크" },
  { id: 85, katakana: "リスト", furigana: "りすと", answer: "List", emoji: "📋", korean: "리스트" },
  { id: 86, katakana: "ゴール", furigana: "ごーる", answer: "Goal", emoji: "🥅", korean: "목표" },
  { id: 87, katakana: "プラン", furigana: "ぷらん", answer: "Plan", emoji: "📝", korean: "계획" },
  { id: 88, katakana: "アイデア", furigana: "あいであ", answer: "Idea", emoji: "💡", korean: "아이디어" },
  { id: 89, katakana: "デザイン", furigana: "でざいん", answer: "Design", emoji: "🎨", korean: "디자인" },
  { id: 90, katakana: "カラー", furigana: "からー", answer: "Color", emoji: "🎨", korean: "색상" },
  { id: 91, katakana: "システム", furigana: "しすてむ", answer: "System", emoji: "🖥️", korean: "시스템" },
  { id: 92, katakana: "プログラム", furigana: "ぷろぐらむ", answer: "Program", emoji: "💻", korean: "프로그램" },
  { id: 93, katakana: "コード", furigana: "こーど", answer: "Code", emoji: "👨‍💻", korean: "코드" },
  { id: 94, katakana: "テスト", furigana: "てすと", answer: "Test", emoji: "🧪", korean: "테스트" },
  { id: 95, katakana: "バグ", furigana: "ばぐ", answer: "Bug", emoji: "🐞", korean: "버그" },
  { id: 96, katakana: "アップデート", furigana: "あっぷでーと", answer: "Update", emoji: "🔄", korean: "업데이트" },
  { id: 97, katakana: "バージョン", furigana: "ばーじょん", answer: "Version", emoji: "🔢", korean: "버전" },
  { id: 98, katakana: "ログイン", furigana: "ろぐいん", answer: "Login", emoji: "🔑", korean: "로그인" },
  { id: 99, katakana: "パスワード", furigana: "ぱすわーど", answer: "Password", emoji: "🔐", korean: "비밀번호" },
  { id: 100, katakana: "ユーザー", furigana: "ゆーざー", answer: "User", emoji: "👤", korean: "사용자" },
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