// Use Cases Page

import PageLayout from "@/components/layout/page";
import GetStarted from "@/components/pages/Home/GetStarted";
import BeginnerBasics from "@/components/pages/UseCases/BeginnerBasics/BeginnerBasics";
import Trending from "@/components/pages/UseCases/Trending/Trending";
import BrowseTemplates from "@/components/use-cases/BrowseTemplates";
import TemplatesHero from "@/components/use-cases/TemplatesHero";
import { fetchCollections, fetchTemplates } from "@/data/templates";
import { hasActiveFilter, readFiltersFromURL } from "@/utils/query";
import type { Metadata } from "next";
import styles from "./use-cases.module.scss";

interface UseCasesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const generateMetadata = (): Metadata => {
  return {
    title: "Use Cases",
    description:
      "Explore Langflow use cases and AI workflow templates. Browse assistants, classification, coding, content generation, Q&A and more.",
    openGraph: {
      url: "https://www.langflow.org/use-cases",
      siteName: "Langflow",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Langflow Use Cases",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Use Cases",
      description:
        "Explore Langflow use cases and AI workflow templates. Browse assistants, classification, coding, content generation, Q&A and more.",
      images: ["/images/og-image.png"],
    },
  };
};

export default async function UseCasesPage({ searchParams }: UseCasesPageProps) {
  const filters = readFiltersFromURL(
    new URLSearchParams(searchParams as Record<string, string>).toString()
  );
  const hasFilters = hasActiveFilter(filters);

  const [items, collections] = await Promise.all([
    fetchTemplates(filters),
    hasFilters ? Promise.resolve(null) : fetchCollections(),
  ]);

  return (
    <PageLayout className="layout" type="normal">
      <div className={styles.page}>
        <TemplatesHero initialFilters={filters} />

        {/* Always render sections; TemplatesHero will scroll to BrowseTemplates when filters are active. */}
        <BeginnerBasics />

        <Trending />

        <BrowseTemplates initialFilters={filters} />
      </div>
      
      {/* GetStarted fora do container para ocupar toda a largura */}
      <GetStarted />
    </PageLayout>
  );
}
