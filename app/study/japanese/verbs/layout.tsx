import type { Metadata } from "next";
import { StudyPageGuide } from "@/app/components/StudyPageGuide";

export const metadata: Metadata = {
  title: "일본어 동사 활용 공부 | ます형·て형·과거형",
  description: "일본어 동사의 사전형, ます형, て형, 부정형, 과거형을 비교하고 예문으로 활용 규칙을 익힙니다.",
  alternates: { canonical: "/study/japanese/verbs" },
};

export default function JapaneseVerbsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StudyPageGuide
        id="japanese-verbs-guide"
        eyebrow="VERB FORMS"
        title="동사 한 개의 여러 형태를 나란히 비교하세요"
        intro="일본어 동사는 문장 끝에서 시간과 말투를 결정합니다. 사전형만 외우지 말고 ます형, て형, 부정형, 과거형을 같은 화면에서 비교해야 활용 규칙이 보입니다."
        sections={[
          { title: "동사 그룹 확인", body: "1그룹, 2그룹, 불규칙 동사는 어미가 바뀌는 방식이 다릅니다. 먼저 그룹을 확인한 뒤 활용표를 보면 예외처럼 보이던 변화가 규칙으로 정리됩니다." },
          { title: "기준형에서 바꾸기", body: "食べる→食べます, 書く→書いて처럼 사전형에서 목표 형태로 직접 바꿔 보세요. 정답을 보기 전에 소리 내어 말하면 변화가 더 오래 남습니다." },
          { title: "예문에 넣기", body: "활용형만 반복한 뒤에는 짧은 문장에 넣어 시제와 높임 정도를 확인하세요. 오늘 한 일은 과거형, 부탁이나 연결은 て형으로 바꿔 말해 보세요." },
        ]}
      />
    </>
  );
}
