"use client";

import Button from "@/components/ui/button";
import { ButtonTypes } from "@/components/ui/button/types";
import IconInfo from "@/components/ui/icons/IconInfo";
import { Template } from "@/lib/use-cases/types";
import styles from "./styles.module.scss";

interface TemplateCardProps {
  template: Template;
  onOpenInLangflow?: (template: Template) => void;
  onViewDetails?: (slug: string) => void;
  className?: string;
}

const TemplateCard = ({ template, onOpenInLangflow, onViewDetails, className = "" }: TemplateCardProps) => {
  const handleOpenInLangflow = () => {
    if (onOpenInLangflow) {
      onOpenInLangflow(template);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(template.slug);
    }
  };

  return (
    <div className={`${styles.templateCard} ${className}`}>
      <div className={styles.templateCardHeader}>
        <h3 className={styles.templateTitle}>
          {template.topic}
        </h3>
        <p className={styles.templateSummary}>
          {template.summary}
        </p>
      </div>
      
      <div className={styles.templateCardBody}>
        
        <div className={styles.useCases}>
          <span className={styles.useCasesLabel}>Use cases:</span>
          <div className={styles.useCasesTags}>
            {template.mapped_use_cases.slice(0, 3).map((useCase) => (
              <span key={useCase} className={styles.useCaseTag}>
                {useCase}
              </span>
            ))}
          </div>
        </div>
        
        <div className={styles.templateMeta}>
          <span className={styles.builder}>
            by {template.builder.name}
          </span>
          <span className={styles.updated}>
            {new Date(template.updated_at).toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className={styles.templateCardFooter}>
        <div className={styles.templateButtons}>
          <Button 
            variant={ButtonTypes.FILLED} 
            className={styles.primaryTemplateButton}
            onClick={handleOpenInLangflow}
          >
            Get flow
          </Button>
          <Button 
            variant={ButtonTypes.BORDER} 
            href="/templates/basic-prompting"
            onClick={handleViewDetails}
            className={styles.secondaryTemplateButton}
          >
            <IconInfo />
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
