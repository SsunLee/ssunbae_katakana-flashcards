// /app/AuthContext.tsx

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // [수정] setDoc을 import 합니다.
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
      
      // [수정] 네트워크 오류 등을 대비해 try...catch 블록을 추가합니다.
      try {
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
          // [수정] Firestore에 사용자 문서가 없을 경우, 기본값으로 문서를 생성해줍니다.
          const defaultNickname = firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '사용자';
          const newUserProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            nickname: defaultNickname,
            photoURL: firebaseUser.photoURL,
          };
          
          // 'users' 컬렉션에 새로운 사용자 문서를 생성합니다.
          await setDoc(userDocRef, {
            nickname: newUserProfile.nickname,
            photoURL: newUserProfile.photoURL,
            email: newUserProfile.email,
            createdAt: new Date(), // 생성 시각 기록
          });

          setUser(newUserProfile);
        }
      } catch (error) {
        console.error("사용자 프로필 정보를 가져오는 중 오류 발생:", error);
        // [수정] 에러 발생 시, 최소한의 정보로 유저 상태를 설정해줍니다.
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          nickname: firebaseUser.displayName,
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
  
  const refreshUser = useCallback(async (optimisticData?: Partial<UserProfile>) => {
    if (optimisticData) {
      setUser(prevUser => prevUser ? { ...prevUser, ...optimisticData } : null);
      return;
    }

    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await currentUser.reload();
        await fetchAndSetUser(currentUser);
      } catch (error) {
        console.error("사용자 정보 새로고침 중 오류 발생:", error);
      }
    }
  }, [auth, fetchAndSetUser]);
  
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
