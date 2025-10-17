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
  
  // [핵심 수정] 첫 데이터 로드 시 자동 저장을 방지하기 위한 Ref 플래그
  const isInitialLoadComplete = useRef(false);

  // 1단계: API 또는 로컬에서 기본 덱(base deck)을 가져오는 로직
  useEffect(() => {
    // deckType이 변경될 때마다 초기 로드 상태를 리셋
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
  }, [deckType, initialDeck, fetchDeckData]);

  // 2단계: Firestore 데이터 로딩 및 실시간 동기화 로직
  useEffect(() => {
    if (!baseDeck) return;
    
    if (!user) {
      setDeck(baseDeck);
      setFavs({});
      setIsLoading(false);
      isInitialLoadComplete.current = true; // 비로그인 상태도 로드 완료로 처리
      return;
    }

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const learningData = docSnap.data().learningData?.[deckType];
          setDeck(learningData?.deck?.length ? (learningData.deck as T[]) : baseDeck);
          setFavs(learningData?.favs || {});
        } else {
          setDeck(baseDeck);
          setFavs({});
        }
        setIsLoading(false);
        // [핵심 수정] Firestore로부터 첫 데이터를 성공적으로 수신했음을 표시
        isInitialLoadComplete.current = true;
      },
      (err) => {
        console.error("Firestore 구독 실패:", err);
        setError("사용자 데이터를 동기화하는 데 실패했습니다.");
        setDeck(baseDeck);
        setFavs({});
        setIsLoading(false);
        isInitialLoadComplete.current = true; // 에러 시에도 로드 완료로 처리
      }
    );

    return () => unsubscribe();
  }, [user, deckType, baseDeck]);

  // 데이터 저장 로직
  useEffect(() => {
    // [핵심 수정] 첫 로드가 완료되지 않았거나, 유저가 없으면 절대 저장하지 않음
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
            // 다른 종류의 에러는 로그로 남김
            console.error("UpdateDoc failed:", err);
          }
        });
      } catch (e) {
        console.error("데이터 저장 실패:", e);
      }
    };

    save();
  }, [deck, favs]); // [핵심 수정] 의존성 배열을 deck과 favs로 단순화

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
  };
}

