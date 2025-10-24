"use client";

import Button from "@/components/ui/button";
import { ButtonTypes } from "@/components/ui/button/types";
import { Category } from "@/lib/use-cases/types";
import styles from "./styles.module.scss";

interface CategoryCardProps {
  category: Category;
  onViewCategory?: (slug: string) => void;
  className?: string;
}

const CategoryCard = ({ category, onViewCategory, className = "" }: CategoryCardProps) => {
  const handleViewCategory = () => {
    if (onViewCategory) {
      onViewCategory(category.slug);
    }
  };

  return (
    <div className={`${styles.categoryCard} ${className}`}>
      <div className={styles.categoryCardHeader}>
        <h3 className={styles.categoryTitle}>
          {category.name}
        </h3>
        <p className={styles.categoryDescription}>
          {category.description}
        </p>
      </div>
      <div className={styles.categoryCardBody}>
        <div className={styles.categoryMeta}>
          <span className={styles.templateCount}>
            {category.templates_count} templates
          </span>
          <span className={styles.lastUpdated}>
            Updated {new Date(category.last_updated).toLocaleDateString()}
          </span>
        </div>
        <div className={styles.featuredTemplates}>
          <span className={styles.featuredLabel}>Featured:</span>
          <div className={styles.featuredTags}>
            {category.featured_templates.slice(0, 2).map((template) => (
              <span key={template} className={styles.featuredTag}>
                {template.replace(/-/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.categoryCardFooter}>
        <Button 
          variant={ButtonTypes.BORDER} 
          href="/templates/basic-prompting"
          onClick={handleViewCategory}
          className={styles.categoryButton}
        >
          View Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;
