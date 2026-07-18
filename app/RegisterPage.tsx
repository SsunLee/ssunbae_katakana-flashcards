// app/RegisterPage.tsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from './lib/firebase';
import { Button } from "./components/ui/button";
import { DEFAULT_AVATAR_COLOR, DEFAULT_AVATAR_ICON } from "./constants/avatarOptions";
import { isAtLeastAge, PRIVACY_VERSION, TERMS_VERSION } from "./lib/registrationPolicy";

interface RegisterPageProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export default function RegisterPage({ onSwitchToLogin, onSuccess }: RegisterPageProps) {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; birthDate?: string; policies?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!isAtLeastAge(birthDate)) {
      setErrors({ birthDate: '계정은 만 14세 이상부터 만들 수 있습니다. 생년월일은 저장하지 않습니다.' });
      return;
    }
    if (!acceptedPolicies) {
      setErrors({ policies: '이용약관 동의와 개인정보처리방침 확인이 필요합니다.' });
      return;
    }

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
        termsVersion: TERMS_VERSION,
        privacyVersion: PRIVACY_VERSION,
        termsAcceptedAt: serverTimestamp(),
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
        <h1 className="text-2xl font-bold text-center text-foreground">회원가입</h1>
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
            <label className="text-sm font-medium text-muted-foreground">생년월일</label>
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required className="mt-1 w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <p className="mt-1 text-xs text-muted-foreground">만 14세 확인에만 사용하며 서버에 저장하지 않습니다.</p>
            {errors.birthDate && <p className="mt-1 text-sm text-destructive">{errors.birthDate}</p>}
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

            <div>
              <label className="flex items-start gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={acceptedPolicies}
                  onChange={(e) => setAcceptedPolicies(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span>
                  만 14세 이상이며 <a href="/terms" target="_blank" className="text-primary underline">이용약관</a>에 동의하고{' '}
                  <a href="/privacy" target="_blank" className="text-primary underline">개인정보처리방침</a>을 확인했습니다.
                </span>
              </label>
              {errors.policies && <p className="mt-1 text-sm text-destructive">{errors.policies}</p>}
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
