"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { doc, onSnapshot, updateDoc, setDoc, deleteField } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import type { UserProfile } from "@/app/AuthContext";

export type HasId = { id: number };

type UseStudyDeckProps<T extends HasId> = {
  user: UserProfile | null;
  deckType: string;
  initialDeck: T[];
  fetchDeckData?: () => Promise<T[]>;
};
const DECK_CACHE_PREFIX = "ssunbae:study-deck:v1";

type DeckCachePayload<T extends HasId> = {
  deck?: T[];
  deckIds?: number[];
  favs?: Record<number, true> | Record<string, boolean>;
};

function createDeckStateSignature<T extends HasId>(deck: T[], favs: Record<number, true>) {
  const deckIds = deck.map((card) => card.id).join(",");
  const favIds = Object.keys(favs)
    .map((id) => Number(id))
    .filter((id) => Number.isInteger(id))
    .sort((a, b) => a - b)
    .join(",");
  return `${deckIds}|${favIds}`;
}

function getDeckCacheKey(uid: string, deckType: string) {
  return `${DECK_CACHE_PREFIX}:${uid}:${deckType}`;
}

function readDeckCache<T extends HasId>(uid: string, deckType: string): DeckCachePayload<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(getDeckCacheKey(uid, deckType));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DeckCachePayload<T>;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeDeckCache<T extends HasId>(
  uid: string,
  deckType: string,
  deck: T[],
  favs: Record<number, true>
) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      getDeckCacheKey(uid, deckType),
      JSON.stringify({
        deckIds: deck.map((card) => card.id),
        favs,
        updatedAt: Date.now(),
      })
    );
  } catch {
    // localStorage quota/security 에러는 무시
  }
}

function sanitizeDeckIds(rawDeckIds: unknown): number[] | undefined {
  if (!Array.isArray(rawDeckIds) || rawDeckIds.length === 0) return undefined;
  const used = new Set<number>();
  const next: number[] = [];

  for (const id of rawDeckIds) {
    const numericId = Number(id);
    if (!Number.isInteger(numericId)) continue;
    if (used.has(numericId)) continue;
    used.add(numericId);
    next.push(numericId);
  }

  return next.length > 0 ? next : undefined;
}

function reconcileDeckWithBase<T extends HasId>(
  savedDeckIds: number[] | undefined,
  legacySavedDeck: T[] | undefined,
  baseDeck: T[]
): T[] {
  const orderedIds = Array.isArray(savedDeckIds) && savedDeckIds.length > 0
    ? savedDeckIds
    : Array.isArray(legacySavedDeck) && legacySavedDeck.length > 0
      ? legacySavedDeck.map((card) => card.id)
      : undefined;

  if (!orderedIds || orderedIds.length === 0) {
    return baseDeck;
  }

  const baseById = new Map(baseDeck.map((card) => [card.id, card]));
  const usedIds = new Set<number>();
  const merged: T[] = [];

  // 저장된 순서는 유지하되, 내용은 최신 baseDeck 데이터를 사용
  for (const savedId of orderedIds) {
    const latest = baseById.get(savedId);
    if (!latest || usedIds.has(savedId)) continue;
    merged.push(latest);
    usedIds.add(savedId);
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
  const [baseDeck, setBaseDeck] = useState<T[] | null>(initialDeck);
  const [deck, setDeck] = useState<T[]>(initialDeck);
  const [favs, setFavs] = useState<Record<number, true>>({});
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isInitialLoadComplete = useRef(false);
  const lastSyncedSignatureRef = useRef<string | null>(null);
  const saveDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    lastSyncedSignatureRef.current = null;
    if (saveDebounceRef.current) {
      clearTimeout(saveDebounceRef.current);
      saveDebounceRef.current = null;
    }
    setIsLoading(true);
    setError(null);
    setBaseDeck(initialDeck);
    setDeck(initialDeck);
    setFavs({});

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
      lastSyncedSignatureRef.current = createDeckStateSignature(baseDeck, {});
      setIsLoading(false);
      isInitialLoadComplete.current = true;
      return;
    }

    const cached = readDeckCache<T>(user.uid, deckType);
    if (cached) {
      const cachedDeckIds = sanitizeDeckIds(cached.deckIds);
      const cachedDeck = Array.isArray(cached.deck) ? cached.deck : undefined;
      setDeck(reconcileDeckWithBase(cachedDeckIds, cachedDeck, baseDeck));
      setFavs(sanitizeFavs(cached.favs, baseDeck));
    }

    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const learningData = docSnap.data().learningData?.[deckType];
          const savedDeckIds = sanitizeDeckIds(learningData?.deckIds);
          const legacySavedDeck = Array.isArray(learningData?.deck) ? (learningData.deck as T[]) : undefined;
          const nextDeck = reconcileDeckWithBase(savedDeckIds, legacySavedDeck, baseDeck);
          const nextFavs = sanitizeFavs(learningData?.favs, baseDeck);
          lastSyncedSignatureRef.current = createDeckStateSignature(nextDeck, nextFavs);
          setDeck(nextDeck);
          setFavs(nextFavs);
          writeDeckCache(user.uid, deckType, nextDeck, nextFavs);
        } else {
          // 문서가 없으면 최초 1회 저장이 필요하므로 동기화 기준 시그니처를 비웁니다.
          lastSyncedSignatureRef.current = null;
          setDeck(baseDeck);
          setFavs({});
          writeDeckCache(user.uid, deckType, baseDeck, {});
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

    const currentSignature = createDeckStateSignature(deck, favs);
    if (currentSignature === lastSyncedSignatureRef.current) {
      return;
    }

    if (saveDebounceRef.current) {
      clearTimeout(saveDebounceRef.current);
      saveDebounceRef.current = null;
    }

    const save = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        writeDeckCache(user.uid, deckType, deck, favs);
        const deckIds = deck.map((card) => card.id);
        await updateDoc(userDocRef, {
          [`learningData.${deckType}.deckIds`]: deckIds,
          [`learningData.${deckType}.favs`]: favs,
          [`learningData.${deckType}.deck`]: deleteField(),
        }).catch(async (err) => {
          if (err.code === 'not-found' || err.message.includes("No document to update")) {
            await setDoc(userDocRef, { 
              learningData: { [deckType]: { deckIds, favs } } 
            }, { merge: true });
          } else {
            console.error("UpdateDoc failed:", err);
          }
        });
        lastSyncedSignatureRef.current = currentSignature;
      } catch (e) {
        console.error("데이터 저장 실패:", e);
      }
    };

    // 빠른 연속 변경(즐겨찾기 토글 등)을 묶어서 Firestore 쓰기 폭주를 방지합니다.
    saveDebounceRef.current = setTimeout(() => {
      void save();
    }, 300);

    return () => {
      if (saveDebounceRef.current) {
        clearTimeout(saveDebounceRef.current);
        saveDebounceRef.current = null;
      }
    };
  }, [deck, favs, user, deckType]);

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

