import React from 'react';
import { User, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Button } from './components/ui/button';

interface MainMenuProps {
  user: User;
  onNavigateToFlashcards: () => void;
  onNavigateToProfile: () => void;
}

export default function MainMenu({ user, onNavigateToFlashcards, onNavigateToProfile }: MainMenuProps) {
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold">🦋 환영합니다 🦋</h1>
        <p className="text-white/70 mt-2 mb-8">{user.email}님, 무엇을 할까요?</p>

        <div className="space-y-4">
          <Button 
            onClick={onNavigateToFlashcards}
            className="w-full h-16 text-lg"
          >
            카타카나 학습하기
          </Button>
          <Button 
            onClick={onNavigateToProfile}
            variant="outline"
            className="w-full h-16 text-lg border-white/20 bg-transparent hover:bg-white/10"
          >
            내 정보
          </Button>
          <Button 
            onClick={handleLogout}
            variant="ghost"
            className="w-full h-16 text-lg text-white/70 hover:bg-white/5 hover:text-white"
          >
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
}