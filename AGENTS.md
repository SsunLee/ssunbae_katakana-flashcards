# SSUN EDU 작업 및 배포 지침

이 저장소에서 페이지, UI, 문구, 학습 콘텐츠, 웹 이미지, 퀴즈 로직 등 웹 계층을 수정할 때는 `docs/mobile-live-updates.md`를 배포 기준으로 사용한다.

## 사용자 요청 해석

- 사용자가 페이지 개선 또는 웹 기능 수정을 요청하면서 `배포`, `배포까지`, `적용`, `운영 반영`을 함께 요청하면 웹사이트 배포와 모바일 OTA 배포를 모두 요청한 것으로 본다.
- 이 경우 Vercel Production만 배포하고 작업을 종료하지 않는다. 동일한 `main` 커밋으로 Ionic Appflow Web Build를 만들고 `Production` Live Update 채널에도 배포한다.
- 사용자가 명시적으로 웹만 배포하거나 OTA를 제외하라고 한 경우에만 Appflow 단계를 생략한다.

## 웹 변경 배포 완료 기준

1. 작업 전 `main`과 `origin/main`을 동기화하고 사용자 변경을 보존한다.
2. 변경 범위에 맞는 로컬 브라우저 검증을 수행한다.
3. `npm run build`를 성공시켜 Vercel용 Next.js 빌드를 검증한다.
4. `npm run appflow:build`를 성공시켜 `www/index.html`과 모바일 정적 번들을 검증한다.
5. 모바일 번들에 학습 API `https://ssunbae-api.vercel.app`와 계정 API `https://ssunedu.com`이 각각 포함되는지 확인한다.
6. 의도한 파일만 커밋하고 최신 원격 변경을 반영한 뒤 `main`에 푸시한다.
7. Vercel Production 배포가 `READY`인지 확인하고 `https://ssunedu.com`에서 변경을 검증한다.
8. Ionic Appflow 앱 `6f7685c7`에서 동일한 최신 `main` 커밋으로 Web Build를 생성한다.
9. Appflow 설정은 `Live update: On`, 채널은 `Production`만 사용한다.
10. Appflow Build가 `Success`이고 Production 채널의 Active build로 지정됐는지 확인한다.
11. 최종 보고에 Git 커밋, Vercel 상태, Appflow Build 번호와 Production 배정 상태, 실행한 검증을 포함한다.

Vercel과 Appflow 중 하나라도 실패했거나 확인되지 않았다면 배포 완료로 보고하지 않는다. 인증이 필요하면 해당 서비스에서 로그인을 요청하고 완료 후 이어서 진행한다.

## OTA 제외 및 네이티브 변경

다음 변경은 Appflow Web Build만으로 배포하지 않는다.

- 앱 아이콘, Launch Screen, 앱 표시 이름
- Bundle ID, 앱 버전 또는 빌드 번호
- Capacitor 플러그인 추가, 제거 또는 버전 변경
- `Info.plist`, entitlements, iOS 권한, Swift 또는 Objective-C 코드
- Firebase plist, AdMob 네이티브 설정
- `capacitor.config.ts`의 네이티브 동작 설정

이 경우 Windows에서는 웹 검증까지만 수행할 수 있다. 새 iOS 아카이브, TestFlight, App Store 제출에는 macOS와 Xcode가 필요하다고 명확히 보고한다.

## Appflow 고정값

- Appflow App ID: `6f7685c7`
- 채널: `Production`
- Production 채널 ID: `fb7b7e30-7785-4ab8-90ee-2977e167e5f4`
- 모바일 출력 폴더: `www`
- 빌드 명령: `npm run appflow:build`
- 현재 운영에서는 `Staging`을 사용하지 않는다.

생성 폴더인 `www`와 `ios/App/App/public`은 직접 수정하거나 커밋하지 않는다.
