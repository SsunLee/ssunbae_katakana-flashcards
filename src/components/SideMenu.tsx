import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from './ui/button';
import { useAuth } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';


interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onAuthClick: () => void; // 로그인/회원가입 모달을 열기 위한 함수
  activePage: string; //
}
export default function SideMenu({ isOpen, onClose, onNavigate, onAuthClick, activePage  }: SideMenuProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] bg-slate-900 border-slate-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">메뉴</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col space-y-4">
          <Button 
                onClick={() => { onNavigate('katakana-words'); onClose(); }} 
                variant="ghost" 
                className={`w-full justify-start text-base p-4 h-auto rounded-lg transition-colors ${
                activePage === 'katakana-words' 
                ? 'bg-blue-500/20 text-white' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
            📚 카타카나 단어 공부
          </Button>
          <Button 
            onClick={() => { onNavigate('katakana-chars'); onClose(); }} 
            variant="ghost" 
            className={`w-full justify-start text-base p-4 h-auto rounded-lg transition-colors ${
              activePage === 'katakana-chars' 
              ? 'bg-blue-500/20 text-white' 
              : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            ✏️ 카타카나 글자 공부
          </Button>

          <Button 
            onClick={() => { onNavigate('hiragana'); onClose(); }} 
            variant="ghost" 
            className={`w-full justify-start text-base p-4 h-auto rounded-lg transition-colors ${
              activePage === 'hiragana' 
              ? 'bg-blue-500/20 text-white' 
              : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            🌸 히라가나 공부 (준비 중)
          </Button>
        </div>

        <hr className="mb-6 border-slate-700" />
        <div className="absolute bottom-10 left-0 right-0 px-6">
          {user ? (
            <div className="text-center">
              <p className="text-sm text-white/70">{user.nickname}님 환영합니다.</p>
              <Button onClick={handleLogout} variant="ghost" className="w-full mt-4 text-red-400 hover:bg-red-500/20">로그아웃</Button>
            </div>
          ) : (
            <Button
                variant= "ghost" 
                onClick={() => { onAuthClick(); onClose(); }} 
                className="w-full text-white/70 mt-4 bg-blue-600 hover:bg-blue-500">로그인 / 회원가입</Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}