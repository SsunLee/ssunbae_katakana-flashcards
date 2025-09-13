// src/components/SideMenu.tsx

"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Next.js의 라우팅 훅
import { useAuth } from '../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { LogOut, UserCircle2, BookOpen } from 'lucide-react'; // 아이콘 추가


// shadcn/ui 컴포넌트 import
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Button } from './ui/button';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthClick: () => void; // 로그인/회원가입 모달을 열기 위한 함수
}

// 메뉴 항목 구성
const menuConfig = [
  {
    language: '일본어 공부',
    value: 'japanese',
    items: [
      { href: '/study/japanese/katakana-words', label: '가타카나 단어 공부', icon: '📚' },
      { href: '/study/japanese/katakana-chars', label: '가타카나 글자 공부', icon: '✏️' },
      { href: '/study/japanese/sentences', label: '일본어 문장 공부', icon: '🌸', disabled: true },
      { href: '/study/japanese/kanji', label: '한자 공부', icon: '🎴', disabled: true },
    ],
  },
  {
    language: '영어 공부',
    value: 'english',
    disabled: true,
    items: [
      { href: '/study/english/words', label: '단어 공부', icon: '📖', disabled: true },
    ],
  },
  {
    language: '스페인어 공부',
    value: 'spanish',
    disabled: true,
    items: [
      { href: '/study/spanish/words', label: '단어 공부', icon: '💃', disabled: true },
    ],
  },
];

export default function SideMenu({ isOpen, onClose, onAuthClick  }: SideMenuProps) {
  const { user } = useAuth();
  const router = useRouter(); // 페이지 이동을 위한 router 훅
  const pathname = usePathname(); // 현재 URL 경로를 알기 위한 pathname 훅

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
    };

    const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
    };

   // 아코디언 기본값을 현재 경로가 속한 그룹으로 설정
  const defaultAccordionValue = menuConfig.find(lang => 
    lang.items.some(item => pathname.startsWith(item.href.substring(0, item.href.lastIndexOf('/'))))
  )?.value;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[300px] bg-slate-950 border-r border-slate-800 text-slate-200 p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-slate-800">
          <SheetTitle className="text-white text-1g flex items-center gap-3">
            <BookOpen className="text-blue-400" />
            <span>학습 메뉴</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-grow p-3 overflow-y-auto">
          <Accordion type="single" collapsible defaultValue={defaultAccordionValue} className="w-full">
            {menuConfig.map((lang) => (
              <AccordionItem value={lang.value} key={lang.value} disabled={lang.disabled} className="border-b-0">
                <AccordionTrigger className="text-sm font-semibold text-slate-300 hover:no-underline hover:text-white disabled:opacity-50 px-2 py-3">
                  {lang.language}
                </AccordionTrigger>
                <AccordionContent className="pl-3 space-y-1">
                  {/* 메뉴 아이템 */}
                  {lang.items.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      disabled={item.disabled}
                      onClick={() => handleNavigate(item.href)}
                      className={`w-full justify-start text-sm h-auto transition-all duration-200 p-3 ${
                        pathname === item.href
                          ? 'bg-blue-500/10 text-blue-300 font-semibold border-l-4 border-blue-400 rounded-l-none rounded-r-md hover:bg-blue-500/10'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white rounded-md'
                      }`}
                    >
                      {/* 아이콘 영역 */}
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="flex-shrink-0 p-6 border-t border-slate-800">
          {user ? (
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-3">
                <UserCircle2 className="w-8 h-8 text-slate-500" />
                <div>
                  <p className="font-semibold text-white text-sm">{user.nickname}님</p>
                  <p className="text-xs text-slate-400">환영합니다!</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" className="w-full text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-red-400">
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              onClick={() => { onAuthClick(); onClose(); }}
              className="w-full text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              로그인 / 회원가입
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
