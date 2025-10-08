// app/lib/admob.ts
import {
  AdMob,
  AdmobConsentDebugGeography,
  AdmobConsentStatus,
  type AdmobConsentInfo,
} from '@capacitor-community/admob';

export async function initAdmob() {
  await AdMob.initialize();

  // 개발 중 디버깅 옵션 (배포 전 제거)
  await AdMob.requestConsentInfo({
    debugGeography: AdmobConsentDebugGeography.EEA,
    testDeviceIdentifiers: ['SIMULATOR'],
  });

  // 1) 현재 동의 정보 조회
  let info: AdmobConsentInfo = await AdMob.requestConsentInfo();

  // 2) 폼 필요/가능하면 표시
  if (info.isConsentFormAvailable) {
    await AdMob.showConsentForm().catch(() => {});
    // 폼 닫힌 뒤 상태 재조회
    info = await AdMob.requestConsentInfo();
  }

  // 3) 최종 판정: status로 canRequestAds를 계산
  const canRequestAds =
    info.status === AdmobConsentStatus.OBTAINED ||
    info.status === AdmobConsentStatus.NOT_REQUIRED;

  return canRequestAds;
}
