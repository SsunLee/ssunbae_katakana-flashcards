// app/study/japanese/sentences/page.tsx

"use client";

import { useState, useCallback } from "react";
import { JP_SENTENCES } from "@/app/data/sentences";
import { SentenceCardView } from "@/app/components/SentenceCardView";
import { Button } from "@/app/components/ui/button";

// 필수 기능들 데이터, 훅, 유틸리티 ---
import { useJaSpeech } from "@/app/hooks/useJaSpeech";
import { useAuth } from "@/app/AuthContext";
import { SettingsDialog } from "@/app/components/SettingsDialog";
import { APP_VERSION } from '@/app/constants/appConfig';
import { useFlashcardDeck } from '@/app/hooks/useFlashcardDeck';


export default function SentencesPage() {
    const deckType = 'japanese-sentences';
    const initialDeck = JP_SENTENCES;
    const [idx, setIdx] = useState(0);
    const [flip, setFlip] = useState(false);
    const { user } = useAuth();
    const [favs, setFavs] = useState<Record<number, boolean>>({});

    // 기능
    const card = JP_SENTENCES[idx];
    const onFlip = useCallback(() => setFlip(f => !f), []);
    const next = () => {setIdx(i => (i + 1) % JP_SENTENCES.length); setFlip(false);}
    const prev = () => { setIdx((i) => (i - 1 + JP_SENTENCES.length) % JP_SENTENCES.length); setFlip(false); };   
    const toggleFav = () => setFavs((m) => ({ ...m, [card.id]: !m[card.id] }));


    return (
        <div className="flex flex-col items-center gap-4">

      {/* Top Controls */}



            <SentenceCardView
                card={card}
                isFlipped={flip}
                isFav={!!favs[card.id]}
                onFlip={onFlip}
                onToggleFav={toggleFav}
            />
            <div className="flex gap-4">
                <button onClick={prev} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">이전</button>
                <button onClick={next} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">다음</button>
                {/** 요청: 섞기를 해야 합니다. */}
                <button onClick={onFlip} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">섞기</button>
                {/** 요청: 리셋을 해야 합니다. */}
                <button onClick={onFlip} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">리셋</button>
            </div>
            <div className="text-sm text-white/60">
                {idx + 1} / {JP_SENTENCES.length} (⭐ {Object.values(favs).filter(v => v).length})
            </div>
        </div>
    ) // return
} // SentencesPage

