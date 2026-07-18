import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "이용약관",
  description: "쑨에듀 이용약관",
  robots: { index: true, follow: true },
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "2026-07-18";
const SUPPORT_EMAIL = "tnsqo1126@naver.com";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <h1 className="text-2xl font-bold">이용약관</h1>
      <p className="mt-2 text-sm text-muted-foreground">시행 및 최종 업데이트: {LAST_UPDATED}</p>

      <article className="prose prose-slate dark:prose-invert mt-8 max-w-none prose-a:text-primary prose-a:underline">
        <h2>1. 목적과 동의</h2>
        <p>
          본 약관은 쑨에듀(SSUN EDU, 운영자 SUNBAE LEE, 이하 “서비스”)의 웹·모바일 학습 서비스 이용 조건을 정합니다.
          회원은 가입 화면에서 약관에 명시적으로 동의하여 계정을 만들며, 개인정보 처리는 <Link href="/privacy">개인정보처리방침</Link>에 따릅니다.
        </p>

        <h2>2. 서비스 내용</h2>
        <p>일본어·영어·스페인어·한국어 카드, 문장 퀴즈, 발음 보조, 학습 통계와 AI 학습자료 생성 기능 등을 제공합니다. 학습자료는 교육 보조 목적이며 정확성이나 시험 성과를 보증하지 않습니다.</p>

        <h2>3. 계정과 연령</h2>
        <ul>
          <li>계정은 만 14세 이상만 만들 수 있습니다. 만 14세 미만은 비회원 학습 기능만 이용할 수 있습니다.</li>
          <li>이용자는 정확한 정보를 제공하고 로그인 정보를 안전하게 관리해야 합니다.</li>
          <li>앱 메뉴의 “계정 삭제”로 계정과 서버 학습 데이터 삭제를 요청할 수 있습니다.</li>
        </ul>

        <h2>4. 이용자 입력과 AI 기능</h2>
        <p>
          이용자가 입력한 주제의 권리는 이용자에게 있습니다. 서비스 제공에 필요한 범위에서 이를 전송·저장·처리할 수 있으며,
          AI 입력란에 개인정보, 기밀정보 또는 타인의 권리를 침해하는 내용을 입력해서는 안 됩니다. AI 생성 결과는 부정확할 수 있으므로 학습 전 확인이 필요합니다.
        </p>

        <h2>5. 금지 행위</h2>
        <ul>
          <li>타인의 계정·개인정보 또는 저작권 등 권리를 침해하는 행위</li>
          <li>불법·유해 정보 입력, 자동화된 과도한 요청, 서비스 장애나 보안 우회를 유발하는 행위</li>
          <li>법령이 허용하지 않는 범위의 역설계, 복제 또는 재배포</li>
        </ul>

        <h2>6. 광고와 결제</h2>
        <p>현재 서비스는 별도 유료 결제 없이 광고를 통해 운영될 수 있습니다. 유료 기능을 추가할 경우 가격, 결제와 환불 조건을 구매 전에 별도로 고지합니다.</p>

        <h2>7. 변경과 중단</h2>
        <p>보안, 점검, 법령 또는 운영상 필요에 따라 기능을 변경하거나 일시 중단할 수 있습니다. 이용자에게 중요한 불리한 변경이나 장기 중단은 가능한 범위에서 사전에 공지합니다.</p>

        <h2>8. 책임</h2>
        <p>
          천재지변, 통신망·외부 사업자 장애 등 합리적으로 통제할 수 없는 사유로 발생한 손해는 책임 범위가 제한될 수 있습니다.
          다만 운영자의 고의 또는 중대한 과실, 소비자 보호 등 강행 법령이 정하는 책임은 배제하지 않습니다.
        </p>

        <h2>9. 약관 변경</h2>
        <p>관련 법령을 준수하여 약관을 변경할 수 있으며 시행일과 변경 내용을 웹 또는 앱에 공지합니다. 이용자에게 중요한 불리한 변경은 합리적인 기간 전에 알리고, 별도 동의가 필요한 경우 다시 동의를 받습니다.</p>

        <h2>10. 지식재산권과 출처</h2>
        <p>
          서비스 명칭과 자체 콘텐츠의 권리는 운영자에게 있습니다. 한자 획순 자료 일부는 Ulrich Apel의 KanjiVG를 사용하며{' '}
          <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a> 조건을 따릅니다.
          JLPT는 일본국제교육지원협회 및 국제교류기금의 상표 또는 시험 명칭이며, 쑨에듀는 해당 기관이 공식 후원하거나 운영하는 서비스가 아닙니다.
        </p>

        <h2>11. 준거법과 분쟁</h2>
        <p>대한민국 법률을 따르며, 분쟁은 민사소송법 등 관계 법령이 정한 관할 법원에서 해결합니다.</p>

        <h2>12. 문의</h2>
        <p>서비스 및 약관 문의: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
      </article>
    </main>
  );
}
