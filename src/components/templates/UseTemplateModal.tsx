"use client";

import { Flow, isPlaceholderUrl } from "@/lib/use-cases";
import { useEffect, useState } from "react";
import styles from "./UseTemplateModal.module.scss";

interface UseTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  flow?: Flow;
}

export default function UseTemplateModal({ isOpen, onClose, flow }: UseTemplateModalProps) {
  const [isCopying, setIsCopying] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleDownload = async () => {
    if (!flow) return;
    if (isPlaceholderUrl(flow.githubDownloadUrl)) {
      // Show "Coming soon" tooltip or message
      console.log("Download coming soon");
      return;
    }
    
    try {
      // Fetch the JSON file content
      const response = await fetch(flow.githubDownloadUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }
      
      // Get the file content as text
      const jsonContent = await response.text();
      
      // Create a blob with the JSON content
      const blob = new Blob([jsonContent], { type: 'application/json' });
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element with download attribute
      const link = document.createElement('a');
      link.href = url;
      link.download = `${flow.slug}.json`; // Set filename for download
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Fallback: open in new tab if fetch fails
      window.open(flow.githubDownloadUrl, '_blank');
    }
  };

  const handleCopyToClipboard = async () => {
    if (!flow) return;
    
    setIsCopying(true);
    setCopySuccess(false);
    
    try {
      // Fetch the JSON content from the local file
      const response = await fetch(flow.githubDownloadUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      
      const jsonContent = await response.text();
      
      // Copy to clipboard
      await navigator.clipboard.writeText(jsonContent);
      
      // Show success feedback
      setCopySuccess(true);
      console.log("Template copied to clipboard successfully!");
      
      // Reset success state after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
      
    } catch (error) {
      console.error("Failed to copy template to clipboard:", error);
      
      // Fallback: try to copy the URL instead
      try {
        await navigator.clipboard.writeText(flow.githubDownloadUrl);
        console.log("Download URL copied to clipboard as fallback");
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      } catch (fallbackError) {
        console.error("Fallback copy also failed:", fallbackError);
      }
    } finally {
      setIsCopying(false);
    }
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
          title={flow && isPlaceholderUrl(flow.githubDownloadUrl) ? "Coming soon" : ""}
        >
          <img src="/images/download.png" alt="Download" width="20" height="20" />
          {flow && isPlaceholderUrl(flow.githubDownloadUrl) ? "Download Flow (Coming Soon)" : "Download Flow"}
        </button>

        <button 
          className={styles.secondaryButton}
          onClick={handleCopyToClipboard}
          disabled={isCopying}
        >
          {isCopying ? (
            <>
              <div className={styles.spinner}></div>
              Copying...
            </>
          ) : copySuccess ? (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <img src="/images/copy.png" alt="Copy" width="20" height="20" />
              Copy Template to Clipboard
            </>
          )}
        </button>
      </div>
    </div>
  );
}

