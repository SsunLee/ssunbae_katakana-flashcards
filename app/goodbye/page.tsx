// app/goodbye/page.tsx  ← "use client" 금지
import type { Metadata } from "next";
import GoodbyeClient from "./GoodbyeClient";

export const metadata: Metadata = {
  title: "Goodbye | SSUN EDU",
  description: "계정 삭제가 완료되었습니다.",
};

export default function Page() {
  return <GoodbyeClient />;
}
