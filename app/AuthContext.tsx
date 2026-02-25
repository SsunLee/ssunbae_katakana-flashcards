// /app/AuthContext.tsx

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // [수정] setDoc을 import 합니다.
import { auth, db } from './lib/firebase';
import {
  DEFAULT_AVATAR_COLOR,
  DEFAULT_AVATAR_ICON,
  isAvatarColor,
  isAvatarIconName,
  type AvatarColor,
  type AvatarIconName,
} from '@/app/constants/avatarOptions';

export interface UserProfile {
  uid: string;
  email: string | null;
  nickname: string | null;
  photoURL: string | null;
  avatarColor: AvatarColor;
  avatarIcon: AvatarIconName;
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

  const fetchAndSetUser = useCallback(async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const targetUid = firebaseUser.uid;
      const baseProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        nickname: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '사용자',
        photoURL: firebaseUser.photoURL,
        avatarColor: DEFAULT_AVATAR_COLOR,
        avatarIcon: DEFAULT_AVATAR_ICON,
      };

      // 인증 상태는 즉시 반영하고, 프로필 상세는 비동기로 보강합니다.
      setUser((prev) => {
        if (prev?.uid !== firebaseUser.uid) return baseProfile;
        return {
          ...baseProfile,
          nickname: prev.nickname || baseProfile.nickname,
          photoURL: prev.photoURL || baseProfile.photoURL,
          avatarColor: prev.avatarColor || baseProfile.avatarColor,
          avatarIcon: prev.avatarIcon || baseProfile.avatarIcon,
        };
      });
      setLoading(false);

      const userDocRef = doc(db, "users", firebaseUser.uid);
      
      // [수정] 네트워크 오류 등을 대비해 try...catch 블록을 추가합니다.
      try {
        const userDoc = await getDoc(userDocRef);
        if (auth.currentUser?.uid !== targetUid) return;

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            nickname: userData.nickname || firebaseUser.displayName,
            photoURL: userData.photoURL || firebaseUser.photoURL,
            avatarColor: isAvatarColor(userData.avatarColor) ? userData.avatarColor : DEFAULT_AVATAR_COLOR,
            avatarIcon: isAvatarIconName(userData.avatarIcon) ? userData.avatarIcon : DEFAULT_AVATAR_ICON,
          });
        } else {
          // [수정] Firestore에 사용자 문서가 없을 경우, 기본값으로 문서를 생성해줍니다.
          const newUserProfile: UserProfile = baseProfile;
          
          // 'users' 컬렉션에 새로운 사용자 문서를 생성합니다.
          setUser(newUserProfile);

          await setDoc(userDocRef, {
            nickname: newUserProfile.nickname,
            photoURL: newUserProfile.photoURL,
            avatarColor: newUserProfile.avatarColor,
            avatarIcon: newUserProfile.avatarIcon,
            email: newUserProfile.email,
            createdAt: new Date(), // 생성 시각 기록
          });
        }
      } catch (error) {
        console.error("사용자 프로필 정보를 가져오는 중 오류 발생:", error);
        if (auth.currentUser?.uid !== targetUid) return;
        // 에러 시에도 로그인 사용자 컨텍스트는 유지합니다.
        setUser((prev) => prev ?? baseProfile);
      }

    } else {
      setUser(null);
      setLoading(false);
    }
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
