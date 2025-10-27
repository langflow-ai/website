"use client";

import { FLOWS } from "@/data/flows";
import TemplateCard from "../BeginnerBasics/TemplateCard";
import styles from "./Trending.module.scss";

export default function Trending() {
  return (
    <section className={styles.trending}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Trending</h2>
        
        <div className={styles.templatesContainer}>
          {FLOWS
            .filter(flow => flow.slug !== "basic-prompting")
            .map((flow) => (
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
