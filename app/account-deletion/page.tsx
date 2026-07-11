import Link from "next/link";
import { ArrowLeft, Mail, Trash2 } from "lucide-react";

import { Button } from "@/app/components/ui/button";

export const metadata = {
  title: "계정 삭제 | 쑨에듀",
  description: "쑨에듀 계정과 관련 학습 데이터 삭제 방법",
};

export default function AccountDeletionPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-6 py-10">
      <Button variant="outline" size="icon" aria-label="홈으로 돌아가기" asChild>
        <Link href="/">
          <ArrowLeft />
        </Link>
      </Button>

      <header className="space-y-3">
        <h1 className="text-3xl font-bold">쑨에듀 계정 삭제</h1>
        <p className="text-muted-foreground">
          앱에서 계정을 직접 삭제하거나 이메일로 삭제를 요청할 수 있습니다.
        </p>
      </header>

      <section className="space-y-3 border-t pt-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Trash2 className="h-5 w-5" /> 앱에서 직접 삭제
        </h2>
        <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
          <li>쑨에듀 앱에 로그인합니다.</li>
          <li>메뉴에서 계정 관리를 선택합니다.</li>
          <li>계정 영구 삭제를 선택하고 확인합니다.</li>
        </ol>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <Mail className="h-5 w-5" /> 이메일로 요청
        </h2>
        <p className="text-muted-foreground">
          가입한 이메일 주소에서 아래 연락처로 계정 삭제를 요청해 주세요. 본인 확인 후 처리합니다.
        </p>
        <a className="font-medium text-primary underline" href="mailto:tnsqo1126@naver.com?subject=쑨에듀 계정 삭제 요청">
          tnsqo1126@naver.com
        </a>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="text-xl font-semibold">삭제되는 데이터</h2>
        <p className="text-muted-foreground">
          계정 인증 정보, 프로필, 닉네임 및 서버에 저장된 학습 기록이 영구 삭제됩니다.
          법률상 보관 의무가 있는 정보가 없다면 별도로 보관하지 않습니다.
        </p>
      </section>
    </main>
  );
}
