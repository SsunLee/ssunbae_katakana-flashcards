"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getIdToken } from "firebase/auth";
import { ArrowLeft, Check, Loader2 } from "lucide-react";

import { useAuth } from "@/app/AuthContext";
import { auth } from "@/app/lib/firebase";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import {
  AVATAR_COLORS,
  AVATAR_ICONS,
  DEFAULT_AVATAR_COLOR,
  DEFAULT_AVATAR_ICON,
  type AvatarColor,
  type AvatarIconName,
} from "@/app/constants/avatarOptions";
import ProfileAvatarIcon from "@/app/components/ProfileAvatarIcon";

export default function ProfilePage() {
  const { user, refreshUser, loading } = useAuth();
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [avatarColor, setAvatarColor] = useState<AvatarColor>(DEFAULT_AVATAR_COLOR);
  const [avatarIcon, setAvatarIcon] = useState<AvatarIconName>(DEFAULT_AVATAR_ICON);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
      return;
    }

    if (user) {
      setNickname(user.nickname || "");
      setAvatarColor(user.avatarColor || DEFAULT_AVATAR_COLOR);
      setAvatarIcon(user.avatarIcon || DEFAULT_AVATAR_ICON);
    }
  }, [user, loading, router]);

  const handleSave = async () => {
    if (!user || !auth.currentUser) return;

    const trimmedNickname = nickname.trim();
    if (trimmedNickname.length < 2) {
      alert("닉네임은 2자 이상이어야 합니다.");
      return;
    }

    setIsSaving(true);
    try {
      const idToken = await getIdToken(auth.currentUser, true);
      const requestBody = {
        nickname: trimmedNickname,
        avatarColor,
        avatarIcon,
      };

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "프로필 업데이트 실패" }));
        throw new Error(errorData.error || "프로필 업데이트 실패");
      }

      await refreshUser({
        nickname: trimmedNickname,
        avatarColor,
        avatarIcon,
      });
      alert("프로필이 업데이트되었습니다.");
    } catch (error) {
      console.error("Profile update failed:", error);
      alert((error as Error).message || "오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="py-10 flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
            <CardDescription>닉네임과 프로필 아이콘을 변경할 수 있습니다.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center shadow-sm border border-border/40"
                style={{ backgroundColor: avatarColor }}
              >
                <ProfileAvatarIcon icon={avatarIcon} className="w-11 h-11 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="nickname" className="text-sm font-medium">
                닉네임
              </label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="새 닉네임을 입력하세요"
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">아이콘 색상</p>
              <div className="flex flex-wrap gap-3">
                {AVATAR_COLORS.map((color) => {
                  const selected = avatarColor === color;
                  return (
                    <button
                      key={color}
                      type="button"
                      className={cn(
                        "w-8 h-8 rounded-full border transition-all",
                        selected ? "ring-2 ring-offset-2 ring-ring scale-110" : "border-white/20"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => setAvatarColor(color)}
                      aria-label={`avatar-color-${color}`}
                    >
                      {selected ? <Check className="w-4 h-4 text-white mx-auto" /> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">아이콘</p>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_ICONS.map((icon) => {
                  const selected = avatarIcon === icon;
                  return (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setAvatarIcon(icon)}
                      className={cn(
                        "h-10 rounded-md border flex items-center justify-center transition-colors",
                        selected
                          ? "bg-accent border-ring text-accent-foreground"
                          : "bg-card border-border text-muted-foreground hover:text-foreground"
                      )}
                      aria-label={`avatar-icon-${icon}`}
                    >
                      <ProfileAvatarIcon icon={icon} className="w-5 h-5" />
                    </button>
                  );
                })}
              </div>
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
