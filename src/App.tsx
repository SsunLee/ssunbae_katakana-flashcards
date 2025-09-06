import React, { useState } from 'react';
import { useAuth } from './AuthContext'; // useAuth 훅 import

// 페이지 컴포넌트들을 import 합니다.
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import FlashcardApp from './FlashcardApp';
import ProfilePage from './ProfilePage';
import ComingSoonPage from './ComingSoonPage';
import { Home, User as UserIcon, Package } from 'lucide-react';

type ActiveTab = 'home' | 'menu' | 'comingsoon';
const TabButton = ({ isActive, onClick, children }: { isActive: boolean, onClick: () => void, children: React.ReactNode }) => (
  <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${isActive ? 'text-white' : 'text-white/50 hover:bg-white/10'}`}>
    {children}
  </button>
);

export default function App() {
  const { user, loading } = useAuth(); // AuthContext에서 사용자 정보와 로딩 상태 가져오기
  const [authPage, setAuthPage] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  if (loading) {
    return <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center text-white">로딩 중...</div>;
  }

  if (!user) {
    if (authPage === 'login') {
      return <LoginPage onSwitchToRegister={() => setAuthPage('register')} />;
    }
    return <RegisterPage onSwitchToLogin={() => setAuthPage('login')} />;
  }

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col">
      <main className="flex-grow overflow-y-auto">
        {activeTab === 'home' && <FlashcardApp user={user} />}
        {activeTab === 'menu' && <ProfilePage />}
        {activeTab === 'comingsoon' && <ComingSoonPage />}
      </main>
      <nav className="w-full h-16 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm flex-shrink-0">
        <div className="h-full w-full max-w-md mx-auto flex justify-around items-stretch">
          <TabButton isActive={activeTab === 'home'} onClick={() => setActiveTab('home')}><Home size={20} /><span className="text-xs">홈</span></TabButton>
          <TabButton isActive={activeTab === 'menu'} onClick={() => setActiveTab('menu')}><UserIcon size={20} /><span className="text-xs">메뉴</span></TabButton>
          <TabButton isActive={activeTab === 'comingsoon'} onClick={() => setActiveTab('comingsoon')}><Package size={20} /><span className="text-xs">Coming Soon</span></TabButton>
        </div>
      </nav>
    </div>
  );
}