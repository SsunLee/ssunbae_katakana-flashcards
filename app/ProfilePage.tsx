import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { Button } from './components/ui/button';
import { useAuth, UserProfile } from './AuthContext'; 
import { signOut } from 'firebase/auth';


export default function ProfilePage() {
  const { user, updateUser } = useAuth(); 
  
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user || !nickname.trim()) return;

    setLoading(true);
    const userDocRef = doc(db, 'users', user.uid);
    try {
      // 1. Firestore의 닉네임 업데이트
      await updateDoc(userDocRef, {
        nickname: nickname.trim()
      });
      // 2. 앱의 전역 상태(Context) 업데이트
      updateUser({ nickname: nickname.trim() });
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("닉네임 업데이트 실패:", error);
      alert("닉네임 변경에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };
  
  if (!user) return null; // 사용자가 없으면 아무것도 렌더링하지 않음

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800/60 rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-2xl font-bold text-center">🦋 내 정보 🦋</h1>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-white/70">닉네임</p>
            {isEditing ? (
              <input 
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mt-1 w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-lg">{user.nickname}</p>
            )}
          </div>
          <div>
            <p className="text-sm text-white/70">이메일</p>
            <p className="text-lg">{user.email}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="flex gap-4 mt-6">
            <Button onClick={() => setIsEditing(false)} variant="outline" className="w-full border-white/20 bg-transparent hover:bg-white/10">취소</Button>
            <Button onClick={handleSave} disabled={loading} variant="outline" className="w-full border-white/20 hover:bg-blue-500/20 hover:text-blue-400">{loading ? '저장 중...' : '저장'}</Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full mt-6 border-white/20 bg-transparent hover:bg-white/10">닉네임 수정</Button>
        )}
        
        <Button onClick={handleLogout} variant="outline" className="w-full mt-2 text-white/60 border-white/20 hover:bg-red-500/20 hover:text-red-400">로그아웃</Button>
      </div>
    </div>
  );
}