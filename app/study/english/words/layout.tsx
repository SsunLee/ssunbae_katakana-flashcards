import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "영어 단어 공부 | 발음·뜻·예문 카드",
  description: "영어 단어의 발음, 한국어 뜻, 실제 예문을 카드로 확인하고 듣기와 즐겨찾기로 반복하는 무료 영어 단어 학습 페이지입니다.",
  alternates: { canonical: "/study/english/words" },
};

export default function EnglishWordsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="english-words-guide"
        eyebrow="ENGLISH WORDS"
        title="뜻을 외운 뒤 예문에서 쓰임을 확인하세요"
        intro="영어 단어는 같은 뜻으로 번역되더라도 함께 쓰이는 전치사와 문장 위치가 다를 수 있습니다. 단어 앞면에서 뜻을 떠올리고, 뒷면의 발음과 예문으로 실제 쓰임을 확인해 보세요."
        sections={[
          { title: "발음 먼저 듣기", body: "철자만 보고 읽은 뒤 음성을 들으며 강세가 놓이는 음절을 확인하세요. 입 모양과 소리 길이를 함께 따라 하면 듣기에서도 단어를 더 빨리 알아챌 수 있습니다." },
          { title: "예문으로 구분하기", body: "비슷한 뜻의 단어는 예문 속 주어와 목적어를 비교해야 차이가 보입니다. 단어가 문장에서 명사, 동사, 형용사 중 어떤 역할을 하는지도 살펴보세요." },
          { title: "간격을 두고 복습", body: "바로 연속해서 맞히는 것보다 하루 뒤 다시 떠올리는 편이 오래 기억됩니다. 막힌 단어는 즐겨찾기에 모으고 예문에서 단어만 가린 채 말해 보세요." },
        ]}
      />
    </>
  );
}
