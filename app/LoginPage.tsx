// app/LoginPage.tsx

"use client";

import React, { useState } from "react";
// 단순화된 firebase.ts 파일에서 auth 객체를 가져옵니다.
import { auth } from "@/app/lib/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "./components/ui/button";

interface LoginPageProps {
  onSwitchToRegister: () => void;
  onSuccess: () => void; 
}

export default function LoginPage({ onSwitchToRegister, onSuccess }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 에러 메시지를 간단한 문자열로 관리합니다.
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
      setLoading(true);
      setError(''); // 로그인 시도 시 이전 에러 메시지 초기화
      
      console.log("--- 로그인 절차 시작 ---");
      console.log("입력된 이메일:", email);

      try {
        if (!email || !password) {
          setError("이메일과 비밀번호를 모두 입력해주세요.");
          setLoading(false);
          return;
        }

        console.log("Firebase signInWithEmailAndPassword 함수 호출 직전...");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        console.log("✅ 로그인 성공! 사용자 UID:", userCredential.user.uid);
        onSuccess(); // 성공 콜백 호출

      } catch (err: any) {
        console.error("🚨 Firebase 로그인 실패:", err); // 에러 객체 전체를 로그로 남겨 상세 원인 파악
        
        // 사용자에게 보여줄 에러 메시지를 설정합니다.
        switch (err.code) {
          case 'auth/invalid-credential':
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            break;
          case 'auth/invalid-email':
            setError('유효하지 않은 이메일 형식입니다.');
            break;
          case 'auth/too-many-requests':
            setError('잠시 후 다시 시도해주세요.');
            break;
          default:
            setError('로그인 중 문제가 발생했습니다.');
            break;
        }
      } finally {
        // 성공하든 실패하든 로딩 상태는 항상 해제합니다.
        setLoading(false);
        console.log("--- 로그인 절차 종료 ---");
      }
    };

    return (
      <div className="p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center"> 가타카나 공부, 시작하기 </h1>
          {/* form 대신 div를 사용하고, 버튼의 onClick으로 함수를 직접 호출합니다. */}
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="mt-1 w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="mt-1 w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* 에러 메시지가 있을 경우에만 표시합니다. */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <Button type="button" onClick={handleLogin} disabled={loading} className="w-full border border-white/20 bg-transparent hover:bg-blue-500/20 hover:text-blue-400">
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </div>
          <p className="text-sm text-center text-white/70">
            계정이 없으신가요?{' '}
            <button onClick={onSwitchToRegister} className="font-medium text-blue-400 hover:underline">
              회원가입
            </button>
          </p>
        </div>
    );
}
