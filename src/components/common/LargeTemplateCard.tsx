"use client";

import styles from "./LargeTemplateCard.module.scss";

interface LargeTemplateCardProps {
  className?: string;
}

export default function LargeTemplateCard({ className = "" }: LargeTemplateCardProps) {
  const demoUrl = "https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12";

  return (
    <div className={`${styles.largeTemplateCard} ${className}`}>
      <iframe
        src={demoUrl}
        title="Memory Chatbot Flow Preview"
        className={styles.iframe}
        allow="clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
