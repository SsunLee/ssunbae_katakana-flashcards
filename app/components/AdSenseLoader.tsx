"use client";

import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { usePathname } from "next/navigation";

const ADSENSE_CLIENT = "ca-pub-3025305005440839";
const ADSENSE_SCRIPT_ID = "ssunedu-adsense";

const CONTENT_PATHS = new Set([
  "/",
  "/about",
  "/study/english/sentences",
  "/study/english/words",
  "/study/japanese",
  "/study/japanese/hiragana-chars",
  "/study/japanese/kana-chars",
  "/study/japanese/kanji",
  "/study/japanese/katakana-chars",
  "/study/japanese/katakana-words",
  "/study/japanese/sentence-quiz",
  "/study/japanese/sentences",
  "/study/japanese/verbs",
  "/study/korean/chars",
  "/study/korean/sentences",
  "/study/korean/syllables",
  "/study/korean/words",
  "/study/spanish/sentences",
  "/study/spanish/words",
]);

function isContentPath(pathname: string) {
  return CONTENT_PATHS.has(pathname);
}

export default function AdSenseLoader() {
  const pathname = usePathname();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;

    const existingScript = document.getElementById(ADSENSE_SCRIPT_ID);

    if (!isContentPath(pathname)) {
      if (existingScript) {
        existingScript.remove();
        // A full reload clears Auto ads state that can survive an App Router transition.
        window.location.reload();
      }
      return;
    }

    if (existingScript) return;

    const script = document.createElement("script");
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    document.head.appendChild(script);
  }, [pathname]);

  return null;
}
