// Use Cases Page

import TemplateGrid from "@/components/common/TemplateGrid";
import PageLayout from "@/components/layout/page";
import GetStarted from "@/components/pages/Home/GetStarted";
import BeginnerBasics from "@/components/pages/UseCases/BeginnerBasics/BeginnerBasics";
import Trending from "@/components/pages/UseCases/Trending/Trending";
import BrowseTemplates from "@/components/use-cases/BrowseTemplates";
import TemplatesHero from "@/components/use-cases/TemplatesHero";
import { fetchCollections, fetchTemplates } from "@/data/templates";
import { hasActiveFilter, readFiltersFromURL } from "@/utils/query";
import Link from "next/link";
import styles from "./use-cases.module.scss";

interface UseCasesPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function UseCasesPage({ searchParams }: UseCasesPageProps) {
  const filters = readFiltersFromURL(
    new URLSearchParams(searchParams as Record<string, string>).toString()
  );
  const hasFilters = hasActiveFilter(filters);
  
  // Check if we're in "Browse templates" mode (has search query or specific filters)
  const isBrowseTemplatesMode = filters.q || filters.segments.size > 0 || filters.methodologies.size > 0 || (filters.categories?.size || 0) > 0;

  const [items, collections] = await Promise.all([
    fetchTemplates(filters),
    hasFilters ? Promise.resolve(null) : fetchCollections(),
  ]);

  return (
    <PageLayout className="layout" type="normal">
      <div className={styles.page}>
        <TemplatesHero initialFilters={filters} />

        {hasFilters && !isBrowseTemplatesMode ? (
          // Templates section filtered - show only filtered results
          <section className={`container ${styles.filteredSection}`}>
            <TemplateGrid
              items={items}
              emptyState={
                <div className={styles.filteredEmptyState}>
                  <h3 className={styles.filteredEmptyStateTitle}>
                    No templates match your filters
                  </h3>
                  <p className={styles.filteredEmptyStateDescription}>
                    Try adjusting your search, or clear the filters to explore the full template
                    library.
                  </p>
                  <Link className={styles.clearButton} href="/use-cases">
                    Clear all filters
                  </Link>
                </div>
              }
            />
          </section>
        ) : isBrowseTemplatesMode ? (
          // Browse templates mode - show filtered results without hiding other sections
          <BrowseTemplates initialFilters={filters} />
        ) : (
          // Default view - show all sections
          <>
            <BeginnerBasics />

            <Trending />

            <BrowseTemplates initialFilters={filters} />
          </>
        )}
      </div>
      
      {/* GetStarted fora do container para ocupar toda a largura */}
      <GetStarted />
    </PageLayout>
  );
}
