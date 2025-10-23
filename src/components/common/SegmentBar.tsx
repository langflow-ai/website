// SegmentBar Molecular Component

import { Segment, SEGMENT_LABELS } from "@/lib/types/templates";
import { useEffect, useState } from "react";
import FilterPill from "./FilterPill";
import styles from "./SegmentBar.module.scss";
import SegmentSkeleton from "./SegmentSkeleton";

interface SegmentBarProps {
  selectedSegments: Set<Segment>;
  onSegmentToggle: (segment: Segment) => void;
  className?: string;
}

// Removed icons - only text will be shown

export default function SegmentBar({ 
  selectedSegments, 
  onSegmentToggle, 
  className = "" 
}: SegmentBarProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  const allSegments: Segment[] = ["assistants", "classification", "coding", "content-generation", "qna"];
  
  // Filter segments for mobile - show only first 3
  const segments = isMobile ? allSegments.slice(0, 3) : allSegments;

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
      {segments.map((segment) => (
        <FilterPill
          key={segment}
          label={SEGMENT_LABELS[segment]}
          value={segment}
          selected={selectedSegments.has(segment)}
          onToggle={() => onSegmentToggle(segment)}
          className={styles.filterPill}
        />
      ))}
    </div>
  );
}
