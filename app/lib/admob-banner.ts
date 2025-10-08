// app/lib/admob-banner.ts
'use client';

import {
  AdMob,
  BannerAdOptions,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';


const PROD_IOS_BANNER = process.env.NEXT_PUBLIC_ADMOB_IOS_BANNER_ID ?? ''; 
const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'production';
const TEST_IOS_BANNER = 'ca-app-pub-3940256099942544/2934735716';

// ---- internal state ----
let listenersInstalled = false;
let lastOptions: BannerAdOptions | null = null;
let isVisible = false;       // 현재 화면에 보여지는 상태(추적)
let inflight = false;        // showBanner 진행 중
let retry = 0;
let suppressed = false;      // overlay/keyboard 등으로 임시 숨김 상태
let lastHeight = 0;

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const setInset = (px: number) => {
  if (lastHeight === px) return;
  lastHeight = px;
  document.documentElement.style.setProperty('--ad-inset', `${px}px`);
};

// “작은 배너만” 전략: 320×50 또는 320×100
function pickBannerSize(): BannerAdSize {
  const w = typeof window !== 'undefined' ? window.innerWidth : 390;
  const h = typeof window !== 'undefined' ? window.innerHeight : 812;
  return (w >= 400 && h >= 820) ? BannerAdSize.LARGE_BANNER : BannerAdSize.BANNER;
}

function installListenersOnce() {
  if (listenersInstalled) return;
  listenersInstalled = true;

  AdMob.addListener(BannerAdPluginEvents.SizeChanged, ({ height }) => {
    // 배너가 로드되면 높이를 패딩으로 반영
    setInset(height || 0);
  });

  AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
    retry = 0;
    isVisible = true;       // 성공하면 보이는 상태
    inflight = false;
  });

  AdMob.addListener(BannerAdPluginEvents.FailedToLoad, async () => {
    inflight = false;
    isVisible = false;
    setInset(0);
    if (suppressed) return; // 가리는 UI 중이면 재시도하지 않음(깜빡임 방지)

    // 지수 백오프(최대 32s)
    retry = Math.min(retry + 1, 5);
    await sleep(1000 * Math.pow(2, retry));
    if (lastOptions && !suppressed) {
      void ensureShown(lastOptions, /*forceReload=*/true);
    }
  });
}

// ---- public APIs ----

// 화면에 보이게(중복 방지, 필요할 때만 요청)
export async function ensureShown(
  opts?: Partial<BannerAdOptions>,
  forceReload = false
) {
  installListenersOnce();

  // ✨ [수정] 운영 환경(production)에서는 실제 광고 ID를, 그 외에는 테스트 ID를 사용합니다.
  const adIdToUse = isProd ? PROD_IOS_BANNER : TEST_IOS_BANNER;

  const desired: BannerAdOptions = {
    adId: opts?.adId ?? adIdToUse,
    adSize: opts?.adSize ?? pickBannerSize(),
    position: opts?.position ?? BannerAdPosition.BOTTOM_CENTER,
    margin: opts?.margin ?? 0,
  };

  // 같은 옵션이고 이미 보이는 중이면 NO-OP
  if (!forceReload && isVisible && lastOptions &&
      JSON.stringify({ ...lastOptions, adId: 'x' }) === JSON.stringify({ ...desired, adId: 'x' })) {
    return;
  }

  // 진행 중이면 스킵(깜빡임 방지)
  if (inflight) return;

  inflight = true;
  suppressed = false;
  lastOptions = desired;

  try {
    // 재요청 전 깨끗이 정리(깜빡임 최소: hide만 사용, remove는 사이즈/포지션 바뀔 때만)
    if (isVisible) {
      if (lastHeight && desired.adSize !== lastOptions?.adSize) {
        await AdMob.hideBanner().catch(() => {});
        await AdMob.removeBanner().catch(() => {}); // 사이즈 변경시에만 제거
      } else {
        await AdMob.hideBanner().catch(() => {});
      }
    }

    setInset(0);
    await AdMob.showBanner(desired);
  } catch {
    inflight = false;
    isVisible = false;
  }
}

// 화면에서 숨기기(배너는 유지 → 깜빡임↓)
export async function ensureHidden() {
  suppressed = true;
  if (!isVisible) return; // 이미 숨김
  await AdMob.hideBanner().catch(() => {});
  isVisible = false;
  setInset(0);
}

// 사이즈/회전 등으로 새로 갱신
export async function refreshIfNeeded() {
  if (!lastOptions) return;
  const size = pickBannerSize();
  if (size !== lastOptions.adSize) {
    await ensureShown({ ...lastOptions, adSize: size }, /*forceReload=*/true);
  }
}