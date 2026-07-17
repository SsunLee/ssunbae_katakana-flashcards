import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "히라가나 공부 | 일본어 글자 카드",
  description: "일본어 히라가나의 기본 글자와 탁음, 반탁음, 요음을 카드로 보고 들으며 익히는 무료 히라가나 학습 페이지입니다.",
  alternates: { canonical: "/study/japanese/hiragana-chars" },
};

export default function HiraganaCharsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="hiragana-guide"
        eyebrow="HIRAGANA"
        title="히라가나는 모양보다 소리의 규칙부터 익히세요"
        intro="히라가나는 조사와 활용 어미를 비롯해 거의 모든 일본어 문장에 쓰입니다. 글자를 한꺼번에 외우기보다 행 단위로 읽고, 바로 짧은 단어에서 다시 만나는 방식이 효과적입니다."
        sections={[
          { title: "행 단위로 읽기", body: "あいうえお처럼 모음 순서를 기준으로 각 행을 반복합니다. 비슷하게 보이는 さ와 き, れ와 ね는 따로 모아 비교하면 혼동이 줄어듭니다." },
          { title: "탁음과 반탁음", body: "が·ざ·だ·ば행과 ぱ행은 기본 글자에 기호를 더해 만듭니다. 기본형을 먼저 말한 뒤 바뀐 소리를 이어 읽으면 규칙을 기억하기 쉽습니다." },
          { title: "단어로 확인하기", body: "글자를 본 직후 さくら, でんしゃ 같은 짧은 단어를 읽어 보세요. 문자 하나가 실제 단어 속에서 어떤 길이로 들리는지 확인할 수 있습니다." },
        ]}
      />
    </>
  );
}
