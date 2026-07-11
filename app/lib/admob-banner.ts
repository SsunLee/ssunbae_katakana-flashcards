// /app/lib/admob-banner.ts

'use client';

import {
  AdMob,
  BannerAdOptions,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';



// Google의 공식 테스트 광고 ID입니다.
const TEST_IOS_BANNER = 'ca-app-pub-2330147867465531/5805463890';
const TEST_ANDROID_BANNER = 'ca-app-pub-3940256099942544/6300978111';

// ---- internal state ----
let listenersInstalled = false;
let lastOptions: BannerAdOptions | null = null;
let isVisible = false;
let inflight = false;
let retry = 0;
let suppressed = false;
let lastHeight = 0;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const setInset = (px: number) => {
  if (lastHeight === px) return;
  lastHeight = px;
  document.documentElement.style.setProperty('--ad-inset', `${px}px`);
};

function pickBannerSize(): BannerAdSize {
  const w = typeof window !== 'undefined' ? window.innerWidth : 390;
  const h = typeof window !== 'undefined' ? window.innerHeight : 812;
  return (w >= 400 && h >= 820) ? BannerAdSize.LARGE_BANNER : BannerAdSize.BANNER;
}

function installListenersOnce() {
  if (listenersInstalled) return;
  listenersInstalled = true;

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, ({ height }) => { setInset(height || 0); });
  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    retry = 0;
    isVisible = true;
    inflight = false;
  });
  AdMob.addListener(BannerAdPluginEvents.FailedToLoad, async (error) => {
    console.error('[AdMob Banner] 광고 로드 실패:', error);
    inflight = false;
    isVisible = false;
    setInset(0);
    if (suppressed) return;

    retry = Math.min(retry + 1, 5);
    await sleep(1000 * Math.pow(2, retry));
    if (lastOptions && !suppressed) {
      void ensureShown(lastOptions, /*forceReload=*/true);
    }
  });
}


export async function ensureShown(
  opts?: Partial<BannerAdOptions>,
  forceReload = false
) {
  installListenersOnce();

  // --- 👇 [수정] 함수가 호출되는 시점에 환경 변수를 읽도록 위치를 변경합니다. ---
  const platform = Capacitor.getPlatform();
  const PROD_IOS_BANNER = process.env.NEXT_PUBLIC_ADMOB_BANNER_ID ?? '';
  const PROD_ANDROID_BANNER = process.env.NEXT_PUBLIC_ADMOB_ANDROID_BANNER_ID ?? '';
  const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'production';
  const productionAdId = platform === 'android' ? PROD_ANDROID_BANNER : PROD_IOS_BANNER;
  const testAdId = platform === 'android' ? TEST_ANDROID_BANNER : TEST_IOS_BANNER;
  const adIdToUse = isProd ? productionAdId : testAdId;
  // --- 👆 [수정] ---
  
  // 로그는 그대로 유지하여 확인합니다.
  console.log("--- [AdMob Banner] 광고 표시 로직 시작 ---");
  console.log(`[AdMob Banner] 1. 환경 변수 (NEXT_PUBLIC_APP_ENV): "${process.env.NEXT_PUBLIC_APP_ENV}"`);
  console.log(`[AdMob Banner] 2. 운영 환경인가? (isProd): ${isProd}`);
  console.log(`[AdMob Banner] 3. 플랫폼: "${platform}"`);
  console.log(`[AdMob Banner] 4. 운영용 광고 ID: "${productionAdId}"`);
  console.log(`[AdMob Banner] 5. 최종 사용될 광고 ID: "${adIdToUse}"`);
  
  const desired: BannerAdOptions = {
    adId: opts?.adId ?? adIdToUse,
    adSize: opts?.adSize ?? pickBannerSize(),
    position: opts?.position ?? BannerAdPosition.BOTTOM_CENTER,
    margin: opts?.margin ?? 0,
  };
  
  console.log(`[AdMob Banner] 6. AdMob에 전달될 옵션:`, desired);

  if (!forceReload && isVisible && lastOptions &&
      JSON.stringify({ ...lastOptions, adId: 'x' }) === JSON.stringify({ ...desired, adId: 'x' })) {
    return;
  }

  if (inflight) return;

  inflight = true;
  suppressed = false;
  lastOptions = desired;

  try {
    if (isVisible) {
      if (lastHeight && desired.adSize !== lastOptions?.adSize) {
        await AdMob.hideBanner().catch(() => {});
        await AdMob.removeBanner().catch(() => {});
      } else {
        await AdMob.hideBanner().catch(() => {});
      }
    }

    setInset(0);
    // adId가 비어있으면 요청을 보내지 않도록 방어 코드를 추가합니다.
    if (!desired.adId) {
      console.error('[AdMob Banner] 광고 ID가 비어있어 요청을 보내지 않습니다.');
      inflight = false;
      return;
    }
    await AdMob.showBanner(desired);
  } catch (error) {
    console.error('[AdMob Banner] showBanner 함수에서 에러 발생:', error);
    inflight = false;
    isVisible = false;
  }
}

// ... (ensureHidden, refreshIfNeeded 함수는 동일)
export async function ensureHidden() {
  suppressed = true;
  if (!isVisible) return;
  await AdMob.hideBanner().catch(() => {});
  isVisible = false;
  setInset(0);
}

export async function refreshIfNeeded() {
  if (!lastOptions) return;
  const size = pickBannerSize();
  if (size !== lastOptions.adSize) {
    await ensureShown({ ...lastOptions, adSize: size }, /*forceReload=*/true);
  }
}
