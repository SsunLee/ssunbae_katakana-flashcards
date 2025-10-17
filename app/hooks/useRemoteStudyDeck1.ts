// ssunbae_katakana-flashcards/app/hooks/useRemoteStudyDeck.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { toast } from "sonner";
import type { UserProfile } from "@/app/AuthContext";

export type HasId = { id: number };

interface UseRemoteStudyDeckProps<T extends HasId> {
  user: UserProfile | null;
  deckType: string;
  fetchData: () => Promise<T[]>;
  fallbackData: T[];
  authLoading?: boolean;
}

export function useRemoteStudyDeck<T extends HasId>(props: UseRemoteStudyDeckProps<T>) {
  const { user, deckType, fetchData, fallbackData, authLoading } = props;
  const [deck, setDeck] = useState<T[]>([]);
  const [favs, setFavs] = useState<Record<number, true>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      setIsLoading(true);
      return;
    }
    if (!user) {
      setDeck(fallbackData);
      setFavs({});
      setIsLoading(false);
      return;
    }
    const fetchRemoteDeck = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const mode = userData.learningData?.[deckType];
          setDeck(mode?.deck?.length ? (mode.deck as T[]) : fallbackData);
          setFavs(mode?.favs || {});
        } else {
          setDeck(fallbackData);
          setFavs({});
        }
      } catch (err: any) {
        setError("덱 데이터를 불러오는 중 오류 발생");
        setDeck(fallbackData);
        setFavs({});
      } finally {
        setIsLoading(false);
      }
    };
    fetchRemoteDeck();
  }, [authLoading, user, deckType, fallbackData]);

  const toggleFav = useCallback(async (id: number | string) => {
    if (!user) {
      toast.error('즐겨찾기 기능은 로그인이 필요합니다.');
      return;
    }
    const numericId = Number(id);
    if (isNaN(numericId)) {
      toast.error("잘못된 카드 ID입니다.");
      return;
    }
    const favRef = doc(db, 'users', user.uid, 'favorites', deckType);
    const newFavs = { ...favs };
    try {
      if (newFavs[numericId]) {
        delete newFavs[numericId];
        await updateDoc(favRef, { ids: arrayRemove(numericId) });
        toast.info('즐겨찾기에서 해제했습니다.');
      } else {
        newFavs[numericId] = true;
        await setDoc(favRef, { ids: arrayUnion(numericId) }, { merge: true });
        toast.success('즐겨찾기에 추가했습니다!');
      }
      setFavs(newFavs);
    } catch (e) {
      toast.error("즐겨찾기 업데이트에 실패했습니다.");
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