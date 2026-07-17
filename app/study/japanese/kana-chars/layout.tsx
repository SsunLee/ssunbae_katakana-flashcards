import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "히라가나·가타카나 표 | 일본어 문자 공부",
  description: "히라가나와 가타카나의 청음, 탁음, 반탁음, 요음을 표와 카드로 비교하며 발음을 익히는 일본어 문자 학습 페이지입니다.",
  alternates: { canonical: "/study/japanese/kana-chars" },
};

export default function KanaCharsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="kana-overview-guide"
        eyebrow="KANA GUIDE"
        title="두 문자표의 같은 소리를 나란히 연결하세요"
        intro="히라가나와 가타카나는 모양은 다르지만 같은 음절 체계를 사용합니다. あ와ア처럼 같은 소리를 짝지어 익히면 두 문자표를 따로 외우는 부담을 줄일 수 있습니다."
        sections={[
          { title: "청음부터 시작", body: "あ행부터 わ행까지 기본 46자를 먼저 익힙니다. 한 행씩 소리를 들으며 세로로 읽고, 익숙해지면 행을 섞어서 모양을 구분해 보세요." },
          { title: "소리가 바뀌는 글자", body: "탁점과 반탁점이 붙으면 か가 が로, は가 ぱ로 바뀝니다. 기호만 보지 말고 원래 글자와 달라진 소리를 함께 비교하세요." },
          { title: "작은 글자 조합", body: "きゃ, シュ처럼 작은 ゃ·ゅ·ょ 또는 ャ·ュ·ョ가 붙는 요음은 두 글자를 한 박자로 읽습니다. 카드의 듣기 기능으로 길이를 확인해 보세요." },
        ]}
      />
    </>
  );
}
