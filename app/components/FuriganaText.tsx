// app/components/FuriganaText.tsx
"use client";

import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import type { FuriPart} from "@/app/data/sentences";

export function joinSurface(parts: FuriPart[]) {
    return parts.map(p => p.text).join('');
}

export function FuriganaText({
    parts,
    withTooltips  = false,
    className = "",
}: { parts: FuriPart[]; withTooltips ?: boolean; className?: string }) {
    return (
        <div className={`flex flex-wrap justify-center gap-x-1 ${className}`}>
             {parts.map((p, i) => {
                const ruby = (
                <ruby className="leading-[1.15]">
                    <span className="align-middle">{p.text}</span>
                    {p.rt && <rt className="block text-sm text-white/70 -mt-1">{p.rt}</rt>}
                </ruby>
                );

                if (withTooltips  && p.rt && p.gloss && p.gloss.length > 0) {
                    // 카드 뒷면에서만 툴팁
                    return (
                        <HoverCard key={i} openDelay={120} closeDelay={80}>
                            <HoverCardTrigger asChild>
                                <span 
                                    onClick={(e) => e.stopPropagation() } // 클릭 이벤트 전파 방지
                                    className="cursor-help inline-block px-1 rounded hover:bg-white/10"
                                    >
                                    {ruby}
                                </span>
                            </HoverCardTrigger>
                            <HoverCardContent 
                                onClick={(e) => e.stopPropagation() } // 클릭 이벤트 전파 방지
                                className="w-64 bg-slate-900/95 border-white/10 text-white">
                                    <div className="text-lg font-semibold mb-1">{p.text} ・ {p.gloss[0]}</div>
                                    <ol className="list-decimal list-inside space-y-1 text-sm text-white/80">
                                    {p.gloss.slice(1).map((g, idx) => <li key={idx}>{g}</li>)}
                                    </ol>
                            </HoverCardContent>
                        </HoverCard>
                    ); // return
                }
                return <span key={i} className="px-5">{ruby}</span>;
            })}
        </div>
    ); // return
 } // FuriganaText