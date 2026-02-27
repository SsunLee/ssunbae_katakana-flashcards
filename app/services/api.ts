// ssunbae_katakana-flashcards/app/services/api.ts
import axios, { AxiosError } from 'axios';
import type { Verb } from "@/app/types/verbs";
import type { Kanji } from '@/app/types/kanji';
import type { Word } from '@/app/types/words';

const LOCAL_FALLBACK_API_BASE_URL = 'http://localhost:3003';

function normalizeEnv(value: string | undefined) {
  if (!value) return '';
  const trimmed = value.trim();
  const hasDoubleQuotes = trimmed.startsWith('"') && trimmed.endsWith('"');
  const hasSingleQuotes = trimmed.startsWith("'") && trimmed.endsWith("'");
  if (hasDoubleQuotes || hasSingleQuotes) return trimmed.slice(1, -1);
  return trimmed;
}

function normalizeApiBaseUrl(value: string) {
  return value.replace(/\/+$/, '').replace(/\/api$/i, '');
}

function isLocalhostBaseUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

const configuredApiBaseUrl = normalizeApiBaseUrl(normalizeEnv(process.env.NEXT_PUBLIC_API_BASE_URL));
const primaryApiBaseUrl = configuredApiBaseUrl;
export const isRemoteStudyApiEnabled = Boolean(primaryApiBaseUrl);
const shouldUseLocalFallback =
  Boolean(primaryApiBaseUrl) &&
  isLocalhostBaseUrl(primaryApiBaseUrl) &&
  primaryApiBaseUrl !== LOCAL_FALLBACK_API_BASE_URL;

const primaryApiClient = isRemoteStudyApiEnabled
  ? axios.create({
      baseURL: primaryApiBaseUrl,
      // Vercel cold start 여유를 위해 타임아웃 확장
      timeout: 15000,
    })
  : null;

const localFallbackApiClient = shouldUseLocalFallback
  ? axios.create({
      baseURL: LOCAL_FALLBACK_API_BASE_URL,
      timeout: 15000,
    })
  : null;

async function getWithFallback<T>(path: string) {
  if (!primaryApiClient) {
    throw new Error("Remote study API is disabled. Set NEXT_PUBLIC_API_BASE_URL to enable it.");
  }

  try {
    return await primaryApiClient.get<T>(path);
  } catch (primaryError) {
    if (!localFallbackApiClient) throw primaryError;

    const status = (primaryError as AxiosError).response?.status;
    const shouldRetryWithLocalFallback = status === 404 || status === 502 || status === 503;
    if (!shouldRetryWithLocalFallback) throw primaryError;

    console.warn(
      `[study-api] Primary API request failed (status=${status}). Retrying with ${LOCAL_FALLBACK_API_BASE_URL}${path}`
    );
    return localFallbackApiClient.get<T>(path);
  }
}

export async function fetchVerbs(): Promise<Verb[]> {
  try {
    const response = await getWithFallback<{ verbs: Verb[] }>('/api/verbs');
    
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

// ✨ 한자 데이터를 불러오는 함수를 추가합니다.
export async function fetchKanji(): Promise<Kanji[]> {
  try {
    // '/api/kanji' 엔드포인트는 데이터 배열을 바로 반환합니다.
    const response = await getWithFallback<Kanji[]>('/api/kanji');
    return response.data;
  } catch (error) {
    const e = error as AxiosError;
    console.error(`Failed to fetch kanji: ${e.message}`);
    // 에러를 던져서 useRemoteStudyDeck 훅이 catch 블록에서 처리하도록 합니다.
    throw e;
  }
}

export async function fetchWords(): Promise<Word[]> {
  try {
    const response = await getWithFallback<{ words: Word[] }>('/api/words');

    if (response.data && Array.isArray(response.data.words)) {
      return response.data.words;
    }
    throw new Error("Invalid API response structure");
  } catch (error) {
    const e = error as AxiosError;
    console.error(`Failed to fetch words: ${e.message}`);
    throw e;
  }
}
