import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "JLPT 단어 공부 | 가타카나·한자 단어 카드",
  description: "가타카나 단어와 JLPT N5~N1 한자 단어를 읽기, 한국어 뜻, 일본어 예문과 함께 복습하는 무료 단어 카드입니다.",
  alternates: { canonical: "/study/japanese/katakana-words" },
};

export default function JapaneseWordsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="japanese-words-guide"
        eyebrow="JLPT WORDS"
        title="가타카나와 한자 단어를 구분해서 익혀 보세요"
        intro="가타카나 모드에서는 외래어의 소리와 표기를 연결하고, 한자 모드에서는 JLPT 단계별 단어의 읽기와 뜻을 확인합니다. 앞면에서 먼저 읽어 본 뒤 카드를 뒤집어 정답과 예문을 확인하세요."
        sections={[
          { title: "가타카나 단어", body: "한국어에서도 익숙한 외래어가 일본어에서는 어떤 소리와 표기로 바뀌는지 비교합니다. 장음과 작은 글자가 들어간 단어는 천천히 끊어 읽어 보세요." },
          { title: "JLPT 한자 단어", body: "N5부터 N1까지 필요한 단어를 수준별로 고를 수 있습니다. 히라가나 표시를 켜서 읽기를 확인한 뒤 익숙해지면 끄고 한자만 읽어 보세요." },
          { title: "카드 복습", body: "모르는 단어는 별표로 모으고, 순서를 섞어 다시 확인하면 위치가 아닌 단어 자체를 기억하는 데 도움이 됩니다. 예문도 한 번 소리 내어 읽어 보세요." },
        ]}
      />
    </>
  );
}
