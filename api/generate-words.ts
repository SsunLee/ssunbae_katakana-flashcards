
import type { NextApiRequest, NextApiResponse } from 'next';

import OpenAI from 'openai';

type Word = {
  id: number;
  katakana: string;
  furigana: string;
  answer: string;
  emoji: string;
};

{/* OpenAI client 생성 */ }
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { topic, count = 10 } = req.body;
  console.log(`요청 주제: ${topic}, 요청 개수: ${count}`);



  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  // 프롬프트 작성
  const prompt = `
    You are a helpful assistant for Japanese learners. 
    Generate exactly ${count} Katakana words related to the topic "${topic}".
    Provide the response as a single, valid JSON object with a single key named "words". 
    The "words" key should contain an array of objects.
    Each object must have exactly four keys: "katakana", "furigana", "answer", and "emoji".
    Do not include any text, explanation, or markdown formatting outside of the JSON object.
  `;

  console.log('prompt => (prompt)', prompt);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format : { type: 'json_object'},  
  });
    const responseJsonText = completion.choices[0].message.content;
    const parsedData = JSON.parse(responseJsonText || '{}');

    console.log('가공 전 data => (responseJosnText', responseJsonText);



    // 🔽 응답에서 'words' 키를 직접 찾아 배열을 추출하도록 수정
    const wordsArray = parsedData.words;

    console.log('gpt 응답 => (parsedData)',parsedData);

    if (!Array.isArray(wordsArray)) {
        // 응답을 로그로 남겨서 실제 어떤 데이터가 왔는지 확인
        console.error("Generated data does not contain a 'words' array:", parsedData);
        throw new Error("Generated data does not contain a 'words' array.");
    }

    res.status(200).json({ ok: true, words: wordsArray });

  } catch (error) {
    console.error('Error generating words:', error);
    res.status(500).json({ ok: false, error: 'Failed to generate words from AI.' });
  }
}
