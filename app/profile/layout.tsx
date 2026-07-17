import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로필 설정",
  robots: { index: false, follow: false },
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
