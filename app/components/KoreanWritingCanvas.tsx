// app/components/KoreanWritingCanvas.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { cn } from '@/app/lib/utils';
import { Check } from 'lucide-react';

interface KoreanWritingCanvasProps {
  word: string;
  expectedStrokes?: number; // 정확한 획수
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onShuffle?: () => void;
  onReset?: () => void;
}

const CANVAS_SIZE = 300;

export default function KoreanWritingCanvas({ 
  word,
  expectedStrokes,
  onClose, 
  onNext, 
  onPrev, 
  onShuffle, 
  onReset 
}: KoreanWritingCanvasProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);
  const [showHint, setShowHint] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // 다크모드 감지
  const isDarkMode = typeof window !== 'undefined' && 
    document.documentElement.classList.contains('dark');
  const strokeColor = isDarkMode ? '#ffffff' : '#000000';

  // 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.strokeStyle = strokeColor;
    context.lineWidth = 4;
    contextRef.current = context;

    drawGuideLines(context);
  }, [strokeColor]);

  // 가이드 라인 그리기
  const drawGuideLines = (ctx: CanvasRenderingContext2D) => {
    const guideColor = isDarkMode ? '#374151' : '#e2e8f0';
    ctx.strokeStyle = guideColor;
    ctx.lineWidth = 1;
    
    // 십자선
    ctx.beginPath();
    ctx.moveTo(CANVAS_SIZE / 2, 0);
    ctx.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE);
    ctx.moveTo(0, CANVAS_SIZE / 2);
    ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE / 2);
    ctx.stroke();

    // 대각선
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE);
    ctx.moveTo(CANVAS_SIZE, 0);
    ctx.lineTo(0, CANVAS_SIZE);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  // 힌트 텍스트 그리기
  const drawHintText = () => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    ctx.save();
    ctx.globalAlpha = showHint ? 0.25 : 0;
    ctx.font = '120px "Noto Sans KR", sans-serif';
    ctx.fillStyle = isDarkMode ? '#6b7280' : '#94a3b8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(word, CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    ctx.restore();
  };

    // clearCanvas (원래대로)
    const clearCanvas = () => {
    const ctx = contextRef.current;
    if (!ctx) return;

    setPaths([]);
    setCurrentPath([]);
    setIsComplete(false);
    
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    drawGuideLines(ctx);
    drawHintText();
    };

    // word가 변경되면 캔버스 초기화
    useEffect(() => {
    clearCanvas();
    }, [word]); // clearCanvas를 의존성에서 제거


  // 재렌더링
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    drawGuideLines(ctx);
    drawHintText();

    // 이전에 그린 경로들 다시 그리기
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 4;
    paths.forEach(path => {
      const points = JSON.parse(path);
      ctx.beginPath();
      points.forEach((pt: {x: number, y: number}, i: number) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.stroke();
    });
  }, [showHint, paths, word, strokeColor, isDarkMode]);

  const getCoordinates = (event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    // 캔버스 실제 크기와 표시 크기의 비율 계산
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    const coords = getCoordinates(event);
    if (!coords) return;

    setIsDrawing(true);
    setCurrentPath([coords]);

    const ctx = contextRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
    }
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (!isDrawing) return;

    const coords = getCoordinates(event);
    if (!coords) return;

    setCurrentPath(prev => [...prev, coords]);

    const ctx = contextRef.current;
    if (ctx) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 4;
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentPath.length > 0) {
      setPaths(prev => [...prev, JSON.stringify(currentPath)]);
    }
    setCurrentPath([]);

    // 정확한 획수로 완성 체크
    if (expectedStrokes) {
      // 정확한 획수 ±1 범위 내에서 완성 인정
      const minStrokes = Math.max(1, expectedStrokes - 1);
      const maxStrokes = expectedStrokes + 1;
      if (paths.length >= minStrokes && paths.length <= maxStrokes) {
        setTimeout(() => setIsComplete(true), 500);
      }
    } else {
      // 획수 정보가 없으면 기존 로직 사용 (글자 수 * 3)
      const minStrokes = word.length * 3;
      if (paths.length >= minStrokes - 1) {
        setTimeout(() => setIsComplete(true), 500);
      }
    }
  };



  return (
    <div className="w-full flex flex-col items-center gap-4 p-4 bg-card/95 rounded-lg">
      <header className="flex items-center justify-between w-full max-w-md">
        <h3 className="text-lg font-medium">한국어 쓰기: {word}</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowHint(!showHint)}
            className={cn("transition-colors", showHint ? "bg-primary/10" : "")}
          >
            {showHint ? "힌트 끄기" : "힌트 보기"}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>닫기</Button>
        </div>
      </header>

      <main className="relative w-full aspect-square max-w-md border-2 border-border rounded-lg bg-background touch-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ touchAction: 'none' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 animate-in fade-in duration-500 pointer-events-none">
            <Check className="w-16 h-16 text-green-500 animate-in zoom-in-50 duration-700" />
          </div>
        )}
      </main>

      <footer className="flex flex-col items-center justify-center w-full max-w-md gap-2">
        <div className="grid grid-cols-4 gap-2 w-full">
          <Button variant="outline" size="sm" onClick={onPrev}>이전</Button>
          <Button variant="outline" size="sm" onClick={onNext}>다음</Button>
          <Button variant="outline" size="sm" onClick={onShuffle}>섞기</Button>
          <Button variant="outline" size="sm" onClick={onReset}>리셋</Button>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-muted-foreground">
            획 수: <span className="font-semibold text-foreground">{paths.length}</span>
            {expectedStrokes && (
              <span className="ml-2 text-xs">
                (목표: {expectedStrokes}획)
              </span>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearCanvas} 
            className="text-destructive"
          >
            지우기
          </Button>
        </div>
      </footer>
    </div>
  );
}