// capacitor.config.ts

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ssunbae.edu', // 여기에 본인의 앱 ID를 입력하세요
  appName: 'ssunbae-edu',
  webDir: 'out',
  loggingBehavior: 'debug' // 개발 중에는 모든 로그(debug, log, error 등)를 출력합니다.
};

export default config;
