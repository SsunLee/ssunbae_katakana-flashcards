# SSUN EDU Design System (v1)

## 1) 목표
- 라이트/다크 모드에서 같은 컴포넌트가 일관된 대비/간격/모션을 유지하도록 표준화합니다.
- 화면별 임의 스타일을 줄이고, 토큰 + 공통 컴포넌트로 유지보수를 단순화합니다.

## 2) 토큰 구조
- 파일: `app/styles/globals.css`
- 기존 shadcn 토큰(`--background`, `--card`, `--primary` 등)을 유지하고, 아래 DS 토큰을 추가했습니다.
- 핵심 토큰:
  - `--ds-surface-shadow`, `--ds-surface-shadow-elevated`
  - `--ds-focus-ring`
  - `--ds-success`, `--ds-warning`, `--ds-info`
- `--ds-radius-*`

### 현재 라이트 팔레트(요청 반영)
- Primary: `#3b82f6` / Foreground: `#ffffff`
- Secondary: `#f3f4f6` / Foreground: `#4b5563`
- Accent: `#e0f2fe` / Foreground: `#1e3a8a`
- Background/Card/Popover: `#ffffff` / Foreground: `#333333`
- Muted: `#f9fafb` / Foreground: `#6b7280`
- Border/Input: `#e5e7eb`
- Destructive: `#ef4444` / Foreground: `#ffffff`
- Chart: `#3b82f6`, `#2563eb`, `#1d4ed8`, `#1e40af`, `#1e3a8a`
- Sidebar: `#f9fafb` 기반 + Primary/Accent 동일 팔레트

### 현재 다크 팔레트
- Primary: `#3b82f6`
- Secondary/Card/Popover/Muted: `#262626`
- Accent: `#1e3a8a`
- Background: `#171717`
- Foreground: `#e5e5e5`
- Border/Input: `#404040`
- Destructive: `#ef4444`
- Chart: `#60a5fa`, `#3b82f6`, `#2563eb`, `#1d4ed8`, `#1e40af`
- Sidebar: `#171717` 기반 + Primary/Accent 동일 팔레트

## 3) 공통 클래스
- `ds-surface`: 기본 카드/섹션 컨테이너
- `ds-surface-soft`: 보조 섹션(문항 박스, 내부 패널 등)
- `ds-surface-elevated`: 상위 강조 섹션(히어로)
- `ds-chip`: 필터/상태/카운트 칩
- `ds-kpi-card`: KPI 카드

## 4) 컴포넌트 규격(1차)
- `app/components/ui/button.tsx`
  - 상태 전환/활성/비활성 동작 통일
  - `sm` 버튼을 더 컴팩트하게 조정
- `app/components/ui/card.tsx`
  - 카드 그림자/타이틀 스케일 통일
- `app/components/ui/input.tsx`
  - 배경/포커스/전환 스타일 통일

## 5) 페이지 적용(1차)
- 대시보드: `app/study/dashboard/page.tsx`
  - KPI 카드, 주요 섹션, 칩 스타일을 DS 클래스 기반으로 통일
- 문장 퀴즈(영/일):
  - `app/study/english/sentences/page.tsx`
  - `app/study/japanese/sentence-quiz/page.tsx`
  - 공통 타이포 설정(폰트/문장 크기) 훅 적용

## 6) 공통 훅
- 파일: `app/hooks/useQuizTypographySettings.ts`
- 역할:
  - 폰트/문장크기 로컬 저장
  - 화면별 키 분리(`enSentenceQuiz`, `jpSentenceQuiz`)
  - `FONT_STACKS` 기반 실제 폰트 스택 반환

## 7) 다음 확장 권장
- `badge`, `tabs`, `table`, `toast`를 같은 토큰 체계로 확장
- 차트 컬러를 `--ds-info/success/warning` 기반으로 고정
- Figma 토큰(JSON)과 CSS 변수 매핑 자동화(2차)
