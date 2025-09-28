
export const ERROR_MESSAGES = {
    DEFAULT: "문제가 발생했습니다. 다시 시도해주세요.",
    CONTENT_GENERATION_FAILED: "콘텐츠 생성에 실패했습니다. 잠시 후 다시 시도해주세요.",
    CANNOT_PARSE_SERVER_RESPONSE: "서버 응답을 처리하는 데 실패했습니다. 잠시 후 다시 시도해주세요.",
    INVALIDE_TOPIC: "주제가 너무 짧거나 부적절합니다. 더 구체적으로 입력해주세요.",
    AUTH_REQUIRED: "이 기능을 사용하려면 로그인이 필요합니다."
} as const;

export const SUCCESS_MESSAGES = {
    CONTENT_GENERATION_SUCCESS: (topic: string, count: number): string =>
        `'${topic}' 주제의 새 콘텐츠 ${count}개를 성공적으로 생성했습니다!`,
} as const;

export const INFO_MESSAGES = {
    GENERATING_CONTENT: "AI가 콘텐츠를 생성하는 중입니다. 잠시만 기다려주세요...",
} as const;


export const FOOTER_TEXTS = {
    GUIDE_TTS_FONT: "⚙️ 설정에서 TTS Voice, Font, 폰트 크기를 조절할 수 있습니다.",
    GUIDE_AI_STUDY: "⚙️ 설정에서 AI 단어 추가 학습을 할 수 있습니다.",

    KEYBOARD_GUIDE: {
        PREFIX: "키보드 : ",
        ENTER: "카드 뒤집기 ",
        ARROWS: " 이전/다음"
    },

    APP_INFO: (version: string) => `가타카나 공부 v${version}`,
    GITHUB_LINK: "SsunLee@github"

} as const;