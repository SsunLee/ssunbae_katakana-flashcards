// src/hooks/useFlashcardDeck.ts

import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { type Word } from '../data/words';
import { type UserProfile } from '../AuthContext';

interface UseFlashcardDeckProps {
  user: UserProfile | null;
  deckType: string;
  initialDeck: Word[];
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
          setDeck(modeData?.deck?.length > 0 ? modeData.deck : initialDeck);
          setFavs(modeData?.favs || {});
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
      await setDoc(userDocRef, { 
        learningData: { 
          [deckType]: { deck: newDeck, favs: newFavs } 
        } 
      }, { merge: true });
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