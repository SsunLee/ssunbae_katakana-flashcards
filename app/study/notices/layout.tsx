import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "공지사항",
  robots: { index: false, follow: false },
};

export default function NoticesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
