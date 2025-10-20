"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./TemplateCard.module.scss";

interface TemplateCardProps {
  title: string;
  description: string;
  categories: string[];
  iconType: "basic" | "robot";
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
  const iconSrc = iconType === "basic" ? "/images/basic.png" : "/images/robot.png";
  const iconAlt = iconType === "basic" ? "Basic Prompting icon" : "Memory Chatbot icon";
  const iconBgColor = iconType === "basic" ? "rgb(139, 92, 246)" : "rgb(254, 89, 194)"; // Purple for basic, Pink for robot
  
  // Redirect all cards to basic-prompting template for now
  const href = `/templates/basic-prompting`;

  return (
    <Link href={href} className={`${styles.templateCard} ${className}`}>
      <div className={styles.leftContent}>
        <div 
          className={styles.iconContainer}
          style={{ backgroundColor: iconBgColor }}
        >
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={24}
            height={24}
          />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>
          {description}
        </p>
        <div className={styles.categoryButtons}>
          {categories.map((category, index) => (
            <button key={index} className={styles.categoryButton}>
              {category}
            </button>
          ))}
        </div>
      </div>
    </Link>
  );
}
