import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "JLPT 한자 공부 | 읽기·뜻·쓰기 연습",
  description: "JLPT 기초 한자의 음과 뜻, 대표 읽기를 확인하고 화면에 직접 따라 쓰며 모양을 익히는 일본어 한자 학습 페이지입니다.",
  alternates: { canonical: "/study/japanese/kanji" },
};

export default function JapaneseKanjiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="japanese-kanji-guide"
        eyebrow="JLPT KANJI"
        title="한자는 뜻, 읽기, 쓰기를 한 번에 묶어 익히세요"
        intro="한 글자에는 여러 읽기가 있을 수 있으므로 모양만 반복해서 쓰는 것보다 대표 단어와 함께 보는 편이 좋습니다. 한국어 뜻으로 의미를 잡고 일본어 읽기를 확인한 뒤 직접 따라 써 보세요."
        sections={[
          { title: "뜻으로 분류하기", body: "날짜, 사람, 장소, 행동처럼 의미가 가까운 한자를 묶으면 기억할 단서가 늘어납니다. 새 글자를 볼 때 알고 있는 한자와 공통 부분도 찾아보세요." },
          { title: "단어 속 읽기", body: "生처럼 문맥에 따라 읽기가 달라지는 글자는 한 글자만 외우기 어렵습니다. 学生, 先生처럼 실제 단어에서 어떤 소리가 되는지 확인하세요." },
          { title: "화면에 따라 쓰기", body: "정답을 본 뒤 획의 방향과 글자 중심을 의식하며 천천히 따라 씁니다. 한 번 정확히 쓴 다음 화면을 가리고 다시 쓰는 방식이 효과적입니다." },
        ]}
      />
    </>
  );
}
