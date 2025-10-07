// ssunbae_katakana-flashcards/app/hooks/useRemoteStudyDeck.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { toast } from "sonner";
import type { UserProfile } from "@/app/AuthContext";
import type { HasId } from "@/app/hooks/useStudyDeck";

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

  // ✅ 1. 전체 학습 데이터(Deck)는 처음에 한 번만 불러옵니다.
  useEffect(() => {
    const loadDeck = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiDeck = await fetchData();
        if (apiDeck && apiDeck.length > 0) {
          setDeck(apiDeck);
          // ✅ 성공 토스트 메시지를 제거하여 UI를 더 깔끔하게 만듭니다.
        } else {
          throw new Error("API returned empty or invalid data");
        }
      } catch (e) {
        console.error("API fetch failed, falling back to local data.", e);
        setDeck(fallbackData);
        toast.warning("서버에 연결할 수 없어 기본 데이터로 시작합니다.");
      }
      // 즐겨찾기를 불러온 후에 로딩 상태를 최종 완료 처리하므로 여기서는 false로 바꾸지 않습니다.
    };
    loadDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckType]); // deckType은 변하지 않으므로 이 effect는 사실상 한 번만 실행됩니다.

  // ✅ 2. 사용자별 즐겨찾기 정보는 'user' 상태가 변경될 때만 불러옵니다.
  useEffect(() => {
    const loadFavs = async () => {
      // 사용자가 없으면(로그아웃 상태) 즐겨찾기를 비우고 로딩을 종료합니다.
      if (!user) {
        setFavs({});
        setIsLoading(false);
        return;
      }

      try {
        const favsRef = doc(db, 'users', user.uid, 'favorites', deckType);
        const favsSnap = await getDoc(favsRef);
        if (favsSnap.exists()) {
          const favData = favsSnap.data();
          const userFavs: Record<number, true> = {};
          if (favData.ids && Array.isArray(favData.ids)) {
            favData.ids.forEach((id: number) => { userFavs[id] = true; });
          }
          setFavs(userFavs);
        } else {
          setFavs({}); // 즐겨찾기 정보가 없으면 비웁니다.
        }
      } catch (favError) {
        console.error("Failed to fetch favorites:", favError);
        toast.error("즐겨찾기 정보를 가져오는 데 실패했습니다.");
      } finally {
        // 즐겨찾기 로딩까지 끝나면 최종적으로 로딩 상태를 해제합니다.
        setIsLoading(false);
      }
    };

    loadFavs();
  }, [user, deckType]);

  const toggleFav = useCallback(async (id: number) => {
    if (!user) {
      toast.error('즐겨찾기 기능은 로그인이 필요합니다.');
      return;
    }
    const newFavs = { ...favs };
    const favRef = doc(db, 'users', user.uid, 'favorites', deckType);
    try {
      if (newFavs[id]) {
        delete newFavs[id];
        await updateDoc(favRef, { ids: arrayRemove(id) });
        toast.info('즐겨찾기에서 해제했습니다.');
      } else {
        newFavs[id] = true;
        await setDoc(favRef, { ids: arrayUnion(id) }, { merge: true });
        toast.success('즐겨찾기에 추가했습니다!');
      }
      setFavs(newFavs);
    } catch (e) {
      console.error("Error updating favorites:", e);
      toast.error("즐겨찾기 업데이트에 실패했습니다.");
    }
  }, [user, deckType, favs]);
  
  const shuffleDeck = useCallback(() => {
    setDeck(prevDeck => [...prevDeck].sort(() => Math.random() - 0.5));
    toast.info("카드를 섞었습니다.");
  }, []);

  const resetDeckToInitial = useCallback(() => {
    // API 데이터가 아닌, 초기의 fallback 데이터로 리셋합니다.
    // 만약 API 데이터를 유지하고 싶다면 이 부분을 수정해야 합니다.
    setDeck(fallbackData); 
    setFavs({});
    toast.info("학습 덱을 초기 상태로 되돌렸습니다.");
  }, [fallbackData]);

  return { deck, favs, toggleFav, shuffleDeck, resetDeckToInitial, isLoading, error };
}

