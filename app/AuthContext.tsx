// app/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

// 앱 전체에서 사용할 사용자 정보 타입을 정의합니다. (Firebase 정보 + Firestore 닉네임)
export interface UserProfile {
  uid: string;
  email: string | null;
  nickname: string;
}

// Context가 제공할 값의 타입을 정의합니다.
interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
updateUser: (newProfileData: Partial<UserProfile>) => void; // 👈 [수정] updateUser 함수 타입 추가

}

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Context를 앱에 제공하는 Provider 컴포넌트
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase의 인증 상태 변경을 실시간으로 감지
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // 사용자가 로그인한 경우, Firestore에서 닉네임 등 추가 정보 가져오기
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(userDocRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            nickname: userData.nickname || '사용자', // 닉네임이 없으면 '사용자'로 표시
          });
        } else {
          // Firestore에 사용자 문서가 없는 경우 (오류 또는 가입 직후)
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            nickname: '사용자',
          });
        }
      } else {
        // 사용자가 로그아웃한 경우
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // 클린업 함수
  }, []);

  // 👈 [수정] 사용자 정보를 업데이트하는 함수 정의
  const updateUser = (newProfileData: Partial<UserProfile>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      return { ...currentUser, ...newProfileData };
    });
  };

  return (
    //  context value에 updateUser 함수 추가
    <AuthContext.Provider value={{ user, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 다른 컴포넌트에서 Context를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};