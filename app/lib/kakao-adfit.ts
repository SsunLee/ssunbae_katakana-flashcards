export function normalizeAdUnit(value?: string | null): string {
  if (!value) return "";
  const trimmed = value.trim().replace(/^['"]|['"]$/g, "");
  return /^DAN-[A-Za-z0-9_-]+$/.test(trimmed) ? trimmed : "";
}

export function resolveAdUnit(
  candidates: Array<string | undefined | null>,
  fallback: string
): string {
  for (const candidate of candidates) {
    const normalized = normalizeAdUnit(candidate);
    if (normalized) return normalized;
  }
  return fallback;
}

