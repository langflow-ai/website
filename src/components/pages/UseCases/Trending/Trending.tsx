"use client";

import { FLOWS } from "@/lib/use-cases";
import TemplateCard from "../BeginnerBasics/TemplateCard";
import styles from "./Trending.module.scss";

export default function Trending() {
  // Show flows 5-7 (different from Getting Started which shows flows 1-4)
  const trendingFlows = FLOWS.slice(4, 7); // Get flows at index 4, 5, 6

  return (
    <section className={styles.trending}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Trending</h2>
        
        <div className={styles.templatesContainer}>
          {trendingFlows.map((flow) => (
            <TemplateCard
              key={flow.slug}
              title={flow.title}
              description={flow.shortDescription}
              categories={[flow.category, flow.subcategory]}
              iconType={flow.iconType}
              slug={flow.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
