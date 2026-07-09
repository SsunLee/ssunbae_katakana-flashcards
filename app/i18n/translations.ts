export const supportedLocales = ["ko", "en", "ja", "es"] as const;

export type Locale = (typeof supportedLocales)[number];

export const localeOptions: ReadonlyArray<{ code: Locale; label: string }> = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "es", label: "Español" },
];

const ko = {
  "common.home": "홈",
  "common.support": "고객지원",
  "common.privacy": "개인정보 처리방침",
  "common.terms": "이용약관",
  "common.settings": "설정",
  "common.cancel": "취소",
  "common.language": "언어",
  "common.theme": "테마",
  "common.lightMode": "라이트 모드",
  "common.darkMode": "다크 모드",
  "common.selectLanguage": "언어 선택",
  "common.selectTheme": "테마 선택",
  "common.visitors": "방문자",
  "settings.studyDescription": "학습 환경을 사용자화하세요.",
  "home.eyebrow": "무료 언어 학습 사이트",
  "home.description": "일본어, 영어, 스페인어, 한국어를 짧은 카드와 문장 퀴즈로 반복합니다. 혼자 공부할 때도 보고, 듣고, 다시 풀어볼 수 있게 구성했습니다.",
  "home.startWords": "JLPT 단어 시작",
  "home.sentenceQuiz": "JLPT 문장 퀴즈",
  "home.dashboard": "분석 대시보드",
  "home.japaneseTitle": "일본어 학습",
  "home.japaneseLabel": "Kana, JLPT, Kanji",
  "home.japaneseDescription": "문자부터 문장까지",
  "home.englishTitle": "영어 단어",
  "home.englishLabel": "Words, Examples",
  "home.englishDescription": "예문으로 반복",
  "home.spanishTitle": "스페인어 학습",
  "home.spanishLabel": "Basic Spanish",
  "home.spanishDescription": "발음과 뜻을 함께",
  "home.koreanTitle": "한국어 학습",
  "home.koreanLabel": "Hangul, Words",
  "home.koreanDescription": "자모부터 단어까지",
  "home.flowLabel": "학습 흐름",
  "home.flowTitle": "짧게 풀고, 바로 복습합니다.",
  "home.flowAnswer": "정답 확인",
  "home.flowListen": "발음 듣기",
  "home.flowRecord": "복습 기록",
  "home.flowDescription": "로그인하지 않아도 기본 문제를 풀 수 있고, 로그인하면 이어서 복습할 수 있습니다.",
  "home.methodTitle": "학습 방식",
  "home.methodDescription": "일본어는 히라가나와 가타카나에서 시작해 단어, 문장, 동사 활용, 한자 쓰기로 이어집니다. 영어와 스페인어, 한국어도 같은 카드 흐름을 따르기 때문에 처음 온 사용자도 메뉴를 헤매지 않고 바로 반복 학습을 시작할 수 있습니다.",
  "menu.title": "학습 메뉴",
  "menu.open": "메뉴 열기",
  "menu.close": "메뉴 닫기",
  "menu.description": "언어별 학습 메뉴를 선택할 수 있습니다.",
  "menu.dashboard": "분석 대시보드",
  "menu.japanese": "일본어 공부",
  "menu.english": "영어 공부",
  "menu.spanish": "스페인어 공부",
  "menu.korean": "한국어 공부",
  "menu.sentenceQuiz": "문장 퀴즈",
  "menu.jlptWords": "JLPT 단어",
  "menu.jlptVerbs": "JLPT 동사",
  "menu.jlptKanji": "JLPT 한자",
  "menu.kana": "가타카나 / 히라가나",
  "menu.japaneseSentences": "일본어 문장",
  "menu.wordStudy": "단어 공부",
  "menu.spanishWordStudy": "스페인어 단어 공부",
  "menu.koreanWordStudy": "한국어 단어 공부",
  "menu.hangulChars": "한글 자모 공부",
  "menu.hangulSyllables": "완성형 한글 공부",
  "menu.editProfile": "프로필 수정",
  "menu.notices": "공지사항",
  "menu.deleteAccount": "계정 삭제",
  "menu.logout": "로그아웃",
  "menu.loginRegister": "로그인 / 회원가입",
  "menu.settingsDescription": "사이트 전체에 적용되는 공통 설정입니다.",
  "menu.studySettingsHint": "음성, 폰트, 글자 크기 같은 학습별 세부 설정은 각 학습 화면의 설정 버튼에서 조절할 수 있습니다.",
  "menu.recentStudy": "최근 학습 화면으로 이동",
  "menu.deleteTitle": "정말로 계정을 삭제할까요?",
  "menu.deleteDescription": "이 작업은 되돌릴 수 없습니다. 모든 학습 기록과 프로필이 영구 삭제됩니다.",
  "menu.reauthDescription": "보안을 위해 비밀번호를 다시 확인합니다.",
  "menu.password": "비밀번호",
  "menu.deleteForever": "영구 삭제",
  "menu.reauthDelete": "재인증 후 삭제",
  "auth.login": "로그인",
  "auth.register": "회원가입",
  "auth.loginDescription": "이메일과 비밀번호로 로그인하세요.",
  "auth.registerDescription": "새로운 계정을 만드세요.",
} as const;

