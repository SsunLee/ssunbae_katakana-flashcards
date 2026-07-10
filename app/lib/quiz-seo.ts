import type { Metadata } from "next";

const SITE_URL = "https://ssunedu.com";

type QuizMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  keywords: string[];
};

export function createQuizMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  imageWidth = 885,
  imageHeight = 767,
  keywords,
}: QuizMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      "thumbnail": `${SITE_URL}${image}`,
    },
  };
}

export function createQuizWebPageJsonLd({
  title,
  description,
  path,
  image,
  imageAlt,
  imageWidth = 885,
  imageHeight = 767,
  language,
}: Omit<QuizMetadataOptions, "keywords"> & { language: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: language,
    primaryImageOfPage: {
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${image}`,
      url: `${SITE_URL}${image}`,
      width: imageWidth,
      height: imageHeight,
      caption: imageAlt,
      creditText: "SSUN EDU",
      creator: {
        "@type": "Organization",
        name: "SSUN EDU",
      },
    },
    isPartOf: {
      "@type": "WebSite",
      name: "SSUN EDU",
      url: SITE_URL,
    },
  };
}
