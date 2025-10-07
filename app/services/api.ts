// ssunbae_katakana-flashcards/app/services/api.ts
import axios, { AxiosError } from 'axios';
import type { Verb } from "@/app/types/verbs";

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://ssunbae-api.vercel.app'
  : 'http://localhost:3002';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // ✅ 수정된 부분: Vercel의 콜드 스타트를 대비해 타임아웃을 15초로 늘립니다.
  timeout: 15000, 
});

export async function fetchVerbs(): Promise<Verb[]> {
  try {
    const response = await apiClient.get<{ verbs: Verb[] }>('/api/verbs');
    
    // API 응답 데이터 구조가 { verbs: [...] } 가 맞는지 다시 한번 확인합니다.
    // 만약 response.data가 바로 배열이라면 `return response.data;`로 변경해야 합니다.
    if (response.data && Array.isArray(response.data.verbs)) {
      return response.data.verbs;
    } else {
      // 예상치 못한 응답 구조일 경우 에러를 발생시킵니다.
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    const e = error as AxiosError;
    console.error(`Failed to fetch verbs: ${e.message}`);
    // 에러를 던져서 useRemoteStudyDeck 훅이 catch 블록에서 처리하도록 합니다.
    throw e;
  }
}