export type TranslationKey = keyof typeof ko;

const en: Record<TranslationKey, string> = {
  "common.home": "Home", "common.support": "Support", "common.privacy": "Privacy", "common.terms": "Terms", "common.settings": "Settings", "common.cancel": "Cancel", "common.language": "Language", "common.theme": "Theme", "common.lightMode": "Light mode", "common.darkMode": "Dark mode", "common.selectLanguage": "Select language", "common.selectTheme": "Select theme", "common.visitors": "Visitors", "settings.studyDescription": "Customize your study experience.",
  "home.eyebrow": "Free language learning", "home.description": "Practice Japanese, English, Spanish, and Korean with short flashcards and sentence quizzes. Review at your own pace by reading, listening, and trying again.", "home.startWords": "Start JLPT words", "home.sentenceQuiz": "JLPT sentence quiz", "home.dashboard": "Learning dashboard", "home.japaneseTitle": "Learn Japanese", "home.japaneseLabel": "Kana, JLPT, Kanji", "home.japaneseDescription": "From characters to sentences", "home.englishTitle": "English words", "home.englishLabel": "Words, Examples", "home.englishDescription": "Review with examples", "home.spanishTitle": "Learn Spanish", "home.spanishLabel": "Basic Spanish", "home.spanishDescription": "Pronunciation and meaning", "home.koreanTitle": "Learn Korean", "home.koreanLabel": "Hangul, Words", "home.koreanDescription": "From Hangul to vocabulary", "home.flowLabel": "Study flow", "home.flowTitle": "Practice briefly, review right away.", "home.flowAnswer": "Check answers", "home.flowListen": "Hear pronunciation", "home.flowRecord": "Track reviews", "home.flowDescription": "Try the basic questions without signing in, or sign in to keep your progress and continue reviewing.", "home.methodTitle": "How it works", "home.methodDescription": "Japanese starts with hiragana and katakana, then continues through words, sentences, verb forms, and kanji writing. English, Spanish, and Korean follow the same simple card flow, so you can begin reviewing without getting lost in menus.",
  "menu.title": "Study menu", "menu.open": "Open menu", "menu.close": "Close menu", "menu.description": "Choose a study activity by language.", "menu.dashboard": "Learning dashboard", "menu.japanese": "Japanese", "menu.english": "English", "menu.spanish": "Spanish", "menu.korean": "Korean", "menu.sentenceQuiz": "Sentence quiz", "menu.jlptWords": "JLPT words", "menu.jlptVerbs": "JLPT verbs", "menu.jlptKanji": "JLPT kanji", "menu.kana": "Katakana / Hiragana", "menu.japaneseSentences": "Japanese sentences", "menu.wordStudy": "Vocabulary", "menu.spanishWordStudy": "Spanish vocabulary", "menu.koreanWordStudy": "Korean vocabulary", "menu.hangulChars": "Hangul characters", "menu.hangulSyllables": "Hangul syllables", "menu.editProfile": "Edit profile", "menu.notices": "Notices", "menu.deleteAccount": "Delete account", "menu.logout": "Log out", "menu.loginRegister": "Log in / Sign up", "menu.settingsDescription": "Site-wide preferences that apply across SSUN EDU.", "menu.studySettingsHint": "Voice, font, and text size can be adjusted from the Settings button on each study screen.", "menu.recentStudy": "Return to recent study", "menu.deleteTitle": "Delete your account?", "menu.deleteDescription": "This cannot be undone. All learning history and profile data will be permanently deleted.", "menu.reauthDescription": "Enter your password again for security.", "menu.password": "Password", "menu.deleteForever": "Delete permanently", "menu.reauthDelete": "Verify and delete", "auth.login": "Log in", "auth.register": "Sign up", "auth.loginDescription": "Log in with your email and password.", "auth.registerDescription": "Create a new account.",
};

