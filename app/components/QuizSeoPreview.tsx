import Image from "next/image";

import { createQuizWebPageJsonLd } from "@/app/lib/quiz-seo";

type QuizSeoPreviewProps = {
  heading: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  language: string;
};

export function QuizSeoPreview({
  heading,
  description,
  path,
  image,
  imageAlt,
  imageWidth = 885,
  imageHeight = 767,
  language,
}: QuizSeoPreviewProps) {
  const jsonLd = createQuizWebPageJsonLd({
    title: heading,
    description,
    path,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    language,
  });

  return (
    <section className="mx-auto w-full max-w-[900px] px-4 pb-12 pt-8 sm:px-6">
      <div className="border-t border-border pt-7">
        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">{heading}</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
        </div>

        <figure className="mt-5 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <Image
            src={image}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes="(max-width: 900px) 100vw, 900px"
            className="h-auto w-full transition-transform duration-300 hover:scale-[1.01]"
          />
          <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
            {imageAlt}
          </figcaption>
        </figure>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
