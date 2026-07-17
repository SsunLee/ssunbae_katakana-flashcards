import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "한글 자모 공부 | 한국어 자음·모음 카드",
  description: "한글 기본 자음과 모음의 모양, 이름, 발음을 카드로 확인하고 직접 써 보며 한국어 글자의 원리를 익힙니다.",
  alternates: { canonical: "/study/korean/chars" },
};

export default function KoreanCharsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="korean-chars-guide"
        eyebrow="HANGUL LETTERS"
        title="자음과 모음의 소리를 따로 익힌 뒤 결합하세요"
        intro="한글은 자음과 모음을 한 음절 칸 안에 조합하는 문자입니다. 각 자모의 이름만 외우기보다 실제 첫소리와 모음 소리를 듣고, 손으로 모양을 따라 쓰며 방향을 익혀 보세요."
        sections={[
          { title: "기본 자음", body: "ㄱ, ㄴ, ㄷ부터 시작해 발음할 때 혀와 입술이 닿는 위치를 느껴 보세요. ㄱ·ㅋ·ㄲ처럼 같은 계열의 소리는 나란히 비교하면 차이가 분명합니다." },
          { title: "기본 모음", body: "ㅏ, ㅓ, ㅗ, ㅜ는 입술 모양과 혀의 위치가 다릅니다. 가로형과 세로형 모음이 자음 옆이나 아래에 놓이는 방식도 함께 확인하세요." },
          { title: "직접 써 보기", body: "화면의 기준선 안에서 획순을 따라 쓰고, 자음과 모음의 크기를 비슷하게 맞춰 보세요. 자모를 쓴 뒤 바로 가, 너, 도 같은 음절로 결합하면 좋습니다." },
        ]}
      />
    </>
  );
}
