// app/support/page.tsx

import { Button } from "app/components/ui/button"

import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"


export const metadata = {
  title: "Support | SSUN EDU",
  description: "SSUN EDU 고객지원",
};



export default function SupportPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
    <Button 
        variant="outline" 
        size="icon" 
        aria-label="Go Back" 
        asChild>
        <Link href={"/"}>
            <ArrowLeftIcon />
        </Link>    
    </Button>
      <h1 className="text-2xl font-bold">SSUN EDU 고객지원</h1>
      <p className="text-muted-foreground">
        앱 이용 중 문의는 아래 연락처로 보내주세요. 최대한 신속히 답변드리겠습니다.
      </p>

      <section className="rounded-2xl border p-4 space-y-2">
        <h2 className="text-lg font-semibold">연락처</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>이메일: <a className="underline" href="mailto:tnsqo1126@naver.com">tnsqo1126@naver.com</a></li>
          <li>운영시간: 평일 10:00–18:00 (KST)</li>
          <li>개발/담당: SSUN EDU Team</li>
        </ul>
      </section>

      <section className="rounded-2xl border p-4 space-y-2">
        <h2 className="text-lg font-semibold">관련 문서</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><a className="underline" href="/privacy">개인정보처리방침</a></li>
          <li><a className="underline" href="/terms">이용약관</a></li>
        </ul>
      </section>
    </main>
  );
}
