export const LIVE_UPDATE_REQUEST_EVENT = "ssunedu:live-update-request";

export function requestLiveUpdate() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(LIVE_UPDATE_REQUEST_EVENT));
}
