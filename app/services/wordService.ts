// app/services/wordService.ts

/**
 * AI를 통해 다양한 종류의 학습 콘텐츠를 생성하고 가져옵니다.
 * @param deckType - 'english-words', 'sentences' 등 학습 콘텐츠의 종류
 * @param topic - 생성할 콘텐츠의 주제
 * @param count - 생성할 콘텐츠의 개수
 * @returns 생성된 학습 데이터 배열
 */
export async function fetchGeneratedContent(deckType: string, topic: string, count: number) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckType, topic, count }),
    });

    if (!response.ok) {
      let errorMessage = 'AI 데이터 생성에 실패했습니다.';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        // --- ✨ 오류 세부 정보를 alert에 포함시키도록 수정 ---
        if (errorData.details) {
          // OpenAI API 키 관련 오류 메시지를 사용자에게 더 명확하게 안내
          if (errorData.details.includes('You must provide an API key')) {
             errorMessage += `\n\n[세부 정보]\n서버에 OpenAI API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.`;
          } else if (errorData.details.includes('Incorrect API key')) {
             errorMessage += `\n\n[세부 정보]\nOpenAI API 키가 올바르지 않습니다. .env.local 파일을 확인해주세요.`;
          } else if (errorData.details.includes('billing details')) {
             errorMessage += `\n\n[세부 정보]\nOpenAI 계정에 결제 정보가 등록되지 않았거나, 사용 한도를 초과했을 수 있습니다. OpenAI 웹사이트에서 확인해주세요.`;
          } else {
             errorMessage += `\n\n[세부 정보]\n${errorData.details}`;
          }
        }
      } catch (e) {
        console.error("서버로부터 JSON이 아닌 에러 응답을 받았습니다.");
        errorMessage += `\n\n[오류]\n서버와 통신할 수 없습니다. 서버 로그를 확인해주세요.`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    return data.map((item: any, index: number) => ({ ...item, id: item.id || Date.now() + index }));

  } catch (error) {
    console.error("Error fetching generated content:", error);
    throw error; // 여기서 발생한 에러를 각 페이지의 catch 블록으로 다시 던집니다.
  }
}

