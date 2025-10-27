// CategoryBar Molecular Component

import { useEffect, useState } from "react";
import FilterPill from "./FilterPill";
import styles from "./SegmentBar.module.scss";
import SegmentSkeleton from "./SegmentSkeleton";

interface CategoryBarProps {
  selectedCategories: Set<string>;
  onCategoryToggle: (category: string) => void;
  className?: string;
}

type Category = "Getting Started" | "Development" | "Research" | "Customer Support";

const CATEGORIES: { value: Category; label: string; icon: string | null }[] = [
  { value: "Getting Started", label: "Getting Started", icon: "basic" },
  { value: "Development", label: "Development", icon: "automation" },
  { value: "Research", label: "Research", icon: "research" },
  { value: "Customer Support", label: "Customer Support", icon: "support" },
];

export default function CategoryBar({ 
  selectedCategories, 
  onCategoryToggle, 
  className = "" 
}: CategoryBarProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  // Show skeleton on mobile while loading
  if (isMobile && isLoading) {
    return <SegmentSkeleton className={className} />;
  }

  return (
    <div className={`${styles.segmentBar} ${className}`} style={{ flexWrap: 'nowrap', height: '35px' }}>
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

