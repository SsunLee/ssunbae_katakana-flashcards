export type NoticeStatus = "게시됨" | "작성중";

export type NoticeRecord = {
  id: string;
  title: string;
  status: NoticeStatus;
  category?: string;
  author?: string;
  summary?: string;
  publishedAt?: string;
  url?: string;
};

// 자체 공지사항 데이터입니다.
// status를 "게시됨"으로 설정한 항목만 웹사이트 공지에 노출됩니다.
export const NOTICE_RECORDS: NoticeRecord[] = [
  {
    id: "2026-03-08-app-2-5",
    title: "모바일 앱 버전 2.5 업데이트 예정",
    status: "작성중",
    category: "업데이트",
    author: "운영팀",
    summary: "학습 분석 정확도와 문장 퀴즈 편의성을 개선한 2.5 버전이 준비 중입니다.",
    publishedAt: "2026-03-08",
  }
];

