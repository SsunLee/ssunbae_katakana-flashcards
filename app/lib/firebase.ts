// app/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  signInWithCustomToken
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Capacitor } from "@capacitor/core";
import { getStorage } from "firebase/storage"; // 👈 추가



const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// 앱 단일화
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// auth는 initializeAuth를 한 번만
let _auth = undefined as ReturnType<typeof getAuth> | undefined;
try {
  // Capacitor v7: isNativePlatform()가 함수, 웹에서는 false 취급
  const isNative =
    typeof (Capacitor as any).isNativePlatform === 'function'
      ? (Capacitor as any).isNativePlatform()
      : Capacitor.getPlatform() !== 'web';

  _auth = initializeAuth(app, {
    persistence: isNative ? indexedDBLocalPersistence : browserLocalPersistence,
  });
} catch {
  // 이미 초기화된 경우 getAuth로 회수
  _auth = getAuth(app);
}

export const auth = _auth!;
export const db = getFirestore(app);
export const storage = getStorage(app); // 👈 추가


export const authenticate = async () => {
  if (auth.currentUser) return;
  try {
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
