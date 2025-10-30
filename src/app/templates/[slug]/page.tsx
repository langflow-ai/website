// Template Detail Page

import PageLayout from "@/components/layout/page";
import GetStarted from "@/components/pages/Home/GetStarted";
import Trending from "@/components/pages/UseCases/Trending/Trending";
import { TemplateHero, TemplateSummary } from "@/components/templates";
import { FLOWS, getFlowBySlug } from "@/data/flows";
import { Methodology, Segment } from "@/lib/types/templates";
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

// Generate static params for the flows
export async function generateStaticParams() {
  return FLOWS.map(flow => ({
    slug: flow.slug
  }));
}
