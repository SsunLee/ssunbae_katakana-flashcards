// app/hooks/useStudyDeck.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";          
import type { UserProfile } from "@/app/AuthContext";

import { fetchVerbs } from "@/app/services/api"; // ✅ API 서비스를 import


export type HasId = { id: number };

type UseStudyDeckProps<T extends HasId> = {
  user: UserProfile | null;
  deckType: string;
  initialDeck: T[];
};

export function useStudyDeck<T extends HasId>({
  user, deckType, initialDeck
}: UseStudyDeckProps<T>) {
  const [deck, setDeck] = useState<T[]>(initialDeck);
  const [favs, setFavs] = useState<Record<number, true>>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // ✅ 로딩 및 에러 상태 추가
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsDataLoaded(false);
      if (!user) { setDeck(initialDeck); setFavs({}); setIsDataLoaded(true); return; }
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const d = snap.data();
          const mode = d.learningData?.[deckType];
          setDeck(mode?.deck?.length ? (mode.deck as T[]) : initialDeck);
          setFavs(mode?.favs || {});
        } else {
          setDeck(initialDeck);
          setFavs({});
        }
      } catch (e) {
        console.error("데이터 로딩 실패:", e);
        setDeck(initialDeck); setFavs({});
      } finally {
        setIsDataLoaded(true);
      }
    };
    load();
  }, [user, deckType, initialDeck]);

  const save = useCallback(async (newDeck: T[], newFavs: Record<number, true>) => {
    if (!user || !isDataLoaded) return;
    try {
      const ref = doc(db, "users", user.uid);
      await setDoc(ref, { learningData: { [deckType]: { deck: newDeck, favs: newFavs } } }, { merge: true });
    } catch (e) {
      console.error("데이터 저장 실패:", e);
    }
  }, [user, isDataLoaded, deckType]);

  useEffect(() => {
    if (isDataLoaded && user) save(deck, favs);
  }, [deck, favs, isDataLoaded, user, save]);

  const toggleFav = (id: number) =>
    setFavs(prev => { const n = { ...prev }; n[id] ? delete n[id] : (n[id] = true); return n; });

  const shuffleDeck = () => setDeck(d => [...d].sort(() => Math.random() - 0.5));
  const resetDeckToInitial = () => { setDeck(initialDeck); setFavs({}); };
  const clearFavs = () => setFavs({});

  return { deck, setDeck, favs, toggleFav, shuffleDeck, resetDeckToInitial, isDataLoaded, clearFavs };
}
