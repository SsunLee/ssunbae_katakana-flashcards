import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Menu, X } from 'lucide-react';

// 페이지 및 컴포넌트 import
import FlashcardApp from './FlashcardApp';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import SideMenu from './components/SideMenu';
import { Dialog, DialogContent, DialogOverlay } from './components/ui/dialog';
import { KATAKANA_CHARS } from './data/katakanaChars';
import { WORDS as KATAKANA_WORDS } from './data/words';

// 임시 페이지
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-full text-2xl text-white/70">{title} (준비 중)</div>
);

// --- [수정] ActivePage 타입을 정의합니다. ---
type ActivePage = 'katakana-words' | 'katakana-chars' | 'hiragana';

export default function App() {
  const { user, loading } = useAuth();
  
  // --- [수정] activePage가 localStorage에서 마지막 상태를 불러오도록 변경 ---
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    const savedPage = localStorage.getItem('lastActivePage') as ActivePage;
    return savedPage && ['katakana-words', 'katakana-chars', 'hiragana'].includes(savedPage) 
      ? savedPage 
      : 'katakana-words'; // 기본값
  });

  // --- [수정] activePage가 변경될 때마다 localStorage에 저장 ---
  useEffect(() => {
    localStorage.setItem('lastActivePage', activePage);
  }, [activePage]);

  // --- ❌ [삭제] 불필요한 activeTab 관련 코드 전체 삭제 ---
  // type ActiveTab = ...
  // const [activeTab, setActiveTab] = useState(...)
  // useEffect(() => { localStorage.setItem('lastActiveTab', activeTab) ... })

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');

  if (loading) {
    return <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center text-white">로딩 중...</div>;
  }

  // 로그인하지 않은 경우 (게스트 모드)
  if (!user) {
    // 게스트 모드에서는 항상 FlashcardApp을 보여줍니다.
    // 로그인/회원가입은 모달을 통해 이루어집니다.
  }

  // 로그인 여부와 관계없이 항상 기본 레이아웃을 렌더링합니다.
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
        onNavigate={(page) => setActivePage(page as ActivePage)}
        onAuthClick={() => setShowAuthModal(true)}
        activePage={activePage}
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