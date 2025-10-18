// TemplateCard Molecular Component

import { SEGMENT_LABELS, Template } from "@/lib/types/templates";
import Link from "next/link";
import IconBadge from "./IconBadge";
import Tag from "./Tag";
import styles from "./TemplateCard.module.scss";

interface TemplateCardProps {
  template: Template;
  className?: string;
}

const BADGE_ICONS: Record<string, React.ReactNode> = {
  openai: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  gmail: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819L12 8.73l6.545-4.91h3.819c.904 0 1.636.732 1.636 1.636z"/>
    </svg>
  ),
  github: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  pinecone: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0L2 6l10 6 10-6-10-6zM2 18l10 6 10-6-10-6-10 6z"/>
    </svg>
  ),
  schedule: (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  // New icons based on the image
  "memory-chatbot": (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#EC4899"/>
    </svg>
  ),
  "basic-prompting": (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="#8B5CF6"/>
    </svg>
  )
};

export default function TemplateCard({ template, className = "" }: TemplateCardProps) {
  const getBadgeIcon = (badge: string) => {
    return BADGE_ICONS[badge] || (
      <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>{badge.charAt(0).toUpperCase()}</span>
    );
  };

  return (
    <Link 
      href={`/templates/${template.slug}`}
      className={`${styles.templateCard} ${className}`}
    >
      {/* Header with badges */}
      <div className={styles.header}>
        {template.badges?.slice(0, 3).map((badge, index) => (
          <IconBadge
            key={index}
            icon={getBadgeIcon(badge)}
            tooltip={badge}
          />
        ))}
        {template.badges && template.badges.length > 3 && (
          <IconBadge
            icon={<span style={{ fontSize: '0.75rem', fontWeight: '500' }}>+{template.badges.length - 3}</span>}
            tooltip={`+${template.badges.length - 3} more integrations`}
          />
        )}
      </div>

      {/* Title */}
      <h3 className={styles.title}>
        {template.title}
      </h3>

      {/* Description */}
      <p className={styles.description}>
        {template.summary}
      </p>

      {/* Categories */}
      <div className={styles.categories}>
        {template.segments.slice(0, 2).map((segment) => (
          <Tag
            key={segment}
            label={SEGMENT_LABELS[segment]}
          />
        ))}
        {template.segments.length > 2 && (
          <Tag
            label={`+${template.segments.length - 2}`}
          />
        )}
      </div>

      {/* Thumbnail removed - no images in cards */}
    </Link>
  );
}
