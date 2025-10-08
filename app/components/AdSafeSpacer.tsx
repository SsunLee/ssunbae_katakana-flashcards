'use client';
export default function AdSafeSpacer() {
  // 배너 이벤트가 넣는 --ad-inset + 안전영역 만큼 확보
  return (
    <div
      aria-hidden
      style={{ height: 'calc(var(--ad-inset) + env(safe-area-inset-bottom, 0px) + 12px)' }}
    />
  );
}
