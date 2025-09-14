// app/study/japanese/sentences/page.tsx

"use client";

import { useCallback, useMemo, useState, useEffect } from "react";
import { useAuth } from "@/app/AuthContext";
import { useStudyDeck } from "@/app/hooks/useStudyDeck";
import { JP_SENTENCES, type SentenceCard } from "@/app/data/sentences";
import { SentenceCardView } from "@/app/components/SentenceCardView";
import CardControls from "@/app/components/controls/CardControls";


export default function SentencesPage() {
  const { user } = useAuth();
  const deckType = "sentences-jp";
  const {
    deck, favs, toggleFav, shuffleDeck, resetDeckToInitial,
     } = useStudyDeck<SentenceCard>({ user, deckType, initialDeck: JP_SENTENCES });

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = deck[index] ?? null;

  const onFlip = useCallback(() => setFlipped(f => !f), []);
  const next = useCallback(() => {
    setIndex(i => (i + 1) % Math.max(1, deck.length));
    setFlipped(false);   // ★ '뒤집힘 잔상' 방지
  }, [deck.length]);
  const prev = useCallback(() => {
    setIndex(i => (i - 1 + Math.max(1, deck.length)) % Math.max(1, deck.length));
    setFlipped(false);
  }, [deck.length]);

  const shuffle = () => { shuffleDeck(); setIndex(0); setFlipped(false); };
  const reset = () => { resetDeckToInitial(); setIndex(0); setFlipped(false); }

    return (
    <div className="flex flex-col items-center p-6">
      {/* --- 카드 뷰어 --- */}
      {current && (
        <SentenceCardView
          card={current}
          isFlipped={flipped}
          isFav={!!favs[current.id]}
          onFlip={onFlip}
          onToggleFav={() => toggleFav(current.id)}
        />
      )}
       {/* --- 컨트롤 --- */}
      <CardControls
        onPrev={prev}
        onNext={next}
        onShuffle={shuffle}
        onReset={reset}
      />
    </div>
    ); // return
} // SentencesPage

