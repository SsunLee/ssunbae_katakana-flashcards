import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "일본어 예문 공부 | 발음·뜻 문장 카드",
  description: "일상에서 자주 쓰는 일본어 예문을 원문, 후리가나, 한국어 뜻, 음성으로 확인하며 문장 읽기를 연습합니다.",
  alternates: { canonical: "/study/japanese/sentences" },
};

export default function JapaneseSentencesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="japanese-sentences-guide"
        eyebrow="JAPANESE SENTENCES"
        title="짧은 예문에서 어순과 표현을 함께 확인하세요"
        intro="단어만 외우면 조사와 동사 위치를 놓치기 쉽습니다. 예문 카드에서 원문을 먼저 읽고, 후리가나와 한국어 뜻을 나중에 확인하며 문장 전체를 한 덩어리로 익혀 보세요."
        sections={[
          { title: "먼저 원문 읽기", body: "모르는 한자가 있어도 문장 끝까지 읽으며 아는 표현을 찾아보세요. 그다음 후리가나를 켜면 어느 부분에서 막혔는지 정확히 확인할 수 있습니다." },
          { title: "조사와 동사 찾기", body: "は, が, を, に 같은 조사 뒤에 어떤 말이 오는지 표시하고 문장 끝의 동사 시제를 확인하세요. 일본어 기본 어순을 익히는 가장 빠른 방법입니다." },
          { title: "듣고 따라 말하기", body: "뜻을 확인한 뒤 문장을 듣고 같은 속도로 따라 말해 보세요. 처음에는 짧게 끊고, 마지막에는 조사까지 포함해 한 문장으로 읽는 것이 좋습니다." },
        ]}
      />
    </>
  );
}
