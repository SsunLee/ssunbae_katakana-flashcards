import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "쑨에듀 개인정보처리방침",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
};

const UPDATED_AT = "2026-07-18";
const CONTACT_EMAIL = "tnsqo1126@naver.com";
const linkClass = "underline hover:text-primary";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-8">
      <Button variant="outline" size="icon" aria-label="홈으로 돌아가기" asChild>
        <Link href="/"><ArrowLeftIcon className="h-4 w-4" /></Link>
      </Button>
      <h1 className="mt-4 text-2xl font-bold">개인정보처리방침</h1>
      <p className="mt-2 text-sm text-muted-foreground">시행 및 최종 업데이트: {UPDATED_AT}</p>

      <article className="prose prose-slate dark:prose-invert mt-8 max-w-none prose-a:text-primary">
        <p>
          쑨에듀(SSUN EDU, 운영자 SUNBAE LEE, 이하 “서비스”)는 개인정보 보호법 등 관계 법령을 준수하며,
          다음과 같이 개인정보를 처리합니다. 계정 없이 제공되는 학습 기능도 이용할 수 있습니다.
        </p>

        <h2>1. 처리하는 개인정보</h2>
        <ul>
          <li><strong>회원가입:</strong> 이메일, 닉네임, Firebase 이용자 식별자(UID), 프로필 설정, 약관 및 방침 버전과 동의 시각. 비밀번호는 Firebase Authentication이 처리하며 운영자가 원문을 열람하지 않습니다.</li>
          <li><strong>학습 기능:</strong> 학습 덱, 즐겨찾기, 퀴즈 결과, 학습 시간과 세션 통계 등 이용 기록.</li>
          <li><strong>AI 콘텐츠 생성:</strong> 이용자가 입력한 주제, 언어·덱 종류와 생성 개수. 이름, 연락처 등 개인정보를 입력하지 마세요.</li>
          <li><strong>자동 수집:</strong> IP 주소, 브라우저·운영체제·기기 정보, 접속 및 오류 로그, 쿠키·로컬 저장소, 광고 식별자와 광고 상호작용 정보가 서비스 또는 아래 사업자에 의해 처리될 수 있습니다.</li>
        </ul>

        <h2>2. 처리 목적과 근거</h2>
        <p>
          계정 생성·인증, 학습 기록 저장과 동기화, 고객 문의, 보안과 장애 대응, 서비스 품질 분석,
          AI 학습자료 생성 및 무료 서비스 운영을 위한 광고 제공 목적으로 처리합니다. 계정·학습 기능은 계약의 체결 및 이행,
          보안·품질 분석은 정당한 이익, 맞춤형 광고 등 동의가 필요한 처리는 이용자 동의를 근거로 합니다.
        </p>

        <h2>3. 보유 및 이용 기간</h2>
        <ul>
          <li>계정과 서버 학습 기록: 회원 탈퇴 시까지. 탈퇴 요청 후 운영 데이터에서 삭제하며 백업본은 재해 복구 주기에 따라 최대 180일 이내 삭제될 수 있습니다.</li>
          <li>기기 내 학습 설정과 캐시: 앱 데이터 삭제 또는 계정 삭제 시까지.</li>
          <li>OpenAI API 입력·출력: API 제공자의 기본 정책에 따라 악용 방지 로그가 최대 30일 보관될 수 있습니다.</li>
          <li>접속·광고·분석 정보: 각 제공자의 정책 또는 관계 법령에서 요구하는 기간.</li>
        </ul>
        <p>다른 법령에서 보존을 요구하는 경우 해당 법정 기간 동안 분리 보관한 후 지체 없이 파기합니다.</p>

        <h2>4. 처리 위탁 및 외부 서비스</h2>
        <ul>
          <li><strong>Google Firebase:</strong> 회원 인증, 데이터베이스, 파일 저장과 서비스 운영.</li>
          <li><strong>Vercel:</strong> 웹·API 호스팅, 접속 분석과 성능 측정.</li>
          <li><strong>Google AdMob·AdSense:</strong> 앱·웹 광고 제공, 빈도 제어, 부정 이용 방지와 광고 성과 측정.</li>
          <li><strong>Kakao AdFit:</strong> 웹 광고 제공과 성과 측정.</li>
          <li><strong>OpenAI:</strong> 이용자가 요청한 주제의 학습 콘텐츠 생성.</li>
          <li><strong>Ionic Appflow:</strong> 앱 웹 콘텐츠 업데이트 배포, 버전·기기 및 오류 정보 처리.</li>
        </ul>

        <h2>5. 개인정보의 국외 이전</h2>
        <p>
          서비스 이용 시 Google/Firebase, Vercel, OpenAI, Ionic의 미국 및 글로벌 데이터센터로 관련 정보가 암호화된 네트워크를 통해 전송될 수 있습니다.
          이전 항목은 위 1항의 각 기능 관련 정보이고, 목적과 보유 기간은 위 2~4항과 각 제공자의 정책에 따릅니다.
          국외 이전을 원하지 않으면 계정 생성 또는 AI 기능 이용을 중단할 수 있으나 해당 기능이 제한될 수 있습니다.
        </p>
        <ul>
          <li><a className={linkClass} href="https://firebase.google.com/support/privacy" target="_blank" rel="noreferrer">Google Firebase 개인정보 안내</a></li>
          <li><a className={linkClass} href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">Vercel Privacy Policy</a></li>
          <li><a className={linkClass} href="https://openai.com/policies/privacy-policy/" target="_blank" rel="noreferrer">OpenAI Privacy Policy</a></li>
          <li><a className={linkClass} href="https://ionic.io/privacy" target="_blank" rel="noreferrer">Ionic Privacy Policy</a></li>
        </ul>

        <h2>6. 파기 절차와 방법</h2>
        <p>
          보유 기간이 끝나거나 처리 목적이 달성된 정보는 복구하기 어려운 방식으로 삭제합니다. 전자 파일은 안전하게 삭제하고,
          출력물이 있는 경우 분쇄 또는 소각합니다.
        </p>

        <h2>7. 이용자의 권리와 계정 삭제</h2>
        <p>
          이용자는 앱의 메뉴에서 프로필을 수정하거나 “계정 삭제”를 실행할 수 있습니다. 삭제가 정상 완료되면 Firebase 계정과 서버의 학습 데이터가 삭제됩니다.
          접근·정정·삭제·처리정지 또는 삭제 오류 문의는 <a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>로 보내주세요.
          법정대리인은 관계 법령이 정한 범위에서 권리를 행사할 수 있습니다.
        </p>

        <h2>8. 만 14세 미만 이용자</h2>
        <p>
          회원 계정은 만 14세 이상만 만들 수 있습니다. 가입 화면의 생년월일은 나이 확인에만 사용하며 서버에 저장하지 않습니다.
          만 14세 미만 이용자는 로그인 없이 제공되는 학습 기능만 이용할 수 있습니다.
        </p>

        <h2>9. 쿠키, 광고 식별자 및 선택권</h2>
        <p>
          광고와 분석 사업자는 쿠키 또는 모바일 광고 식별자를 사용할 수 있습니다. 브라우저 설정에서 쿠키를 차단하고,
          iOS의 추적 설정 또는 Android 광고 개인정보 보호 설정에서 맞춤형 광고 관련 선택을 변경할 수 있습니다.
          Google 광고 설정은 <a className={linkClass} href="https://myadcenter.google.com/" target="_blank" rel="noreferrer">내 광고 센터</a>에서 관리할 수 있습니다.
        </p>

        <h2>10. 안전성 확보 조치</h2>
        <p>전송 구간 암호화, 인증 기반 접근 통제, 최소 권한 관리, 로그 점검과 종속성 업데이트 등 합리적인 보호조치를 적용합니다.</p>

        <h2>11. 개인정보 보호 문의</h2>
        <p>
          개인정보 보호 담당: 쑨에듀 운영자 SUNBAE LEE<br />
          이메일: <a className={linkClass} href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>

        <h2>12. 방침 변경</h2>
        <p>중요한 변경이 있는 경우 시행 전에 웹 또는 앱 공지로 알립니다. 이전 방침은 요청 시 이메일로 확인할 수 있습니다.</p>
      </article>
    </main>
  );
}
