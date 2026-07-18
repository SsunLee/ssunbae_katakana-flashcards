# 쑨에듀 웹 수정 및 모바일 Live Update 운영 가이드

이 문서는 저장소를 처음 받은 사람도 웹 코드를 수정하고 iOS 앱에 OTA(Over-the-Air)로 배포할 수 있도록 정리한 운영 절차입니다.

## 1. 현재 운영 구조

쑨에듀 iOS 앱은 Capacitor 네이티브 앱 안에 Next.js 정적 웹 번들을 포함합니다. 출시 후 웹 코드가 바뀌면 Ionic Appflow Live Updates의 `Production` 채널을 통해 새 웹 번들을 전달합니다.

| 항목 | 현재 값 |
| --- | --- |
| GitHub 저장소 | `SsunLee/ssunbae_katakana-flashcards` |
| Appflow App ID | `6f7685c7` |
| Appflow 채널 | `Production` |
| Production 채널 ID | `fb7b7e30-7785-4ab8-90ee-2977e167e5f4` |
| Capacitor App ID | `com.ssunbae.edu` |
| 모바일 웹 출력 폴더 | `www` |
| 업데이트 방식 | 앱 시작 시 foreground 다운로드 |

관련 구현 파일:

- `capacitor.config.ts`: Appflow 앱, 채널, 업데이트 방식 설정
- `app/components/LiveUpdateGate.tsx`: 업데이트 확인, 다운로드 진행률, 단계 및 학습 팁 화면
- `package.json`: 로컬 및 Appflow 모바일 빌드 명령

## 2. 사용자에게 적용되는 방식

앱을 실행하면 다음 순서로 동작합니다.

1. `Production` 채널에 새 Web Build가 있는지 확인합니다.
2. 새 버전이 있으면 캐릭터가 있는 시작 화면에서 진행률을 표시하며 내려받습니다.
3. 화면 하단의 학습 팁은 약 3.6초마다 바뀝니다.
4. 다운로드가 끝나면 100% 완료 상태를 표시하고 새 웹 번들로 다시 로드합니다.
5. 업데이트가 없으면 짧은 확인 후 기존 앱 화면으로 들어갑니다.
6. 오류가 발생하면 `다시 시도` 또는 `현재 버전으로 시작`을 선택할 수 있습니다.

앱이 이미 실행 중일 때 화면이 실시간으로 교체되지는 않습니다. 앱을 완전히 종료한 후 다시 실행하면 업데이트 확인이 시작됩니다.

## 3. OTA로 배포할 수 있는 변경

다음 변경은 일반적으로 App Store 재심사 없이 Web Build로 배포할 수 있습니다.

- React 및 Next.js 클라이언트 화면
- 문구, 메뉴, 페이지, 학습 콘텐츠
- CSS, 폰트 및 웹 정적 이미지
- 퀴즈와 학습 로직
- 클라이언트 측 버그 수정
- 웹 라우팅

Appflow OTA는 앱 안의 웹 번들만 갱신합니다. 브라우저로 접속하는 웹사이트도 변경해야 한다면 기존 Vercel 배포도 별도로 확인해야 합니다.

## 4. App Store 재출시가 필요한 변경

다음 변경은 OTA만으로 배포하지 말고 새 iOS 빌드를 만들어 TestFlight와 App Store 심사를 진행해야 합니다.

- 앱 아이콘 또는 네이티브 Launch Screen
- 앱 표시 이름, Bundle ID, 버전 또는 빌드 번호
- `capacitor.config.ts`의 네이티브 동작 설정
- Capacitor 플러그인 추가, 제거 또는 버전 변경
- 카메라, 마이크, 알림, 사진 등 iOS 권한
- `Info.plist`, entitlements, signing 설정
- Swift 또는 Objective-C 코드
- Firebase plist, AdMob 네이티브 ID
- Apple이 심사한 앱의 핵심 목적을 크게 바꾸는 기능

Windows에서는 iOS 아카이브를 만들 수 없습니다. 네이티브 변경은 Xcode가 설치된 Mac에서 최종 빌드해야 합니다.

## 5. 최초 개발 환경 준비

### 공통 요구사항

- Git
- Node.js 20.x
- npm
- 저장소와 Ionic Appflow에 접근 가능한 계정

```bash
git clone https://github.com/SsunLee/ssunbae_katakana-flashcards.git
cd ssunbae_katakana-flashcards
npm ci
```

`npm ci`는 `package-lock.json`에 고정된 의존성을 설치하므로 `npm install`보다 우선 사용합니다.

### Windows

PowerShell 또는 Git Bash에서 위 명령을 그대로 사용할 수 있습니다. 프로젝트가 `cross-env`를 사용하므로 아래 npm 명령도 Windows에서 동일하게 동작합니다.

```powershell
npm run dev
npm run appflow:build
```

Windows에서도 웹 수정, 정적 모바일 빌드 확인, Git 푸시, Appflow Web Build 배포까지 가능합니다. Xcode가 필요한 iOS 네이티브 빌드만 Mac에서 진행합니다.

