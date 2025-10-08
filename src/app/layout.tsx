// Dependencies
import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";

// Components
import HeaderScripts from "@/components/scripts/Header";
import { DataAttributeTracker } from "@/components/DataAttributeTracker";
import { WebVitalsTracker } from "@/components/WebVitalsTracker";
import Topbar from "@/components/ui/Topbar";

// Utilities
import { SITE_NAME, DEFAULT_TAGLINE } from "@/lib/utils/titles";

// Styles
import "@/styles/index.scss";

export const generateMetadata = (): Metadata => {
  return {
    other: {
      ...Sentry.getTraceData(),
    },
    metadataBase: new URL("https://www.langflow.org"),
    title: {
      template: `%s | ${SITE_NAME} | ${DEFAULT_TAGLINE}`,
      default: `${SITE_NAME} | ${DEFAULT_TAGLINE}`,
    },
    description:
      "Langflow is a low-code AI builder for agentic and retrieval-augmented generation (RAG) apps. Code in Python and use any LLM or vector database.",
    icons: {
      icon: "/favicon.ico",
    },
    keywords: [
      "Langflow",
      "AI",
      "Development",
      "Agentic",
      "RAG",
      "Agents",
      "Programming",
    ],
    authors: [{ name: "Langflow", url: "https://langflow.org" }],
    creator: "Langflow",
    publisher: "Langflow",
    openGraph: {
      title: `${SITE_NAME} | ${DEFAULT_TAGLINE}`,
      description:
        "Langflow is a low-code AI builder for agentic and retrieval-augmented generation (RAG) apps. Code in Python and use any LLM or vector database.",
      url: "https://langflow.org",
      siteName: "Langflow",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Langflow - Low-code AI builder",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} | ${DEFAULT_TAGLINE}`,
      description:
        "Langflow is a low-code AI builder for agentic and retrieval-augmented generation (RAG) apps. Code in Python and use any LLM or vector database.",
      images: ["/images/og-image.png"],
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <link
          rel="preload"
          href="../styles/fonts/Chivo/Chivo-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        /> */}
        {/* Preload critical fonts with highest priority */}
        {/* <link
          rel="preload"
          href="/_next/static/media/Inter-VariableFont_opsz,wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/_next/static/media/Chivo-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        /> */}
        {/* Preload critical images with fetchpriority */}
        <link
          rel="preload"
          href="/images/GradientBg.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/images/new-desktop.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/images/cardGradient.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/images/og-image.png"
          as="image"
          type="image/png"
        />
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//cdn.segment.com" />
        <link rel="dns-prefetch" href="//munchkin.marketo.net" />
        <link rel="dns-prefetch" href="//www.redditstatic.com" />
        <link rel="dns-prefetch" href="//js.chilipiper.com" />
        <link rel="dns-prefetch" href="//code.jquery.com" />

        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.segment.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://munchkin.marketo.net"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://app-ab17.marketo.com"
          crossOrigin="anonymous"
        />

        {/* Preload critical CSS */}
        {/* <link
          rel="preload"
          href="/_next/static/css/app/layout.css"
          as="style"
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        </noscript> */}

        <HeaderScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Langflow",
                alternateName: "Langflow AI",
                url: "https://www.langflow.org",
                logo: "https://www.langflow.org/images/logo.png",
                description:
                  "Langflow is a low-code AI builder for agentic and retrieval-augmented generation (RAG) apps. Code in Python and use any LLM or vector database.",
                foundingDate: "2023",
                sameAs: [
                  "https://github.com/langflow-ai/langflow",
                  "https://twitter.com/langflow_ai",
                  "https://discord.gg/EqksyE2EX9",
                  "https://www.youtube.com/@Langflow",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Langflow",
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Cross-platform",
                description:
                  "Langflow is a low-code AI builder for agentic and retrieval-augmented generation (RAG) apps. Code in Python and use any LLM or vector database.",
                url: "https://www.langflow.org",
                downloadUrl: "https://github.com/langflow-ai/langflow",
                author: {
                  "@type": "Organization",
                  name: "Langflow",
                  url: "https://www.langflow.org",
                },
                offers: [
                  {
                    "@type": "Offer",
                    name: "Open Source",
                    price: "0",
                    priceCurrency: "USD",
                    description: "Free open-source version with full features",
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.langflow.org",
                name: "Langflow",
                url: "https://www.langflow.org",
                description:
                  "Langflow is a low-code AI builder for agentic and retrieval-augmented generation (RAG) apps. Code in Python and use any LLM or vector database.",
                inLanguage: "en-US",
                publisher: {
                  "@type": "Organization",
                  name: "Langflow",
                  url: "https://www.langflow.org",
                },
              },
            ]),
          }}
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/blog/rss.xml"
          title="Langflow RSS Feed"
        />
      </head>
      <body>
        <Topbar
          title="Langflow 1.6 is out!"
          linkTo="/blog/langflow-1-6"
          linkText="Read the announcement"
        />
        <main className="layout layout-dark">{children}</main>
        <DataAttributeTracker />
        <WebVitalsTracker />
      </body>
    </html>
  );
}
