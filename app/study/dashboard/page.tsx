"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock3, Layers3, Star, TrendingUp } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";

import { useAuth } from "@/app/AuthContext";
import KakaoAdFit from "@/app/components/KakaoAdFit";
import { LoginPromptCard } from "@/app/components/LoginPromptCard";
import { Button } from "@/app/components/ui/button";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { db } from "@/app/lib/firebase";
import { normalizeAdUnit } from "@/app/lib/kakao-adfit";
import { cn } from "@/app/lib/utils";
import {
  DASHBOARD_DECK_ORDER,
  type AnalyticsDailySummary,
  type LearningDeckData,
  type UserAnalyticsPayload,
  formatStudyMinutes,
  getDeckColor,
  getDeckLabel,
  getDeckPath,
  getFavoriteIds,
  getFavoritePreview,
} from "@/app/lib/studyDashboard";

type DashboardDoc = {
  learningData?: Record<string, LearningDeckData>;
  analytics?: UserAnalyticsPayload;
};

type DailyTotals = {
  studySeconds: number;
  sessions: number;
  cardsViewed: number;
};

const ACTIVITY_WINDOW_DAYS = 7;
const DASHBOARD_BANNER_AD_UNIT = normalizeAdUnit("DAN-CsPbwpoHeHagCsVE");
const DASHBOARD_MOBILE_BANNER_AD_UNIT = normalizeAdUnit("DAN-XHgkDQm4tU2MiVjQ");

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getLastDateKeys(days: number) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));
    return getLocalDateKey(date);
  });
}

function formatShortDateLabel(dateKey: string) {
  const [, month, day] = dateKey.split("-");
  return `${Number(month)}/${Number(day)}`;
}

function getActivityValue(day?: AnalyticsDailySummary) {
  return (day?.studySeconds ?? 0) + (day?.cardsViewed ?? 0) * 12;
}

function getStreakDays(dailySummary: Record<string, AnalyticsDailySummary>) {
  let streak = 0;

  for (let offset = 0; offset < 365; offset += 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const key = getLocalDateKey(date);
    const day = dailySummary[key];
    const isActive = (day?.sessions ?? 0) > 0 || (day?.studySeconds ?? 0) > 0 || (day?.cardsViewed ?? 0) > 0;

    if (!isActive) {
      break;
    }

    streak += 1;
  }

  return streak;
}

function sumDaily(days: AnalyticsDailySummary[]): DailyTotals {
  return days.reduce(
    (acc: DailyTotals, day) => {
      acc.studySeconds += day?.studySeconds ?? 0;
      acc.sessions += day?.sessions ?? 0;
      acc.cardsViewed += day?.cardsViewed ?? 0;
      return acc;
    },
    { studySeconds: 0, sessions: 0, cardsViewed: 0 }
  );
}

function MetricCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-background p-3 text-muted-foreground">{icon}</div>
      </div>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function CircularStat({
  label,
  value,
  caption,
  ratio,
  stroke,
}: {
  label: string;
  value: string;
  caption: string;
  ratio: number;
  stroke: string;
}) {
  const normalizedRatio = Math.max(0, Math.min(ratio, 1));
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - normalizedRatio);

  return (
    <div className="overflow-hidden rounded-[28px] border border-border bg-card p-5">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <svg width="104" height="104" viewBox="0 0 104 104" className="shrink-0">
          <circle cx="52" cy="52" r={radius} fill="none" stroke="currentColor" strokeWidth="10" className="text-muted/60" />
          <motion.circle
            cx="52"
            cy="52"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            transform="rotate(-90 52 52)"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          />
        </svg>
        <div className="min-w-0">
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          <p className="mt-1 break-keep text-sm text-muted-foreground">{caption}</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { open } = useAuthModal();
  const [dashboardDoc, setDashboardDoc] = useState<DashboardDoc | null>(null);
  const [isDocLoading, setIsDocLoading] = useState(false);
  const [isDesktopBannerFilled, setIsDesktopBannerFilled] = useState(false);
  const [isMobileBannerFilled, setIsMobileBannerFilled] = useState(false);

  useEffect(() => {
    if (!user) {
      setDashboardDoc(null);
      setIsDocLoading(false);
      return;
    }

    setIsDocLoading(true);
    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(
      userDocRef,
      (docSnap) => {
        setDashboardDoc((docSnap.data() as DashboardDoc | undefined) ?? null);
        setIsDocLoading(false);
      },
      (error) => {
        console.error("[dashboard] 문서 구독 실패", error);
        setDashboardDoc(null);
        setIsDocLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const learningData = dashboardDoc?.learningData ?? {};
  const analytics = dashboardDoc?.analytics ?? {};
  const dailySummary = analytics.dailySummary ?? {};
  const deckStats = analytics.deckStats ?? {};
  const activityKeys = useMemo(() => getLastDateKeys(ACTIVITY_WINDOW_DAYS), []);
  const activityDays = activityKeys.map((dateKey) => ({
    dateKey,
    label: formatShortDateLabel(dateKey),
    studySeconds: dailySummary[dateKey]?.studySeconds ?? 0,
    sessions: dailySummary[dateKey]?.sessions ?? 0,
    cardsViewed: dailySummary[dateKey]?.cardsViewed ?? 0,
    activityScore: getActivityValue(dailySummary[dateKey]),
  }));

  const todayKey = getLocalDateKey(new Date());
  const today = dailySummary[todayKey] ?? {};
  const last7Totals = sumDaily(activityKeys.map((dateKey) => dailySummary[dateKey] ?? {}));
  const favoriteDeckTypes = Object.keys(learningData).filter((deckType) => getFavoriteIds(learningData[deckType]).length > 0);
  const favoriteCount = favoriteDeckTypes.reduce((sum, deckType) => sum + getFavoriteIds(learningData[deckType]).length, 0);
  const streakDays = getStreakDays(dailySummary);
  const activeDeckSet = new Set([
    ...DASHBOARD_DECK_ORDER,
    ...Object.keys(learningData),
    ...Object.keys(deckStats),
  ]);
  const deckOverview = Array.from(activeDeckSet)
    .map((deckType) => {
      const stats = deckStats[deckType] ?? {};
      const favorites = getFavoriteIds(learningData[deckType]);
      return {
        deckType,
        label: getDeckLabel(deckType),
        href: getDeckPath(deckType),
        color: getDeckColor(deckType),
        studySeconds: stats.studySeconds ?? 0,
        sessions: stats.sessions ?? 0,
        cardsViewed: stats.cardsViewed ?? 0,
        favoriteCount: favorites.length,
        lastStudiedOn: stats.lastStudiedOn ?? null,
      };
    })
    .filter((deck) => deck.sessions > 0 || deck.favoriteCount > 0 || deck.cardsViewed > 0)
    .sort((a, b) => {
      const scoreA = a.studySeconds + a.cardsViewed * 20 + a.favoriteCount * 10;
      const scoreB = b.studySeconds + b.cardsViewed * 20 + b.favoriteCount * 10;
      return scoreB - scoreA;
    });

  const favoriteGroups = favoriteDeckTypes
    .map((deckType) => ({
      deckType,
      label: getDeckLabel(deckType),
      href: getDeckPath(deckType),
      items: getFavoriteIds(learningData[deckType]).map((id) => getFavoritePreview(deckType, id)),
    }))
    .sort((a, b) => b.items.length - a.items.length);

  const peakActivity = Math.max(...activityDays.map((day) => day.activityScore), 1);
  const peakDeckStudySeconds = Math.max(...deckOverview.map((deck) => deck.studySeconds), 1);
  const noAnalyticsYet = Object.keys(dailySummary).length === 0;
  const mostActiveDeck = deckOverview[0] ?? null;
  const totalStudySeconds = analytics.summary?.totalStudySeconds ?? 0;
  const totalSessions = analytics.summary?.totalSessions ?? 0;
  const totalCardsViewed = analytics.summary?.totalCardsViewed ?? 0;

  if (loading) {
    return <div className="min-h-screen w-full bg-background px-4 py-10 text-center text-muted-foreground">로딩 중...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-background px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <section className="rounded-[36px] border border-border bg-card p-8 shadow-sm">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-muted-foreground">
                <BarChart3 className="h-4 w-4" />
                분석 대시보드
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground">내 학습 흐름을 한눈에 보는 페이지</h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                오늘 공부한 시간, 최근 7일 활동, 과목별 집중도, 즐겨찾기 카드를 한 화면에서 볼 수 있게 구성했습니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => open("login")}>로그인하고 분석 보기</Button>
                <Button variant="outline" onClick={() => open("register")}>회원가입</Button>
              </div>
            </div>
          </section>

          <div className="mt-6 max-w-md">
            <LoginPromptCard onLoginClick={() => open("login")} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[36px] border border-border bg-card shadow-sm">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_36%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.10),_transparent_28%)] px-6 py-8 sm:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-sm font-medium text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                분석 대시보드
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">공부 습관과 즐겨찾기를 한 화면에서 확인합니다.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                기존 즐겨찾기 데이터는 바로 집계하고, 일자별 학습 시간과 본 카드 수는 지금부터 자동으로 쌓이도록 연결했습니다.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={mostActiveDeck?.href ?? "/study/japanese/katakana-words"}>
                  <Button>학습 계속하기</Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline">프로필 보기</Button>
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,1fr)]">
              <div className="overflow-hidden rounded-[32px] border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">과목별 학습 분포</h2>
                    <p className="mt-1 text-sm text-muted-foreground">많이 본 과목일수록 위쪽에 배치됩니다.</p>
                  </div>
                  <div className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground">
                    {deckOverview.length}개 과목
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {deckOverview.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-background/80 px-4 py-6 text-sm text-muted-foreground">
                      아직 집계된 학습 기록이 없습니다. 카드 학습을 시작하면 과목별 분포가 표시됩니다.
                    </div>
                  ) : (
                    deckOverview.map((deck) => {
                      const width = `${Math.max(8, Math.round((deck.studySeconds / peakDeckStudySeconds) * 100))}%`;
                      return (
                        <Link key={deck.deckType} href={deck.href} className="block overflow-hidden rounded-[24px] border border-border bg-background/70 p-4 transition-colors hover:bg-background">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground">{deck.label}</p>
                              <p className="mt-1 break-keep text-sm text-muted-foreground">
                                {formatStudyMinutes(deck.studySeconds)} · {deck.cardsViewed}개 카드 · 즐겨찾기 {deck.favoriteCount}개
                              </p>
                            </div>
                            <div className="shrink-0 text-left text-xs text-muted-foreground sm:text-right">
                              <p>{deck.sessions}회 세션</p>
                              <p>{deck.lastStudiedOn ? deck.lastStudiedOn.replaceAll("-", ".") : "기록 대기"}</p>
                            </div>
                          </div>
                          <div className="mt-4 h-2.5 rounded-full bg-muted/70">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: deck.color }}
                              initial={{ width: 0, opacity: 0.6 }}
                              animate={{ width, opacity: 1 }}
                              transition={{ duration: 0.75, ease: "easeOut" }}
                            />
                          </div>
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-[32px] border border-border bg-card p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">최근 7일 학습 흐름</h2>
                    <p className="mt-1 text-sm text-muted-foreground">막대 높이는 시간과 카드 탐색량을 함께 반영한 활동 점수입니다.</p>
                  </div>
                  <div className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground">최근 7일</div>
                </div>

                <div className="mt-8 overflow-x-auto pb-2">
                  <div className="grid h-[220px] min-w-[320px] grid-cols-[repeat(7,minmax(0,1fr))] items-end gap-3">
                    {activityDays.map((day, index) => {
                      const height = `${Math.max(12, Math.round((day.activityScore / peakActivity) * 100))}%`;
                      return (
                        <div key={day.dateKey} className="flex h-full min-w-0 flex-col items-center justify-end gap-3">
                          <div className="flex h-full w-full items-end rounded-[20px] bg-muted/60 p-1.5">
                            <motion.div
                              className="w-full rounded-[14px] bg-[linear-gradient(180deg,#0ea5e9_0%,#14b8a6_100%)]"
                              style={{ height }}
                              initial={{ height: 0, opacity: 0.45 }}
                              animate={{ height, opacity: 1 }}
                              transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 * index }}
                              title={`${day.label} · ${formatStudyMinutes(day.studySeconds)} · ${day.cardsViewed}개 카드`}
                            />
                          </div>
                          <div className="w-full text-center">
                            <p className="truncate text-[11px] font-semibold text-foreground">{day.cardsViewed}</p>
                            <p className="truncate text-[11px] text-muted-foreground">{day.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {noAnalyticsYet ? (
                  <div className="mt-6 rounded-2xl border border-dashed border-border bg-background/80 px-4 py-3 text-sm text-muted-foreground">
                    이 영역의 일자별 데이터는 이번 업데이트 이후부터 쌓입니다. 학습 페이지를 이용하면 자동으로 기록됩니다.
                  </div>
                ) : null}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
                  <CircularStat
                    label="연속 학습"
                    value={`${streakDays}일`}
                    caption="오늘까지 이어진 연속 학습 일수"
                    ratio={Math.min(streakDays / ACTIVITY_WINDOW_DAYS, 1)}
                    stroke="#0ea5e9"
                  />
                  <CircularStat
                    label="최근 7일 세션"
                    value={`${last7Totals.sessions}회`}
                    caption="짧게라도 학습을 시작한 횟수"
                    ratio={Math.min(last7Totals.sessions / ACTIVITY_WINDOW_DAYS, 1)}
                    stroke="#14b8a6"
                  />
                  <CircularStat
                    label="즐겨찾기 밀도"
                    value={`${favoriteCount}개`}
                    caption="현재 저장된 즐겨찾기 카드 수"
                    ratio={Math.min(favoriteCount / 30, 1)}
                    stroke="#f59e0b"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden">
          <div className={cn("flex justify-center overflow-hidden transition-all duration-300 lg:hidden", isMobileBannerFilled ? "mt-0 max-h-[100px]" : "max-h-0")}>
            <div className="w-[320px] max-w-full">
              <KakaoAdFit
                adUnit={DASHBOARD_MOBILE_BANNER_AD_UNIT}
                width={320}
                height={100}
                reserveSpace={false}
                onFillChange={setIsMobileBannerFilled}
              />
            </div>
          </div>
          <div className={cn("hidden justify-center overflow-hidden transition-all duration-300 lg:flex", isDesktopBannerFilled ? "mt-0 max-h-[90px]" : "max-h-0")}>
            <div className="min-w-[728px]">
              <KakaoAdFit
                adUnit={DASHBOARD_BANNER_AD_UNIT}
                width={728}
                height={90}
                reserveSpace={false}
                onFillChange={setIsDesktopBannerFilled}
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard title="오늘 공부 시간" value={formatStudyMinutes(today.studySeconds ?? 0)} subtitle={`${today.sessions ?? 0}회 세션`} icon={<Clock3 className="h-5 w-5" />} />
          <MetricCard title="최근 7일 카드" value={`${last7Totals.cardsViewed}개`} subtitle="최근 7일 동안 본 카드 수" icon={<Layers3 className="h-5 w-5" />} />
          <MetricCard title="총 즐겨찾기" value={`${favoriteCount}개`} subtitle={`${favoriteDeckTypes.length}개 과목에 분산되어 있습니다.`} icon={<Star className="h-5 w-5" />} />
          <MetricCard title="누적 세션" value={`${totalSessions}회`} subtitle={`${formatStudyMinutes(totalStudySeconds)} · ${totalCardsViewed}개 카드`} icon={<BarChart3 className="h-5 w-5" />} />
        </section>

        <section className="overflow-hidden rounded-[32px] border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">즐겨찾기 카드</h2>
              <p className="mt-1 text-sm text-muted-foreground">현재 저장된 즐겨찾기를 과목별로 묶어서 보여줍니다.</p>
            </div>
            <div className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground">
              총 {favoriteCount}개
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {favoriteGroups.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-border bg-background/80 px-4 py-6 text-sm text-muted-foreground">
                즐겨찾기한 카드가 아직 없습니다. 학습 페이지에서 별표를 누르면 이곳에 바로 반영됩니다.
              </div>
            ) : (
              favoriteGroups.map((group) => (
                <div key={group.deckType} className="overflow-hidden rounded-[24px] border border-border bg-background/70 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{group.label}</p>
                      <p className="text-sm text-muted-foreground">{group.items.length}개 저장됨</p>
                    </div>
                    <Link href={group.href} className="text-sm font-medium text-primary">
                      이동
                    </Link>
                  </div>

                  <div className="space-y-2">
                    {group.items.slice(0, 8).map((item) => (
                      <div key={`${group.deckType}-${item.id}`} className="overflow-hidden rounded-2xl border border-border bg-card px-3 py-3">
                        <p className="truncate font-medium text-foreground">{item.title}</p>
                        {item.subtitle ? <p className="mt-1 truncate text-sm text-muted-foreground">{item.subtitle}</p> : null}
                      </div>
                    ))}
                    {group.items.length > 8 ? (
                      <div className="rounded-2xl border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">
                        나머지 {group.items.length - 8}개는 학습 화면에서 계속 확인할 수 있습니다.
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <div className={cn("text-center text-sm text-muted-foreground", isDocLoading && "animate-pulse")}>
          {isDocLoading ? "대시보드 데이터를 동기화하는 중입니다." : "학습 기록은 로그인된 사용자 기준으로 자동 동기화됩니다."}
        </div>
      </div>
    </div>
  );
}