### macOS

네이티브 iOS 확인이 필요할 때만 Xcode와 CocoaPods를 준비합니다.

```bash
npm run mobile:sync:ios
npx cap open ios
```

`ios/App/App/public`과 `www`는 생성 결과입니다. 직접 수정하지 마십시오.

## 6. 웹 수정부터 Production OTA 배포까지

### 6.0 페이지 개선과 `배포까지` 요청의 완료 기준

사용자가 페이지 개선, UI 수정, 문구 변경, 학습 콘텐츠 추가, 퀴즈 로직 수정 같은 웹 계층 작업과 함께 `배포`, `배포까지`, `적용`, `운영 반영`을 요청하면 다음 두 배포를 모두 수행합니다.

1. GitHub `main` 푸시 후 Vercel Production 배포
2. 같은 `main` 커밋으로 Appflow Web Build 생성 후 `Production` Live Update 배포

Vercel만 배포하고 Appflow를 생략하면 브라우저 사이트에는 반영되지만 설치된 iOS 앱에는 반영되지 않을 수 있습니다. 반대로 Appflow만 배포하면 앱 웹 번들은 갱신되지만 `ssunedu.com` 웹사이트는 이전 버전일 수 있습니다.

`배포까지` 요청의 완료 조건은 다음과 같습니다.

- `npm run build` 성공
- `npm run appflow:build` 성공 및 `www/index.html` 생성
- 최신 원격 변경을 반영한 `main` 푸시 성공
- Vercel Production 상태 `READY`
- Appflow Web Build 상태 `Success`
- Appflow `Production` 채널의 Active build가 해당 커밋으로 변경됨
- 운영 웹 URL과 Appflow 배정 결과 확인

사용자가 명시적으로 웹만 배포하거나 OTA를 제외해 달라고 요청한 경우에만 Appflow 단계를 생략합니다. 인증 문제로 Appflow 접근이 막히면 생략했다고 완료 처리하지 말고, 로그인을 요청한 뒤 배포를 이어서 진행합니다.

이 규칙은 React 화면, CSS, 문구, 웹 이미지, 학습 콘텐츠, 클라이언트 퀴즈 로직처럼 OTA 가능한 변경에 적용합니다. 네이티브 변경이 포함되면 4장의 App Store 재출시 기준을 우선합니다.

### 6.1 최신 코드 받기

작업 전 반드시 원격 `main`을 먼저 받습니다.

```bash
git switch main
git pull --ff-only origin main
npm ci
```

여러 사람이 동시에 작업한다면 별도 브랜치에서 수정하고 검토 후 `main`에 병합하는 방식을 권장합니다.

```bash
git switch -c feature/작업이름
```

### 6.2 웹 코드 수정 및 브라우저 확인

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 변경한 기능과 모바일 너비를 확인합니다.

### 6.3 모바일 정적 번들 확인

Appflow와 동일한 모바일 출력 형식을 확인하려면 다음 명령을 사용합니다.

```bash
npm run appflow:build
```

성공 조건:

- 명령이 오류 없이 종료됨
- 프로젝트 루트에 `www/index.html`이 생성됨
- 모바일 번들에 운영 학습 API(`https://ssunbae-api.vercel.app`)와 계정 API(`https://ssunedu.com`)가 각각 포함됨
- 모바일 번들에 `NEXT_PUBLIC_APP_ENV=production`과 iOS·Android 운영 AdMob 배너 ID가 포함됨
- 수정한 페이지가 정적 빌드 단계에서 실패하지 않음

`npm run mobile:build`는 개발 확인용이며 테스트 광고를 사용합니다. Appflow OTA와 스토어 제출용 Android 동기화에는 각각 `npm run appflow:build`, `npm run mobile:sync:android:release`를 사용하십시오. `.env.local`과 비밀 키는 절대 Git에 커밋하지 마십시오.

### 6.4 커밋 및 GitHub 푸시

```bash
git status
git add <수정한 파일>
git commit -m "변경 내용을 설명하는 메시지"
git push origin <현재-브랜치>
```

Appflow에서 배포할 커밋은 최종적으로 GitHub `main` 브랜치에 있어야 합니다.

### 6.5 Appflow Web Build 생성

