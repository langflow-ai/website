"use client";

import Button from "@/components/ui/button";
import { ButtonTypes } from "@/components/ui/button/types";
import IconDownload from "@/components/ui/icons/IconDownload";
import { Template } from "@/lib/use-cases/types";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface ImportModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImportModal = ({ template, isOpen, onClose }: ImportModalProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !template) return null;

  const handleDownloadJson = async () => {
    try {
      setCopied(true);
      
      // In a real implementation, you would fetch the actual JSON from template.flow.json_url
      const mockJson = {
        name: template.topic,
        description: template.summary,
        version: template.flow.version,
        category: template.category,
        difficulty: template.difficulty,
        status: template.status,
        builder: template.builder,
        updated_at: template.updated_at,
        // This would be the actual flow JSON
        flow: "// Flow JSON would be loaded from template.flow.json_url"
      };
      
      // Convert JSON to string with pretty formatting
      const jsonString = JSON.stringify(mockJson, null, 2);
      
      // Create a Blob with the JSON data
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // Create a temporary URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${template.slug}.json`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to download JSON:', err);
      setCopied(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            Import Template
          </h2>
          <p className={styles.templateName}>{template.topic}</p>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.instructions}>
            <h4>How to import this template:</h4>
            <ol>
              <li>Copy the JSON below</li>
              <li>Open Langflow</li>
              <li>Click "Import" and paste the JSON</li>
              <li>Configure the template with your settings</li>
            </ol>
          </div>
          
          <div className={styles.jsonHeader}>
            <span>Template JSON</span>
            <Button
              variant={ButtonTypes.BORDER}
              onClick={handleDownloadJson}
            >
              <IconDownload />
              {copied ? "Downloading..." : "Download JSON"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
