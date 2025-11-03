"use client";

import { BackgroundGradient } from "@/components/BackgroundGradient";
import Button from "@/components/ui/button";
import { ButtonTypes } from "@/components/ui/button/types";
import ImportModal from "@/components/ui/ImportModal";
import { Template } from "@/lib/use-cases/types";
import { useState } from "react";
import { BackLink, ContentSection } from "../../shared";
import styles from "./styles.module.scss";

interface TemplateDetailTemplateProps {
  template: Template;
}

const TemplateDetailTemplate = ({ template }: TemplateDetailTemplateProps) => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  return (
    <>
      <BackgroundGradient />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <BackLink href={`/use-cases/category/${template.category[0]}`}>
                ← Back to {template.category[0].replace(/-/g, ' ')}
              </BackLink>
              <div className="text-center">
                <h1 className={styles.heroTitle}>{template.topic}</h1>
                <p className={styles.heroDescription}>{template.summary}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Template Details */}
      <ContentSection>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Use Cases */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Use Cases</h3>
              <div className={styles.useCasesList}>
                {template.mapped_use_cases
                  .filter(useCase => !useCase.includes('<iframe'))
                  .map((useCase, index) => (
                    <div key={index} className={styles.useCaseItem}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{useCase}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Example */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Example</h3>
              <div className={styles.exampleContainer}>
                <div className={styles.exampleBlock}>
                  <h4 className={styles.exampleLabel}>Use Cases</h4>
                  <div className={styles.exampleText}>
                    {template.mapped_use_cases
                      .filter(useCase => !useCase.includes('<iframe'))
                      .map((useCase, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                          • {useCase}
                        </div>
                      ))}
                  </div>
                </div>
                <svg className={styles.exampleArrow} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className={styles.exampleBlock}>
                  <h4 className={styles.exampleLabel}>Technical Notes</h4>
                  <p className={styles.exampleText}>
                    {template.comment || "No technical notes available for this template."}
                  </p>
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Template Information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Categories</span>
                  <div className={styles.infoTags}>
                    {template.category.map((cat) => (
                      <span key={cat} className={styles.infoTag}>
                        {cat.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Builder</span>
                  <span className={styles.infoValue}>{template.builder.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Last Updated</span>
                  <span className={styles.infoValue}>
                    {new Date(template.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Version</span>
                  <span className={styles.infoValue}>{template.flow.version}</span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className={styles.ctaSection}>
              <h3 className={styles.ctaTitle}>Ready to use this template?</h3>
              <p className={styles.ctaDescription}>
                Download the JSON file and import it into your Langflow workspace to get started.
              </p>
              <Button 
                variant={ButtonTypes.FILLED} 
                onClick={() => setIsImportModalOpen(true)}
                className={styles.ctaButton}
              >
                Get flow
              </Button>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Import Modal */}
      <ImportModal
        template={template}
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </>
  );
};

export default TemplateDetailTemplate;

