# 🎌 카타카나 플래시카드

> 100개의 카타카나 단어를 학습할 수 있는 인터랙티브 웹 애플리케이션

[![Live Demo](https://img.shields.io/badge/Live%20Demo-🌐%20GitHub%20Pages-brightgreen)](https://ssunlee.github.io/ssunbae_katakana-flashcards/)
[![Version](https://img.shields.io/badge/Version-v0.2.0-orange)](https://github.com/SsunLee/ssunbae_katakana-flashcards/releases)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-blue)](https://tailwindcss.com/)

## 🚀 라이브 데모

**[👉 지금 바로 사용해보기](https://ssunlee.github.io/ssunbae_katakana-flashcards/)**

## ✨ 주요 기능

### 📚 학습 기능
- **100개 카타카나 단어**: 일상생활에서 자주 사용되는 외래어 단어들
- **ふりがな (히라가나) 표기**: 카타카나와 함께 히라가나 발음 제공
- **영어 번역**: 각 단어의 의미를 영어로 표시
- **이모지 아이콘**: 시각적 기억을 돕는 관련 이모지

### 🔊 음성 기능
- **일본어 TTS**: Web Speech API를 사용한 네이티브 일본어 발음
- **히라가나 읽기**: 카타카나 대신 히라가나 발음으로 자연스러운 학습

### 🔤 로마자 변환
- **Hepburn 방식**: 표준 헵번식 로마자 표기 (기본값)
- **Simple 방식**: 단순화된 로마자 표기
- **실시간 전환**: 설정에서 즉시 변환 방식 변경 가능

### 🎮 인터랙티브 UI
- **3D 카드 플립**: 부드러운 3D 애니메이션으로 카드 뒤집기
- **카드 섞기**: 랜덤한 순서로 학습 가능
- **진도 표시**: 현재 위치와 전체 카드 수 표시
- **키보드 지원**: Enter 키나 스페이스바로 카드 조작

### 📱 반응형 디자인
- **모바일 최적화**: 스마트폰에서도 완벽한 사용성
- **태블릿 지원**: 다양한 화면 크기에 최적화
- **다크 테마**: 현대적인 글래스모피즘 디자인

## 🛠️ 기술 스택

### Frontend
- **React 19.1.1**: 최신 React 기능 활용
- **TypeScript**: 타입 안정성과 개발 효율성
- **Tailwind CSS 3.x**: 유틸리티 우선 CSS 프레임워크

### 개발 도구
- **Create React App**: 빠른 개발 환경 구축
- **Web Speech API**: 브라우저 내장 음성 합성
- **GitHub Pages**: 무료 정적 사이트 호스팅

### 디자인
- **글래스모피즘**: 반투명 효과와 백드롭 블러
- **그라데이션 배경**: 시각적으로 매력적인 색상 조합
- **3D 변환**: CSS 3D 효과로 생생한 카드 플립

## 📦 설치 및 실행

### 사전 요구사항
- **Node.js** 16.x 이상
- **npm** 또는 **yarn**

### 로컬 실행
```bash
# 저장소 클론
git clone https://github.com/SsunLee/ssunbae_katakana-flashcards.git

# 프로젝트 디렉토리로 이동
cd ssunbae_katakana-flashcards

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

개발 서버가 실행되면 `http://localhost:3000`에서 애플리케이션을 확인할 수 있습니다.

### 프로덕션 빌드
```bash
# 프로덕션 빌드 생성
npm run build

# GitHub Pages에 배포
npm run deploy
```

## 📖 사용법

### 기본 사용법
1. **카드 클릭**: 카드를 클릭하거나 키보드(Enter/Space)로 카드를 뒤집어 정답 확인
2. **탐색**: 이전/다음 버튼으로 카드 간 이동
3. **섞기**: 섞기 버튼으로 카드 순서를 랜덤화
4. **리셋**: 리셋 버튼으로 처음 상태로 되돌리기

### 고급 기능
- **음성 재생**: 🔊 버튼을 클릭하여 일본어 발음 듣기
- **로마자 모드 변경**: 드롭다운에서 Hepburn/Simple 선택
- **진도 확인**: 우측 하단에서 현재 위치 확인

## 📁 프로젝트 구조

```
src/
├── App.tsx              # 메인 애플리케이션 컴포넌트
├── App.css              # 기본 스타일
├── index.tsx            # React 앱 진입점
├── index.css            # Tailwind CSS 설정
└── ...
```

### 주요 컴포넌트
- **단어 데이터**: 100개 카타카나 단어 배열
- **로마자 변환**: 히라가나 → 로마자 변환 함수
- **음성 합성**: Web Speech API 활용 훅
- **3D 카드**: CSS 3D 변환을 활용한 플립 카드

## 🔧 개발 도구

### 코드 품질
- **ESLint**: JavaScript/TypeScript 린팅
- **TypeScript**: 정적 타입 검사
- **Prettier**: 코드 포매팅 (권장)

### 테스트
```bash
# 테스트 실행
npm test

# 테스트 커버리지
npm test -- --coverage
```

## 🌟 특별한 기능들

### 로마자 변환 시스템
- **Hepburn 방식**: 국제 표준 로마자 표기법
- **Simple 방식**: 일본어 입력기 스타일
- **장음 처리**: ー의 올바른 변환
- **촉음 처리**: っ의 정확한 표현

### 음성 합성
- **일본어 TTS**: 브라우저의 네이티브 일본어 음성
- **자동 언어 감지**: ja-JP 언어로 자동 설정
- **음성 최적화**: 적절한 속도와 톤 설정

## 🤝 기여하기

프로젝트에 기여를 환영합니다!

### 기여 방법
1. 이 저장소를 포크하세요
2. 새로운 기능 브랜치를 만드세요 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋하세요 (`git commit -m '새 기능 추가'`)
4. 브랜치에 푸시하세요 (`git push origin feature/새기능`)
5. Pull Request를 생성하세요

### 기여 아이디어
- 📚 더 많은 카타카나 단어 추가
- 🎮 게임 모드 추가 (퀴즈, 시간 제한 등)
- 📊 학습 진도 추적 기능
- 🌙 다크 모드 토글
- 🌍 다국어 지원 (한국어, 중국어 등)

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📋 버전 히스토리

### v0.2.0 (2025-01-30)
- 🔊 **Safari TTS 품질 개선**: macOS 내장 고품질 일본어 음성 (Kyoko, Otoya) 우선 선택
- 🎯 **브라우저별 최적화**: Safari 전용 음성 설정 및 속도 조정 (0.9배속)
- 🔧 **음성 품질 랭킹**: 로컬 vs 원격 음성, ja-JP 우선 선택 로직
- ⚡ **안정성 향상**: 음성 로딩 실패 시 재시도, 오류 처리 개선

### v0.1.0 (2025-01-29)
- 🎌 **초기 릴리즈**: 100개 카타카나 단어 플래시카드
- 🔊 **TTS 기능**: Web Speech API를 통한 일본어 음성 재생
- 🔤 **로마자 변환**: Hepburn/Simple 방식 지원
- 🎮 **3D 카드 애니메이션**: 부드러운 플립 효과
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 최적화
- ✨ **현대적 UI**: 글래스모피즘 디자인

## 👨‍💻 개발자

**SsunLee**
- GitHub: [@SsunLee](https://github.com/SsunLee)

## 🙏 감사의 말

- **React Team**: 훌륭한 프레임워크 제공
- **Tailwind CSS**: 아름다운 유틸리티 CSS
- **Web Speech API**: 브라우저 내장 음성 기능
- **일본어 학습자들**: 영감과 피드백 제공

---

⭐ **이 프로젝트가 유용하다면 별표를 눌러주세요!**

📝 **문의사항이나 제안사항이 있으시면 Issue를 열어주세요.**