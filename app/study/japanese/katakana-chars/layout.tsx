import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "가타카나 공부 | 일본어 외래어 글자 카드",
  description: "가타카나 기본 글자와 장음, 촉음, 요음을 카드와 발음으로 익히고 일본어 외래어 읽기를 연습합니다.",
  alternates: { canonical: "/study/japanese/katakana-chars" },
};

export default function KatakanaCharsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="katakana-guide"
        eyebrow="KATAKANA"
        title="가타카나는 외래어의 박자를 함께 익혀야 합니다"
        intro="가타카나는 외국 이름, 음식, 제품, 장소를 적을 때 자주 사용합니다. 글자 모양만 외우지 말고 장음 기호와 작은 ッ까지 포함해 단어 전체의 박자를 들어 보세요."
        sections={[
          { title: "닮은 글자 구분", body: "シ와ツ, ソ와ン은 획의 방향이 비슷합니다. 글자의 시작점과 마지막 획이 향하는 방향을 비교하며 한 쌍씩 구분해 보세요." },
          { title: "장음과 촉음", body: "コーヒー의 ー는 앞소리를 늘이고, ベッド의 작은 ッ는 다음 자음 앞에서 한 박자 멈춥니다. 소리를 들으며 박수를 쳐 보면 길이가 선명해집니다." },
          { title: "외래어로 복습", body: "テレビ, レストラン처럼 이미 뜻을 아는 단어부터 읽으면 글자와 소리를 빠르게 연결할 수 있습니다. 익숙해진 뒤 사람 이름과 지명으로 범위를 넓혀 보세요." },
        ]}
      />
    </>
  );
}
