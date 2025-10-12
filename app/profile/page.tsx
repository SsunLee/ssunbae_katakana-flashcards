// /app/profile/page.tsx

"use client";

// ... (imports)
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { User, Loader2, UserCircle2, ArrowLeft } from 'lucide-react';
import { auth } from '@/app/lib/firebase';
import { getIdToken } from 'firebase/auth';

export default function ProfilePage() {
  const { user, refreshUser, loading } = useAuth();
  const router = useRouter();
  
  const [nickname, setNickname] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/'); 
    }
    if (user) {
      setNickname(user.nickname || '');
    }
  }, [user, loading, router]);

  const handleSave = async () => {
    // --- 👇 [수정] 디버깅 로그 추가 ---
    console.log("--- [handleSave] 닉네임 저장 시작 ---");
    if (!user || !auth.currentUser) {
      console.error("[handleSave] Error: 유저 또는 auth.currentUser가 없습니다.");
      return;
    }
    setIsSaving(true);
    
    try {
      console.log("[handleSave] 1. ID 토큰 요청 시작");
      const idToken = await getIdToken(auth.currentUser, true);
      console.log("[handleSave] 2. ID 토큰 발급 성공");

      const requestBody = { nickname };
      console.log("[handleSave] 3. API 요청 시작. Body:", JSON.stringify(requestBody));

      const res = await fetch(`/api/profile`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(requestBody),
      });

      console.log(`[handleSave] 4. API 응답 받음. Status: ${res.status}`);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: '서버 응답 파싱 실패' }));
        console.error("[handleSave] API Error Response:", errorData);
        throw new Error(errorData.error || `프로필 업데이트 실패: ${res.statusText}`);
      }
      
      console.log("[handleSave] 5. API 호출 성공. refreshUser 호출 시작");
      await refreshUser({ nickname: nickname });
      console.log("[handleSave] 6. refreshUser 호출 완료");
      
      alert('닉네임이 성공적으로 업데이트되었습니다!');

    } catch (error) {
      // 에러 객체 전체를 로그로 남겨서 상세 정보를 확인합니다.
      console.error("!!! [handleSave] CATCH 블록에서 에러 발생 !!!", error);
      alert((error as Error).message || '오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
      console.log("--- [handleSave] 닉네임 저장 종료 ---");
    }
    // --- 👆 [수정] ---
  };

  // ... (return JSX)
  if (loading || !user) { return <div>Loading...</div> }
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <Button variant="outline" size="icon" aria-label="Go Back" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">프로필 설정</CardTitle>
            <CardDescription>닉네임을 변경할 수 있습니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <UserCircle2 className="w-24 h-24 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <label htmlFor="nickname" className="text-sm font-medium">닉네임</label>
              <Input 
                id="nickname" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)}
                placeholder="새 닉네임을 입력하세요"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              변경사항 저장
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

