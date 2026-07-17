type GuideSection = {
  title: string;
  body: string;
};

type StudyPageGuideProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: GuideSection[];
};

export function StudyPageGuide({ id, eyebrow, title, intro, sections }: StudyPageGuideProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 pb-12 pt-10 sm:px-8" aria-labelledby={`${id}-title`}>
      <div className="border-t border-border pt-8">
        <p className="text-xs font-semibold uppercase text-primary">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
          {title}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          {intro}
        </p>
        <div className="mt-7 grid border-y border-border md:grid-cols-3">
          {sections.map((section) => (
            <article
              key={section.title}
              className="border-b border-border py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0"
            >
              <h3 className="text-base font-semibold text-foreground">{section.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
