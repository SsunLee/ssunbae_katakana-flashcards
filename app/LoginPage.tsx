// app/LoginPage.tsx

"use client";

import React, { useState } from "react";
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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
      setLoading(true);
      setError('');
      
      try {
        if (!email || !password) {
          setError("이메일과 비밀번호를 모두 입력해주세요.");
          setLoading(false);
          return;
        }

        await signInWithEmailAndPassword(auth, email, password);
        onSuccess();

      } catch (err: any) {
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
        setLoading(false);
      }
    };

    return (
      <div className="p-8 space-y-6">
          <h1 className="text-2xl font-bold text-center text-foreground"> 가타카나 공부, 시작하기 </h1>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            
            <Button type="button" onClick={handleLogin} disabled={loading} className="w-full" variant="outline">
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </div>
          <p className="text-sm text-center text-muted-foreground">
            계정이 없으신가요?{' '}
            <button onClick={onSwitchToRegister} className="font-medium text-primary hover:underline">
              회원가입
            </button>
          </p>
        </div>
    );
}
