// CategoryBar Molecular Component

import { getTopLevelCategories } from "@/data/flows";
import FilterPill from "./FilterPill";
import styles from "./SegmentBar.module.scss";

interface CategoryBarProps {
  selectedCategories: Set<string>;
  onCategoryToggle: (category: string) => void;
  className?: string;
}

// Icon mapping for categories
const CATEGORY_ICONS: Record<string, string | null> = {
  "Getting Started": "basic",
  "Development": "automation",
  "Research": "research",
  "Customer Support": "support",
};

// Get categories dynamically from flows to ensure consistency
const getCategories = () => {
  const topLevelCategories = getTopLevelCategories();
  return topLevelCategories.map(category => ({
    value: category,
    label: category,
    icon: CATEGORY_ICONS[category] || null,
  }));
};

const CATEGORIES = getCategories();

export default function CategoryBar({ 
  selectedCategories, 
  onCategoryToggle, 
  className = "" 
}: CategoryBarProps) {
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

