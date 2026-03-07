"use client";

import { useEffect, useRef } from "react";
import { doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { db } from "@/app/lib/firebase";

type UseStudySessionAnalyticsProps = {
  userId?: string | null;
  deckType: string;
  observedCardIds: number[];
  enabled: boolean;
};

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeStudySeconds(ms: number) {
  if (ms <= 0) return 0;
  const seconds = Math.round(ms / 1000);
  return Math.max(1, Math.min(seconds, 60 * 60 * 4));
}

async function persistStudyAnalytics(uid: string, deckType: string, studySeconds: number, cardsViewed: number) {
  if (studySeconds <= 0 && cardsViewed <= 0) return;

  const dateKey = getLocalDateKey(new Date());
  const userDocRef = doc(db, "users", uid);
  const payload = {
    [`analytics.dailySummary.${dateKey}.studySeconds`]: increment(studySeconds),
    [`analytics.dailySummary.${dateKey}.sessions`]: increment(1),
    [`analytics.dailySummary.${dateKey}.cardsViewed`]: increment(cardsViewed),
    [`analytics.dailySummary.${dateKey}.decks.${deckType}.studySeconds`]: increment(studySeconds),
    [`analytics.dailySummary.${dateKey}.decks.${deckType}.sessions`]: increment(1),
    [`analytics.dailySummary.${dateKey}.decks.${deckType}.cardsViewed`]: increment(cardsViewed),
    [`analytics.deckStats.${deckType}.studySeconds`]: increment(studySeconds),
    [`analytics.deckStats.${deckType}.sessions`]: increment(1),
    [`analytics.deckStats.${deckType}.cardsViewed`]: increment(cardsViewed),
    [`analytics.deckStats.${deckType}.lastStudiedOn`]: dateKey,
    [`analytics.summary.totalStudySeconds`]: increment(studySeconds),
    [`analytics.summary.totalSessions`]: increment(1),
    [`analytics.summary.totalCardsViewed`]: increment(cardsViewed),
    "analytics.updatedAt": serverTimestamp(),
  };

  try {
    await updateDoc(userDocRef, payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const code = typeof error === "object" && error !== null && "code" in error ? String((error as { code?: string }).code) : "";

    if (code === "not-found" || message.includes("No document to update")) {
      await setDoc(userDocRef, payload, { merge: true });
      return;
    }

    console.error("[study-analytics] 저장 실패", error);
  }
}

export function useStudySessionAnalytics({
  userId,
  deckType,
  observedCardIds,
  enabled,
}: UseStudySessionAnalyticsProps) {
  const sessionStartedAtRef = useRef<number | null>(null);
  const accumulatedMsRef = useRef(0);
  const observedIdsRef = useRef<Set<number>>(new Set());
  const userIdRef = useRef<string | null>(userId ?? null);
  const deckTypeRef = useRef(deckType);
  const enabledRef = useRef(enabled);

  userIdRef.current = userId ?? null;
  deckTypeRef.current = deckType;
  enabledRef.current = enabled;

  useEffect(() => {
    if (!enabled) return;

    for (const cardId of observedCardIds) {
      if (Number.isInteger(cardId)) {
        observedIdsRef.current.add(cardId);
      }
    }
  }, [enabled, observedCardIds]);

  useEffect(() => {
    if (!enabled) {
      if (sessionStartedAtRef.current) {
        accumulatedMsRef.current += Date.now() - sessionStartedAtRef.current;
        sessionStartedAtRef.current = null;
      }
      return;
    }

    if (document.visibilityState === "visible" && sessionStartedAtRef.current === null) {
      sessionStartedAtRef.current = Date.now();
    }
  }, [enabled]);

  useEffect(() => {
    let isFlushing = false;

    const flush = async () => {
      if (isFlushing) return;
      isFlushing = true;

      if (sessionStartedAtRef.current) {
        accumulatedMsRef.current += Date.now() - sessionStartedAtRef.current;
        sessionStartedAtRef.current = null;
      }

      const uid = userIdRef.current;
      const activeDeckType = deckTypeRef.current;
      const studySeconds = normalizeStudySeconds(accumulatedMsRef.current);
      const cardsViewed = observedIdsRef.current.size;

      accumulatedMsRef.current = 0;
      observedIdsRef.current = new Set();

      if (uid) {
        await persistStudyAnalytics(uid, activeDeckType, studySeconds, cardsViewed);
      }

      isFlushing = false;
    };

    const handleVisibilityChange = () => {
      if (!enabledRef.current) return;

      if (document.visibilityState === "hidden") {
        void flush();
        return;
      }

      if (sessionStartedAtRef.current === null) {
        sessionStartedAtRef.current = Date.now();
      }
    };

    const handlePageHide = () => {
      if (!enabledRef.current) return;
      void flush();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      if (enabledRef.current) {
        void flush();
      }
    };
  }, []);
}
