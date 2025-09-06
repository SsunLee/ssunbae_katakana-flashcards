import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from './firebase';
import { Button } from "./components/ui/button";

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

export default function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ nickname?: string; email?: string; password?: string; confirmPassword?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: '비밀번호가 일치하지 않습니다.' });
      return;
    }
    if (password.length < 6) {
      setErrors({ password: '비밀번호는 6자리 이상이어야 합니다.' });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        nickname: nickname,
        email: user.email,
      });
    } catch (err: any) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setErrors({ email: '이미 사용 중인 이메일입니다.' });
          break;
        case 'auth/invalid-email':
          setErrors({ email: '유효하지 않은 이메일 형식입니다.' });
          break;
        case 'auth/weak-password':
          setErrors({ password: '비밀번호는 6자리 이상이어야 합니다.' });
          break;
        default:
          setErrors({ general: '회원가입에 실패했습니다.' });
          console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm p-8 space-y-6 bg-slate-800/60 rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-2xl font-bold text-center">🦋 회원가입 🦋</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm font-medium">닉네임</label>
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} required placeholder="사용하실 닉네임을 입력하세요" className="mt-1 w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-sm font-medium">이메일</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" className="mt-1 w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">비밀번호</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="비밀번호 (6자리 이상)" className="mt-1 w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label className="text-sm font-medium">비밀번호 확인</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="비밀번호를 다시 입력하세요" className="mt-1 w-full bg-slate-800/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>

          {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
          <Button type="submit" disabled={loading} className="w-full border border-white/20 bg-transparent hover:bg-white/10">
            {loading ? '가입 중...' : '회원가입'}
          </Button>
        </form>
         <p className="text-sm text-center text-white/70">
          이미 계정이 있으신가요?{' '}
          <button onClick={onSwitchToLogin} className="font-medium text-blue-400 hover:underline">
            로그인
          </button>
        </p>
      </div>
      <footer className="mt-8 text-center text-xs text-white/40">
        <p>© 2024 SsunBae. All Rights Reserved.</p>
        <p className="mt-1"><a href="https://github.com/SsunLee/ssunbae_katakana-flashcards" target="_blank" rel="noopener noreferrer" className="hover:text-white/60">GitHub Repository</a></p>
      </footer>
    </div>
  );
}