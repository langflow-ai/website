// Template Detail Page

import PageLayout from "@/components/layout/page";
import GetStarted from "@/components/pages/Home/GetStarted";
import Trending from "@/components/pages/UseCases/Trending/Trending";
import { TemplateHero, TemplateSummary } from "@/components/templates";
import { FLOWS, getFlowBySlug } from "@/lib/use-cases";
import { getTemplate } from "@/data/templates";
import { Methodology, Segment } from "@/lib/types/templates";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";

interface TemplatePageProps {
  params: { slug: string };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const flow = getFlowBySlug(params.slug);
  
  if (!flow) {
    notFound();
  }

  // Convert flow to template format for compatibility
  const template = {
    id: flow.slug,
    slug: flow.slug,
    title: flow.title,
    summary: flow.shortDescription,
    thumbnailUrl: "/images/card-1.webp",
    segments: ["assistants"] as Segment[],
    methodologies: ["rag", "prompting-basics"] as Methodology[],
    badges: ["openai"],
    updatedAt: "2024-01-01T00:00:00Z",
    // New detailed content properties
    introText: flow.introText,
    howItWorks: flow.howItWorks,
    exampleUseCases: flow.exampleUseCases,
    extendingText: flow.extendingText,
    // Legacy properties (fallback if new properties are not available)
    whatYouDo: [
      "Run the workflow to process your data",
      "See how data flows through each node",
      "Review and validate the results"
    ],
    whatYouLearn: [
      "How to build AI workflows with Langflow",
      "How to process and analyze data",
      "How to integrate with external services"
    ],
    whyItMatters: flow.shortDescription,
    isBeginner: true,
    isTrending: true
  };

  // Get related flows for the "More templates" section
  const relatedTemplates = FLOWS
    .filter(f => f.slug !== flow.slug)
    .slice(0, 3)
    .map(f => ({
      id: f.slug,
      slug: f.slug,
      title: f.title,
      summary: f.shortDescription,
      thumbnailUrl: "/images/card-1.webp",
      segments: ["assistants"] as Segment[],
      methodologies: ["rag", "prompting-basics"] as Methodology[],
      badges: ["openai"],
      updatedAt: "2024-01-01T00:00:00Z",
      whatYouDo: [
        "Run the workflow to process your data",
        "See how data flows through each node",
        "Review and validate the results"
      ],
      whatYouLearn: [
        "How to build AI workflows with Langflow",
        "How to process and analyze data",
        "How to integrate with external services"
      ],
      whyItMatters: f.shortDescription,
      isBeginner: true,
      isTrending: true
    }));

  return (
    <PageLayout className="layout" type="normal">
      <div className={styles.page}>
        <TemplateHero template={template} flow={flow} />

        <section className={`container ${styles.section}`}>
          <TemplateSummary template={template} flow={flow} />
        </section>

        <div className={styles.trendingContainer}>
            <Trending />
            </div>

        <GetStarted />
      </div>
    </PageLayout>
  );
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const flow = getFlowBySlug(params.slug);
  const template = await getTemplate(params.slug);

  if (!flow && !template) {
    return {
      title: "Template Not Found",
      description: "The requested template could not be found.",
    };
  }

  const title = template?.title || flow?.title || "Langflow Template";
  const description = template?.summary || flow?.shortDescription || "Explore this Langflow template.";
  const image = template?.thumbnailUrl || "/images/og-image.png";
  const url = `https://www.langflow.org/templates/${params.slug}`;

  return {
    title,
    description,
    openGraph: {
      url,
      siteName: "Langflow",
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// Generate static params for the flows
export async function generateStaticParams() {
  return FLOWS.map(flow => ({
    slug: flow.slug
  }));
}
