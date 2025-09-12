
import React, { useState} from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "./components/ui/button";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface LoginPageProps {
  onSwitchToRegister: () => void;
  onSuccess: () => void; 
}

export default function LoginPage({ onSwitchToRegister, onSuccess }: LoginPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
    const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // 오류 초기화
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (err: any) {
      // --- 🔽 Firebase 오류 코드에 따라 개별 오류 설정 ---
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-email':
          setErrors({ email: '유효하지 않거나 가입되지 않은 이메일입니다.' });
          break;
        case 'auth/wrong-password':
          setErrors({ password: '비밀번호가 잘못되었습니다.' });
          break;
        default:
          setErrors({ general: '로그인에 실패했습니다. 잠시 후 다시 시도해주세요.' });
          console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center"> 가타카나 공부, 시작하기 </h1>
        <form onSubmit={handleLogin} className="space-y-6">
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
            {/* --- 🔽 이메일 오류 메시지 표시 --- */}
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
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
            {/* --- 🔽 비밀번호 오류 메시지 표시 --- */}
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          {/* --- 🔽 일반 오류 메시지 표시 --- */}
          {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}
          <Button type="submit" disabled={loading} className="w-full border border-white/20 bg-transparent hover:bg-blue-500/20 hover:text-blue-400">
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
        <p className="text-sm text-center text-white/70">
          계정이 없으신가요?{' '}
          <button onClick={onSwitchToRegister} className="font-medium text-blue-400 hover:underline">
            회원가입
          </button>
        </p>
      </div>
  );


}
