// TemplateViewer Component for Template Detail Page

import styles from "./TemplateViewer.module.scss";

interface TemplateViewerProps {
  src?: string;
  className?: string;
}

export default function TemplateViewer({ src, className = "" }: TemplateViewerProps) {
  // Use the test URL if no src is provided
  const iframeSrc = src || "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12";
  
  return (
    <div className={`${styles.templateViewer} ${className}`}>
      <div className={styles.preview} style={{ height: "600px", paddingTop: "0", position: "relative" }}>
        <iframe
          src={iframeSrc}
          title="Memory Chatbot Flow Preview"
          allow="clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "8px",
            display: "block",
            background: "#f0f0f0" 
          }}
          
        />
      </div>

      <div className={styles.controls}>
        <div className={styles.controlGroup} role="group" aria-label="Viewer controls">
          <button type="button" className={styles.iconButton} aria-label="Reset view">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button type="button" className={styles.iconButton} aria-label="Zoom in">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>
          <button type="button" className={styles.iconButton} aria-label="Zoom out">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          <button type="button" className={styles.iconButton} aria-label="Undo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <button type="button" className={styles.ctaButton}>
          Use for Free
        </button>
      </div>
    </div>
  );
}
