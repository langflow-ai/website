// IconBadge Atomic Component

import { ReactNode } from "react";
import styles from "./IconBadge.module.scss";

interface IconBadgeProps {
  icon: ReactNode;
  tooltip?: string;
  className?: string;
}

export default function IconBadge({ 
  icon, 
  tooltip, 
  className = "" 
}: IconBadgeProps) {
  return (
    <div 
      className={`${styles.iconBadge} ${className}`}
      title={tooltip}
      role="img"
      aria-label={tooltip}
    >
      {icon}
    </div>
  );
}
