// app/lib/firebase-admin.ts
// 모듈식 API (firebase-admin v12+)
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
// 필요 시: import { getStorage } from "firebase-admin/storage";

function ensureAdminApp() {
  if (getApps().length) return getApps()[0];

  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  return initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: privateKey!,
    }),
  });
}

export function getAdminAuth() {
  return getAuth(ensureAdminApp());          // ✅ admin.auth() 아님
}

export function getAdminDb() {
  return getFirestore(ensureAdminApp());
}
// export const adminStorage = getStorage();  // 쓰면 주석 해제
