// Template Detail Page

import PageLayout from "@/components/layout/page";
import GetStarted from "@/components/pages/Home/GetStarted";
import Trending from "@/components/pages/UseCases/Trending/Trending";
import { TemplateHero, TemplateSummary } from "@/components/templates";
import { fetchTemplates, getTemplate } from "@/data/templates";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";

interface TemplatePageProps {
  params: { slug: string };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const template = await getTemplate(params.slug);
  
  if (!template) {
    notFound();
  }

  // Get related templates for the "More templates" section
  const allTemplates = await fetchTemplates({ q: "", segments: new Set(), methodologies: new Set() });
  const relatedTemplates = allTemplates
    .filter(t => t.segments.some(segment => template.segments.includes(segment)))
    .slice(0, 3);

  return (
    <PageLayout className="layout" type="normal">
      <div className={styles.page}>
        <TemplateHero template={template} />

        <section className={`container ${styles.section}`}>
          <TemplateSummary template={template} />
        </section>

        <div className={styles.trendingContainer}>
            <Trending />
            </div>

        <GetStarted />
      </div>
    </PageLayout>
  );
}

// Generate static params for the most common templates
export async function generateStaticParams() {
  const templates = await fetchTemplates({ q: "", segments: new Set(), methodologies: new Set() });
  
  return templates.slice(0, 10).map((template) => ({
    slug: template.slug,
  }));
}
