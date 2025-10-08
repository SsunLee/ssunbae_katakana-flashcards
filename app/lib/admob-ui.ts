// app/lib/admob-ui.ts
'use client';
import { AdMob, BannerAdPluginEvents } from '@capacitor-community/admob';

export function installAdSafeAreaBridges() {
  // 배너가 로드/크기 변경될 때마다 높이 전달
  AdMob.addListener(BannerAdPluginEvents.SizeChanged, ({ height }) => {
    document.documentElement.style.setProperty('--ad-inset', `${height || 0}px`);
  });
  // 실패/제거 시 0으로 복귀
  AdMob.addListener(BannerAdPluginEvents.FailedToLoad, () => {
    document.documentElement.style.setProperty('--ad-inset', `0px`);
  });
}
