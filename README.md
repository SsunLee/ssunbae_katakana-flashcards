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

---
# Mobile Settings

## 0) Requirements

- **macOS** (supports Xcode)
- **Xcode** (install from App Store)
- **CocoaPods** (`brew install cocoapods`)
- (Optional) **Android Studio** + SDKs
- **Homebrew**
- **nvm** (Node version manager)
- **Node.js ≥ 20 (LTS)**

> Tip: Use **nvm** to avoid global library/ICU mismatches and to switch Node versions easily.

---

## 1) Clone the repo & checkout the working branch

```bash
git clone <REPO_URL>
cd <repo-folder>

git fetch --all --prune
git switch -c feature/capacitor-setup --track origin/feature/capacitor-setup
# If already cloned locally:
# git switch feature/capacitor-setup
```

---

## 2) Install Node via nvm (recommended)

```bash
# Install nvm if missing
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart terminal, then:
nvm install --lts
nvm use --lts
nvm alias default lts/*

node -v   # should print 20+
npm -v
```

> If you previously installed Node with Homebrew and saw ICU-related errors, prefer **nvm** going forward.

---

## 3) Install dependencies

```bash
npm ci   # use package-lock.json (preferred)
# If no lockfile, use: npm install
```

---

## 4) Next.js static export (Next 15)

In **Next 15**, the `next export` command was removed.  
Setting `output: 'export'` in `next.config` makes **`next build`** produce the static site in `out/` automatically.

**next.config.(js|mjs|ts)**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // recommended if using next/image
};
export default nextConfig;
```

**package.json — scripts**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "mobile:ios": "npm run build && npx cap copy ios && npx cap sync ios && npx cap open ios",
    "mobile:android": "npm run build && npx cap copy android && npx cap sync android && npx cap open android",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 5) Capacitor configuration

**capacitor.config.ts**

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ssunbae.edu',
  appName: 'ssunbaeEdu',
  webDir: 'out',             // Next 15: generated by `next build`
  bundledWebRuntime: false,
};

export default config;
```

> Do **not** point `webDir` to `public/` — it doesn’t contain an `index.html` after build.

---

## 6) iOS prerequisites (Xcode & CocoaPods)

```bash
# After installing full Xcode (not just CLT):
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
sudo xcodebuild -license accept

# CocoaPods
brew install cocoapods
pod --version
```

One-time pod install:

```bash
cd ios/App
pod install
cd ../..
```

---

## 7) Run on iOS

```bash
npm run mobile:ios
# = next build → cap copy ios → cap sync ios → open in Xcode
```

In Xcode: select target **App**, choose a device/simulator, and run.

---

## 8) Run on Android (optional)

- Install Android Studio, SDKs, and an emulator.
- Then:

```bash
npm run mobile:android
```

---

## 9) Development loop

- **Web-only changes** →
  ```bash
  npm run build
  npx cap copy ios
  # Open Xcode (if not already open) and run
  ```

- **Plugin/Native changes** →
  ```bash
  npm run build
  npx cap sync ios
  ```

> Never manually edit `ios/App/App/public` — it will be overwritten on every `cap copy`.
> Avoid deleting `ios/` and re-running `cap add ios` unless you intend to lose all native edits.

---

## 10) App icons & splash (optional)

```bash
npm i -D @capacitor/assets
npx capacitor-assets generate
npx cap sync ios android
```

---

## 11) API/Server code notes (static export compatibility)

Static export fails if API routes or server-only code run at **build time**.

- Guard client-side calls so they **do not run during static build**:
  ```ts
  import { useEffect } from 'react';

  export default function Page() {
    useEffect(() => {
      if (process.env.NEXT_PUBLIC_MOBILE_EXPORT) return; // skip in static/mobile builds
      // fetch('/api/generate') ...
    }, []);

    return /* ... */ null;
  }
  ```

- **Do not import** API handlers (e.g., `import { handler } from '@/app/api/generate/route'`).
  Use `fetch('/api/...')` at runtime only.

- Keep secrets (e.g., `OPENAI_API_KEY`) on the server side.  
  Consider `.env` switch for mobile builds:
  ```env
  NEXT_PUBLIC_MOBILE_EXPORT=1
  ```

---

## 12) Troubleshooting

| Symptom / Message | Cause | Fix |
|---|---|---|
| `copy ios – failed! The web assets directory must contain index.html` | Wrong `webDir` or missing static build | Set `webDir: 'out'` and run `npm run build` |
| `ios platform already exists` when `cap add ios` | `ios/` already created | Skip `cap add`, just `cap copy` / `cap sync` |
| `cap` not found / CLI issues | CLI not installed or not resolved by npx | `npm i -D @capacitor/cli` or use `npx @capacitor/cli ...` |
| `Capacitor CLI requires Node >= 20` | Node too old | Use `nvm install --lts` and `nvm use --lts` |
| `xcodebuild requires Xcode…` | Only Command Line Tools active | Install full Xcode, then `xcode-select -s ...` |
| `Skipping pod install` | CocoaPods not installed | `brew install cocoapods` → `cd ios/App && pod install` |
| `next export` not found (Next 15) | Command removed | Use `output: 'export'` + `next build` |
| Build fails on `/api/*` | API/server code invoked at build time | Remove imports, guard client calls, or separate server runtime |

---

## 13) Xcode settings you’ll likely touch

- **Signing & Capabilities**: Team, provisioning profile
- **Info.plist**: Permissions (Camera/Microphone/Photos/Location), ATS exceptions, URL Schemes
- **Target settings**: iOS Deployment Target, orientations, status bar, etc.

---

## 14) Handy commands

```bash
# Build static web (creates `out/`)
npm run build

# iOS
npx cap copy ios
npx cap sync ios
npx cap open ios

# Android
npx cap copy android
npx cap sync android
npx cap open android
```

---

## TL;DR (Quick Start)

```bash
git clone <REPO_URL> && cd <repo-folder>
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# restart terminal
nvm install --lts && nvm use --lts
npm ci
npm run build
npx cap copy ios && npx cap sync ios && npx cap open ios
# In Xcode: select target App → run on simulator or device
```