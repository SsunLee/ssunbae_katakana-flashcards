import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "한글 음절 공부 | 초성·중성·받침 조합",
  description: "초성, 중성, 종성을 조합한 한글 음절을 카드로 읽고 쓰며 받침이 있는 글자까지 단계별로 연습합니다.",
  alternates: { canonical: "/study/korean/syllables" },
};

export default function KoreanSyllablesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="korean-syllables-guide"
        eyebrow="HANGUL SYLLABLES"
        title="한글 한 칸 안의 소리 순서를 확인하세요"
        intro="한글 음절은 초성과 중성, 필요하면 종성을 더해 만듭니다. 가처럼 두 소리로 된 글자부터 각처럼 받침이 있는 글자까지 순서대로 읽으면 복잡한 단어도 쉽게 나눌 수 있습니다."
        sections={[
          { title: "초성+중성", body: "ㄱ과 ㅏ를 합쳐 가를 만드는 것처럼 첫 자음과 모음을 차례로 말해 보세요. 모음 모양에 따라 글자가 좌우 또는 위아래로 배치됩니다." },
          { title: "받침 더하기", body: "간, 갈, 감은 첫 두 소리가 같고 마지막 받침만 다릅니다. 받침을 길게 끌지 말고 한 음절 안에서 짧게 닫아 읽는 것이 중요합니다." },
          { title: "단어로 이어 읽기", body: "음절을 각각 읽은 뒤 두세 글자 단어로 연결하세요. 받침 뒤에 모음으로 시작하는 음절이 오면 소리가 이어질 수 있으니 음성으로 다시 확인해 보세요." },
        ]}
      />
    </>
  );
}
