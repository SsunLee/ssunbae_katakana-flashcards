// app/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관 | SSUN EDU",
  description: "SSUN EDU 이용약관",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "2025-10-06";
const SUPPORT_EMAIL = "support@ssun-edu.app";
const PRIVACY_URL = "/privacy";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <h1 className="text-2xl font-bold">이용약관</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        최종 업데이트: {LAST_UPDATED}
      </p>

      <article className="prose prose-invert mt-8 max-w-none prose-a:underline">
        <h2>1. 약관의 적용 및 동의</h2>
        <p>
          본 약관은 SSUN EDU(이하 “회사”)가 제공하는 서비스(웹/모바일 앱 포함)의 이용에 관한 조건과 절차, 회사와 이용자의 권리·의무를 규정합니다.
          이용자는 서비스 사용 시 본 약관과 <Link href={PRIVACY_URL}>개인정보처리방침</Link>에 동의한 것으로 봅니다.
        </p>

        <h2>2. 서비스 내용</h2>
        <p>
          본 서비스는 어학 학습(카드/문장/발음 보조 등) 기능을 제공합니다. 회사는 운영상·기술상 필요 시 서비스를 변경할 수 있습니다.
        </p>

        <h2>3. 계정</h2>
        <ul>
          <li>이메일 기반 회원가입/로그인이 제공됩니다.</li>
          <li>이용자는 자신의 계정 보안을 책임지며, 무단 사용을 인지한 경우 즉시 회사에 알려야 합니다.</li>
          <li>앱 내 “계정 삭제” 기능으로 계정 및 데이터 삭제를 요청할 수 있습니다.</li>
        </ul>

        <h2>4. 사용자 콘텐츠 및 권리</h2>
        <ul>
          <li>이용자가 입력/업로드한 콘텐츠의 권리는 기본적으로 이용자에게 있습니다.</li>
          <li>이용자는 서비스 제공·운영·개선 목적 범위 내에서 해당 콘텐츠를 비독점적으로 사용·저장·처리할 수 있는 권리를 회사에 부여합니다.</li>
          <li>타인의 권리를 침해하는 콘텐츠는 업로드할 수 없습니다.</li>
        </ul>

        <h2>5. 금지 행위</h2>
        <ul>
          <li>불법/유해 정보 게시, 스팸, 리버스 엔지니어링, 비정상적 트래픽 유발, 서비스 장애 유발 행위</li>
          <li>타인의 계정/개인정보 도용, 권리 침해 행위</li>
        </ul>

        <h2>6. 유료 결제(해당 시)</h2>
        <p>
          현재 유료 결제가 없다면 “없음”으로 명시하세요. 유료 기능이 있다면 가격, 결제주체, 환불/청약철회(현행 법령 기준) 등을 기재합니다.
        </p>

        <h2>7. 서비스 제공의 중단</h2>
        <p>
          회사는 정기 점검, 보안/안정성 등의 이유로 서비스 제공을 일시 중단할 수 있으며, 가능한 한 사전 고지합니다.
        </p>

        <h2>8. 면책 및 책임 제한</h2>
        <p>
          회사는 천재지변, 외부 인프라 장애 등 불가항력으로 인한 손해에 책임을 지지 않으며, 서비스 이용으로 발생한 간접·부수·특별 손해에 대해 책임을 지지 않습니다.
        </p>

        <h2>9. 약관 변경</h2>
        <p>
          회사는 관련 법령을 준수하는 범위에서 약관을 변경할 수 있으며, 변경 시 앱 내 공지 또는 웹페이지 공지로 알립니다.
          변경 약관 공지 후에도 서비스를 계속 이용하면 변경 약관에 동의한 것으로 봅니다.
        </p>

        <h2>10. 준거법 및 분쟁 해결</h2>
        <p>
          본 약관은 대한민국 법률을 준거법으로 하며, 분쟁은 관할 법원에 제기합니다.
        </p>

        <h2>11. 문의</h2>
        <p>
          본 약관에 관한 문의: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </article>
    </main>
  );
}
