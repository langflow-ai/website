// SegmentBar Molecular Component

import { Segment, SEGMENT_LABELS } from "@/lib/types/templates";
import FilterPill from "./FilterPill";
import styles from "./SegmentBar.module.scss";

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
  const segments: Segment[] = ["assistants", "classification", "coding", "content-generation", "qna"];

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
