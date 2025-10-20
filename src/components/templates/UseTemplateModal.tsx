"use client";

import { useEffect } from "react";
import styles from "./UseTemplateModal.module.scss";

interface UseTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UseTemplateModal({ isOpen, onClose }: UseTemplateModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    // Handle download logic
    console.log("Download Langflow Desktop");
  };

  const handleCopyToClipboard = () => {
    // Handle copy to clipboard logic
    console.log("Copy Template to Clipboard");
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContainer}>
        <button 
          className={styles.closeButton} 
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className={styles.modalTitle}>Use template</h2>

        <button 
          className={styles.primaryButton}
          onClick={handleDownload}
        >
          <img src="/images/download.png" alt="Download" width="20" height="20" />
          Download Langflow Desktop
        </button>

        <button 
          className={styles.secondaryButton}
          onClick={handleCopyToClipboard}
        >
          <img src="/images/copy.png" alt="Copy" width="20" height="20" />
          Copy Template to Clipboard
        </button>
      </div>
    </div>
  );
}

