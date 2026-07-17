"use client";

import Link from "next/link";
import { HomeNavigation } from "@/app/components/HomeNavigation";
import { useLocale } from "@/app/context/LocaleContext";
import type { TranslationKey } from "@/app/i18n/translations";

const learningSections: Array<{
  titleKey: TranslationKey;
  labelKey: TranslationKey;
  descriptionKey: TranslationKey;
  href: string;
}> = [
  { titleKey: "home.japaneseTitle", labelKey: "home.japaneseLabel", descriptionKey: "home.japaneseDescription", href: "/study/japanese" },
  { titleKey: "home.englishTitle", labelKey: "home.englishLabel", descriptionKey: "home.englishDescription", href: "/study/english/words" },
  { titleKey: "home.spanishTitle", labelKey: "home.spanishLabel", descriptionKey: "home.spanishDescription", href: "/study/spanish/words" },
  { titleKey: "home.koreanTitle", labelKey: "home.koreanLabel", descriptionKey: "home.koreanDescription", href: "/study/korean/words" },
];

const flowItems: TranslationKey[] = ["home.flowAnswer", "home.flowListen", "home.flowRecord"];

const searchIntentLinks = [
  {
    href: "/study/japanese/sentence-quiz",
    title: "일본어 JLPT 문제 풀이",
    description: "N5부터 N1까지 일본어 문장 빈칸 퀴즈로 조사, 어휘, 동사 활용을 반복합니다.",
  },
  {
    href: "/study/japanese/katakana-words",
    title: "JLPT 단어 공부",
    description: "가타카나 단어와 JLPT 한자 단어를 읽기, 뜻, 예문 카드로 복습합니다.",
  },
  {
    href: "/study/japanese/hiragana-chars",
    title: "히라가나 공부",
    description: "히라가나 기본 글자, 탁음, 반탁음, 요음을 카드와 발음으로 익힙니다.",
  },
  {
    href: "/study/japanese/katakana-chars",
    title: "가타카나 공부",
    description: "가타카나 외래어 글자, 장음, 촉음, 요음을 소리와 함께 연습합니다.",
  },
  {
    href: "/study/japanese/kanji",
    title: "일본어 한자 공부",
    description: "JLPT 기초 한자의 뜻과 읽기를 확인하고 화면에 직접 따라 씁니다.",
  },
  {
    href: "/study/english/words",
    title: "무료 영어 단어 공부",
    description: "영어 단어의 발음, 뜻, 예문을 카드로 확인하고 반복 학습합니다.",
  },
];

export default function HomePageContent() {
  const { t } = useLocale();

  return (
    <>
      <HomeNavigation />
      <main className="overflow-hidden bg-background">
      <section className="relative isolate min-h-[760px] overflow-hidden px-5 pb-24 pt-12 sm:min-h-[680px] sm:px-8 sm:py-14 lg:px-12">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-[position:58%_center] sm:bg-center"
          style={{ backgroundImage: "url('/home-hero-study-desk.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,0.98)_0%,rgba(10,10,10,0.9)_33%,rgba(10,10,10,0.58)_60%,rgba(10,10,10,0.22)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="mx-auto flex min-h-[640px] max-w-6xl flex-col justify-between gap-12 sm:min-h-[580px] sm:gap-8">
          <div className="max-w-[21rem] sm:max-w-2xl sm:pt-16">
            <p className="text-sm font-semibold text-primary">{t("home.eyebrow")}</p>
            <h1 className="mt-4 text-5xl font-bold tracking-normal text-white sm:text-7xl">무료 일본어·언어 학습 SSUN EDU</h1>
            <p className="mt-6 max-w-[21rem] text-base leading-8 text-zinc-200 sm:max-w-xl sm:text-lg">
              {t("home.description")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/study/japanese/sentence-quiz" className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_34px_rgba(59,130,246,0.38)] transition-transform hover:-translate-y-0.5">
                {t("home.sentenceQuiz")}
              </Link>
              <Link href="/study/japanese/katakana-words" className="rounded-md border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10">
                {t("home.startWords")}
              </Link>
              <Link href="/study/dashboard" className="rounded-md border border-blue-300/35 bg-blue-500/15 px-5 py-3 text-sm font-semibold text-blue-100 backdrop-blur transition-colors hover:bg-blue-500/25">
                {t("home.dashboard")}
              </Link>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 backdrop-blur-md sm:grid-cols-4">
            {learningSections.map((section) => (
              <Link key={section.href} href={section.href} className="group bg-black/38 p-5 transition-colors hover:bg-primary/20 sm:p-4">
                <p className="text-xs font-semibold uppercase tracking-normal text-primary">{t(section.labelKey)}</p>
                <h2 className="mt-2 text-lg font-semibold text-white">{t(section.titleKey)}</h2>
                <p className="mt-2 text-sm text-zinc-300">{t(section.descriptionKey)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div>
          <p className="text-sm font-semibold text-primary">{t("home.flowLabel")}</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">{t("home.flowTitle")}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {flowItems.map((item, index) => (
            <div key={item} className="border-l border-border pl-5">
              <p className="text-sm font-semibold text-primary">0{index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{t(item)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("home.flowDescription")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 lg:px-12">
        <div className="border-t border-border pt-8">
          <div className="max-w-3xl text-sm leading-7 text-muted-foreground">
            <h2 className="text-xl font-semibold text-foreground">{t("home.methodTitle")}</h2>
            <p className="mt-4">{t("home.methodDescription")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:px-12" aria-labelledby="popular-study-topics">
        <div className="rounded-3xl border border-border bg-card/60 p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-primary">Popular study topics</p>
          <h2 id="popular-study-topics" className="mt-2 text-2xl font-bold text-foreground">
            많이 찾는 무료 학습 주제
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            SSUN EDU는 일본어 독학 사용자가 자주 찾는 히라가나, 가타카나, JLPT 단어, 일본어 문장 퀴즈를 중심으로
            영어·스페인어·한국어 단어 카드까지 함께 제공합니다.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {searchIntentLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-border bg-background p-4 transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </main>
    </>
  );
}
