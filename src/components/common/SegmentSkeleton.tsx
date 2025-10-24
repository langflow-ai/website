// SegmentSkeleton Atomic Component

import styles from "./SegmentSkeleton.module.scss";

interface SegmentSkeletonProps {
  className?: string;
}

export default function SegmentSkeleton({ className = "" }: SegmentSkeletonProps) {
  return (
    <div className={`${styles.segmentSkeleton} ${className}`}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className={styles.skeletonPill}></div>
      ))}
    </div>
  );
}
