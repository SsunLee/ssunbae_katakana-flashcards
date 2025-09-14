// app/data/sentences.ts


export type FuriPart = {
    /** 표면 문자 (칸지/가나 조각)  **/
    text: string;
    /** 칸지일 때만: 위에 얹을 히라가나 **/
    rt?: string;
    /** 툴팁 설명 **/
    gloss?: string[]; // ["뜻풀이 제목", "설명1", "설명2"]
};

export type SentenceCard = {
    id: number;               // 고유 ID (숫자)
    parts: FuriPart[];   // 문장 구성 요소 (칸지만 rt/gloss 가 있을 수 있음)
    romaji: string;        // 문장 전체의 로마자 표기
};

export const JP_SENTENCES: SentenceCard[] = [
    {
        id: 1,
        parts: [
            { text: "お" },
            { text: "願", rt: "ねが", gloss: ["원할 願", "1) 원하다(願-), 바라다", "2) (소원을) 빌다, 기원하다", "3) 마음에 품다"] },
            { text: "いします" },
        ],
        romaji: "onegaishimasu",
    },
];