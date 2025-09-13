// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-8 bg-slate-950 text-white">
      <h2 className="text-4xl font-bold">404 - 페이지를 찾을 수 없습니다</h2>
      <p className="text-lg text-white/70 mt-4">
        요청하신 페이지가 존재하지 않거나, 주소가 변경되었을 수 있습니다.
      </p>
      <Link href="/" className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
