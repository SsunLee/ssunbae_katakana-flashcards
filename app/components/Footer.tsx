// app/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-6 text-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
        <p className="text-muted-foreground">© {new Date().getFullYear()} SSUN EDU</p>
        <nav className="flex gap-4">
          <Link href="/support" className="hover:underline">Support</Link>
          <Link href="/privacy" className="hover:underline">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
