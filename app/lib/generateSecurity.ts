export const GENERATE_LIMITS = {
  maxBodyBytes: 4096,
  maxCount: 20,
  minuteRequests: 6,
  hourRequests: 30,
} as const;

export const ALLOWED_GENERATE_DECK_TYPES = new Set([
  "english-words",
  "spanish-words",
  "katakana-words",
  "kanji-words",
  "sentences",
  "spanish-sentences",
]);

export const ALLOWED_GENERATE_ORIGINS = new Set([
  "https://ssunedu.com",
  "https://www.ssunedu.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "capacitor://localhost",
  "http://localhost",
]);

export type GeneratePayload = {
  deckType: string;
  topic: string;
  count: number;
};

type RateLimitEntry = {
  minuteWindow: number;
  minuteCount: number;
  hourWindow: number;
  hourCount: number;
  lastSeen: number;
};

export type GenerateRateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

type GenerateRateLimitGlobal = typeof globalThis & {
  __ssunbaeWebGenerateRateLimits?: Map<string, RateLimitEntry>;
};

const globalRateLimit = globalThis as GenerateRateLimitGlobal;
const rateLimitStore =
  globalRateLimit.__ssunbaeWebGenerateRateLimits ??
  (globalRateLimit.__ssunbaeWebGenerateRateLimits = new Map<string, RateLimitEntry>());

export class GenerateRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
  }
}

function getClientIdentifier(request: Request) {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function resetExpiredWindows(entry: RateLimitEntry, now: number) {
  const minuteWindow = Math.floor(now / 60_000);
  const hourWindow = Math.floor(now / 3_600_000);
  if (entry.minuteWindow !== minuteWindow) {
    entry.minuteWindow = minuteWindow;
    entry.minuteCount = 0;
  }
  if (entry.hourWindow !== hourWindow) {
    entry.hourWindow = hourWindow;
    entry.hourCount = 0;
  }
}

export function consumeGenerateRateLimit(request: Request): GenerateRateLimitResult {
  const now = Date.now();
  const identifier = getClientIdentifier(request);
  const minuteWindow = Math.floor(now / 60_000);
  const hourWindow = Math.floor(now / 3_600_000);
  const entry = rateLimitStore.get(identifier) ?? {
    minuteWindow,
    minuteCount: 0,
    hourWindow,
    hourCount: 0,
    lastSeen: now,
  };

  resetExpiredWindows(entry, now);
  entry.lastSeen = now;

  const minuteBlocked = entry.minuteCount >= GENERATE_LIMITS.minuteRequests;
  const hourBlocked = entry.hourCount >= GENERATE_LIMITS.hourRequests;
  if (minuteBlocked || hourBlocked) {
    rateLimitStore.set(identifier, entry);
    const retryAfterSeconds = hourBlocked
      ? Math.max(1, Math.ceil(((entry.hourWindow + 1) * 3_600_000 - now) / 1000))
      : Math.max(1, Math.ceil(((entry.minuteWindow + 1) * 60_000 - now) / 1000));
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  entry.minuteCount += 1;
  entry.hourCount += 1;
  rateLimitStore.set(identifier, entry);

  if (rateLimitStore.size > 5_000) {
    const expiry = now - 2 * 3_600_000;
    rateLimitStore.forEach((value, key) => {
      if (value.lastSeen < expiry) rateLimitStore.delete(key);
    });
  }

  return {
    allowed: true,
    remaining: Math.max(0, GENERATE_LIMITS.minuteRequests - entry.minuteCount),
    retryAfterSeconds: 0,
  };
}

export function isAllowedGenerateOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || ALLOWED_GENERATE_ORIGINS.has(origin);
}

export function buildGenerateResponseHeaders(
  request: Request,
  rateLimit?: GenerateRateLimitResult
) {
  const headers = new Headers({
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  });
  const origin = request.headers.get("origin");
  headers.set(
    "Access-Control-Allow-Origin",
    origin && ALLOWED_GENERATE_ORIGINS.has(origin) ? origin : "https://ssunedu.com"
  );

  if (rateLimit) {
    headers.set("X-RateLimit-Limit", String(GENERATE_LIMITS.minuteRequests));
    headers.set("X-RateLimit-Remaining", String(rateLimit.remaining));
    if (!rateLimit.allowed) headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
  }
  return headers;
}

export function validateGeneratePayload(rawText: string): GeneratePayload {
  if (Buffer.byteLength(rawText, "utf8") > GENERATE_LIMITS.maxBodyBytes) {
    throw new GenerateRequestError("요청 내용이 너무 깁니다.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawText);
  } catch {
    throw new GenerateRequestError("요청 형식이 올바르지 않습니다.", 400);
  }
  if (!body || typeof body !== "object") {
    throw new GenerateRequestError("요청 형식이 올바르지 않습니다.", 400);
  }

  const { deckType, topic, count } = body as Partial<GeneratePayload>;
  if (typeof deckType !== "string" || !ALLOWED_GENERATE_DECK_TYPES.has(deckType)) {
    throw new GenerateRequestError("지원되지 않는 학습 유형입니다.", 400);
  }
  const normalizedTopic = typeof topic === "string" ? topic.trim() : "";
  if (!normalizedTopic || normalizedTopic.length > 80 || /[\u0000-\u001F\u007F]/.test(normalizedTopic)) {
    throw new GenerateRequestError("주제는 1자 이상 80자 이하로 입력해 주세요.", 400);
  }
  if (!Number.isInteger(count) || (count as number) < 1 || (count as number) > GENERATE_LIMITS.maxCount) {
    throw new GenerateRequestError(`생성 개수는 1개 이상 ${GENERATE_LIMITS.maxCount}개 이하여야 합니다.`, 400);
  }

  return { deckType, topic: normalizedTopic, count: count as number };
}
