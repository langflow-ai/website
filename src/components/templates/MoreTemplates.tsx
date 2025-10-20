// MoreTemplates Component for Template Detail Page

import { Template } from "@/lib/types/templates";
import TemplateCard from "../pages/UseCases/BeginnerBasics/TemplateCard";
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
    <section className={`${styles.moreTemplates} ${className}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>More templates</h2>
        
        <div className={styles.templatesContainer}>
          {relatedTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.title}
              description={template.summary}
              categories={template.segments.map(seg => seg.charAt(0).toUpperCase() + seg.slice(1))}
              iconType="basic"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
