// app/components/KanjiWritingCanvas.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { cn } from '@/app/lib/utils';
import { Check } from 'lucide-react';

// Props 정의
interface KanjiWritingCanvasProps {
  kanji: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onShuffle?: () => void;
  onReset?: () => void;
}

// 상수 정의
const VIEWBOX_SIZE = 109;
const MATCH_THRESHOLD = 20; // 정답 판정 거리 (클수록 쉬워짐)

// SVG 경로 해석 함수 (복잡한 로직은 동일)
const getStrokeStartEndPoints = (path: string): { start: {x: number, y: number}, end: {x: number, y: number} } | null => {
  if (!path) return null;
  const commands = path.match(/[a-zA-Z][^a-zA-Z]*/g);
  if (!commands) return null;
  let currentPos = { x: 0, y: 0 };
  let startPos: { x: number, y: number } | null = null;
  for (let i = 0; i < commands.length; i++) {
    const commandStr = commands[i];
    const type = commandStr[0];
    const args = commandStr.slice(1).trim().split(/[\s,]+|-/).map(parseFloat).filter(v => !isNaN(v));
    let isRelative = type === type.toLowerCase();
    if (i === 0 && (type === 'M' || type === 'm')) {
      currentPos = { x: args[0], y: args[1] };
      startPos = { ...currentPos };
    } else {
      for (let j = 0; j < args.length; j += 2) {
        let pX = args[j];
        let pY = args[j + 1];
        if (isRelative) {
          currentPos.x += pX;
          currentPos.y += pY;
        } else {
          currentPos.x = pX;
          currentPos.y = pY;
        }
      }
    }
  }
  return startPos ? { start: startPos, end: currentPos } : null;
};

