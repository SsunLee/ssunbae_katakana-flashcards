// app/services/wordService.ts
import { Capacitor } from '@capacitor/core';

const isNative =
  typeof window !== 'undefined' && Capacitor?.getPlatform?.() !== 'web';

// .env.production (또는 .env.local)에 설정해야 합니다.
// 예) https://ssunbae-api.vercel.app  또는 개발용 http://127.0.0.1:3000
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

function apiUrl(path: string) {
  if (!isNative) return path; // 웹은 same-origin
  if (!API_BASE) {
    // 모바일인데 BASE가 비어 있으면 절대 호출 못 합니다.
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL is not set. Set it in .env.production (build before copy/sync).'
    );
  }
  return `${API_BASE}${path}`;
}

/**
 * AI를 통해 다양한 종류의 학습 콘텐츠를 생성하고 가져옵니다.
 */
export async function fetchGeneratedContent(
  deckType: string,
  topic: string,
  count: number
) {
  const url = apiUrl('/api/generate');

  try {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ deckType, topic, count }),
    });

    // 1) HTTP 에러 처리
    if (!res.ok) {
      let msg = `AI 데이터 생성 실패 (${res.status})`;
      try {
        const e = await res.json();
        msg = `${e.error || msg}\n\n[세부 정보]\n${e.details || '서버 오류'}`;
      } catch {
        const txt = await res.text();
        msg += `\n\n[서버 응답]\n${txt.slice(0, 300)}${txt.length > 300 ? '…' : ''}`;
      }
      throw new Error(msg);
    }

    // 2) Content-Type 확인 (index.html이 오는 경우 방지)
    const ctype = res.headers.get('content-type') || '';
    if (!ctype.includes('application/json')) {
      const txt = await res.text();
      throw new Error(
        `API 응답이 JSON이 아닙니다 (Content-Type: ${ctype}).\n` +
          `URL: ${url}\n응답 미리보기:\n${txt.slice(0, 300)}${txt.length > 300 ? '…' : ''}`
      );
    }

    const data = await res.json();

    return data.map((item: any, i: number) => ({
      ...item,
      id: item.id || Date.now() + i,
    }));
  } catch (err) {
    console.error('Error fetching generated content:', err);
    throw err;
  }
}
