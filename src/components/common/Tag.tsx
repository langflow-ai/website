// Tag Atomic Component

import styles from "./Tag.module.scss";

interface TagProps {
  label: string;
  className?: string;
}

export default function Tag({ 
  label, 
  className = "" 
}: TagProps) {
  return (
    <span className={`${styles.tag} ${className}`}>
      {label}
    </span>
  );
}
