// app/RegisterPage.tsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from './lib/firebase';
import { Button } from "./components/ui/button";
import { DEFAULT_AVATAR_COLOR, DEFAULT_AVATAR_ICON } from "./constants/avatarOptions";

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export default function RegisterPage({ onSwitchToLogin, onSuccess }: RegisterPageProps) {
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
        avatarColor: DEFAULT_AVATAR_COLOR,
        avatarIcon: DEFAULT_AVATAR_ICON,
      });
      onSuccess();
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
    <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-foreground">🦋 회원가입 🦋</h1>
        <form onSubmit={handleRegister} className="space-y-4">
            <div>
            <label className="text-sm font-medium text-muted-foreground">닉네임</label>
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} required placeholder="사용하실 닉네임을 입력하세요" className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
            <label className="text-sm font-medium text-muted-foreground">이메일</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
            </div>
            <div>
            <label className="text-sm font-medium text-muted-foreground">비밀번호</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="비밀번호 (6자리 이상)" className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password}</p>}
            </div>
            <div>
            <label className="text-sm font-medium text-muted-foreground">비밀번호 확인</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="비밀번호를 다시 입력하세요" className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.confirmPassword && <p className="mt-1 text-sm text-destructive">{errors.confirmPassword}</p>}
            </div>

            {errors.general && <p className="text-destructive text-sm text-center">{errors.general}</p>}
            <Button type="submit" disabled={loading} className="w-full" variant="default">
            {loading ? '가입 중...' : '회원가입'}
            </Button>
        </form>
            <p className="text-sm text-center text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <button onClick={onSwitchToLogin} className="font-medium text-primary hover:underline">
            로그인
            </button>
        </p>
    </div>
  );
}
