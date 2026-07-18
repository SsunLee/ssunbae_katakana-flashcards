import { getIdToken, type User } from "firebase/auth";

const PRODUCTION_API_BASE = "https://ssunedu.com";

function getApiBase(): string {
  const configured = process.env.NEXT_PUBLIC_ACCOUNT_API_BASE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  if (typeof window !== "undefined" && window.location.protocol.startsWith("http")) {
    return window.location.origin;
  }
  return PRODUCTION_API_BASE;
}

export async function requestAccountDeletion(user: User): Promise<void> {
  const idToken = await getIdToken(user, true);
  const response = await fetch(`${getApiBase()}/api/account/delete`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (response.status === 401) throw new Error("NEED_REAUTH");
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error || "계정 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.");
  }
}

export function clearAccountCache(uid: string): void {
  if (typeof window === "undefined") return;
  const accountPrefixes = ["ssunbae:user-profile:v1", "ssunbae:study-deck:v1"];
  for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
    const key = window.localStorage.key(index);
    if (key && accountPrefixes.some((prefix) => key.startsWith(prefix)) && key.includes(uid)) {
      window.localStorage.removeItem(key);
    }
  }
}
