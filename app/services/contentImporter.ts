// services/contentImporter.ts
import { toast } from "sonner";
import { waitTwoFrames } from "@/app/lib/nextTick";
import { notify } from "../components/ui/notify";


export type ImportDeps<T> = {
  deckType: string;
  topic: string;
  count: number;
  // 데이터 세터들
  setDeck: (data: T[]) => void;
  setIndex: (n: number) => void;
  setFlipped: (b: boolean) => void;
  setFlippedStates: (s: Record<number, boolean>) => void;
  setCurrentPage: (n: number) => void;
  setLoadingImport: (b: boolean) => void;
  // 모달 제어 (선택)
  closeSettings?: () => void;   // 모달을 닫는 함수 (없으면 패스)
  // fetch 함수 주입 (기본: 서버 호출)
  fetchGeneratedContent: (deckType: string, topic: string, count: number) => Promise<T[]>;
  // 메시지 (선택)
  successMessage?: (topic: string, len: number) => string;
  errorFallback?: string;
};

export async function importContentAndNotify<T>({
  deckType, topic, count,
  setDeck, setIndex, setFlipped, setFlippedStates, setCurrentPage,
  setLoadingImport,
  closeSettings,
  fetchGeneratedContent,
  successMessage = (t, n) => `주제: ${t} · ${n}개 생성`,
  errorFallback = "콘텐츠 생성에 실패했습니다.",
}: ImportDeps<T>) {
  
  if (closeSettings) {
    closeSettings();
    await waitTwoFrames();
  }

  setLoadingImport(true);
  try {
    const newDeck = await fetchGeneratedContent(deckType, topic, count);

    setDeck(newDeck);
    setIndex(0);
    setFlipped(false);
    setFlippedStates({});
    setCurrentPage(1);
    notify.success("AI 단어 생성 완료", `주제: ${topic} · ${newDeck.length}개 생성`);

  } catch (e: any) {
    const msg = e?.message ?? errorFallback;
    console.error("콘텐츠 생성 오류:", e);
    notify.error("생성 실패", msg);

  } finally {
    setLoadingImport(false);
    // 방어적 body unlock (커스텀 락을 쓴 경우)
    try { document.body.style.overflow = ""; } catch {}
  }
}
