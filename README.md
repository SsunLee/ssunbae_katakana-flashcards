# ssunbae edu project

> AI를 활용한 동적 단어 생성과 다양한 학습 모드를 제공하는 인터랙티브 학습 애플리케이션입니다.
향후 다양한 언어(일본어, 영어, 스페인어, 등)를 지원할 예정입니다.

**🔗 배포 사이트 바로가기:** [https://ssunbae-edu.com/](https://ssunbae-edu.com/)

---

## 📸 프로젝트 스크린샷

| 메인 학습 화면 | 설정 및 단어 생성 |
|:---:|:---:|
| <img src="[https://github.com/user-attachments/assets/e1071533-0129-4a38-ab31-d7fb62790f25](https://github.com/user-attachments/assets/e1071533-0129-4a38-ab31-d7fb62790f25)" alt="가타카나 플래시카드 메인 화면" width="400"> | <img src="[https://github.com/user-attachments/assets/4a88d553-eb37-416f-bbd2-9164f74c23bc](https://github.com/user-attachments/assets/4a88d553-eb37-416f-bbd2-9164f74c23bc)" alt="가타카나 플래시카드 설정 화면" width="400"> |

---

## ✨ 주요 기능

* **📇 3D 인터랙티브 플래시카드**: 클릭 또는 키보드 조작으로 앞/뒷면을 뒤집는 3D 애니메이션 효과를 적용하여 학습의 몰입감을 높였습니다.
* **🤖 AI 동적 단어 생성**: 학습하고 싶은 **주제**와 **개수**를 입력하면, OpenAI(GPT) API가 즉시 새로운 가타카나 단어 목록을 생성합니다.
* **🔊 원어민 발음 지원 (TTS)**: 브라우저에 내장된 Web Speech API를 통해 각 단어의 정확한 일본어 발음을 들을 수 있습니다.
* **⭐ 즐겨찾기 시스템**: 중요한 단어를 즐겨찾기(⭐)에 추가하고, 즐겨찾기한 단어만 필터링하여 집중적으로 학습할 수 있습니다.
* **⚙️ 사용자 맞춤 설정**:
  * 다양한 일본어 TTS 음성(Voice) 선택 기능을 제공하여 사용자에게 가장 자연스러운 발음을 찾을 수 있도록 돕습니다. (브라우저별 최적화)
  * 가독성 향상을 위해 엄선된 일본어 웹 폰트 4종을 지원하며, 학습 환경에 맞게 변경할 수 있습니다.
* **⌨️ 키보드 단축키 지원**: `←`, `→` 키로 카드를 넘기고, `Enter` 또는 `Space` 키로 카드를 뒤집는 등 키보드만으로 모든 학습이 가능합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn/UI](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn-ui&logoColor=white)

- **Framework**: Next.js (with App Router)
- **Language**: TypeScript
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Component Library**: shadcn/ui

### Backend & API
![Next.js API Routes](https://img.shields.io/badge/Next.js_API_Routes-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

- **Backend**: Next.js API Routes (Vercel Serverless Functions)
- **Authentication**: Firebase Authentication
- **AI Word Generation**: OpenAI API (gpt-3.5-turbo)
- **Text-to-Speech (TTS)**: Web Speech API (Browser built-in)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

- **Hosting**: Vercel

---

## 🚀 시작하기 (Getting Started)

### 사전 요구사항

- Node.js (v18.x 이상 권장)
- npm, yarn, or pnpm

### 로컬 환경에서 실행하기

1.  **저장소 복제**
    ```bash
    git clone https://github.com/SsunLee/ssunbae_katakana-flashcards.git
    cd ssunbae_katakana-flashcards
    ```

2.  **의존성 설치**
    ```bash
    npm install
    ```

3.  **환경 변수 설정**
    * 프로젝트 루트 디렉터리에 `.env.local` 파일을 생성하고 아래 내용을 자신의 키 값으로 채워주세요.
    * Firebase 설정은 Firebase Console의 프로젝트 설정에서 확인할 수 있습니다.

    ```.env.local
    # OpenAI API Key (서버 전용)
    OPENAI_API_KEY=sk-...

    # Firebase Configuration (클라이언트 공개용)
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
    NEXT_PUBLIC_FIREBASE_APP_ID=...
    ```

4.  **개발 서버 실행**
    * Vercel CLI를 사용하면 실제 배포 환경과 유사하게 테스트할 수 있습니다.
    ```bash
    vercel dev
    ```
    * 또는 Next.js 기본 개발 서버를 사용합니다.
    ```bash
    npm run dev
    ```

5.  브라우저에서 `http://localhost:3000` 주소로 접속합니다.