const ja: Record<TranslationKey, string> = {
  "common.home": "ホーム", "common.support": "サポート", "common.privacy": "プライバシー", "common.terms": "利用規約", "common.settings": "設定", "common.cancel": "キャンセル", "common.language": "言語", "common.theme": "テーマ", "common.lightMode": "ライトモード", "common.darkMode": "ダークモード", "common.selectLanguage": "言語を選択", "common.selectTheme": "テーマを選択", "common.visitors": "訪問者", "settings.studyDescription": "学習環境をカスタマイズできます。",
  "home.eyebrow": "無料の語学学習サイト", "home.description": "日本語・英語・スペイン語・韓国語を、短いカードと文クイズで繰り返し学習できます。見て、聞いて、もう一度解く流れで一人でも続けやすく設計しました。", "home.startWords": "JLPT単語を始める", "home.sentenceQuiz": "JLPT文クイズ", "home.dashboard": "学習ダッシュボード", "home.japaneseTitle": "日本語学習", "home.japaneseLabel": "Kana, JLPT, Kanji", "home.japaneseDescription": "文字から文章まで", "home.englishTitle": "英単語", "home.englishLabel": "Words, Examples", "home.englishDescription": "例文で繰り返す", "home.spanishTitle": "スペイン語学習", "home.spanishLabel": "Basic Spanish", "home.spanishDescription": "発音と意味を一緒に", "home.koreanTitle": "韓国語学習", "home.koreanLabel": "Hangul, Words", "home.koreanDescription": "ハングルから単語まで", "home.flowLabel": "学習の流れ", "home.flowTitle": "短く解いて、すぐ復習。", "home.flowAnswer": "答えを確認", "home.flowListen": "発音を聞く", "home.flowRecord": "復習を記録", "home.flowDescription": "ログインなしでも基本問題を試せます。ログインすると進捗を保存して続きから復習できます。", "home.methodTitle": "学習方法", "home.methodDescription": "日本語はひらがな・カタカナから始まり、単語、文章、動詞活用、漢字の書き取りへ進みます。英語・スペイン語・韓国語も同じカード形式なので、初めてでも迷わず反復学習を始められます。",
  "menu.title": "学習メニュー", "menu.open": "メニューを開く", "menu.close": "メニューを閉じる", "menu.description": "言語ごとに学習メニューを選べます。", "menu.dashboard": "学習ダッシュボード", "menu.japanese": "日本語", "menu.english": "英語", "menu.spanish": "スペイン語", "menu.korean": "韓国語", "menu.sentenceQuiz": "文クイズ", "menu.jlptWords": "JLPT単語", "menu.jlptVerbs": "JLPT動詞", "menu.jlptKanji": "JLPT漢字", "menu.kana": "カタカナ / ひらがな", "menu.japaneseSentences": "日本語の文章", "menu.wordStudy": "単語学習", "menu.spanishWordStudy": "スペイン語単語", "menu.koreanWordStudy": "韓国語単語", "menu.hangulChars": "ハングル文字", "menu.hangulSyllables": "ハングル音節", "menu.editProfile": "プロフィール編集", "menu.notices": "お知らせ", "menu.deleteAccount": "アカウント削除", "menu.logout": "ログアウト", "menu.loginRegister": "ログイン / 新規登録", "menu.settingsDescription": "サイト全体に適用される共通設定です。", "menu.studySettingsHint": "音声、フォント、文字サイズは各学習画面の設定ボタンから調整できます。", "menu.recentStudy": "最近の学習画面へ", "menu.deleteTitle": "アカウントを削除しますか？", "menu.deleteDescription": "この操作は取り消せません。学習履歴とプロフィールは完全に削除されます。", "menu.reauthDescription": "セキュリティのためパスワードを再入力してください。", "menu.password": "パスワード", "menu.deleteForever": "完全に削除", "menu.reauthDelete": "再認証して削除", "auth.login": "ログイン", "auth.register": "新規登録", "auth.loginDescription": "メールアドレスとパスワードでログインしてください。", "auth.registerDescription": "新しいアカウントを作成します。",
};

