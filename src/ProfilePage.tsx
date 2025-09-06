import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Button } from './components/ui/button';
import { UserProfile } from './AuthContext'; // UserProfile 타입 import

interface ProfilePageProps {
  user: UserProfile; // 타입을 UserProfile로 변경
}

export default function ProfilePage({ user }: ProfilePageProps) {

  const handleLogout = async () => { /* ... */ };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800/60 rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-2xl font-bold text-center">🦋 내 정보 🦋</h1>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-white/70">닉네임</p>
            <p className="text-lg">{user.nickname}</p> {/* ✅ user.nickname 바로 사용 */}
          </div>
          <div>
            <p className="text-sm text-white/70">이메일</p>
            <p className="text-lg">{user.email}</p>
          </div>
        </div>
        <Button onClick={handleLogout} /* ... */ >로그아웃</Button>
      </div>
    </div>
  );
}