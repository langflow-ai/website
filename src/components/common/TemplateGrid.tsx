// TemplateGrid Molecular Component

import { Template } from "@/lib/types/templates";
import LargeTemplateCard from "./LargeTemplateCard";
import SkeletonCard from "./SkeletonCard";
import TemplateCard from "./TemplateCard";
import styles from "./TemplateGrid.module.scss";

interface TemplateGridProps {
  items: Template[];
  emptyState?: React.ReactNode;
  loading?: boolean;
  className?: string;
  showLargeCard?: boolean; // Para mostrar o card grande com iframe
}

const defaultEmptyState = (
  <div className={styles.emptyState}>
    <div className={styles.icon}>
      <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <h3 className={styles.title}>No templates found</h3>
    <p className={styles.description}>Try adjusting your search or filters to find what you're looking for.</p>
  </div>
);

export default function TemplateGrid({ 
  items, 
  emptyState = defaultEmptyState, 
  loading = false,
  className = "",
  showLargeCard = false
}: TemplateGridProps) {
  if (loading) {
    return (
      <div className={`${styles.templateGrid} ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <div className={className}>{emptyState}</div>;
  }

  return (
    <div className={`${styles.templateGrid} ${className}`}>
      {showLargeCard && <LargeTemplateCard />}
      {items.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
        />
      ))}
    </div>
  );
}
