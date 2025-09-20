// app/hooks/useAuthReady.ts
"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase"; // <- 프로젝트 경로에 맞게 조정

export function useAuthReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => setReady(true));
    return unsub;
  }, []);
  return ready;
}
