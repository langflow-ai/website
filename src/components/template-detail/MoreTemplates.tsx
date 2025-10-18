// MoreTemplates Component for Template Detail Page

import { Template } from "@/lib/types/templates";
import SectionHeader from "../common/SectionHeader";
import TemplateGrid from "../common/TemplateGrid";
import styles from "./MoreTemplates.module.scss";

interface MoreTemplatesProps {
  currentSlug: string;
  templates?: Template[];
  className?: string;
}

export default function MoreTemplates({
  currentSlug,
  templates = [],
  className = "",
}: MoreTemplatesProps) {
  const relatedTemplates = templates
    .filter((template) => template.slug !== currentSlug)
    .slice(0, 3);

  return (
    <section className={`${styles.section} ${className}`}>
      <div className="container">
        <div className={styles.inner}>
          <SectionHeader title="More templates" className={styles.header} />

          <TemplateGrid
            items={relatedTemplates}
            emptyState={
              <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className={styles.emptyStateTitle}>No related templates found</h3>
                <p>Check back later for more templates in this category.</p>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
