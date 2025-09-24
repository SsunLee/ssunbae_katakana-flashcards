// app/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import { app } from './lib/firebase';

export interface UserProfile {
  uid: string;
  email: string | null;
  nickname: string | null;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  updateUser: (newProfile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, updateUser: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🕵️ [AuthContext] AuthProvider가 마운트되었습니다. Firebase 인증 리스너를 설정합니다.");
    const auth = getAuth(app);
    
    // onAuthStateChanged는 Firebase의 인증 상태 변경(로그인, 로그아웃)을 실시간으로 감지합니다.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      console.log("👀 [AuthContext] 인증 상태 변경 감지!", firebaseUser ? `로그인된 사용자: ${firebaseUser.uid}` : "사용자 로그아웃됨");
      if (firebaseUser) {
        // 사용자가 로그인된 상태일 때
        console.log("✅ [AuthContext] 사용자 정보를 앱 상태에 설정합니다.");
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          nickname: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '사용자',
        });
      } else {
        // 사용자가 로그아웃된 상태일 때
        console.log("❌ [AuthContext] 사용자 정보를 앱 상태에서 제거합니다.");
        setUser(null);
      }
      console.log("🔄 [AuthContext] 인증 로딩 상태를 false로 변경합니다.");
      setLoading(false);
    });

    // 컴포넌트가 사라질 때 감시를 중단하여 메모리 누수를 방지합니다.
    return () => {
      console.log("🧹 [AuthContext] AuthProvider가 언마운트됩니다. 리스너를 정리합니다.");
      unsubscribe();
    };
  }, []);

  const updateUser = async (newProfile: Partial<UserProfile>) => {
    const auth = getAuth(app);
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        await updateProfile(currentUser, {
          displayName: newProfile.nickname
        });
        setUser(prevUser => prevUser ? { ...prevUser, ...newProfile } : null);
      } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
      }
    }
  };

  const value = { user, loading, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

