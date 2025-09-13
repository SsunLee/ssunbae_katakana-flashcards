// src/services/wordService.ts

import { type Word } from '../data/words';

/**
 * 서버 API를 호출하여 주제와 개수에 맞는 새 단어 목록을 가져옵니다.
 * @param topic - 단어 주제 (예: '여행')
 * @param count - 가져올 단어 개수
 * @returns {Promise<Word[]>} 생성된 단어 목록을 담은 Promise
 * @throws API 호출 실패 시 에러를 던집니다.
 */
export const fetchGeneratedWords = async (topic: string, count: number): Promise<Word[]> => {
  try {
    const response = await fetch('/api/generate-words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, count }),
    });

    if (!response.ok) {
      throw new Error(`서버 응답 오류: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.ok || !Array.isArray(data.words)) {
      throw new Error('잘못된 데이터 형식');
    }
    
    // 🔽 **ID 생성 방식을 기존 코드와 동일하게 수정합니다.**
    return data.words.map((word: any, index: number) => ({
        ...word,
        id: index + 1, // API 응답에 id가 없다고 가정하고, 단순 정수 ID를 부여합니다.
    }));

  } catch (error) {
    console.error("단어 불러오기 실패:", error);
    throw error;
  }
};

