"use client";

import Image from "next/image";
import styles from "./TemplateCard.module.scss";

interface TemplateCardProps {
  title: string;
  description: string;
  categories: string[];
  iconType: "basic" | "robot";
  className?: string;
}

export default function TemplateCard({ 
  title, 
  description, 
  categories, 
  iconType,
  className = "" 
}: TemplateCardProps) {
  const iconSrc = iconType === "basic" ? "/images/basic.png" : "/images/robot.png";
  const iconAlt = iconType === "basic" ? "Basic Prompting icon" : "Memory Chatbot icon";
  const iconBgColor = iconType === "basic" ? "rgb(139, 92, 246)" : "rgb(254, 89, 194)"; // Purple for basic, Pink for robot

  return (
    <div className={`${styles.templateCard} ${className}`}>
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
    </div>
  );
}
