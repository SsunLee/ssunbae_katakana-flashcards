// /app/AuthContext.tsx

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { app, db } from './lib/firebase';

export interface UserProfile {
  uid: string;
  email: string | null;
  nickname: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  refreshUser: (optimisticData?: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, refreshUser: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  const fetchAndSetUser = useCallback(async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          nickname: userData.nickname || firebaseUser.displayName,
          photoURL: userData.photoURL || firebaseUser.photoURL,
        });
      } else {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          nickname: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '사용자',
          photoURL: firebaseUser.photoURL,
        });
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      fetchAndSetUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [auth, fetchAndSetUser]);
  
  // --- 👇 [수정] 낙관적 업데이트와 서버 동기화 로직을 분리합니다 ---
  const refreshUser = useCallback(async (optimisticData?: Partial<UserProfile>) => {
    // 1. 만약 optimisticData가 있다면, 즉시 UI 상태만 업데이트하고 종료합니다.
    if (optimisticData) {
      console.log("[AuthContext] 낙관적 업데이트 실행:", optimisticData);
      setUser(prevUser => prevUser ? { ...prevUser, ...optimisticData } : null);
      return; // 서버에 바로 다시 물어보지 않음으로써 경합 상태를 방지
    }

    // 2. optimisticData가 없다면, 서버에서 최신 정보를 가져와 동기화합니다.
    console.log("[AuthContext] 서버로부터 데이터 동기화 시작");
    const currentUser = auth.currentUser;
    if (currentUser) {
      await currentUser.reload();
      await fetchAndSetUser(currentUser);
      console.log("[AuthContext] 서버 동기화 완료");
    }
  }, [auth, fetchAndSetUser]);
  // --- 👆 [수정] ---
  
  const value = { user, loading, refreshUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

