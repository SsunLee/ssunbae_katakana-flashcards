import { NextResponse } from "next/server";
import { fetchPublishedNotices } from "@/app/lib/notices";

export const revalidate = 300;

export async function GET() {
  const { notices, warning } = await fetchPublishedNotices();
  return NextResponse.json({ notices, warning });
}
