// hooks/useContentImporter.ts
"use client";

import { useCallback } from "react";
import { importContentAndNotify, type ImportDeps } from "@/app/services/contentImporter";

export function useContentImporter<T>(
  baseDeps: Omit<ImportDeps<T>, "topic" | "count">
) {
  // topic/count만 바뀌며 호출할 수 있는 핸들러를 제공
  const run = useCallback(
    (topic: string, count: number) =>
      importContentAndNotify<T>({ ...baseDeps, topic, count }),
    [baseDeps]
  );
  return { importContent: run };
}
