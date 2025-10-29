"use client";

import Button from "@/components/ui/button";
import { ButtonTypes } from "@/components/ui/button/types";
import styles from "./styles.module.scss";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const EmptyState = ({ 
  title, 
  description, 
  buttonText, 
  onButtonClick, 
  className = "" 
}: EmptyStateProps) => {
  return (
    <div className={`${styles.emptyState} ${className}`}>
      <h3 className={styles.emptyTitle}>
        {title}
      </h3>
      <p className={styles.emptyDescription}>
        {description}
      </p>
      {buttonText && onButtonClick && (
        <Button 
          variant={ButtonTypes.BORDER} 
          onClick={onButtonClick}
          className={styles.emptyButton}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