1. [쑨에듀 Appflow 대시보드](https://dashboard.ionicframework.com/app/6f7685c7/build/builds)를 엽니다.
2. `New build`를 누릅니다.
3. 배포할 최신 `main` 커밋을 선택합니다.
4. Target platform에서 `Web`을 선택합니다.
5. `Live update`를 `On`으로 변경합니다.
6. Channels에서 `Production`만 선택합니다.
7. `Build`를 눌러 실행합니다.
8. 상태가 `Success`가 될 때까지 기다립니다.
9. Deployment 항목에 `Production`이 표시되는지 확인합니다.

현재 운영에서는 `Staging`을 사용하지 않습니다. 실수로 `Staging`만 선택하면 상용 앱에는 반영되지 않습니다.

### 6.6 실제 기기 확인

1. iPhone에서 쑨에듀 앱을 완전히 종료합니다.
2. 앱을 다시 실행합니다.
3. 업데이트 화면과 진행률이 표시되는지 확인합니다.
4. 완료 후 수정한 화면과 기능을 확인합니다.

앱을 다시 시작하지 않고 확인하려면 사이드 메뉴의 `설정 > 업데이트 확인`을 사용할 수 있습니다. 이 버튼은 Live Updates가 활성화되고 `autoUpdateMethod: none`인 네이티브 앱에서만 표시됩니다.

## 7. Production 배포 전 체크리스트

- `git status`에 의도하지 않은 파일이 포함되지 않았는가
- `npm run appflow:build`가 성공했는가
- `www/index.html`이 생성됐는가
- 생성된 운영 번들에 Google 공식 테스트 광고 ID가 선택되지 않았는가
- 로그인 전후 화면을 모두 확인했는가
- 모바일 화면에서 텍스트가 잘리거나 겹치지 않는가
- 기존 학습 데이터와 로컬 저장 데이터가 유지되는가
- Appflow에서 최신 커밋을 선택했는가
- 플랫폼이 `Web`인가
- Live update가 `On`인가
- 채널이 정확히 `Production`인가

## 8. 문제 발생 시 롤백

Production OTA에 문제가 있으면 새 코드를 급히 덮어쓰기보다 이전 정상 Web Build로 먼저 롤백합니다.

1. Appflow에서 `Deploy > Live Update Channels > Production`을 엽니다.
2. History에서 마지막으로 정상 동작한 Web Build를 찾습니다.
3. 해당 행의 `Roll back to here`를 실행합니다.
4. 실제 기기에서 앱을 완전히 종료하고 다시 실행합니다.
5. 정상 버전으로 돌아왔는지 확인합니다.

앱은 최대 두 개의 웹 버전을 캐시하도록 `maxVersions: 2`로 설정되어 있습니다.

## 9. 자주 발생하는 문제

### Appflow 빌드는 성공했지만 앱에서 변경되지 않음

- Web Build가 `Production`에 배포됐는지 확인합니다.
- 채널 이름은 대소문자를 포함해 `Production`이어야 합니다.
- 앱을 백그라운드로만 보내지 말고 완전히 종료한 후 다시 실행합니다.
- 기기의 네트워크 연결을 확인합니다.
- `2.2` 이상의 앱인지 확인합니다. foreground 업데이트 화면은 `2.2`부터 적용됩니다.

### Appflow manifest가 비어 있거나 `null`임

- Appflow 로그에서 `webDir is www`인지 확인합니다.
- 빌드 결과에 `www/index.html`이 있는지 확인합니다.
- 숨김 폴더인 `.next-mobile`을 Appflow 산출물로 사용하지 마십시오.
- 반드시 저장소의 `npm run appflow:build`를 사용합니다.

### 로컬 빌드에서 Firebase 환경 변수 오류 발생

- `.env.local.example`을 참고해 `.env.local`을 구성합니다.
- 또는 Appflow 검증용으로 `npm run appflow:build`를 사용합니다.
- Firebase의 `NEXT_PUBLIC_*` 값과 서버 비밀 키를 혼동하지 마십시오.

### 문장 퀴즈가 10개만 표시됨

- 모바일 번들에 `NEXT_PUBLIC_API_BASE_URL`이 포함되지 않으면 기본 문장 10개만 사용합니다.
- 반드시 `npm run appflow:build` 또는 `npm run mobile:build`로 모바일 번들을 생성합니다.
- 운영 API의 `/api/japanese-sentence-quiz` 응답과 `capacitor://localhost` CORS 허용 여부를 확인합니다.

### Windows에서 iOS 명령이 실행되지 않음

- 정상입니다. `xcodebuild`, CocoaPods, iOS Simulator는 macOS와 Xcode가 필요합니다.
- 웹 OTA 작업에는 해당 도구가 필요하지 않습니다.
- 네이티브 변경이 포함됐다면 Mac 담당자에게 새 iOS 빌드와 심사를 요청합니다.

### 업데이트 다운로드 실패

- 앱의 `다시 시도`를 먼저 사용합니다.
- 급한 경우 `현재 버전으로 시작`으로 기존 번들을 사용할 수 있습니다.
- Appflow Production 채널의 활성 빌드와 빌드 로그를 확인합니다.

## 10. 빠른 요약

웹 코드만 수정했다면 다음 흐름입니다.

```text
코드 수정
  -> npm run dev
  -> npm run appflow:build
  -> Git 커밋 및 main 푸시
  -> Vercel Production READY 및 ssunedu.com 확인
  -> Appflow New build
  -> Web / Live update On / Production
  -> Build Success 확인
  -> iPhone 앱 완전 종료 후 재실행
     또는 설정 > 업데이트 확인
  -> 업데이트 및 기능 확인
```

네이티브 파일이나 앱 아이콘을 수정했다면 이 흐름에 TestFlight와 App Store 심사가 추가됩니다.
