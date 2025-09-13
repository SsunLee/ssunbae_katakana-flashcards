// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// api/generate-words/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAI client 생성
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST 요청
export async function POST(request: Request) {
  try {
    const { topic, count = 10 } = await request.json();
    if (!topic) {
      return new NextResponse('Topic is required', { status: 400 });
    }
    // 프롬프트 생성  
    const prompt = `
      You are a helpful assistant for Japanese learners. 
      Generate exactly ${count} Katakana words related to the topic "${topic}".
      Provide the response as a single, valid JSON object with a single key named "words". 
      The "words" key should contain an array of objects.
      Each object must have exactly four keys: "katakana", "furigana", "answer", and "emoji".
      Do not include any text, explanation, or markdown formatting outside of the JSON object.
    `;
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const responseJsonText = completion.choices[0].message.content;
    const parsedData = JSON.parse(responseJsonText || '{}');
    const wordsArray = parsedData.words;

    if (!Array.isArray(wordsArray)) {
      console.error("Generated data does not contain a 'words' array:", parsedData);
      throw new Error("Generated data does not contain a 'words' array.");
    }
    return NextResponse.json({ ok: true, words: wordsArray });
  } catch (error) {
    console.error('Error generating words:', error);
    // res.status(500) 대신 사용
    return new NextResponse('Failed to generate words from AI.', { status: 500 });
  }
}

