// ssunbae_katakana-flashcards/app/hooks/useRemoteStudyDeck.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { toast } from "sonner";
import type { UserProfile } from "@/app/AuthContext";

export type HasId = {
  id: number;
};

interface UseRemoteStudyDeckProps<T extends HasId> {
  user: UserProfile | null;
  deckType: string;
  fetchData: () => Promise<T[]>;
  fallbackData: T[];
}

export function useRemoteStudyDeck<T extends HasId>({
  user,
  deckType,
  fetchData,
  fallbackData,
}: UseRemoteStudyDeckProps<T>) {
  const [deck, setDeck] = useState<T[]>([]);
  const [favs, setFavs] = useState<Record<number, true>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로딩 로직을 하나의 useEffect로 통합하여 안정성을 높입니다.
  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      setError(null);

      // 1. 학습 덱(deck) 로딩 Promise 생성
      const deckPromise = fetchData().catch(e => {
        console.error("API fetch failed, falling back to local data.", e);
        toast.warning("서버에 연결할 수 없어 기본 데이터로 시작합니다.");
        return fallbackData; // 에러 발생 시 fallback 데이터 반환
      });

      // 2. 즐겨찾기(favs) 로딩 Promise 생성
      const favsPromise = (async () => {
        if (!user) return {}; // 로그인하지 않았으면 빈 객체 반환
        try {
          const favsRef = doc(db, 'users', user.uid, 'favorites', deckType);
          const favsSnap = await getDoc(favsRef);
          if (favsSnap.exists()) {
            const favData = favsSnap.data();
            const userFavs: Record<number, true> = {};
            if (favData.ids && Array.isArray(favData.ids)) {
              favData.ids.forEach((id: number) => { userFavs[id] = true; });
            }
            return userFavs;
          }
          return {};
        } catch (favError) {
          console.error("Failed to fetch favorites:", favError);
          toast.error("즐겨찾기 정보를 가져오는 데 실패했습니다.");
          return {}; // 에러 발생 시 빈 객체 반환
        }
      })();

      // 3. 두 가지 데이터를 동시에 로딩하고, 모두 완료되면 상태를 업데이트합니다.
      try {
        const [loadedDeck, loadedFavs] = await Promise.all([deckPromise, favsPromise]);
        
        if (loadedDeck && loadedDeck.length > 0) {
            setDeck(loadedDeck);
        } else {
            // fetchData와 fallbackData 모두 실패/비어있는 경우
            setDeck(fallbackData); 
            console.error("Both API and fallback data failed or are empty.");
            toast.error("학습 데이터를 불러오는 데 실패했습니다.");
        }
        
        setFavs(loadedFavs);

      } catch (e) {
        console.error("An unexpected error occurred during data loading:", e);
        setError("데이터를 불러오는 중 예상치 못한 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, [user, deckType, fetchData, fallbackData]);


  // ✅ 수정된 부분: 디버깅을 위한 console.log를 다시 추가합니다.
  const toggleFav = useCallback(async (id: number | string) => {
    console.log("--- [Debug] toggleFav 시작 ---");
    console.log("전달받은 id:", id, "| 타입:", typeof id);

    if (!user) {
      toast.error('즐겨찾기 기능은 로그인이 필요합니다.');
      console.log("[Debug] 사용자 정보(user)가 없어 함수를 종료합니다.");
      return;
    }
    
    console.log("[Debug] 현재 사용자:", user);
    
    const numericId = Number(id);
    if (isNaN(numericId)) {
      toast.error("잘못된 카드 ID입니다.");
      console.error("[Debug] id를 숫자로 변환할 수 없습니다:", id);
      return;
    }

    const favRef = doc(db, 'users', user.uid, 'favorites', deckType);
    console.log("[Debug] Firestore 경로:", favRef.path);

    const newFavs = { ...favs };
    try {
      if (newFavs[numericId]) {
        console.log(`[Debug] 즐겨찾기 해제 시도: id=${numericId}`);
        delete newFavs[numericId];
        await updateDoc(favRef, { ids: arrayRemove(numericId) });
        toast.info('즐겨찾기에서 해제했습니다.');
      } else {
        console.log(`[Debug] 즐겨찾기 추가 시도: id=${numericId}`);
        newFavs[numericId] = true;
        await setDoc(favRef, { ids: arrayUnion(numericId) }, { merge: true });
        toast.success('즐겨찾기에 추가했습니다!');
      }
      setFavs(newFavs);
      console.log("[Debug] 로컬 즐겨찾기 상태 업데이트 완료:", newFavs);
    } catch (e) {
      console.error("Firestore 업데이트 실패:", e);
      toast.error("즐겨찾기 업데이트에 실패했습니다.");
    } finally {
      console.log("--- [Debug] toggleFav 종료 ---");
    }
  }, [user, deckType, favs]);
  
  const shuffleDeck = useCallback(() => {
    setDeck(prevDeck => [...prevDeck].sort(() => Math.random() - 0.5));
    toast.info("카드를 섞었습니다.");
  }, []);

  const resetDeckToInitial = useCallback(() => {
    setDeck(fallbackData); 
    setFavs({});
    toast.info("학습 덱을 초기 상태로 되돌렸습니다.");
  }, [fallbackData]);

  return { deck, favs, toggleFav, shuffleDeck, resetDeckToInitial, isLoading, error };
}

