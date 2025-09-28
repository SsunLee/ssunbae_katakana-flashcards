// lib/nextTick.ts
export const waitTwoFrames = () =>
  new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
