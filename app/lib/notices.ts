import "server-only";

import { NOTICE_RECORDS } from "@/app/data/notices";

export type NoticeItem = {
  id: string;
  title: string;
  category: string | null;
  author: string | null;
  summary: string | null;
  publishedAt: string | null;
  publishedDateLabel: string | null;
  url: string | null;
};

function formatDateLabel(date: string | null) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
}

export async function fetchPublishedNotices(): Promise<{ notices: NoticeItem[]; warning?: string }> {
  const notices = NOTICE_RECORDS
    .filter((item) => item.status === "게시됨")
    .map((item) => {
      const publishedAt = item.publishedAt ?? null;
      return {
        id: item.id,
        title: item.title,
        category: item.category ?? null,
        author: item.author ?? null,
        summary: item.summary ?? null,
        publishedAt,
        publishedDateLabel: formatDateLabel(publishedAt),
        url: item.url ?? null,
      };
    })
    .sort((a, b) => {
      const aTs = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const bTs = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return bTs - aTs;
    });

  return { notices };
}

