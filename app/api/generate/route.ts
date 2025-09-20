// app/api/generate/route.ts

import { NextResponse } from 'next/server';
import OpenAI, { APIError } from 'openai';

// OpenAI 클라이언트를 초기화합니다.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function isOpenAIError(error: any): error is APIError {
    return error instanceof APIError;
}

export async function POST(request: Request) {
  console.log("\n--- [AI Generation] API 요청 시작 ---");
  
  try {
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_API_KEY.startsWith('sk-')) {
      console.error("❌ [AI Generation] 오류: OPENAI_API_KEY가 .env.local 파일에 설정되지 않았거나 유효하지 않습니다.");
      throw new Error("서버에 OpenAI API 키가 설정되지 않았습니다.");
    }

    const { deckType, topic, count } = await request.json();
    console.log(`[AI Generation] 요청 파라미터: deckType=${deckType}, topic=${topic}, count=${count}`);

    if (!deckType || !topic || !count) {
      return NextResponse.json({ error: 'deckType, topic, count는 필수 항목입니다.' }, { status: 400 });
    }

    let prompt = `
      You are a helpful assistant for language learners.
      Generate exactly ${count} items for a flashcard deck.
      The topic is "${topic}".
      Based on the deck type "${deckType}", each item in the array must be a JSON object with the following structure:
    `;

    switch (deckType) {
      case 'english-words':
        prompt += `
          { 
            "word": "An English word...", "pronunciation": "...", "meaning": "...", "exampleSentence": "...", "exampleTranslation": "..." 
          }
          - "word" and "exampleSentence" fields MUST be in English.
          - "meaning" and "exampleTranslation" fields MUST be in Korean.
        `;
        break;
      case 'spanish-words':
        prompt += `
          { 
            "word": "A Spanish word...", "pronunciation": "...", "meaning": "...", "exampleSentence": "...", "exampleTranslation": "..." 
          }
          - "word" and "exampleSentence" fields MUST be in Spanish.
          - "meaning" and "exampleTranslation" fields MUST be in Korean.
          - "pronunciation" MUST be a simple English-based romanization.
        `;
        break;
      case 'katakana-words':
        prompt += `
          { 
            "katakana": "...", "furigana": "...", "answer": "...", "emoji": "..." 
          }
          - "katakana" and "furigana" fields MUST be in Japanese.
          - The "answer" field MUST be the Korean meaning.
        `;
        break;
      case 'sentences': // Japanese Sentences
        prompt += `
The JSON structure per item is:
{ "id": number, "sentence": string, "reading": (string | { "text": string, "furigana": string })[], "furigana": string, "romaji": string, "translation": string, "kanjiDetails": { "kanji": string, "meaning": string, "usages": string[] }[] }.

Return ONLY a JSON array with exactly ${count} objects (no markdown, no prose).

Field rules:
- "id": Start at 1 and increment by 1 for each item.
- "sentence": must be Japanese!!! Natural Japanese matching the topic; default to polite style (〜ます／です). Include punctuation (。？！).
- "reading": Token array. Any token containing kanji MUST be an object { "text": "漢字(語)", "furigana": "かな" }. Kana-only segments (particles, okurigana, katakana words, punctuation) MUST be plain strings. For mixed words with okurigana (e.g., 読みます), split as { "text": "読", "furigana": "よ" }, "みます。"
  * Validation: Concatenating all tokens in order MUST reproduce "sentence" EXACTLY (including punctuation/spaces).
- "furigana": Full-sentence reading in kana ONLY (no kanji). Keep loanwords in katakana. Avoid unnecessary spaces.
- "romaji": Hepburn with macrons (ō, ū, etc.), lowercase, preserve punctuation (e.g., きょう→kyō, べんきょう→benkyō).
- "translation": Natural Korean translation.
- "kanjiDetails": ONLY unique kanji words actually appearing in "sentence". Each entry MUST be:
  { "kanji": "…", "meaning": "Korean gloss (hiragana reading)", "usages": ["…", "…"] }
  with 1–2 short Korean definitions/usages. If the sentence has no kanji, use an empty array [].

Output constraints:
- Produce valid JSON (UTF-8) with straight double quotes; no comments; no trailing commas.
- Do NOT include any fields other than those specified.
- Do NOT escape kana/kanji to \\uXXXX unless necessary for JSON validity.

        `;
        break;
      case 'spanish-sentences':
        prompt += `
          { 
            "sentence": "A sentence in Spanish...", 
            "translation": "The Korean translation...", 
            "pronunciation": "A simple romanization..." 
          }
          - The "sentence" field MUST be in Spanish.
          - The "translation" field MUST be in Korean.
        `;
        break;
      default:
        return NextResponse.json({ error: '지원되지 않는 deckType입니다.' }, { status: 400 });
    }

    prompt += `
      You must respond with only a valid JSON array of these objects.
      Do not include any text, explanation, or markdown formatting outside of the JSON array itself.
      The entire response must be a single JSON array, starting with '[' and ending with ']'.
    `;
    
    console.log("[AI Generation] OpenAI에 프롬프트 전송 시작...");
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    console.log("[AI Generation] OpenAI로부터 응답 수신 완료.");

    const responseJsonText = completion.choices[0].message.content;

    if (!responseJsonText) {
      throw new Error("OpenAI returned an empty response.");
    }
    
    console.log("[AI Generation] AI 원본 응답:", responseJsonText);

    let data;
    try {
      data = JSON.parse(responseJsonText);
    } catch (parseError) {
      console.warn("[AI Generation] 직접 JSON 파싱 실패, 마크다운 블록에서 추출 시도...");
      const jsonMatch = responseJsonText.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        try {
            data = JSON.parse(jsonMatch[1]);
        } catch (nestedParseError) {
            console.error("❌ [AI Generation] 추출된 JSON 파싱 실패.", nestedParseError);
            throw new Error("AI가 반환한 JSON을 복구할 수 없습니다.");
        }
      } else {
        console.error("❌ [AI Generation] AI 응답에서 JSON 배열을 찾을 수 없습니다.");
        throw new Error("AI가 JSON 형식이 아닌 텍스트로 응답했습니다.");
      }
    }
    
    console.log("✅ [AI Generation] 성공적으로 데이터를 생성하고 클라이언트에 반환합니다.");
    return NextResponse.json(data);

  } catch (error) {
    console.error('❌ [AI Generation] API 실행 중 심각한 오류 발생:');
    
    let errorMessage = 'AI로부터 데이터를 생성하는 데 실패했습니다.';
    let errorDetails = '알 수 없는 서버 오류가 발생했습니다.';

    if (isOpenAIError(error)) {
      console.error("--- OpenAI API 오류 정보 ---");
      console.error(`- Status: ${error.status}`);
      console.error(`- Type: ${error.type}`);
      console.error(`- Code: ${error.code}`);
      console.error(`- Message: ${error.message}`);
      errorMessage = 'OpenAI API 호출 중 오류가 발생했습니다.';
      errorDetails = error.message;
    } else if (error instanceof Error) {
      console.error("--- 일반 오류 정보 ---");
      console.error(error.message);
      errorDetails = error.message;
    } else {
      console.error("--- 알 수 없는 오류 ---");
      console.error(error);
    }

    return NextResponse.json({ error: errorMessage, details: errorDetails }, { status: 500 });
  }
}

