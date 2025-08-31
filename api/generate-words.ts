import type { VercelRequest, VercelResponse } from '@vercel/node';

type Word = {
  id: number;
  katakana: string;
  furigana: string;
  answer: string;
  emoji: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { topic = '기본' } = (req.body || {}) as { topic?: string };

    const mock: Omit<Word, 'id'>[] = [
      { katakana: 'タクシー', furigana: 'たくしー', answer: 'Taxi',   emoji: '🚖' },
      { katakana: 'コーヒー', furigana: 'こーひー', answer: 'Coffee', emoji: '☕' },
      { katakana: 'ホテル',  furigana: 'ほてる',   answer: 'Hotel',  emoji: '🏨' },
    ];

    // id 붙여서 반환
    const words: Word[] = mock.map((w, i) => ({ id: i + 1, ...w }));

    res.status(200).json({ ok: true, topic, words });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e?.message || 'unknown error' });
  }
}
