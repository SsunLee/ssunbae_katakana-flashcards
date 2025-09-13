

// ★★★ [가장 중요] 브라우저 API(useState, localStorage 등)를 사용하므로 클라이언트 컴포넌트로 지정합니다.
"use client";


import React, { useState, useEffect } from 'react';
// ★ [경로 수정] './AuthContext' -> '@/app/AuthContext' 처럼 절대 경로 별칭을 사용합니다.
import { useAuth } from '@/app/AuthContext';
import { Menu, X } from 'lucide-react';

// ★ [경로 수정] 페이지 및 컴포넌트 import 경로를 @/ 별칭으로 수정합니다.
import FlashcardApp from '@/app/FlashcardApp';
import LoginPage from '@/app/LoginPage';
import RegisterPage from '@/app/RegisterPage';
import SideMenu from '@/app/components/SideMenu';
import {
  Dialog,
  DialogContent,
  DialogHeader,   
  DialogTitle,    
  DialogDescription,
  DialogOverlay
} from '@/app/components/ui/dialog'; // 경로 확인
import { KATAKANA_CHARS } from '@/app/data/katakanaChars';
import { WORDS as KATAKANA_WORDS } from '@/app/data/words';

// 임시 페이지
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full text-2xl text-white/70">{title} (준비 중)</div>
);

type ActivePage = 'katakana-words' | 'katakana-chars' | 'hiragana';

// 컴포넌트 이름을 HomePage 등으로 명확하게 변경하는 것을 추천합니다.
export default function HomePage() { 
  const { user, loading } = useAuth();
  
  const [activePage, setActivePage] = useState<ActivePage>('katakana-words'); // 기본값으로 초기화

  // ★ [수정] localStorage는 클라이언트에서만 접근 가능하므로, useEffect 안에서만 사용합니다.
  useEffect(() => {
    const savedPage = localStorage.getItem('lastActivePage') as ActivePage;
    if (savedPage && ['katakana-words', 'katakana-chars', 'hiragana'].includes(savedPage)) {
      setActivePage(savedPage);
    }
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  useEffect(() => {
    // activePage가 변경될 때마다 localStorage에 저장 (초기 렌더링 시 제외)
    localStorage.setItem('lastActivePage', activePage);
  }, [activePage]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');

  if (loading) {
    return <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center text-white">로딩 중...</div>;
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col">
      {/* 상단 헤더 */}
      <header className="w-full h-16 flex-shrink-0 border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="h-full w-full max-w-7xl mx-auto flex items-center justify-between px-4">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2">
            <Menu />
          </button>
          <span className="text-lg font-semibold">🦋 쑨쑨배의 일본어 공부 🦋</span>
          <div className="w-8"></div> {/* 오른쪽 공간 맞춤용 */}
        </div>
      </header>

      {/* 사이드 메뉴 */}
      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onAuthClick={() => setShowAuthModal(true)}
      />

      {/* 로그인/회원가입 모달 */}
      <Dialog 
        open={showAuthModal} 
        onOpenChange={(isOpen) => {
          setShowAuthModal(isOpen);
          if (!isOpen) {
            setAuthPage('login');
          }
        }}
      >
        <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
        <DialogContent className="bg-slate-800/60 border-white/10 text-white rounded-2xl shadow-xl p-0 w-full max-w-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-[48%]">
        <DialogHeader className="sr-only">
            <DialogTitle>
                 {authPage === 'login' ? '로그인' : '회원가입'}
            </DialogTitle>
            <DialogDescription>
                {authPage === 'login' 
                    ? '소셜 계정으로 로그인하거나 이메일로 계속하세요.' 
                    : '새 계정을 만들기 위한 정보를 입력하세요.'}
            </DialogDescription>
        </DialogHeader>

        {/* --- auth page 상태에 따라서 로그인 또는 회원가입 컴포넌트 표시 --- */}
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

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-grow overflow-y-auto">
        {activePage === 'katakana-words' && 
          <FlashcardApp 
            initialDeck={KATAKANA_WORDS} 
            deckType="katakana-words"
            onLoginClick={() => setShowAuthModal(true)}
          />}
        {activePage === 'katakana-chars' && 
          <FlashcardApp 
            initialDeck={KATAKANA_CHARS} 
            deckType="katakana-chars"
            onLoginClick={() => setShowAuthModal(true)} 
          />}
        {activePage === 'hiragana' && <PlaceholderPage title="히라가나 공부" />}
      </main>
    </div>
  );
}
