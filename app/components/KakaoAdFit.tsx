"use client";

import { useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";

type KakaoAdFitProps = {
  adUnit: string;
  width?: number;
  height?: number;
  className?: string;
  onFillChange?: (filled: boolean) => void;
  reserveSpace?: boolean;
};

const ADFIT_SCRIPT_SRC = "https://t1.daumcdn.net/kas/static/ba.min.js";

function hasVisibleAdContent(mountEl: HTMLDivElement, ins: HTMLModElement) {
  if (mountEl.querySelector("iframe")) return true;
  if (ins.style.display !== "none") return true;
  if (ins.childElementCount > 0) return true;
  return false;
}

export default function KakaoAdFit({
  adUnit,
  width = 300,
  height = 250,
  className,
  onFillChange,
  reserveSpace = true,
}: KakaoAdFitProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;
    if (!adUnit) return;
    if (Capacitor.isNativePlatform()) return;

    setIsFilled(false);
    mountEl.innerHTML = "";

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.setAttribute("data-ad-unit", adUnit);
    ins.setAttribute("data-ad-width", String(width));
    ins.setAttribute("data-ad-height", String(height));

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = ADFIT_SCRIPT_SRC;
    script.async = true;

    let settled = false;
    const reportFill = (filled: boolean) => {
      if (settled && !filled) return;
      if (filled) settled = true;
      setIsFilled(filled);
      onFillChange?.(filled);
    };

    const checkFill = () => {
      reportFill(hasVisibleAdContent(mountEl, ins));
    };

    const observer = new MutationObserver(checkFill);
    observer.observe(mountEl, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"],
    });

    const timeoutIds = [600, 1600, 3200].map((delay) =>
      window.setTimeout(checkFill, delay)
    );

    mountEl.appendChild(ins);
    mountEl.appendChild(script);

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
      observer.disconnect();
      mountEl.innerHTML = "";
    };
  }, [adUnit, width, height, onFillChange]);

  if (!adUnit) return null;

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width,
        minHeight: reserveSpace || isFilled ? height : 0,
        overflow: reserveSpace || isFilled ? undefined : "hidden",
      }}
      aria-label="kakao-adfit-slot"
    />
  );
}
