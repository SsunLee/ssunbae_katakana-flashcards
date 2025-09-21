// app/lib/firebase.ts

// 전역 변수 선언
declare global {
  var __firebase_config: string | object | undefined; // 타입을 object도 허용하도록 변경
  var __initial_auth_token: string | undefined;
}

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase 설정 값을 안전하게 가져오는 함수
const getFirebaseConfig = () => {
  if (typeof __firebase_config !== 'undefined') {
    // __firebase_config가 문자열이면 파싱하고, 객체이면 그대로 사용합니다.
    return typeof __firebase_config === 'string'
      ? JSON.parse(__firebase_config)
      : __firebase_config;
  }
  // 전역 변수가 없으면 환경 변수에서 가져옵니다.
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
};

const firebaseConfig = getFirebaseConfig();

// Firebase 앱 초기화 (중복 방지)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Canvas 환경에서 제공하는 토큰이 있을 경우에만 로그인을 시도하는 함수.
 * 익명 로그인 로직은 제거되었습니다.
 */
const authenticate = async () => {
  // 이미 로그인 세션이 있으면 아무것도 하지 않습니다.
  if (auth.currentUser) return;

  try {
    // Canvas 환경에서 제공하는 사용자 토큰이 있을 경우에만 로그인을 시도합니다.
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
      await signInWithCustomToken(auth, __initial_auth_token);
    }
  } catch (error) {
    console.error("Firebase authentication failed:", error);
  }
};

export { app, db, auth, authenticate };

