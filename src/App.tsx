import React, { useEffect, useMemo, useState } from "react";
import "@fontsource/noto-sans-jp"; // 일본어 가독성 향상 (웹폰트)

// ————————————————————————————————————————————————
// Katakana Flashcard Webapp v0.2.0
// Recent updates:
//  - v0.2.0: Enhanced Safari TTS quality with voice optimization
//  - v0.1.0: Initial release with 100 words, romaji conversion, TTS
//  - Features: Kana→romaji (hepburn/simple), Audio playback, 3D cards
// ————————————————————————————————————————————————

// App version from package.json
const APP_VERSION = "0.2.0";

// Dataset (100 words)
const WORDS = [
  { id: 1, katakana: "タクシー", furigana: "たくしー", answer: "Taxi", emoji: "🚖" },
  { id: 2, katakana: "バス", furigana: "ばす", answer: "Bus", emoji: "🚌" },
  { id: 3, katakana: "コーヒー", furigana: "こーひー", answer: "Coffee", emoji: "☕" },
  { id: 4, katakana: "レストラン", furigana: "れすとらん", answer: "Restaurant", emoji: "🍽️" },
  { id: 5, katakana: "コンピューター", furigana: "こんぴゅーたー", answer: "Computer", emoji: "💻" },
  { id: 6, katakana: "ドア", furigana: "どあ", answer: "Door", emoji: "🚪" },
  { id: 7, katakana: "ノート", furigana: "のーと", answer: "Notebook", emoji: "📒" },
  { id: 8, katakana: "エレベーター", furigana: "えれべーたー", answer: "Elevator", emoji: "🛗" },
  { id: 9, katakana: "エスカレーター", furigana: "えすかれーたー", answer: "Escalator", emoji: "⬆️" },
  { id: 10, katakana: "アイスクリーム", furigana: "あいすくりーむ", answer: "Ice cream", emoji: "🍨" },
  { id: 11, katakana: "サンドイッチ", furigana: "さんどいっち", answer: "Sandwich", emoji: "🥪" },
  { id: 12, katakana: "テーブル", furigana: "てーぶる", answer: "Table", emoji: "🪑" },
  { id: 13, katakana: "テレビ", furigana: "てれび", answer: "Television", emoji: "📺" },
  { id: 14, katakana: "ラジオ", furigana: "らじお", answer: "Radio", emoji: "📻" },
  { id: 15, katakana: "カメラ", furigana: "かめら", answer: "Camera", emoji: "📷" },
  { id: 16, katakana: "スマホ", furigana: "すまほ", answer: "Smartphone", emoji: "📱" },
  { id: 17, katakana: "メール", furigana: "めーる", answer: "Mail", emoji: "✉️" },
  { id: 18, katakana: "ゲーム", furigana: "げーむ", answer: "Game", emoji: "🎮" },
  { id: 19, katakana: "アプリ", furigana: "あぷり", answer: "App", emoji: "📲" },
  { id: 20, katakana: "ホテル", furigana: "ほてる", answer: "Hotel", emoji: "🏨" },
  { id: 21, katakana: "コンビニ", furigana: "こんびに", answer: "Convenience store", emoji: "🏪" },
  { id: 22, katakana: "スーパー", furigana: "すーぱー", answer: "Supermarket", emoji: "🛒" },
  { id: 23, katakana: "デパート", furigana: "でぱーと", answer: "Department store", emoji: "🏬" },
  { id: 24, katakana: "ショッピング", furigana: "しょっぴんぐ", answer: "Shopping", emoji: "🛍️" },
  { id: 25, katakana: "パン", furigana: "ぱん", answer: "Bread", emoji: "🍞" },
  { id: 26, katakana: "ピザ", furigana: "ぴざ", answer: "Pizza", emoji: "🍕" },
  { id: 27, katakana: "ハンバーガー", furigana: "はんばーがー", answer: "Hamburger", emoji: "🍔" },
  { id: 28, katakana: "ステーキ", furigana: "すてーき", answer: "Steak", emoji: "🥩" },
  { id: 29, katakana: "サラダ", furigana: "さらだ", answer: "Salad", emoji: "🥗" },
  { id: 30, katakana: "フルーツ", furigana: "ふるーつ", answer: "Fruits", emoji: "🍎" },
  { id: 31, katakana: "オレンジ", furigana: "おれんじ", answer: "Orange", emoji: "🍊" },
  { id: 32, katakana: "バナナ", furigana: "ばなな", answer: "Banana", emoji: "🍌" },
  { id: 33, katakana: "イチゴ", furigana: "いちご", answer: "Strawberry", emoji: "🍓" },
  { id: 34, katakana: "スイカ", furigana: "すいか", answer: "Watermelon", emoji: "🍉" },
  { id: 35, katakana: "レモン", furigana: "れもん", answer: "Lemon", emoji: "🍋" },
  { id: 36, katakana: "ミルク", furigana: "みるく", answer: "Milk", emoji: "🥛" },
  { id: 37, katakana: "ジュース", furigana: "じゅーす", answer: "Juice", emoji: "🧃" },
  { id: 38, katakana: "ビール", furigana: "びーる", answer: "Beer", emoji: "🍺" },
  { id: 39, katakana: "ワイン", furigana: "わいん", answer: "Wine", emoji: "🍷" },
  { id: 40, katakana: "ウイスキー", furigana: "ういすきー", answer: "Whiskey", emoji: "🥃" },
  { id: 41, katakana: "タバコ", furigana: "たばこ", answer: "Cigarette", emoji: "🚬" },
  { id: 42, katakana: "ニュース", furigana: "にゅーす", answer: "News", emoji: "📰" },
  { id: 43, katakana: "スポーツ", furigana: "すぽーつ", answer: "Sports", emoji: "⚽" },
  { id: 44, katakana: "サッカー", furigana: "さっかー", answer: "Soccer", emoji: "⚽" },
  { id: 45, katakana: "テニス", furigana: "てにす", answer: "Tennis", emoji: "🎾" },
  { id: 46, katakana: "ゴルフ", furigana: "ごるふ", answer: "Golf", emoji: "🏌️" },
  { id: 47, katakana: "バレーボール", furigana: "ばれーぼーる", answer: "Volleyball", emoji: "🏐" },
  { id: 48, katakana: "バスケットボール", furigana: "ばすけっとぼーる", answer: "Basketball", emoji: "🏀" },
  { id: 49, katakana: "ランニング", furigana: "らんにんぐ", answer: "Running", emoji: "🏃" },
  { id: 50, katakana: "ヨガ", furigana: "よが", answer: "Yoga", emoji: "🧘" },
  { id: 51, katakana: "トレーニング", furigana: "とれーにんぐ", answer: "Training", emoji: "🏋️" },
  { id: 52, katakana: "サウナ", furigana: "さうな", answer: "Sauna", emoji: "🧖" },
  { id: 53, katakana: "プール", furigana: "ぷーる", answer: "Pool", emoji: "🏊" },
  { id: 54, katakana: "ビーチ", furigana: "びーち", answer: "Beach", emoji: "🏖️" },
  { id: 55, katakana: "ホテル", furigana: "ほてる", answer: "Hotel", emoji: "🏨" },
  { id: 56, katakana: "パスポート", furigana: "ぱすぽーと", answer: "Passport", emoji: "🛂" },
  { id: 57, katakana: "チケット", furigana: "ちけっと", answer: "Ticket", emoji: "🎫" },
  { id: 58, katakana: "バッグ", furigana: "ばっぐ", answer: "Bag", emoji: "👜" },
  { id: 59, katakana: "スーツケース", furigana: "すーつけーす", answer: "Suitcase", emoji: "🧳" },
  { id: 60, katakana: "マップ", furigana: "まっぷ", answer: "Map", emoji: "🗺️" },
  { id: 61, katakana: "タクシー", furigana: "たくしー", answer: "Taxi", emoji: "🚖" },
  { id: 62, katakana: "トラック", furigana: "とらっく", answer: "Truck", emoji: "🚚" },
  { id: 63, katakana: "バイク", furigana: "ばいく", answer: "Bike", emoji: "🏍️" },
  { id: 64, katakana: "モーター", furigana: "もーたー", answer: "Motor", emoji: "⚙️" },
  { id: 65, katakana: "エンジン", furigana: "えんじん", answer: "Engine", emoji: "🔧" },
  { id: 66, katakana: "ガソリン", furigana: "がそりん", answer: "Gasoline", emoji: "⛽" },
  { id: 67, katakana: "バッテリー", furigana: "ばってりー", answer: "Battery", emoji: "🔋" },
  { id: 68, katakana: "エネルギー", furigana: "えねるぎー", answer: "Energy", emoji: "⚡" },
  { id: 69, katakana: "ソフト", furigana: "そふと", answer: "Software", emoji: "💾" },
  { id: 70, katakana: "ハード", furigana: "はーど", answer: "Hardware", emoji: "🖥️" },
  { id: 71, katakana: "クラウド", furigana: "くらうど", answer: "Cloud", emoji: "☁️" },
  { id: 72, katakana: "データ", furigana: "でーた", answer: "Data", emoji: "📊" },
  { id: 73, katakana: "ネット", furigana: "ねっと", answer: "Net", emoji: "🌐" },
  { id: 74, katakana: "サイト", furigana: "さいと", answer: "Site", emoji: "💻" },
  { id: 75, katakana: "ブログ", furigana: "ぶろぐ", answer: "Blog", emoji: "📝" },
  { id: 76, katakana: "ニュース", furigana: "にゅーす", answer: "News", emoji: "📰" },
  { id: 77, katakana: "ストーリー", furigana: "すとーりー", answer: "Story", emoji: "📖" },
  { id: 78, katakana: "メモ", furigana: "めも", answer: "Memo", emoji: "🗒️" },
  { id: 79, katakana: "カレンダー", furigana: "かれんだー", answer: "Calendar", emoji: "📆" },
  { id: 80, katakana: "スケジュール", furigana: "すけじゅーる", answer: "Schedule", emoji: "🗓️" },
  { id: 81, katakana: "ミーティング", furigana: "みーてぃんぐ", answer: "Meeting", emoji: "👥" },
  { id: 82, katakana: "プロジェクト", furigana: "ぷろじぇくと", answer: "Project", emoji: "📂" },
  { id: 83, katakana: "タスク", furigana: "たすく", answer: "Task", emoji: "✅" },
  { id: 84, katakana: "チェック", furigana: "ちぇっく", answer: "Check", emoji: "✔️" },
  { id: 85, katakana: "リスト", furigana: "りすと", answer: "List", emoji: "📋" },
  { id: 86, katakana: "ゴール", furigana: "ごーる", answer: "Goal", emoji: "🥅" },
  { id: 87, katakana: "プラン", furigana: "ぷらん", answer: "Plan", emoji: "📝" },
  { id: 88, katakana: "アイデア", furigana: "あいであ", answer: "Idea", emoji: "💡" },
  { id: 89, katakana: "デザイン", furigana: "でざいん", answer: "Design", emoji: "🎨" },
  { id: 90, katakana: "カラー", furigana: "からー", answer: "Color", emoji: "🎨" },
  { id: 91, katakana: "システム", furigana: "しすてむ", answer: "System", emoji: "🖥️" },
  { id: 92, katakana: "プログラム", furigana: "ぷろぐらむ", answer: "Program", emoji: "💻" },
  { id: 93, katakana: "コード", furigana: "こーど", answer: "Code", emoji: "👨‍💻" },
  { id: 94, katakana: "テスト", furigana: "てすと", answer: "Test", emoji: "🧪" },
  { id: 95, katakana: "バグ", furigana: "ばぐ", answer: "Bug", emoji: "🐞" },
  { id: 96, katakana: "アップデート", furigana: "あっぷでーと", answer: "Update", emoji: "🔄" },
  { id: 97, katakana: "バージョン", furigana: "ばーじょん", answer: "Version", emoji: "🔢" },
  { id: 98, katakana: "ログイン", furigana: "ろぐいん", answer: "Login", emoji: "🔑" },
  { id: 99, katakana: "パスワード", furigana: "ぱすわーど", answer: "Password", emoji: "🔐" },
  { id: 100, katakana: "ユーザー", furigana: "ゆーざー", answer: "User", emoji: "👤" },
];

