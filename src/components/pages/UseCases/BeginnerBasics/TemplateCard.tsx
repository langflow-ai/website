"use client";

import Image from "next/image";
import Link from "next/link";
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
  const getIconConfig = (type: string) => {
    switch (type) {
      case "basic":
        return {
          src: "/images/basic.png",
          alt: "Basic Prompting icon",
          bgColor: "rgb(139, 92, 246)" // Purple
        };
      case "robot":
        return {
          src: "/images/robot.png",
          alt: "Robot icon",
          bgColor: "rgb(254, 89, 194)" // Pink
        };
      case "automation":
        return {
          src: "/images/robot.png", // Using robot icon for automation
          alt: "Automation icon",
          bgColor: "rgb(34, 197, 94)" // Green
        };
      case "research":
        return {
          src: "/images/basic.png", // Using basic icon for research
          alt: "Research icon",
          bgColor: "rgb(59, 130, 246)" // Blue
        };
      case "support":
        return {
          src: "/images/robot.png", // Using robot icon for support
          alt: "Support icon",
          bgColor: "rgb(245, 158, 11)" // Orange
        };
      default:
        return {
          src: "/images/basic.png",
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

  return (
    <Link href={href} className={`${styles.templateCard} ${className}`}>
      <div className={styles.leftContent}>
        <div 
          className={styles.iconContainer}
          style={{ backgroundColor: iconConfig.bgColor }}
        >
          <Image
            src={iconConfig.src}
            alt={iconConfig.alt}
            width={24}
            height={24}
          />
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
