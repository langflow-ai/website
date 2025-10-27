// SectionHeader Atomic Component

import { ReactNode } from "react";
import styles from "./SectionHeader.module.scss";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  cta?: ReactNode;
  className?: string;
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  cta, 
  className = "" 
}: SectionHeaderProps) {
  return (
    <div className={`${styles.sectionHeader} ${className}`}>
      <div>
        <h2 className={styles.title}>
          {title}
        </h2>
        {subtitle && (
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        )}
      </div>
      {cta && (
        <div className={styles.cta}>
          {cta}
        </div>
      )}
    </div>
  );
}
