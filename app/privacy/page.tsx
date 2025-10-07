import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "app/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "개인정보처리방침 | SSUN EDU",
  description: "SSUN EDU 개인정보처리방침",
  robots: { index: true, follow: true },
};

const TERMSFEED_URL = "https://www.termsfeed.com/live/22610f1f-078c-4283-97c2-6e716a27e22c";
const CONTACT_EMAIL = "tnsqo1126@naver.com"; // 실제 이메일로 변경하세요

async function fetchTermsFeed() {
  try {
    const res = await fetch(TERMSFEED_URL, {
      cache: "force-cache",
      next: { revalidate: 86400 },
    });
    
    if (!res.ok) return null;
    
    let html = await res.text();
    
    // script 태그 제거
    html = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
    
    // [email protected] 를 실제 이메일로 교체
    html = html.replace(/\[email protected\]/g, CONTACT_EMAIL);
    
    return html;
  } catch (error) {
    console.error("Failed to fetch TermsFeed:", error);
    return null;
  }
}

export default async function PrivacyPage() {
  const html = await fetchTermsFeed();

  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <div className="flex flex-col gap-3">
        <Button 
          variant="outline" 
          size="icon" 
          aria-label="홈으로 돌아가기" 
          asChild
        >
          <Link href="/">
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>    
        </Button>

        <h1 className="text-2xl font-bold">개인정보처리방침</h1>
        
        <p className="mt-2 text-sm text-muted-foreground">
          이 페이지는 SSUN EDU의 최신 개인정보처리방침을 표시합니다.
        </p>

        {/* 원문 링크 */}
        <div className="mt-4 rounded-lg border p-3 text-sm">
          원문 보기:{" "}
          <a 
            href={TERMSFEED_URL} 
            className="underline hover:text-primary" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            TermsFeed에서 보기
          </a>
        </div>

        {/* HTML 콘텐츠 또는 폴백 */}
        {html ? (
          <article
            className="prose prose-slate dark:prose-invert mt-8 max-w-none prose-a:text-primary prose-a:underline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <div className="mt-8 rounded-xl border border-destructive/50 bg-destructive/10 p-6">
            <p className="mb-2 font-semibold">문서를 불러올 수 없습니다</p>
            <p className="text-sm">
              문의사항이 있으시면{" "}
              <a 
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline hover:text-primary"
              >
                {CONTACT_EMAIL}
              </a>
              로 연락주세요.
            </p>
          </div>
        )}        
      </div>
    </main>
  );
}