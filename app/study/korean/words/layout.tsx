import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "한국어 단어 공부 | 발음·뜻·예문 카드",
  description: "기초 한국어 단어를 글자, 발음, 뜻, 예문으로 확인하며 자모와 받침 소리를 함께 익히는 단어 카드입니다.",
  alternates: { canonical: "/study/korean/words" },
};

export default function KoreanWordsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="korean-words-guide"
        eyebrow="KOREAN WORDS"
        title="한글 음절을 실제 단어의 소리로 연결하세요"
        intro="자음과 모음을 익힌 뒤에는 짧은 단어에서 음절이 어떻게 이어지는지 확인해야 합니다. 글자를 먼저 읽고 뜻을 떠올린 다음, 예문에서 조사와 함께 쓰이는 형태를 살펴보세요."
        sections={[
          { title: "음절로 나누기", body: "학교는 학-교, 사람은 사-람처럼 한 글자씩 나누어 읽어 보세요. 초성, 중성, 종성이 한 칸 안에서 어떤 순서로 소리 나는지 확인할 수 있습니다." },
          { title: "받침 소리 확인", body: "받침은 다음 음절의 모음과 만나면 소리가 이어지기도 합니다. 단어만 읽은 소리와 짧은 문장 안에서 읽은 소리를 비교해 보세요." },
          { title: "조사와 함께 말하기", body: "책만 외우기보다 책을 읽어요, 책이 있어요처럼 조사와 동사를 붙여 말해 보세요. 단어의 의미와 문장 속 역할을 동시에 기억할 수 있습니다." },
        ]}
      />
    </>
  );
}
