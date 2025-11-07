"use client";

import { FLOWS } from "@/data/flows";
import {
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCpuChip,
  HiOutlinePhone,
  HiOutlineSparkles,
} from "react-icons/hi2";
import Link from "next/link";
import { useState } from "react";
import styles from "./BeginnerBasics.module.scss";
import TemplateCard from "./TemplateCard";

// Icon map for the large card
const iconMap = {
  basic: { Icon: HiOutlineChatBubbleLeftRight, bg: "rgb(139, 92, 246)" },
  robot: { Icon: HiOutlineCpuChip, bg: "rgb(254, 89, 194)" },
  automation: { Icon: HiOutlineSparkles, bg: "rgb(34, 197, 94)" },
  research: { Icon: HiOutlineBookOpen, bg: "rgb(59, 130, 246)" },
  support: { Icon: HiOutlinePhone, bg: "rgb(245, 158, 11)" },
};

// Get first flow for large card
const largeCardFlow = FLOWS[0];

// Small cards - show next 3 flows
const smallCards = FLOWS
  .slice(1, 4) // Get flows 2-4 (index 1 to 3)
  .map(flow => ({
    id: flow.slug,
    name: flow.title,
    description: flow.shortDescription,
    categories: [flow.category, flow.subcategory],
    iconType: flow.iconType,
    slug: flow.slug
  }));

export default function BeginnerBasics() {
  const [showTooltip, setShowTooltip] = useState(false);
  const iconConfig = iconMap[largeCardFlow.iconType] || iconMap.basic;
  const Icon = iconConfig.Icon;

  return (
    <section className={styles.beginnerBasics}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>Getting Started</div>
        
        <div className={styles.templatesContainer}>
          {/* Large Card */}  
          <Link href={`/templates/${largeCardFlow.slug}`} className={styles.largeCard}>
            <div className={styles.leftContent}>
              <div 
                className={styles.iconContainer}
                style={{ backgroundColor: iconConfig.bg }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Icon 
                  className={styles.icon}
                  size={24}
                />
                {showTooltip && (
                  <div className={styles.tooltip}>
                    {largeCardFlow.topic}
                  </div>
                )}
              </div>
              <h3 className={styles.cardTitle}>{largeCardFlow.title}</h3>
              <p className={styles.cardDescription}>
                {largeCardFlow.shortDescription}
              </p>
              <div className={styles.categoryButtons}>
                <button className={styles.categoryButton}>{largeCardFlow.category}</button>
                <button className={styles.categoryButton}>{largeCardFlow.subcategory}</button>
              </div>
            </div>
            <div className={styles.rightContent}>
              <iframe
                src={largeCardFlow.iframeSrc}
                title={`${largeCardFlow.title} Flow Preview`}
                className={styles.iframe}
                allow="clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </Link>

          {/* Small Cards */}
          <div className={styles.smallCards}>
            {smallCards.map((template) => (
              <TemplateCard
                key={template.id}
                title={template.name}
                description={template.description}
                categories={template.categories}
                iconType={template.iconType}
                slug={template.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
