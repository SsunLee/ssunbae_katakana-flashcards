# SSUN EDU 프로젝트 구조 및 흐름 정리

이 문서는 현재 코드베이스를 기준으로, 폴더별 역할과 실제 실행/데이터 흐름을 빠르게 파악하기 위한 아키텍처 메모입니다.

## 1) 전체 개요

- 프레임워크: Next.js (App Router)
- 렌더링 형태: `output: 'export'` 기반 정적 빌드 + API Route 사용
- 핵심 기능: 다국어 플래시카드 학습, Firebase 인증/동기화, OpenAI 기반 AI 콘텐츠 생성, 모바일(Capacitor) 대응

## 2) 루트 폴더 역할

| 경로 | 역할 |
|---|---|
| `app/` | 메인 애플리케이션 코드(페이지, 컴포넌트, 훅, API 라우트 포함) |
| `public/` | 정적 리소스(아이콘, 로고, robots/sitemap 등) |
| `ios/` | Capacitor iOS 네이티브 프로젝트(Xcode, Podfile 포함) |
| `out/` | 정적 빌드 산출물(배포/모바일 웹소스용) |
| `resources/` | 앱 리소스 관련 보조 디렉터리 |
| `next.config.js` | Next 빌드 설정 (`output: 'export'`) |
| `capacitor.config.ts` | Capacitor 앱 ID/웹 디렉터리 설정 (`webDir: 'out'`) |
| `package.json` | 의존성/스크립트 (`dev`, `build`, `mobile:ios`, `mobile:android`) |

주의:
- `out/`은 소스가 아니라 빌드 결과물입니다.

## 3) `app/` 하위 폴더 역할

| 경로 | 역할 | 대표 파일 |
|---|---|---|
| `app/api/` | 서버 API 엔드포인트 | `app/api/generate/route.ts`, `app/api/profile/route.ts`, `app/api/account/delete/route.ts` |
| `app/components/` | UI 컴포넌트 및 공용 화면 조각 | `app/components/SideMenu.tsx`, `app/components/SettingsDialog.tsx` |
| `app/components/ui/` | shadcn/radix 기반 기본 UI 컴포넌트 | `app/components/ui/button.tsx`, `app/components/ui/dialog.tsx` |
| `app/constants/` | 상수, 라벨, 메시지, 폰트 매핑 | `app/constants/studyLabels.ts`, `app/constants/message.ts` |
| `app/context/` | 전역 상태(Context) | `app/context/AuthModalContext.tsx`, `app/context/ThemeContext.tsx`, `app/context/LocaleContext.tsx` |
| `app/data/` | 로컬 학습 데이터(기본 덱/fallback) | `app/data/words.ts`, `app/data/english-words.ts`, `app/data/sentences.ts` |
| `app/goodbye/` | 계정 삭제 완료 페이지 | `app/goodbye/page.tsx`, `app/goodbye/GoodbyeClient.tsx` |
| `app/hooks/` | 도메인 훅(덱 동기화/TTS/유틸) | `app/hooks/useStudyDeck.ts`, `app/hooks/useJaSpeech.ts` |
| `app/lib/` | Firebase/AdMob/유틸 초기화 | `app/lib/firebase.ts`, `app/lib/firebase-admin.ts`, `app/lib/admob-banner.ts` |
| `app/privacy/` | 개인정보처리방침 페이지 | `app/privacy/page.tsx` |
| `app/profile/` | 프로필 페이지 | `app/profile/page.tsx` |
| `app/services/` | API 호출/콘텐츠 import 조합 로직 | `app/services/wordService.ts`, `app/services/contentImporter.ts`, `app/services/api.ts` |
| `app/study/` | 실제 학습 라우트(언어/모드별 페이지) | `app/study/layout.tsx`, `app/study/japanese/katakana-words/page.tsx` |
| `app/styles/` | 전역 스타일(Tailwind + CSS 변수) | `app/styles/globals.css` |
| `app/support/` | 고객지원 페이지 | `app/support/page.tsx` |
| `app/terms/` | 이용약관 페이지 | `app/terms/page.tsx` |
| `app/types/` | 타입 정의 | `app/types/verbs.ts`, `app/types/kanji.ts` |
| `app/utils/` | 순수 유틸 함수 | `app/utils/nickname.ts`, `app/utils/kana.ts` |

## 4) 핵심 진입/라우팅 흐름

