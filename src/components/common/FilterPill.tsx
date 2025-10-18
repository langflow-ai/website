// FilterPill Atomic Component

import { ReactNode } from "react";
import styles from "./FilterPill.module.scss";

interface FilterPillProps {
  label: string;
  value: string;
  selected: boolean;
  onToggle: () => void;
  icon?: ReactNode;
  className?: string;
}

export default function FilterPill({ 
  label, 
  value, 
  selected, 
  onToggle, 
  icon,
  className = "" 
}: FilterPillProps) {
  return (
    <button
      onClick={onToggle}
      className={`${styles.filterPill} ${selected ? styles.selected : ''} ${className}`}
      aria-pressed={selected}
      aria-label={`Filter by ${label}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
