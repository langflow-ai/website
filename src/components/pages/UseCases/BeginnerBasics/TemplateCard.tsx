"use client";

import Link from "next/link";
import { useState } from "react";
import {
    HiOutlineBookOpen,
    HiOutlineChatBubbleLeftRight,
    HiOutlineCpuChip,
    HiOutlinePhone,
    HiOutlineSparkles
} from "react-icons/hi2";
import styles from "./TemplateCard.module.scss";

interface TemplateCardProps {
  title: string;
  description: string;
  categories: string[];
  iconType: "basic" | "robot" | "automation" | "research" | "support";
  slug?: string;
  className?: string;
}

export default function TemplateCard({ 
  title, 
  description, 
  categories, 
  iconType,
  slug,
  className = "" 
}: TemplateCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getIconConfig = (type: string) => {
    switch (type) {
      case "basic":
        return {
          icon: HiOutlineChatBubbleLeftRight,
          alt: "Basic Prompting icon",
          bgColor: "rgb(139, 92, 246)" // Purple
        };
      case "robot":
        return {
          icon: HiOutlineCpuChip,
          alt: "Robot icon",
          bgColor: "rgb(254, 89, 194)" // Pink
        };
      case "automation":
        return {
          icon: HiOutlineSparkles,
          alt: "Automation icon",
          bgColor: "rgb(34, 197, 94)" // Green
        };
      case "research":
        return {
          icon: HiOutlineBookOpen,
          alt: "Research icon",
          bgColor: "rgb(59, 130, 246)" // Blue
        };
      case "support":
        return {
          icon: HiOutlinePhone,
          alt: "Support icon",
          bgColor: "rgb(245, 158, 11)" // Orange
        };
      default:
        return {
          icon: HiOutlineChatBubbleLeftRight,
          alt: "Default icon",
          bgColor: "rgb(139, 92, 246)"
        };
    }
  };

  const iconConfig = getIconConfig(iconType);
  
  // Use the provided slug or default to basic-prompting
  const href = slug ? `/templates/${slug}` : `/templates/basic-prompting`;
  
  // Limit description length to prevent card styling breaks
  const truncatedDescription = description.length > 100 
    ? description.substring(0, 100) + "..." 
    : description;

  // Abbreviate category names to fit better in cards
  const abbreviateCategory = (category: string) => {
    const abbreviations: { [key: string]: string } = {
      "Customer Support": "Support",
      "Ticket Management": "Tickets",
      "Release Management": "Releases",
      "Document Analysis": "Documents",
      "Agentic RAG Research": "Research"
    };
    return abbreviations[category] || category;
  };

  const abbreviatedCategories = categories.map(abbreviateCategory);
  const primaryCategory = categories[0] || 'Template';

  // Map icon types to tooltip labels
  const getTooltipLabel = (iconType: string) => {
    const mapping: { [key: string]: string } = {
      'basic': 'Chat',
      'robot': 'Automation',
      'automation': 'Automation',
      'research': 'Research',
      'support': 'Support'
    };
    return mapping[iconType] || primaryCategory;
  };

  const tooltipLabel = getTooltipLabel(iconType);

  return (
    <Link href={href} className={`${styles.templateCard} ${className}`}>
      <div className={styles.leftContent}>
        <div 
          className={styles.iconContainer}
          style={{ backgroundColor: iconConfig.bgColor }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <iconConfig.icon 
            className={styles.icon}
            size={24}
            style={{ width: '24px', height: '24px', flexShrink: 0 }}
          />
          {showTooltip && (
            <div className={styles.tooltip}>
              {tooltipLabel}
            </div>
          )}
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>
          {truncatedDescription}
        </p>
        <div className={styles.categoryButtons}>
          {abbreviatedCategories.map((category, index) => (
            <button key={index} className={styles.categoryButton}>
              {category}
            </button>
          ))}
        </div>
      </div>
    </Link>
  );
}
