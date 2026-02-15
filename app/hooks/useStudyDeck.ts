"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { doc, onSnapshot, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import type { UserProfile } from "@/app/AuthContext";

export type HasId = { id: number };

type UseStudyDeckProps<T extends HasId> = {
  user: UserProfile | null;
  deckType: string;
  initialDeck: T[];
  fetchDeckData?: () => Promise<T[]>;
};

function reconcileDeckWithBase<T extends HasId>(savedDeck: T[] | undefined, baseDeck: T[]): T[] {
  if (!Array.isArray(savedDeck) || savedDeck.length === 0) {
    return baseDeck;
  }

  const baseById = new Map(baseDeck.map((card) => [card.id, card]));
  const usedIds = new Set<number>();
  const merged: T[] = [];

  // 저장된 순서는 유지하되, 내용은 최신 baseDeck 데이터를 사용
  for (const savedCard of savedDeck) {
    const latest = baseById.get(savedCard.id);
    if (!latest || usedIds.has(savedCard.id)) continue;
    merged.push(latest);
    usedIds.add(savedCard.id);
  }

  // 서버/로컬에 새로 추가된 카드는 뒤에 붙임
  for (const baseCard of baseDeck) {
    if (usedIds.has(baseCard.id)) continue;
    merged.push(baseCard);
  }

  return merged.length > 0 ? merged : baseDeck;
}

function sanitizeFavs<T extends HasId>(
  rawFavs: Record<number, true> | Record<string, boolean> | undefined,
  baseDeck: T[]
): Record<number, true> {
  if (!rawFavs) return {};
  const validIds = new Set(baseDeck.map((card) => card.id));
  const next: Record<number, true> = {};

  Object.entries(rawFavs).forEach(([id, isFav]) => {
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) return;
    if (!isFav) return;
    if (!validIds.has(numericId)) return;
    next[numericId] = true;
  });

  return next;
}

export function useStudyDeck<T extends HasId>({
  user,
  deckType,
  initialDeck,
  fetchDeckData,
}: UseStudyDeckProps<T>) {
  const [baseDeck, setBaseDeck] = useState<T[] | null>(null);
  const [deck, setDeck] = useState<T[]>([]);
  const [favs, setFavs] = useState<Record<number, true>>({});
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isInitialLoadComplete = useRef(false);

  // [추가] 백그라운드 복귀 시 데이터 동기화를 강제하기 위한 상태
  const [syncTrigger, setSyncTrigger] = useState(0);
  const forceSync = () => setSyncTrigger(c => c + 1);

  // [추가] 브라우저 탭 활성화 감지 로직
  useEffect(() => {
    const handleVisibilityChange = () => {
      // 탭이 다시 화면에 보일 때 동기화를 시도합니다.
      if (document.visibilityState === 'visible') {
        console.log("앱이 포어그라운드로 복귀했습니다. 데이터 동기화를 시도합니다.");
        forceSync();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 1단계: API 또는 로컬에서 기본 덱(base deck)을 가져오는 로직
  useEffect(() => {
    isInitialLoadComplete.current = false;
    setIsLoading(true);
    setError(null);

    const loadBaseDeck = async () => {
      if (fetchDeckData) {
        try {
          const data = await fetchDeckData();
          setBaseDeck(data);
        } catch (err) {
          console.error(`[${deckType}] API 통신 실패.`, err);
          setError("데이터를 불러오는 데 실패했습니다. 로컬 데이터를 사용합니다.");
          setBaseDeck(initialDeck);
        }
      } else {
        setBaseDeck(initialDeck);
      }
    };

    loadBaseDeck();
    // [수정] syncTrigger가 변경될 때마다 이 로직을 다시 실행합니다.
  }, [deckType, initialDeck, fetchDeckData, syncTrigger]);

  // 2단계: Firestore 데이터 로딩 및 실시간 동기화 로직
  useEffect(() => {
    if (!baseDeck) return;
    
    if (!user) {
      setDeck(baseDeck);
      setFavs({});
      setIsLoading(false);
      isInitialLoadComplete.current = true;
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const learningData = docSnap.data().learningData?.[deckType];
          const savedDeck = Array.isArray(learningData?.deck) ? (learningData.deck as T[]) : undefined;
          setDeck(reconcileDeckWithBase(savedDeck, baseDeck));
          setFavs(sanitizeFavs(learningData?.favs, baseDeck));
        } else {
          setDeck(baseDeck);
          setFavs({});
        }
        setIsLoading(false);
        isInitialLoadComplete.current = true;
      },
      (err) => {
        console.error("Firestore 구독 실패:", err);
        setError("사용자 데이터를 동기화하는 데 실패했습니다.");
        setDeck(baseDeck);
        setFavs({});
        setIsLoading(false);
        isInitialLoadComplete.current = true;
      }
    );

    return () => unsubscribe();
    // [수정] syncTrigger가 변경될 때마다 이 로직도 다시 실행되어 onSnapshot을 재설정합니다.
  }, [user, deckType, baseDeck, syncTrigger]);

  // 데이터 저장 로직
  useEffect(() => {
    if (!isInitialLoadComplete.current || !user) {
      return;
    }

    const save = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          [`learningData.${deckType}.deck`]: deck,
          [`learningData.${deckType}.favs`]: favs,
        }).catch(async (err) => {
          if (err.code === 'not-found' || err.message.includes("No document to update")) {
            await setDoc(userDocRef, { 
              learningData: { [deckType]: { deck, favs } } 
            }, { merge: true });
          } else {
            console.error("UpdateDoc failed:", err);
          }
        });
      } catch (e) {
        console.error("데이터 저장 실패:", e);
      }
    };

    save();
  }, [deck, favs]);

  const toggleFav = useCallback((id: number) => {
    setFavs((prevFavs) => {
      const newFavs = { ...prevFavs };
      newFavs[id] ? delete newFavs[id] : (newFavs[id] = true);
      return newFavs;
    });
  }, []);

  const shuffleDeck = () => setDeck((d) => [...d].sort(() => Math.random() - 0.5));

  const resetDeckToInitial = () => {
    if (baseDeck) setDeck(baseDeck);
    setFavs({});
  };

  const clearFavs = () => setFavs({});

  return {
    deck, setDeck, favs, toggleFav, shuffleDeck, resetDeckToInitial, 
    isLoading, error,
    clearFavs,
    // [추가] 만약을 대비해 수동 재시도 함수도 export합니다.
    forceSync,
  };
}

