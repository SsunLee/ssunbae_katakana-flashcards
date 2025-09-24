// app/lib/firebase.ts

// Firebase 관련 모듈들을 가져옵니다.
import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  initializeAuth, 
  indexedDBLocalPersistence, // 네이티브 환경을 위한 인증 유지 방식
  browserLocalPersistence,   // 웹 환경을 위한 인증 유지 방식
  signInWithCustomToken     // <<< 추가된 import
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Capacitor } from "@capacitor/core";

// .env.local 파일에서 Firebase 설정 값을 가져옵니다.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 앱이 중복으로 초기화되는 것을 방지합니다.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Capacitor 네이티브 환경과 웹 환경을 구분하여 로그인 세션 유지 방식을 설정합니다.
const auth = initializeAuth(app, {
  persistence: Capacitor.isNativePlatform()
    ? indexedDBLocalPersistence
    : browserLocalPersistence,
});

const db = getFirestore(app);

// <<< 아래 authenticate 함수가 다시 추가되었습니다.
const authenticate = async () => {
  // 이미 로그인 세션이 있으면 아무것도 하지 않습니다.
  if (auth.currentUser) return;

  try {
    // 특별한 환경(예: Canvas)에서 제공하는 토큰이 있을 경우 자동 로그인합니다.
    // @ts-ignore
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
      // @ts-ignore
      await signInWithCustomToken(auth, __initial_auth_token);
      console.log("Custom token으로 인증 성공!");
    }
  } catch (error) {
    console.error("Custom token 인증 실패:", error);
  }
};

// 필요한 객체들을 export 합니다. authenticate를 다시 추가합니다.
export { app, auth, db, authenticate };

