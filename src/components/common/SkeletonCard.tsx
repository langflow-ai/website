// SkeletonCard Atomic Component

import styles from "./SkeletonCard.module.scss";

interface SkeletonCardProps {
  className?: string;
}

export default function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div className={`${styles.skeletonCard} ${className}`}>
      {/* Header with badges */}
      <div className={styles.header}>
        <div className={styles.badge}></div>
        <div className={styles.badge}></div>
        <div className={styles.badge}></div>
        <div className={styles.badge}></div>
      </div>
      
      {/* Title */}
      <div className={styles.title}></div>
      
      {/* Description */}
      <div className={styles.description}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
}
