// CategoryBar Molecular Component

import { getTopLevelCategories } from "@/data/flows";
import FilterPill from "./FilterPill";
import styles from "./SegmentBar.module.scss";

interface CategoryBarProps {
  selectedCategories: Set<string>;
  onCategoryToggle: (category: string) => void;
  className?: string;
  maxCategories?: number; // Optional limit for number of categories to display
}

// Icon mapping for categories
const CATEGORY_ICONS: Record<string, string | null> = {
  "Getting Started": "basic",
  "Development": "automation",
  "Research": "research",
  "Customer Support": "support",
  "Sales & Marketing Automation": "automation",
  "Business Functions": "automation",
  "Document Intelligence": "research",
  "Data and Analytics Augmentation": "research",
};

// Get categories dynamically from flows to ensure consistency
const getCategories = (maxCategories?: number) => {
  const topLevelCategories = getTopLevelCategories();
  // Limit to maxCategories if specified, otherwise show all
  const limitedCategories = maxCategories 
    ? topLevelCategories.slice(0, maxCategories)
    : topLevelCategories;
    
  return limitedCategories.map(category => ({
    value: category,
    label: category,
    icon: CATEGORY_ICONS[category] || null,
  }));
};

export default function CategoryBar({ 
  selectedCategories, 
  onCategoryToggle, 
  className = "",
  maxCategories = 4 // Default to 4 categories max
}: CategoryBarProps) {
  const CATEGORIES = getCategories(maxCategories);
  
  return (
    <div className={`${styles.segmentBar} ${className}`} style={{ height: '35px' }}>
      {CATEGORIES.map((category) => (
        <FilterPill
          key={category.value}
          label={category.label}
          value={category.value}
          selected={selectedCategories.has(category.value)}
          onToggle={() => onCategoryToggle(category.value)}
          className={styles.filterPill}
        />
      ))}
    </div>
  );
}