// 일본어 웹 폰트 스택(이름 → font-family 문자열)
const FONT_STACKS: Record<string, string> = {
    'Noto Sans JP':
      `'Noto Sans JP','Hiragino Kaku Gothic ProN','Meiryo','Yu Gothic UI',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial`,
    'Zen Kaku Gothic New':
      `'Zen Kaku Gothic New','Hiragino Kaku Gothic ProN','Meiryo','Yu Gothic UI',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial`,
    'Noto Serif JP':
      `'Noto Serif JP','Hiragino Mincho ProN','Yu Mincho',serif`,
    'Kosugi Maru':
      `'Kosugi Maru','Hiragino Kaku Gothic ProN','Meiryo','Yu Gothic UI',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans','Helvetica Neue',Arial`,
  };


// ひらがな(ふりがな) → ローマ字
// mode: 'hepburn' | 'simple'
function kanaToRomaji(kana: string, mode: 'hepburn' | 'simple' = 'hepburn') {
  if (!kana) return '';

  const baseMapHepburn: Record<string, string> = {
    あ:'a', い:'i', う:'u', え:'e', お:'o',
    か:'ka', き:'ki', く:'ku', け:'ke', こ:'ko',
    さ:'sa', し:'shi', す:'su', せ:'se', そ:'so',
    た:'ta', ち:'chi', つ:'tsu', て:'te', と:'to',
    な:'na', に:'ni', ぬ:'nu', ね:'ne', の:'no',
    は:'ha', ひ:'hi', ふ:'fu', へ:'he', ほ:'ho',
    ま:'ma', み:'mi', む:'mu', め:'me', も:'mo',
    や:'ya', ゆ:'yu', よ:'yo',
    ら:'ra', り:'ri', る:'ru', れ:'re', ろ:'ro',
    わ:'wa', を:'o', ん:'n',
    が:'ga', ぎ:'gi', ぐ:'gu', げ:'ge', ご:'go',
    ざ:'za', じ:'ji', ず:'zu', ぜ:'ze', ぞ:'zo',
    だ:'da', ぢ:'ji', づ:'zu', で:'de', ど:'do',
    ば:'ba', び:'bi', ぶ:'bu', べ:'be', ぼ:'bo',
    ぱ:'pa', ぴ:'pi', ぷ:'pu', ぺ:'pe', ぽ:'po',
    ぁ:'a', ぃ:'i', ぅ:'u', ぇ:'e', ぉ:'o',
    ゃ:'ya', ゅ:'yu', ょ:'yo',
    っ:'*', // sokuon
    ー:'-'
  };

  const baseMapSimple: Record<string, string> = {
    あ:'a', い:'i', う:'u', え:'e', お:'o',
    か:'ka', き:'ki', く:'ku', け:'ke', こ:'ko',
    さ:'sa', し:'si', す:'su', せ:'se', そ:'so',
    た:'ta', ち:'ti', つ:'tu', て:'te', と:'to',
    な:'na', に:'ni', ぬ:'nu', ね:'ne', の:'no',
    は:'ha', ひ:'hi', ふ:'hu', へ:'he', ほ:'ho',
    ま:'ma', み:'mi', む:'mu', め:'me', も:'mo',
    や:'ya', ゆ:'yu', よ:'yo',
    ら:'ra', り:'ri', る:'ru', れ:'re', ろ:'ro',
    わ:'wa', を:'o', ん:'n',
    が:'ga', ぎ:'gi', ぐ:'gu', げ:'ge', ご:'go',
    ざ:'za', じ:'zi', ず:'zu', ぜ:'ze', ぞ:'zo',
    だ:'da', ぢ:'zi', づ:'zu', で:'de', ど:'do',
    ば:'ba', び:'bi', ぶ:'bu', べ:'be', ぼ:'bo',
    ぱ:'pa', ぴ:'pi', ぷ:'pu', ぺ:'pe', ぽ:'po',
    ぁ:'a', ぃ:'i', ぅ:'u', ぇ:'e', ぉ:'o',
    ゃ:'ya', ゅ:'yu', ょ:'yo',
    っ:'*',
    ー:'-'
  };

  const combosHepburn: Record<string, string> = {
    きゃ:'kya', きゅ:'kyu', きょ:'kyo',
    ぎゃ:'gya', ぎゅ:'gyu', ぎょ:'gyo',
    しゃ:'sha', しゅ:'shu', しょ:'sho',
    じゃ:'ja', じゅ:'ju', じょ:'jo',
    ちゃ:'cha', ちゅ:'chu', ちょ:'cho',
    にゃ:'nya', にゅ:'nyu', にょ:'nyo',
    ひゃ:'hya', ひゅ:'hyu', ひょ:'hyo',
    みゃ:'mya', みゅ:'myu', みょ:'myo',
    りゃ:'rya', りゅ:'ryu', りょ:'ryo',
    びゃ:'bya', びゅ:'byu', びょ:'byo',
    ぴゃ:'pya', ぴゅ:'pyu', ぴょ:'pyo'
  };

  const combosSimple: Record<string, string> = {
    きゃ:'kya', きゅ:'kyu', きょ:'kyo',
    ぎゃ:'gya', ぎゅ:'gyu', ぎょ:'gyo',
    しゃ:'sya', しゅ:'syu', しょ:'syo',
    じゃ:'zya', じゅ:'zyu', じょ:'zyo',
    ちゃ:'tya', ちゅ:'tyu', ちょ:'tyo',
    にゃ:'nya', にゅ:'nyu', にょ:'nyo',
    ひゃ:'hya', ひゅ:'hyu', ひょ:'hyo',
    みゃ:'mya', みゅ:'myu', みょ:'myo',
    りゃ:'rya', りゅ:'ryu', りょ:'ryo',
    びゃ:'bya', びゅ:'byu', びょ:'byo',
    ぴゃ:'pya', ぴゅ:'pyu', ぴょ:'pyo'
  };

  const map = mode === 'simple' ? baseMapSimple : baseMapHepburn;
  const combos = mode === 'simple' ? combosSimple : combosHepburn;

  let i = 0;
  let out = '';
  const vowels = ['a','i','u','e','o'];

  const nextRomaji = (idx: number) => {
    const two = kana.slice(idx, idx + 2);
    if (combos[two]) return combos[two];
    const ch = kana[idx];
    return map[ch] || '';
  };

  while (i < kana.length) {
    const two = kana.slice(i, i + 2);
    if (combos[two]) { out += combos[two]; i += 2; continue; }

    const ch = kana[i];

    if (ch === 'っ') {
      // geminate next consonant
      const nxt = nextRomaji(i + 1);
      if (nxt) out += nxt[0];
      i += 1;
      continue;
    }

    if (ch === 'ー') {
      if (mode === 'hepburn') {
        // repeat last vowel (no macron)
        const lastVowel = Array.from(out).reverse().find((c) => vowels.includes(c));
        if (lastVowel) out += lastVowel;
      } else {
        // simple mode: ignore
      }
      i += 1;
      continue;
    }

    out += map[ch] || ch;
    i += 1;
  }

  // n' before vowels or y
  out = out.replace(/n([yaeiou])/g, "n'$1");
  return out;
}

