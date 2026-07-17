// app/goodbye/page.tsx  ← "use client" 금지
import type { Metadata } from "next";
import GoodbyeClient from "./GoodbyeClient";

export const metadata: Metadata = {
  title: "계정 삭제 완료",
  description: "계정 삭제가 완료되었습니다.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <GoodbyeClient />;
}
