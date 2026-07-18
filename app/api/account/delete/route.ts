// app/api/account/delete/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb } from "@/app/lib/firebase-admin";

const ALLOWED_ORIGINS = [
  "https://ssunbae-api.vercel.app",
  "https://ssunedu.com",
  "https://www.ssunedu.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost",
  "capacitor://localhost",
];

function cors(res: NextResponse, origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }
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
  const adminDb = getAdminDb();
  const userDocRef = adminDb.collection("users").doc(uid);
  await adminDb.recursiveDelete(userDocRef);
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  try {
    const adminAuth = getAdminAuth();
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return cors(NextResponse.json({ error: "Missing ID token" }, { status: 401 }), origin);
    }
    const idToken = authHeader.split(" ")[1];

    const decoded = await adminAuth.verifyIdToken(idToken, true);
    const uid = decoded.uid;

    await purgeUserData(uid);
    await adminAuth.deleteUser(uid);

    return cors(NextResponse.json({ ok: true }), origin);
  } catch (e: any) {
    const message = e?.code === "auth/id-token-revoked" ? "Please sign in again" : "Account deletion failed";
    return cors(NextResponse.json({ error: message }, { status: 400 }), origin);
  }
}
