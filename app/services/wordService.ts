// app/services/wordService.ts
import { Capacitor } from '@capacitor/core';

const isNative =
  typeof window !== 'undefined' && Capacitor?.getPlatform?.() !== 'web';

// 예: https://ssunbae-edu.com  또는 https://ssunbae-api.vercel.app
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || '').replace(/\/$/, '');

function apiUrl(path: string) {
  if (!isNative) return path; // 웹은 same-origin 사용
  if (!API_BASE) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL is not set. Set it in .env.production (build before copy/sync).'
    );
  }
  return `${API_BASE}${path}`;
}

export async function fetchGeneratedContent(
  deckType: string,
  topic: string,
  count: number
) {
  const url = apiUrl('/api/generate');

  const res = await fetch(url, {
    method: 'POST',
    // same-origin이면 CORS 불필요하지만, 네이티브 대비해서 두 옵션 유지해도 무방
    mode: 'cors',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({ deckType, topic, count }),
    // cache: 'no-store', // POST는 기본 비캐시지만, 의심되면 켜세요
  });

  // ✅ 본문은 "항상" 1회만 읽기
  const raw = await res.text();
  const ctype = res.headers.get('content-type') || '';

  // 에러 응답 처리
  if (!res.ok) {
    // 서버가 JSON을 줄 수도 있으니 파싱 시도
    let msg = `AI 데이터 생성 실패 (${res.status} ${res.statusText})`;
    try {
      if (raw) {
        const e = JSON.parse(raw);
        msg = `${e.error || msg}\n\n[세부 정보]\n${e.details || '서버 오류'}`;
      }
    } catch {
      // JSON이 아니면 본문 일부를 보여줌
      msg += `\n\n[서버 응답]\n${raw.slice(0, 300)}${raw.length > 300 ? '…' : ''}`;
    }
    throw new Error(msg);
  }

  // 성공 응답: JSON 보장/검증 및 파싱
  if (!ctype.includes('application/json')) {
    throw new Error(
      `API 응답이 JSON이 아닙니다 (Content-Type: ${ctype}).\nURL: ${url}\n` +
      `응답 미리보기:\n${raw.slice(0, 300)}${raw.length > 300 ? '…' : ''}`
    );
  }

  let data: any[];
  try {
    data = raw ? JSON.parse(raw) : [];
  } catch {
    throw new Error('API 응답 JSON 파싱에 실패했습니다.');
  }

  // id 보정
  return data.map((item: any, i: number) => ({
    ...item,
    id: item.id || Date.now() + i,
  }));
}