1. 사용자 진입: `/`
2. `app/page.tsx`가 `app/client-redirect.tsx`로 전달
3. `localStorage.lastActivePage` 확인
4. 있으면 마지막 `study` 경로로 이동, 없으면 기본값(`/study/japanese/katakana-words`)으로 이동
5. `app/study/layout.tsx`가 공통 셸(헤더/메뉴/로그인모달/광고)을 제공
6. 선택된 학습 페이지가 렌더링

## 5) 학습 페이지 공통 동작 흐름

1. 페이지 로드 시 기본 덱(`app/data/*`) 준비
2. `useStudyDeck`에서 로그인 상태 확인
3. 비로그인: 로컬 덱 그대로 사용
4. 로그인: Firestore 사용자 문서(`users/{uid}.learningData.{deckType}`) 구독
5. 카드 조작(뒤집기/다음/이전/즐겨찾기/셔플/필터)
6. 덱/즐겨찾기 변경 시 Firestore 업데이트

관련 핵심 파일:
- `app/hooks/useStudyDeck.ts`
- `app/study/**/page.tsx`

## 6) 데이터 소스 우선순위

1. 원격 API(일부 모드): 일본어 한자/동사 등은 `app/services/api.ts` 경유
2. Firestore 저장본: 로그인 사용자 학습 데이터
3. 로컬 fallback: `app/data/*`

즉, 최종 화면 데이터는 "원격 또는 로컬 기본덱 + 사용자 학습 상태(즐겨찾기/편집)" 조합입니다.

## 7) API 흐름

### 7-1) AI 콘텐츠 생성

1. 설정 다이얼로그에서 주제/개수 입력
2. `app/services/wordService.ts` → `POST /api/generate`
3. `app/api/generate/route.ts`가 OpenAI 호출
4. JSON 파싱/검증 후 카드 배열 반환
5. `app/services/contentImporter.ts`가 현재 덱 상태 업데이트

### 7-2) 프로필 수정

1. `app/profile/page.tsx`에서 닉네임 입력
2. Firebase ID 토큰 발급 후 `POST /api/profile`
3. `app/api/profile/route.ts`에서 토큰 검증 + Firestore/Auth 업데이트

### 7-3) 계정 삭제

1. 메뉴/다이얼로그에서 삭제 요청
2. ID 토큰으로 `POST /api/account/delete`
3. `app/api/account/delete/route.ts`에서 사용자 데이터 purge + Auth 계정 삭제
4. 클라이언트는 `/goodbye`로 이동

## 8) 인증/전역 상태 흐름

1. `app/components/ClientProviders.tsx`에서 앱 전역 Provider 결합
2. `AuthProvider`(`app/AuthContext.tsx`)가 Firebase auth 상태 감시
3. 로그인 시 Firestore 사용자 문서 조회/생성
4. `ThemeProvider`, `LocaleProvider`, `AuthModalProvider`가 UI 전역 상태 담당

## 9) 광고 및 모바일 흐름

1. `app/study/layout.tsx`에서 광고 표시 트리거
2. `app/components/AdGuardMount.tsx` → `AdGuard.tsx`
3. 네이티브 환경(Capacitor)에서 AdMob 초기화 및 배너 표시
4. CSS 변수(`--ad-inset`)로 하단 안전영역/광고 높이 반영

관련 파일:
- `app/lib/admob.ts`
- `app/lib/admob-banner.ts`
- `app/styles/globals.css`

## 10) 정적 페이지 흐름

- `app/privacy/page.tsx`: TermsFeed 원문 fetch 후 렌더
- `app/terms/page.tsx`: 로컬 약관 문서 렌더
- `app/support/page.tsx`: 문의 정보 제공
- `app/goodbye/page.tsx`: 계정 삭제 완료 랜딩

## 11) 빠른 온보딩 읽기 순서

1. `app/layout.tsx`
2. `app/components/ClientProviders.tsx`
3. `app/study/layout.tsx`
4. `app/study/japanese/katakana-words/page.tsx` (대표 패턴)
5. `app/hooks/useStudyDeck.ts`
6. `app/api/generate/route.ts`
7. `app/lib/firebase.ts` + `app/lib/firebase-admin.ts`

## 12) 참고 메모

- `app/components/AccountDialog.tsx`는 현재 코드 검색 기준 직접 사용처가 보이지 않습니다.
- `app/constants/studyLabels.ts`의 key와 일부 `deckType` 문자열이 1:1 매칭되지 않는 구간이 있어, 라벨 표시 보완 여지가 있습니다.

