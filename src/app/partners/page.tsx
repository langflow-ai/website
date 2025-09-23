import Page from "@/components/layout/page";
import PartnersTemplate from "@/components/pages/Partners/Template";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Langflow Partner Program | Become a Certified AI Partner",
    description: "Join the Langflow Partner Program and become a certified AI partner. Get official listing, visibility, and support for your AI solutions. Free to join with no fees.",
    keywords: [
      "Langflow Partners",
      "AI Partner Program",
      "Certified AI Partner",
      "AI Solutions Partner",
      "Langflow Partner Directory",
      "AI Development Partners",
      "Machine Learning Partners",
      "AI Integration Partners",
      "Langflow Certification",
      "AI Business Partners"
    ],
    authors: [{ name: "Langflow Team" }],
    creator: "Langflow",
    publisher: "Langflow",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      title: "Langflow Partner Program | Become a Certified AI Partner",
      description: "Join the Langflow Partner Program and become a certified AI partner. Get official listing, visibility, and support for your AI solutions. Free to join with no fees.",
      url: "https://www.langflow.org/partners",
      siteName: "Langflow",
      locale: "en_US",
      images: [
        {
          url: "https://www.langflow.org/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Langflow Partner Program - Become a Certified AI Partner",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@langflow_ai",
      creator: "@langflow_ai",
      title: "Langflow Partner Program | Become a Certified AI Partner",
      description: "Join the Langflow Partner Program and become a certified AI partner. Get official listing, visibility, and support for your AI solutions.",
      images: ["https://www.langflow.org/images/og-image.png"],
    },
    alternates: {
      canonical: "https://www.langflow.org/partners",
    },
    category: "Technology",
  };
};

export default function Partners() {
  return (
    <Page className="layout" type="normal">
      <PartnersTemplate />
    </Page>
  );
}
