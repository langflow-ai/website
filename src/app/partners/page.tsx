import Page from "@/components/layout/page";
import PartnersTemplate from "@/components/pages/Partners/Template";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Partners | Langflow",
    description: "Join the Langflow Partner Program. Become a certified partner and get official listing, visibility, and support for your AI solutions.",
    keywords: [
      "Langflow",
      "Partners",
      "Partner Program",
      "AI Partners",
      "Certified Partner",
      "AI Solutions",
      "Partner Directory"
    ],
    openGraph: {
      title: "Langflow Partner Program | Become a Certified Partner",
      description: "Join the Langflow Partner Program. Become a certified partner and get official listing, visibility, and support for your AI solutions.",
      url: "https://www.langflow.org/partners",
      siteName: "Langflow",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Langflow Partner Program",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Langflow Partner Program | Become a Certified Partner",
      description: "Join the Langflow Partner Program. Become a certified partner and get official listing, visibility, and support for your AI solutions.",
      images: ["/images/og-image.png"],
    },
  };
};

export default function Partners() {
  return (
    <Page className="layout" type="normal">
      <PartnersTemplate />
    </Page>
  );
}
