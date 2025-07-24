// Dependencies
import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";

// Components
import HeaderScripts from "@/components/scripts/Header";
import { DataAttributeTracker } from "@/components/DataAttributeTracker";

// Styles
import "@/styles/index.scss";

export const generateMetadata = (): Metadata => {
  return {
    other: {
      ...Sentry.getTraceData(),
    },
    metadataBase: new URL("https://www.langflow.org"),
    title: "Langflow | Low-code AI builder for agentic and RAG applications",
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
      title: "Langflow | Low-code AI builder for agentic and RAG applications",
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
      title: "Langflow | Low-code AI builder for agentic and RAG applications",
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
        <HeaderScripts />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/blog/rss.xml"
          title="Langflow RSS Feed"
        />
      </head>
      <body>
        <main className="layout layout-dark">{children}</main>
        <DataAttributeTracker />
      </body>
    </html>
  );
}
