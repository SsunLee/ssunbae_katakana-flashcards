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
const PROFILE_CACHE_PREFIX = "ssunbae:user-profile:v1";

function getProfileCacheKey(uid: string) {
  return `${PROFILE_CACHE_PREFIX}:${uid}`;
}

function readCachedProfile(uid: string): Partial<UserProfile> | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(getProfileCacheKey(uid));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<UserProfile> | null;
    if (!parsed || typeof parsed !== "object") return null;

    return {
      nickname: typeof parsed.nickname === "string" ? parsed.nickname : null,
      photoURL: typeof parsed.photoURL === "string" ? parsed.photoURL : null,
      avatarColor:
        typeof parsed.avatarColor === "string" && isAvatarColor(parsed.avatarColor)
          ? parsed.avatarColor
          : undefined,
      avatarIcon:
        typeof parsed.avatarIcon === "string" && isAvatarIconName(parsed.avatarIcon)
          ? parsed.avatarIcon
          : undefined,
    };
  } catch {
    return null;
  }
}

function writeCachedProfile(profile: UserProfile) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      getProfileCacheKey(profile.uid),
      JSON.stringify({
        nickname: profile.nickname,
        photoURL: profile.photoURL,
        avatarColor: profile.avatarColor,
        avatarIcon: profile.avatarIcon,
      })
    );
  } catch {
    // localStorage quota/security 에러는 무시
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAndSetUser = useCallback(async (firebaseUser: User | null) => {
    if (firebaseUser) {
      const targetUid = firebaseUser.uid;
      const cachedProfile = readCachedProfile(firebaseUser.uid);
      const baseProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        nickname: cachedProfile?.nickname ?? firebaseUser.displayName ?? firebaseUser.email?.split('@')[0] ?? '사용자',
        photoURL: cachedProfile?.photoURL ?? firebaseUser.photoURL,
        avatarColor: cachedProfile?.avatarColor ?? DEFAULT_AVATAR_COLOR,
        avatarIcon: cachedProfile?.avatarIcon ?? DEFAULT_AVATAR_ICON,
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
          const profileFromDb: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            nickname: userData.nickname || firebaseUser.displayName,
            photoURL: userData.photoURL || firebaseUser.photoURL,
            avatarColor: isAvatarColor(userData.avatarColor) ? userData.avatarColor : DEFAULT_AVATAR_COLOR,
            avatarIcon: isAvatarIconName(userData.avatarIcon) ? userData.avatarIcon : DEFAULT_AVATAR_ICON,
          };
          setUser(profileFromDb);
          writeCachedProfile(profileFromDb);
        } else {
          // [수정] Firestore에 사용자 문서가 없을 경우, 기본값으로 문서를 생성해줍니다.
          const newUserProfile: UserProfile = baseProfile;
          
          // 'users' 컬렉션에 새로운 사용자 문서를 생성합니다.
          setUser(newUserProfile);
          writeCachedProfile(newUserProfile);

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
        setUser((prev) => {
          const next = prev ?? baseProfile;
          writeCachedProfile(next);
          return next;
        });
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
      setUser(prevUser => {
        if (!prevUser) return null;
        const next = { ...prevUser, ...optimisticData };
        writeCachedProfile(next);
        return next;
      });
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