const es: Record<TranslationKey, string> = {
  "common.home": "Inicio", "common.support": "Ayuda", "common.privacy": "Privacidad", "common.terms": "Términos", "common.settings": "Configuración", "common.cancel": "Cancelar", "common.language": "Idioma", "common.theme": "Tema", "common.lightMode": "Modo claro", "common.darkMode": "Modo oscuro", "common.selectLanguage": "Seleccionar idioma", "common.selectTheme": "Seleccionar tema", "common.visitors": "Visitantes", "settings.studyDescription": "Personaliza tu experiencia de estudio.",
  "home.eyebrow": "Aprende idiomas gratis", "home.description": "Practica japonés, inglés, español y coreano con tarjetas breves y cuestionarios de frases. Lee, escucha y vuelve a intentarlo a tu propio ritmo.", "home.startWords": "Empezar palabras JLPT", "home.sentenceQuiz": "Cuestionario JLPT", "home.dashboard": "Panel de aprendizaje", "home.japaneseTitle": "Aprender japonés", "home.japaneseLabel": "Kana, JLPT, Kanji", "home.japaneseDescription": "De caracteres a frases", "home.englishTitle": "Palabras en inglés", "home.englishLabel": "Words, Examples", "home.englishDescription": "Repasa con ejemplos", "home.spanishTitle": "Aprender español", "home.spanishLabel": "Basic Spanish", "home.spanishDescription": "Pronunciación y significado", "home.koreanTitle": "Aprender coreano", "home.koreanLabel": "Hangul, Words", "home.koreanDescription": "De hangul a vocabulario", "home.flowLabel": "Método de estudio", "home.flowTitle": "Practica un poco y repasa enseguida.", "home.flowAnswer": "Comprueba respuestas", "home.flowListen": "Escucha la pronunciación", "home.flowRecord": "Guarda el repaso", "home.flowDescription": "Prueba las preguntas básicas sin iniciar sesión, o inicia sesión para guardar tu progreso y seguir repasando.", "home.methodTitle": "Cómo funciona", "home.methodDescription": "El japonés comienza con hiragana y katakana y continúa con palabras, frases, formas verbales y escritura kanji. Inglés, español y coreano siguen el mismo flujo sencillo de tarjetas para que puedas empezar sin perderte en los menús.",
  "menu.title": "Menú de estudio", "menu.open": "Abrir menú", "menu.close": "Cerrar menú", "menu.description": "Elige una actividad por idioma.", "menu.dashboard": "Panel de aprendizaje", "menu.japanese": "Japonés", "menu.english": "Inglés", "menu.spanish": "Español", "menu.korean": "Coreano", "menu.sentenceQuiz": "Cuestionario de frases", "menu.jlptWords": "Palabras JLPT", "menu.jlptVerbs": "Verbos JLPT", "menu.jlptKanji": "Kanji JLPT", "menu.kana": "Katakana / Hiragana", "menu.japaneseSentences": "Frases en japonés", "menu.wordStudy": "Vocabulario", "menu.spanishWordStudy": "Vocabulario español", "menu.koreanWordStudy": "Vocabulario coreano", "menu.hangulChars": "Caracteres hangul", "menu.hangulSyllables": "Sílabas hangul", "menu.editProfile": "Editar perfil", "menu.notices": "Avisos", "menu.deleteAccount": "Eliminar cuenta", "menu.logout": "Cerrar sesión", "menu.loginRegister": "Iniciar sesión / Registrarse", "menu.settingsDescription": "Preferencias comunes para todo SSUN EDU.", "menu.studySettingsHint": "La voz, la fuente y el tamaño del texto se ajustan desde el botón Configuración de cada pantalla de estudio.", "menu.recentStudy": "Volver al estudio reciente", "menu.deleteTitle": "¿Eliminar tu cuenta?", "menu.deleteDescription": "Esta acción no se puede deshacer. Todo el historial y el perfil se eliminarán de forma permanente.", "menu.reauthDescription": "Vuelve a introducir tu contraseña por seguridad.", "menu.password": "Contraseña", "menu.deleteForever": "Eliminar para siempre", "menu.reauthDelete": "Verificar y eliminar", "auth.login": "Iniciar sesión", "auth.register": "Registrarse", "auth.loginDescription": "Inicia sesión con tu correo y contraseña.", "auth.registerDescription": "Crea una cuenta nueva.",
};

export const translations: Record<Locale, Record<TranslationKey, string>> = { ko, en, ja, es };
