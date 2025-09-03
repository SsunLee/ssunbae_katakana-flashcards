
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
  
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  // 프롬프트 작성
  const prompt = `
    You are a helpful assistant for Japanese learners. 
    Generate 10 Katakana words related to the topic "${topic}".
    Provide the response as a single, valid JSON array of objects.
    Each object must have exactly four keys:
    1. "katakana": The Katakana word.
    2. "furigana": The Hiragana reading of the word.
    3. "answer": The English translation.
    4. "emoji": A single, relevant emoji character.

    Do not include any text, explanation, or markdown formatting outside of the JSON array.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format : { type: 'json_object'},  
  });
    const responseJasonText = completion.choices[0].message.content;
    const parsedData = JSON.parse(responseJasonText || '{}');

    // 응답 데이터 검증
    const wordsArray = Array.isArray(parsedData) 
    ? parsedData : Object.values(parsedData).find(Array.isArray);

    if (!wordsArray) {
      throw new Error('Invalid response format: No array found');
    }

    // 성공 응답 전송
    res.status(200).json({ ok: true, words: wordsArray } );
  } catch (error) {
    console.error('Error generating words:', error);
    res.status(500).json({ error: 'Failed to generate words' });
  }
  

}
