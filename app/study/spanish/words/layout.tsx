import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "스페인어 단어 공부 | 발음·뜻·예문 카드",
  description: "기초 스페인어 단어를 발음, 한국어 뜻, 예문과 함께 카드로 반복하며 성과 강세까지 익힙니다.",
  alternates: { canonical: "/study/spanish/words" },
};

export default function SpanishWordsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="spanish-words-guide"
        eyebrow="PALABRAS"
        title="스페인어 단어는 성과 강세를 함께 기억하세요"
        intro="스페인어는 철자와 발음의 대응이 비교적 규칙적이지만 명사의 성과 동사의 변화까지 함께 봐야 문장에서 자연스럽게 사용할 수 있습니다. 카드의 단어를 소리 내어 읽은 뒤 예문으로 확인하세요."
        sections={[
          { title: "관사와 함께 외우기", body: "명사는 casa만 외우기보다 la casa처럼 관사와 함께 기억하세요. 남성·여성 명사를 구분하면 형용사와 관사를 맞추는 데 도움이 됩니다." },
          { title: "강세 확인하기", body: "모음, n, s로 끝나는 단어와 그 밖의 자음으로 끝나는 단어는 기본 강세 규칙이 다릅니다. 악센트 부호가 있는 음절은 반드시 힘주어 읽어 보세요." },
          { title: "짧은 문장 만들기", body: "새 단어를 확인한 뒤 주어와 동사를 붙여 한 문장을 만들어 보세요. 장소 단어에는 estar, 성질을 나타낼 때는 ser처럼 자주 어울리는 표현을 함께 익히면 좋습니다." },
        ]}
      />
    </>
  );
}
