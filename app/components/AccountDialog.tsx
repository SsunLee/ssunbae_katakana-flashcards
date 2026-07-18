// app/components/AccountDialog.tsx
"use client";

import React, { useState } from "react";
import {
  getAuth, EmailAuthProvider,
  reauthenticateWithCredential, signOut
} from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/app/components/ui/alert-dialog";
import { clearAccountCache, requestAccountDeletion } from "@/app/lib/accountDeletion";

export default function AccountDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const auth = getAuth();
  const router = useRouter();
  const [openDelete, setOpenDelete] = useState(false);
  const [needReauth, setNeedReauth] = useState(false);
  const [password, setPassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  async function callDeleteEndpoint() {
    const user = auth.currentUser;
    if (!user) throw new Error("No user");

    try {
      await requestAccountDeletion(user);
    } catch (error) {
      if (error instanceof Error && error.message === "NEED_REAUTH") {
        setNeedReauth(true);
      }
      throw error;
    }
  }

  async function handleDelete() {
    const uid = auth.currentUser?.uid;
    setDeleteError("");
    try {
      await callDeleteEndpoint();
      if (uid) clearAccountCache(uid);
      await signOut(auth);
      router.replace("/goodbye");
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error && error.message === "NEED_REAUTH") {
      setNeedReauth(true);
      } else {
        setDeleteError(error instanceof Error ? error.message : "계정 삭제에 실패했습니다.");
      }
    }
  }

  async function handleReauthAndDelete() {
    const user = auth.currentUser;
    if (!user?.email) return;
    const cred = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, cred);
    await handleDelete();
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>계정 관리</DialogTitle>
            <DialogDescription>로그아웃 또는 계정 삭제를 진행할 수 있습니다.</DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                signOut(auth);
                router.push("/");
                onOpenChange(false);
              }}
            >
              로그아웃
            </Button>

            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setOpenDelete(true)}
            >
              계정 영구 삭제
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 계정을 삭제할까요?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 모든 학습 데이터가 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {needReauth && (
            <div className="space-y-3 mt-2">
              <p className="text-sm text-muted-foreground">보안을 위해 비밀번호를 다시 입력하세요.</p>
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full rounded-md border p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          {deleteError && <p role="alert" className="text-sm text-destructive">{deleteError}</p>}

          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            {!needReauth ? (
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                영구 삭제
              </AlertDialogAction>
            ) : (
              <AlertDialogAction onClick={handleReauthAndDelete}>
                재인증 후 삭제
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
