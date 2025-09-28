// app/services/http.ts
export async function postJson<T>(url: string, payload: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
  });

  // 본문은 "항상" 1회만 읽기
  const raw = await res.text();

  if (!res.ok) {
    let msg = raw;
    try { msg = (JSON.parse(raw)?.error ?? JSON.parse(raw)?.message) || raw; } catch {}
    throw new Error(`${res.status} ${res.statusText}${msg ? ` — ${msg}` : ''}`);
  }

  return raw ? JSON.parse(raw) as T : ({} as T);
}
