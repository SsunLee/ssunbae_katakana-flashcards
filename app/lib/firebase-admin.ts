// app/lib/firebase-admin.ts
// 모듈식 API (firebase-admin v12+)
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
// 필요 시: import { getStorage } from "firebase-admin/storage";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: privateKey!,
    }),
  });
}

export const adminAuth = getAuth();          // ✅ admin.auth() 아님
export const adminDb = getFirestore();
// export const adminStorage = getStorage();  // 쓰면 주석 해제
