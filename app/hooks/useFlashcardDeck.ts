// src/hooks/useFlashcardDeck.ts

import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { type Word } from '../data/words';
import { type UserProfile } from '../AuthContext';

interface UseFlashcardDeckProps {
  user: UserProfile | null;
  deckType: string;
  initialDeck: Word[];
}

function sanitizeDeckIds(rawDeckIds: unknown): number[] | undefined {
  if (!Array.isArray(rawDeckIds) || rawDeckIds.length === 0) return undefined;
  const seen = new Set<number>();
  const next: number[] = [];

  for (const rawId of rawDeckIds) {
    const numericId = Number(rawId);
    if (!Number.isInteger(numericId)) continue;
    if (seen.has(numericId)) continue;
    seen.add(numericId);
    next.push(numericId);
  }

  return next.length > 0 ? next : undefined;
}

function reconcileDeckWithBase(
  deckIds: number[] | undefined,
  legacyDeck: Word[] | undefined,
  baseDeck: Word[]
): Word[] {
  const orderedIds = Array.isArray(deckIds) && deckIds.length > 0
    ? deckIds
    : Array.isArray(legacyDeck) && legacyDeck.length > 0
      ? legacyDeck.map((card) => card.id)
      : undefined;

  if (!orderedIds || orderedIds.length === 0) return baseDeck;

  const baseById = new Map(baseDeck.map((card) => [card.id, card]));
  const usedIds = new Set<number>();
  const merged: Word[] = [];

  for (const savedId of orderedIds) {
    const latest = baseById.get(savedId);
    if (!latest || usedIds.has(savedId)) continue;
    merged.push(latest);
    usedIds.add(savedId);
  }

  for (const baseCard of baseDeck) {
    if (usedIds.has(baseCard.id)) continue;
    merged.push(baseCard);
  }

  return merged.length > 0 ? merged : baseDeck;
}

function sanitizeFavs(rawFavs: unknown, availableDeck: Word[]): Record<number, true> {
  if (!rawFavs || typeof rawFavs !== "object") return {};
  const validIds = new Set(availableDeck.map((card) => card.id));
  const next: Record<number, true> = {};

  Object.entries(rawFavs as Record<string, boolean>).forEach(([id, isFav]) => {
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) return;
    if (!isFav) return;
    if (!validIds.has(numericId)) return;
    next[numericId] = true;
  });

  return next;
}

export const useFlashcardDeck = ({ user, deckType, initialDeck }: UseFlashcardDeckProps) => {
  const [deck, setDeck] = useState<Word[]>(initialDeck);
  const [favs, setFavs] = useState<Record<number, true>>({});
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Firestore에서 사용자 데이터 불러오기
  useEffect(() => {
    const loadUserData = async () => {
      setIsDataLoaded(false);
      if (!user) {
        setDeck(initialDeck);
        setFavs({});
        setIsDataLoaded(true);
        return;
      }
      const userDocRef = doc(db, "users", user.uid);
      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const modeData = userData.learningData?.[deckType];
          const savedDeckIds = sanitizeDeckIds(modeData?.deckIds);
          const legacyDeck = Array.isArray(modeData?.deck) ? (modeData.deck as Word[]) : undefined;
          const nextDeck = reconcileDeckWithBase(savedDeckIds, legacyDeck, initialDeck);
          setDeck(nextDeck);
          setFavs(sanitizeFavs(modeData?.favs, nextDeck));
        } else {
          setDeck(initialDeck);
          setFavs({});
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        setDeck(initialDeck);
        setFavs({});
      } finally {
        setIsDataLoaded(true);
      }
    };
    loadUserData();
  }, [user, deckType, initialDeck]);

  // Firestore에 데이터 저장하기
  const saveDataToFirestore = useCallback(async (newDeck: Word[], newFavs: Record<number, true>) => {
    if (!user || !isDataLoaded) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      const deckIds = newDeck.map((card) => card.id);

      await updateDoc(userDocRef, {
        [`learningData.${deckType}.deckIds`]: deckIds,
        [`learningData.${deckType}.favs`]: newFavs,
        [`learningData.${deckType}.deck`]: deleteField(),
      }).catch(async (err) => {
        if (err.code === "not-found" || err.message?.includes("No document to update")) {
          await setDoc(userDocRef, {
            learningData: {
              [deckType]: { deckIds, favs: newFavs },
            },
          }, { merge: true });
        } else {
          throw err;
        }
      });
    } catch (error) {
      console.error("데이터 저장 실패:", error);
    }
  }, [user, isDataLoaded, deckType]);

  // deck 또는 favs가 변경될 때마다 자동 저장
  useEffect(() => {
    if (isDataLoaded && user) {
      saveDataToFirestore(deck, favs);
    }
  }, [deck, favs, isDataLoaded, user, saveDataToFirestore]);
  
  const toggleFav = (id: number) => {
    setFavs(prev => {
      const newFavs = { ...prev };
      if (newFavs[id]) delete newFavs[id];
      else newFavs[id] = true;
      return newFavs;
    });
  };
  
  const shuffleDeck = () => {
    setDeck(d => [...d].sort(() => Math.random() - 0.5));
  };
  
  const resetDeckToInitial = () => {
     setDeck(initialDeck);
     setFavs({});
  }

  const clearFavs = () => {
    setFavs({});
  }

  return {
    deck,
    setDeck,
    favs,
    toggleFav,
    shuffleDeck,
    resetDeckToInitial,
    isDataLoaded,
    clearFavs,
  };
};
