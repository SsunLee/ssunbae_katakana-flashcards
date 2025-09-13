// app/study/layout.tsx
"use client";

import { useState } from 'react';
import SideMenu from '@/app/components/SideMenu';
import { Dialog, DialogContent, DialogOverlay, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import LoginPage from '@/app/LoginPage';
import RegisterPage from '@/app/RegisterPage';
import { Menu } from 'lucide-react';

// 이 레이아웃은 {children}을 받아서 렌더링합니다.
// {children}은 각 학습 페이지의 page.tsx 파일이 됩니다.
export default function StudyLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col">
      {/* 상단 헤더 (모든 학습 페이지에 공통으로 보임) */}
      <header className="w-full h-16 flex-shrink-0 border-b border-white/10 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between px-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2">
            <Menu />
          </button>
          <span className="text-lg font-semibold">🦋 쑨쑨배의 일본어 공부 🦋</span>
          <div className="w-8"></div>
        </div>
      </header>

      {/* 사이드 메뉴 (모든 학습 페이지에 공통으로 보임) */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onAuthClick={() => setShowAuthModal(true)}
      />

      {/* 로그인/회원가입 모달 */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogContent className="bg-slate-800/60 border-white/10 text-white rounded-2xl shadow-xl p-0 w-full max-w-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-[48%]">
           <DialogHeader className="sr-only">
             <DialogTitle>{authPage === 'login' ? '로그인' : '회원가입'}</DialogTitle>
           </DialogHeader>
          {authPage === 'login' ? (
            <LoginPage
              onSwitchToRegister={() => setAuthPage('register')}
              onSuccess={() => setShowAuthModal(false)}
            />
          ) : (
            <RegisterPage
              onSwitchToLogin={() => setAuthPage('login')}
              onSuccess={() => setShowAuthModal(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* ★★★ 이 부분이 각 학습 페이지의 내용으로 채워집니다. ★★★ */}
      <main className="flex-grow overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

