"use client";

import React, {
  createContext, useContext, useState, useEffect, ReactNode,
} from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./lib/firebase";

export interface UserProfile {
  uid: string;
  email: string | null;
  nickname: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  updateUser: (newProfileData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 인증 상태 변화 구독
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setLoading(true); // 이벤트 들어오는 즉시 로딩 시작(안전)
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Firestore 프로필 로드
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userDocRef);

        const nickname =
          snap.exists() ? (snap.data() as any).nickname ?? "사용자" : "사용자";

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          nickname,
        });
      } catch (e) {
        // ❗️getDoc 실패해도 UI가 멈추지 않도록 최소 정보로 세팅
        console.error("[Auth] failed to load user profile:", e);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          nickname: "사용자",
        });
      } finally {
        setLoading(false); // 항상 종료
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUser = (newProfileData: Partial<UserProfile>) => {
    setUser((cur) => (cur ? { ...cur, ...newProfileData } : cur));
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
