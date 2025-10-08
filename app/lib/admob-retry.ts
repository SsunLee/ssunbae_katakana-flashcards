// app/lib/admob-retry.ts
import { AdMob, BannerAdPluginEvents } from '@capacitor-community/admob';

let retry = 0;
const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

export function installAdRetry(show: () => Promise<void>) {
  AdMob.addListener(BannerAdPluginEvents.FailedToLoad, async () => {
    // UI 복구: 여백 0으로
    document.documentElement.style.setProperty('--ad-inset', `0px`);
    // 지수 백오프 (최대 32s)
    retry = Math.min(retry + 1, 5);
    await wait(1000 * Math.pow(2, retry));
    try { await show(); } catch {}
  });

  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    retry = 0; // 성공 시 초기화
  });
}
