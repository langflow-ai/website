// Dependencies
import type { Metadata } from "next";
import Script from "next/script";

// Styles
import "@/styles/index.scss";

export const generateMetadata = (): Metadata => {
  return {
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
        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-L8Y98PSEMQ`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L8Y98PSEMQ');
            `,
          }}
        />
      </head>
      <body>
        <main className="layout layout-dark">{children}</main>
      </body>
    </html>
  );
}
