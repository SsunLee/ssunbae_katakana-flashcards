// app/api/account/delete/route.ts
export const runtime = "nodejs"; // ✅ Edge에서 돌지 않게

import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/app/lib/firebase-admin";

const ALLOWED_ORIGINS = [
  "https://ssunbae-api.vercel.app/",
  "http://localhost:3000",
  "capacitor://localhost",
];

function cors(res: NextResponse, origin: string | null) {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.headers.set("Access-Control-Allow-Origin", allow);
  res.headers.set("Vary", "Origin");
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  return res;
}

export async function OPTIONS(req: Request) {
  const origin = req.headers.get("origin");
  return cors(new NextResponse(null, { status: 204 }), origin);
}




async function purgeUserData(uid: string) {
  const userDocRef = adminDb.collection("users").doc(uid);
  const subs = await userDocRef.listCollections();
  for (const col of subs) {
    const snap = await col.get();
    const batch = adminDb.batch();
    snap.docs.forEach((d) => batch.delete(d.ref));
    await batch.commit();
  }
  await userDocRef.delete().catch(() => {});
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing ID token" }, { status: 401 });
    }
    const idToken = authHeader.split(" ")[1];

    // ✅ 모듈식 Auth에서 제공하는 메서드
    const decoded = await adminAuth.verifyIdToken(idToken, true);
    const uid = decoded.uid;

    await purgeUserData(uid);
    await adminAuth.deleteUser(uid);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    // 디버깅용으로 메시지 반환(개발중에만)
    return NextResponse.json({ error: e?.message ?? "delete failed" }, { status: 400 });
  }
}