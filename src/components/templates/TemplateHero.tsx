// TemplateHero Component for Template Detail Page

"use client";

import { Flow } from "@/lib/use-cases";
import { useShare } from "@/hooks/useShare";
import { Template } from "@/lib/types/templates";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import {
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCpuChip,
  HiOutlinePhone,
  HiOutlineSparkles
} from "react-icons/hi2";
import Toast from "../ui/Toast";
import styles from "./TemplateHero.module.scss";
import UseTemplateModal from "./UseTemplateModal";

interface TemplateHeroProps {
  template: Template;
  flow: Flow;
  className?: string;
}

const BADGE_ICONS: Record<string, React.ReactNode> = {
  openai: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  ),
  gmail: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819L12 8.73l6.545-4.91h3.819c.904 0 1.636.732 1.636 1.636z" />
    </svg>
  ),
  github: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  pinecone: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L2 6l10 6 10-6-10-6zM2 18l10 6 10-6-10-6-10 6z" />
    </svg>
  ),
  schedule: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
};

export default function TemplateHero({ template, flow, className = "" }: TemplateHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);
  const { share, shareToTwitter, shareToLinkedIn } = useShare();

  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this ${flow.title} template on Langflow: ${flow.shortDescription}`;

  // Share functions
  const handleNativeShare = async () => {
    const result = await share({
      title: flow.title,
      text: flow.shortDescription,
      url: currentUrl,
    });
    
    if (result.success && result.method === 'clipboard') {
      setShowToast(true);
    }
  };

  const handleTwitterShare = () => {
    shareToTwitter(shareText, currentUrl);
  };

  const handleLinkedInShare = () => {
    shareToLinkedIn(currentUrl);
  };

  // Detect native share support to toggle icon for fallback (copy link)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSupportsNativeShare(!!navigator.share);
    }
  }, []);

  const getBadgeIcon = (badge: string) => {
    return BADGE_ICONS[badge] || (
      <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>
        {badge.charAt(0).toUpperCase()}
      </span>
    );
  };

  const formatDate = (isoDate: string) => {
    // For now, return "2 months ago" as requested
    return "2 months ago";
    
    // Original date calculation (commented out for now)
    // const date = new Date(isoDate);
    // const now = new Date();
    // const difference = now.getTime() - date.getTime();
    // const days = Math.max(1, Math.round(difference / (1000 * 60 * 60 * 24)));

    // if (days < 30) {
    //   return `${days} day${days > 1 ? "s" : ""} ago`;
    // }
    // if (days < 365) {
    //   const months = Math.round(days / 30);
    //   return `${months} month${months > 1 ? "s" : ""} ago`;
    // }
    // const years = Math.round(days / 365);
    // return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  // Get icon and label based on flow iconType
  const getIconConfig = (iconType: string) => {
    switch (iconType) {
      case "basic":
        return {
          Icon: HiOutlineChatBubbleLeftRight,
          label: "Chat"
        };
      case "robot":
        return {
          Icon: HiOutlineCpuChip,
          label: "Automation"
        };
      case "automation":
        return {
          Icon: HiOutlineSparkles,
          label: "Automation"
        };
      case "research":
        return {
          Icon: HiOutlineBookOpen,
          label: "Research"
        };
      case "support":
        return {
          Icon: HiOutlinePhone,
          label: "Support"
        };
      default:
        return {
          Icon: HiOutlineChatBubbleLeftRight,
          label: "Chat"
        };
    }
  };

  const iconConfig = getIconConfig(flow.iconType);
  const IconComponent = iconConfig.Icon;

  return (
    <section className={`${styles.templateHero} ${className}`}>
      <div className={styles.backgroundNoise} />
      <div className={styles.backgroundGradient} />

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Back to templates link - 96px from header */}
          <Link href="/use-cases" className={styles.backLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to templates
          </Link>

          {/* Main content area */}
          <div className={styles.mainContent}>
            {/* Left side - Title, description, CTA and share */}
            <div className={styles.leftContent}>
              {/* Title - 48px below back link */}
              <h1 className={styles.title}>{flow.title}</h1>
              
              {/* Description - 32px below title */}
              <p className={styles.description}>
                {flow.shortDescription}
              </p>

              {/* Mobile: Sidebar info before CTA */}
              <aside className={styles.mobileSidebar}>
                <div className={styles.mobileSidebarBlock}>
                  <span className={styles.sidebarLabel}>Last update</span>
                  <span className={styles.lastUpdate}>{formatDate(template.updatedAt)}</span>
                </div>

                <div className={styles.mobileSidebarBlock}>
                  <div className={styles.mobileAutomationBadge}>
                    <div className={styles.mobileAutomationIcon}>
                      <IconComponent className={styles.icon} size={20} />
                    </div>
                    <span className={styles.automationText}>{iconConfig.label}</span>
                  </div>
                </div>
              </aside>

              {/* CTA and Share buttons on same line */}
              <div className={styles.actions}>
                {/* CTA button */}
                <button 
                  type="button" 
                  className={styles.primaryButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  Use for Free
                </button>

                {/* Share buttons */}
                <div className={styles.shareButtons}>
                  <span className={styles.shareLabel}>Share</span>
                  <button 
                    type="button" 
                    className={styles.shareButton}
                    onClick={handleNativeShare}
                    aria-label={supportsNativeShare ? "Share template" : "Copy link"}
                    title={supportsNativeShare ? "Share template" : "Copy link"}
                  >
                    {supportsNativeShare ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                      </svg>
                    ) : (
                      <FaRegCopy size={18} />
                    )}
                  </button>
                  <button 
                    type="button" 
                    className={styles.shareButton} 
                    onClick={handleTwitterShare}
                    aria-label="Share on X (Twitter)"
                    title="Share on X (Twitter)"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    className={styles.shareButton} 
                    onClick={handleLinkedInShare}
                    aria-label="Share on LinkedIn"
                    title="Share on LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop: Right side - Sidebar positioned 149px from right edge */}
            <aside className={styles.rightSidebar}>
              <div className={styles.sidebarBlock}>
                <span className={styles.sidebarLabel}>Last update</span>
                <span className={styles.lastUpdate}>{formatDate(template.updatedAt)}</span>
              </div>

              <div className={styles.sidebarBlock}>
                <div className={styles.automationBadge}>
                  <div className={styles.automationIcon}>
                    <IconComponent className={styles.icon} size={24} />
                  </div>
                  <span className={styles.automationText}>{iconConfig.label}</span>
                </div>
              </div>
            </aside>
          </div>

          {/* Iframe section - 96px below CTA and share buttons */}
          <div className={styles.iframeSection}>
            <div className={styles.preview}>
              <iframe
                src={flow.iframeSrc}
                title={`${flow.title} Flow Preview`}
                allow="clipboard-write; clipboard-read; web-share"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
                className={styles.templateIframe}
                loading="lazy"
                onError={(e) => {
                  console.error('Iframe load error for', flow.title, ':', e);
                  console.error('URL:', flow.iframeSrc);
                }}
                onLoad={() => {
                  console.log('Iframe loaded successfully for', flow.title, ':', flow.iframeSrc);
                }}
              />
              {/* Fallback message if iframe fails to load */}
              <div className={styles.iframeFallback}>
                <p>If the flow preview doesn't load, you can <a href={flow.iframeSrc} target="_blank" rel="noopener noreferrer">open it in a new tab</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Template Modal */}
      <UseTemplateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        flow={flow}
      />

      {/* Toast notification */}
      <Toast
        message="Link copied to clipboard!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
}
