// /app/api/profile/route.ts

import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/app/lib/firebase-admin';

// --- 👇 [추가] delete API와 동일한 CORS 설정을 가져옵니다 ---
const ALLOWED_ORIGINS = [
  "https://ssunbae-api.vercel.app/", // 실제 운영 주소 (필요 시 추가)
  "http://localhost:3000",
  "http://localhost:3001",
  "capacitor://localhost",
  "http://localhost" // Capacitor iOS
];

function cors(res: NextResponse, origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.headers.set("Access-Control-Allow-Origin", allow);
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  return res;
}

// OPTIONS 요청을 처리하여 preflight request에 응답합니다.
export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return cors(new NextResponse(null, { status: 204 }), origin);
}
// --- 👆 [추가] ---


export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  try {
    // --- 👇 [수정] 세션 쿠키 대신 ID 토큰으로 인증합니다 ---
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      const errRes = NextResponse.json({ error: "Missing ID token" }, { status: 401 });
      return cors(errRes, origin);
    }
    const idToken = authHeader.split(" ")[1];
    const decoded = await adminAuth.verifyIdToken(idToken, true);
    const uid = decoded.uid;
    // --- 👆 [수정] ---

    const { nickname } = await req.json();

    if (!nickname || typeof nickname !== 'string' || nickname.length < 2) {
      const errRes = NextResponse.json({ error: '닉네임은 2자 이상이어야 합니다.' }, { status: 400 });
      return cors(errRes, origin);
    }

    const userRef = adminDb.collection('users').doc(uid);
    await userRef.update({
      nickname: nickname,
    });
    
    await adminAuth.updateUser(uid, {
      displayName: nickname,
    });

    const res = NextResponse.json({ message: 'Profile updated successfully' });
    return cors(res, origin); // 성공 응답에도 CORS 헤더 추가

  } catch (error: any) {
    console.error('Profile update error:', error);
    const errRes = NextResponse.json({ error: error?.message ?? "update failed" }, { status: 400 });
    return cors(errRes, origin); // 에러 응답에도 CORS 헤더 추가
  }
}

