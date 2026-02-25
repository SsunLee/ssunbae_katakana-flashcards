"use client";

import { useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";

type KakaoAdFitProps = {
  adUnit: string;
  width?: number;
  height?: number;
  className?: string;
};

const ADFIT_SCRIPT_SRC = "https://t1.daumcdn.net/kas/static/ba.min.js";

export default function KakaoAdFit({
  adUnit,
  width = 300,
  height = 250,
  className,
}: KakaoAdFitProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;
    if (!adUnit) return;
    if (Capacitor.isNativePlatform()) return;

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

    mountEl.appendChild(ins);
    mountEl.appendChild(script);

    return () => {
      mountEl.innerHTML = "";
    };
  }, [adUnit, width, height]);

  if (!adUnit) return null;

  return (
    <div
      ref={mountRef}
      className={className}
      style={{ width, minHeight: height }}
      aria-label="kakao-adfit-slot"
    />
  );
}