// 메인 컴포넌트
export default function KanjiWritingCanvas({ kanji, onClose, onNext, onPrev, onShuffle, onReset }: KanjiWritingCanvasProps) {
  // 상태 관리
  const [showHints, setShowHints] = useState(true);
  const [strokeData, setStrokeData] = useState<string[]>([]);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>("");
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [drawnStrokeIndexes, setDrawnStrokeIndexes] = useState<number[]>([]);
  const canvasRef = useRef<SVGSVGElement>(null);

  // 데이터 로딩
  useEffect(() => {
    const fetchKanjiData = async () => {
      setIsLoading(true);
      setError(null);
      setCurrentStrokeIndex(0);
      setDrawnStrokeIndexes([]);
      setStrokeData([]);
      setTotalStrokes(0);

      if (!kanji) {
        setError("한자 정보가 없습니다.");
        setIsLoading(false);
        return;
      }
      
      const targetKanji = kanji.trim()[0];
      const code = targetKanji.charCodeAt(0).toString(16).padStart(5, '0');
      const url = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${code}.svg`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const paths = Array.from(svgDoc.querySelectorAll('path')).map(p => p.getAttribute('d') || '');
        setStrokeData(paths);
        setTotalStrokes(paths.length);
      } catch (e) {
        console.error("Failed to fetch KanjiVG data:", e);
        setError("획순 데이터를 가져올 수 없습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchKanjiData();
  }, [kanji]);

  // 좌표 계산
  const getCoordinates = (event: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const svg = canvasRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * VIEWBOX_SIZE,
      y: ((clientY - rect.top) / rect.height) * VIEWBOX_SIZE
    };
  };

  const isComplete = !isLoading && currentStrokeIndex >= totalStrokes && totalStrokes > 0;

  // 드로잉 핸들러
  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (isComplete || isLoading || !strokeData[currentStrokeIndex]) return;
    const point = getCoordinates(event);
    if (!point) return;
    const correctPoints = getStrokeStartEndPoints(strokeData[currentStrokeIndex]);
    if (!correctPoints) return;

    if (Math.hypot(point.x - correctPoints.start.x, point.y - correctPoints.start.y) < MATCH_THRESHOLD) {
        setIsDrawing(true);
        setCurrentPath(`M ${point.x} ${point.y}`);
    }
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (!isDrawing) return;
    const point = getCoordinates(event);
    if (point) setCurrentPath(prev => `${prev} L ${point.x} ${point.y}`);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (!strokeData[currentStrokeIndex] || !currentPath) {
        setCurrentPath("");
        return;
    }
    const correctPoints = getStrokeStartEndPoints(strokeData[currentStrokeIndex]);
    const userEndPoints = getStrokeStartEndPoints(currentPath);

    if (correctPoints && userEndPoints && Math.hypot(userEndPoints.end.x - correctPoints.end.x, userEndPoints.end.y - correctPoints.end.y) < MATCH_THRESHOLD) {
      setDrawnStrokeIndexes(prev => [...prev, currentStrokeIndex]);
      setCurrentStrokeIndex(prev => prev + 1);
    }
    setCurrentPath("");
  };

  const clearCanvas = () => {
    setDrawnStrokeIndexes([]);
    setCurrentStrokeIndex(0);
  };
  
  // 렌더링
  return (
    <div className="w-full h-full flex flex-col items-center gap-2 p-4 bg-card/95 rounded-lg">
      <header className="flex items-center justify-between w-full">
        <h3 className="text-lg font-medium">한자 쓰기: {kanji}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowHints(!showHints)} className={cn("transition-colors", showHints ? "bg-primary/10" : "")}>{showHints ? "힌트 끄기" : "힌트 보기"}</Button>
          <Button variant="ghost" size="sm" onClick={onClose}>닫기</Button>
        </div>
      </header>
      
      <main className="relative w-full aspect-square max-w-md border-2 border-border rounded-lg bg-background touch-none">
        <svg ref={canvasRef} className="absolute inset-0 w-full h-full" viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}>
          <defs>
            <g id="grid-lines" style={{ stroke: '#e2e8f0', strokeWidth: '0.5' }}>
              <line x1={VIEWBOX_SIZE/2} y1="0" x2={VIEWBOX_SIZE/2} y2={VIEWBOX_SIZE} />
              <line x1="0" y1={VIEWBOX_SIZE/2} x2={VIEWBOX_SIZE} y2={VIEWBOX_SIZE/2} />
              <line x1="0" y1="0" x2={VIEWBOX_SIZE} y2={VIEWBOX_SIZE} style={{ strokeDasharray: '2 2' }} />
              <line x1={VIEWBOX_SIZE} y1="0" x2="0" y2={VIEWBOX_SIZE} style={{ strokeDasharray: '2 2' }} />
            </g>
          </defs>
          <use href="#grid-lines" />

          {showHints && <g style={{ stroke: '#cbd5e1', opacity: 0.7, strokeWidth: '2', strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}>
            {strokeData.map((d, i) => <path key={`bg-${i}`} d={d} />)}
          </g>}
          
          <g style={{ stroke: '#475569', strokeWidth: '3.5', strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }}>
            {drawnStrokeIndexes.map(i => <path key={`drawn-${i}`} d={strokeData[i]} />)}
          </g>

          {showHints && !isComplete && strokeData[currentStrokeIndex] && (
            <g>
              <path d={strokeData[currentStrokeIndex]} stroke="#2563eb" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ opacity: 0.4 }} />
              <circle cx={getStrokeStartEndPoints(strokeData[currentStrokeIndex])?.start.x} cy={getStrokeStartEndPoints(strokeData[currentStrokeIndex])?.start.y} r="3" fill="#2563eb" />
            </g>
          )}

          {currentPath && <path d={currentPath} style={{ stroke: 'black', strokeWidth: '2.5', strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }} />}
          
          {isLoading && <text x="50%" y="50%" textAnchor="middle" dy=".3em">로딩 중...</text>}
          {error && <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="red">{error}</text>}
          {isComplete && (
            <g>
              <rect width="100%" height="100%" fill="rgba(255, 255, 255, 0.8)" className="animate-in fade-in duration-500" />
              <Check className="w-16 h-16 text-green-500 animate-in fade-in zoom-in-50 duration-700" x="50%" y="50%" transform="translate(-32 -32)" />
            </g>
          )}
        </svg>
      </main>

      <footer className="flex flex-col items-center justify-center w-full mt-2 gap-2">
        <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
            <Button variant="outline" size="sm" onClick={onPrev}>이전</Button>
            <Button variant="outline" size="sm" onClick={onNext}>다음</Button>
            <Button variant="outline" size="sm" onClick={onShuffle}>섞기</Button>
            <Button variant="outline" size="sm" onClick={onReset}>리셋</Button>
        </div>
        <div className="flex items-center justify-between w-full max-w-xs">
            <div className="text-sm text-muted-foreground">{currentStrokeIndex} / {totalStrokes} 획</div>
            <Button variant="outline" size="sm" onClick={clearCanvas} className="text-destructive">지우기</Button>
        </div>
      </footer>
    </div>
  );
}

