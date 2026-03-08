import Link from "next/link";
import { AlertTriangle, CalendarDays, ExternalLink, FolderOpen, Megaphone, UserRound } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { fetchPublishedNotices } from "@/app/lib/notices";

export const revalidate = 300;

export default async function NoticesPage() {
  const { notices, warning } = await fetchPublishedNotices();

  return (
    <div className="min-h-screen w-full px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <Card className="overflow-hidden border-border/80 bg-gradient-to-r from-card via-card to-sky-500/10">
          <CardHeader>
            <CardDescription className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium">
              <Megaphone className="h-3.5 w-3.5" />
              공지사항
            </CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">SSUN EDU 공지</CardTitle>
            <CardDescription>서비스 내부 공지 데이터 중 “게시됨” 상태 항목만 노출됩니다.</CardDescription>
          </CardHeader>
        </Card>

        {warning ? (
          <Card className="border-amber-500/40 bg-amber-500/10">
            <CardContent className="flex items-start gap-2 p-4 text-sm text-amber-800 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{warning}</p>
            </CardContent>
          </Card>
        ) : null}

        {notices.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              현재 게시된 공지사항이 없습니다.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notices.map((notice) => (
              <Card key={notice.id} className="border-border/80 transition-colors hover:border-primary/40">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg leading-7">{notice.title}</CardTitle>
                    <span className="shrink-0 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300">
                      게시됨
                    </span>
                  </div>
                  <CardDescription className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    {notice.category ? (
                      <span className="inline-flex items-center gap-1">
                        <FolderOpen className="h-3.5 w-3.5" />
                        {notice.category}
                      </span>
                    ) : null}
                    {notice.author ? (
                      <span className="inline-flex items-center gap-1">
                        <UserRound className="h-3.5 w-3.5" />
                        {notice.author}
                      </span>
                    ) : null}
                    {notice.publishedDateLabel ? (
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {notice.publishedDateLabel}
                      </span>
                    ) : null}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {notice.summary ? (
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{notice.summary}</p>
                  ) : null}
                  {notice.url ? (
                    <Link
                      href={notice.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      원문 보기
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