// —— Web Speech API (ja-JP) helper with Safari optimization ——
function useJaSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [ready, setReady] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    function loadVoices() {
      const list = synth.getVoices();
      setVoices(list);
      setReady(list.length > 0);
      
      // Auto-select best Japanese voice when voices load
      if (list.length > 0) {
        // 1) 로컬스토리지에 저장된 보이스 우선
        let stored: SpeechSynthesisVoice | null = null;
        try {
          const storedName = localStorage.getItem('jaVoiceName');
          if (storedName) stored = list.find(v => v.name === storedName) || null;
        } catch {}
        // 2) 없으면 최적 보이스 자동 선택
        const bestVoice = stored || pickBestJaVoice(list);
        setSelectedVoice(bestVoice);

        // save 
        try {
          localStorage.setItem('jaVoiceName', bestVoice?.name || '');
        } catch {}

        

      }
    }
    
    // Safari sometimes needs multiple attempts to load voices
    loadVoices();
    if (window.speechSynthesis.getVoices().length === 0) {
      setTimeout(loadVoices, 100);
      setTimeout(loadVoices, 500);
    }
    
    synth.onvoiceschanged = loadVoices;
    return () => { synth.onvoiceschanged = null; };
  }, []);

  function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  function pickBestJaVoice(vs: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    if (vs.length === 0) return null;

    // For Safari, prioritize specific high-quality Japanese voices
    if (isSafari()) {
      // Try to find the best Japanese voices on Safari/macOS
      const priorities = [
        'Kyoko',           // macOS built-in Japanese voice (best quality)
        'Otoya',           // Alternative Japanese voice
        'O-ren',           // Another Japanese voice option
      ];
      
      for (const name of priorities) {
        const voice = vs.find(v => v.name.includes(name));
        if (voice) return voice;
      }
    }

    // General prioritization for all browsers
    const jaVoices = vs.filter(v => {
      const lang = v.lang?.toLowerCase();
      return lang?.startsWith('ja') || /japanese|nihon/i.test(v.name);
    });

    if (jaVoices.length === 0) {
      console.warn('No Japanese voices found, using default voice');
      return vs[0] || null;
    }

    // Prioritize by quality indicators
    const sortedVoices = jaVoices.sort((a, b) => {
      // Prefer local voices over remote
      if (a.localService !== b.localService) {
        return a.localService ? -1 : 1;
      }
      
      // Prefer voices with 'ja-JP' over other Japanese variants
      const aIsJaJP = a.lang === 'ja-JP';
      const bIsJaJP = b.lang === 'ja-JP';
      if (aIsJaJP !== bIsJaJP) {
        return aIsJaJP ? -1 : 1;
      }
      
      // For Safari, prefer specific known good voices
      if (isSafari()) {
        const qualityNames = ['Kyoko', 'Otoya', 'O-ren'];
        const aHasQuality = qualityNames.some(name => a.name.includes(name));
        const bHasQuality = qualityNames.some(name => b.name.includes(name));
        if (aHasQuality !== bHasQuality) {
          return aHasQuality ? -1 : 1;
        }
      }
      
      return 0;
    });

    return sortedVoices[0];
  }

  function speakJa(text: string) {
    const synth = window.speechSynthesis;
    if (!text || !('speechSynthesis' in window)) return;
    
    synth.cancel();
    
    const utter = new SpeechSynthesisUtterance(text);
    const voice = selectedVoice || pickBestJaVoice(voices);
    
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang || 'ja-JP';
    } else {
      utter.lang = 'ja-JP';
    }
    
    // Optimize speech parameters for better quality
    utter.rate = isSafari() ? 0.9 : 1.0;  // Slightly slower on Safari for clarity
    utter.pitch = 1.0;
    utter.volume = 1.0;
    
    // Add error handling
    utter.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
    };
    
    synth.speak(utter);
  }

  return { 
    ready, 
    voices, 
    selectedVoice,
    speakJa,
    setSelectedVoice,
    isSafari: isSafari()
  } as const;
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck, setDeck] = useState(WORDS);
  const [romajiMode, setRomajiMode] = useState<'hepburn' | 'simple'>('hepburn'); // default Hepburn

  // settings panel
  const [showSettings, setShowSettings] = useState(false);

  // esc로 설정 패널 닫기
  useEffect(() => {
    if (!showSettings) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowSettings(false);};
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showSettings]);


  const [fontFamily, setFontFamily] = useState<string>(() => {
    try {
        return localStorage.getItem('jpFont') || 'Noto Sans JP';
      } catch {
        return 'Noto Sans JP';
      }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jpFont', fontFamily);
    } catch {}
  }, [fontFamily]);
    const fontStack = useMemo(
        () => FONT_STACKS[fontFamily] || FONT_STACKS['Noto Sans JP'],
        [fontFamily]
    );

  const { ready: ttsReady, speakJa, selectedVoice, voices, setSelectedVoice, isSafari } = useJaSpeech();

  const current = deck[index];
  const romaji = useMemo(() => kanaToRomaji(current?.furigana || '', romajiMode), [current, romajiMode]);
  const progress = `${index + 1} / ${deck.length}`;

  function onFlip() { setFlipped((f) => !f); }
  function next() { setIndex((i) => (i + 1) % deck.length); setFlipped(false); }
  function prev() { setIndex((i) => (i - 1 + deck.length) % deck.length); setFlipped(false); }
  function shuffle() {
    const arr = [...deck];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setDeck(arr); setIndex(0); setFlipped(false);
  }
  function reset() { setDeck(WORDS); setIndex(0); setFlipped(false); }

  // 키보드 방향키로 이전 다음, 엔터로는 뒤집기
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // 설정 패널 무시
      if (showSettings) return;
      // 입력/선택 요소에 포커스가 있으면 무시
      const tag = (document.activeElement?.tagName || '').toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key ==='ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onFlip();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showSettings, next, prev]);



  // ——— tiny self-tests for kana→romaji ———
  const tests = useMemo(() => {
    const cases = [
      { k: 'たくしー', hep: 'takushii', simp: 'takusi', why: 'ー long i; simple ignores ー' },
      { k: 'がっこう', hep: 'gakkou', simp: 'gakkou', why: 'っ gemination + おう long o' },
      { k: 'しょ', hep: 'sho', simp: 'syo', why: 'combo mapping differs' },
      { k: 'ちゃ', hep: 'cha', simp: 'tya', why: 'combo mapping differs' },
      { k: 'ふじ', hep: 'fuji', simp: 'huzi', why: 'ふ→fu/hu, じ→ji/zi' },
      { k: 'にゅう', hep: 'nyuu', simp: 'nyu', why: 'ゆ + う, simple does not expand lengths' },
    ];
    return cases.map((c) => ({
      ...c,
      gotH: kanaToRomaji(c.k, 'hepburn'),
      gotS: kanaToRomaji(c.k, 'simple'),
      passH: kanaToRomaji(c.k, 'hepburn') === c.hep,
      passS: kanaToRomaji(c.k, 'simple') === c.simp,
    }));
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-6"
      style={{ fontFamily: fontStack }}
    >
      <header className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">💖쑨쑨배의 가타카나 공부💖</h1>
        <p className="text-white/70 mt-1">가타카나 단어를 보고 맞춰보세요. 클릭하면 뒤집혀 정답이 보입니다.</p>
      </header>

       {/* Controls (top) */}
        <div className="mb-4 flex w-full max-w-md items-center justify-between text-sm mx-auto">

          {/* Center: 진행도 */}
          <span className="text-white/70">⚡진행률 : {progress}</span>

          {/* Left: 듣기 버튼 */}
          <button
            onClick={() => speakJa(current?.furigana || '')}
            disabled={!ttsReady}
            className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 disabled:opacity-50"
            title={ttsReady ? "ふりがな を 再生" : "브라우저가 음성을 아직 준비 중입니다"}>
            🔊 듣기 (ふりがな)
          </button>

          {/* Right: 설정 버튼 */}
          <button
            onClick={() => setShowSettings(true)}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10"
            aria-label="Open Settings"
            title="TTS/Font 설정"
          >
           ⚙️설정
          </button>
        </div>

      {/* Settings Panel (modal) */}
      {showSettings && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSettings(false)}
          />
          {/* Panel */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 shadow-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">⚙️설정</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10"
                  aria-label="Close settings">
                  닫기 ✕
                </button>
              </div>

              {/* Voice */}
              <div className="mb-4">
                <label className="block text-sm text-white/70 mb-1">TTS Voice</label>
                <select
                  aria-label="Select Japanese voice"
                  value={(selectedVoice && selectedVoice.name) || (voices[0]?.name ?? '')}
                  onChange={(e) => {
                    const v = voices.find(v => v.name === e.target.value) || null;
                    setSelectedVoice(v);
                    try { localStorage.setItem('jaVoiceName', v?.name || ''); } catch {}
                  }}
                  className="select-light w-full rounded-md px-3 py-2 outline-none"
                >
                  {voices.length === 0 && <option value="">(loading...)</option>}
                  {voices.map(v => (
                    <option key={v.name} value={v.name}>
                      {v.name} {v.lang ? `(${v.lang})` : ''}
                    </option>
                  ))}
                </select>
                <div className="mt-1 text-xs text-white/50">브라우저: {isSafari ? 'Safari' : 'Chrome/Edge 등'}</div>
              </div>

              {/* Font */}
              <div className="mb-2">
                <label className="block text-sm text-white/70 mb-1">Font</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="select-light w-full rounded-md px-3 py-2 outline-none">
                  <option value="Noto Sans JP">Noto Sans JP</option>
                  <option value="Zen Kaku Gothic New">Zen Kaku Gothic New</option>
                  <option value="Noto Serif JP">Noto Serif JP</option>
                  <option value="Kosugi Maru">Kosugi Maru</option>
                </select>
              </div>

              <label className="block text-sm text-white/70 mb-4"> 
                * 적용한 설정들은 즉시 적용 됩니다. 
              </label>

            </div>
          </div>
        </div>
      )}


      {/* Card with 3D flip */}
      <div className="[perspective:1200px] w-full max-w-md select-none">
        <div
          role="button"
          tabIndex={0}
          aria-label="flip card"
          onClick={onFlip}
          className="relative h-64 md:h-72 transition-transform duration-500 [transform-style:preserve-3d] cursor-pointer"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-slate-800/60 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6" style={{ backfaceVisibility: 'hidden' }}>
            <div className="text-sm text-white/60 mb-2">카드를 클릭하세요</div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-semibold leading-snug">
                <ruby>
                  {current.katakana}
                  <rt className="block text-base md:text-lg font-normal text-white/80 mt-2">{current.furigana}</rt>
                </ruby>
              </div>
              <div className="mt-3 text-sm text-white/60">ふりがな 付き</div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-slate-800/80 backdrop-blur rounded-2xl shadow-xl border border-white/10 flex flex-col items-center justify-center px-6" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
            <div className="text-center">
              <div className="text-sm text-white/60 mb-2">정답</div>
              <div className="text-4xl md:text-5xl font-semibold break-words">
                {current.answer} <span className="align-middle">{current.emoji}</span>
                <span className="block text-lg md:text-xl font-normal text-white/80 mt-2">({romaji})</span>
              </div>
              {/* colon code removed per user preference */}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
        <button onClick={prev} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10">← 이전</button>
        <button onClick={next} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10">다음 →</button>
        <button onClick={shuffle} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10" title="카드를 섞습니다">섞기</button>
        <button onClick={reset} className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10" title="처음 상태로 되돌립니다">리셋</button>
        <span className="mx-2 text-white/60">|</span>
      </div>


      {/* App footer notice (bullet tips) */}
      <hr className="my-6 w-full max-w-md border-white/10" />
      <footer className="w-full max-w-md text-sm text-white/70 bg-white/5 rounded-xl px-4 py-3">
        <ul className="list-disc list-inside space-y-1 leading-relaxed">
          <li>설정 패널에서 변경한 <b>TTS Voice</b>와 <b>Font</b>는 <b>즉시 적용</b>됩니다. (브라우저에 저장)</li>
          <li>단어를 추가/수정하려면 코드 상단의 <code>WORDS</code> 배열을 편집하세요.</li>
          <li>Front: 가타카나 + ふりがな · Back: 영어 정답 + 이모지 + <i>(로마자)</i></li>
          <li>키보드: <kbd>Enter</kbd> 카드 뒤집기, <kbd>←/→</kbd> 이전/다음</li>
        </ul>
      </footer>

      {/* Version info */}
      <div className="mt-4 text-center">
        <span className="text-white/40 text-xs">
          카타카나 플래시카드 v{APP_VERSION} | 쑨쑨배의 Github
          <a 
            href="https://github.com/SsunLee/ssunbae_katakana-flashcards" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white/60 ml-1"
          >
            GitHub
          </a>
        </span>
      </div>
    </div>
  );
}
