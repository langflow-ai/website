"use client";

import { FLOWS } from "@/data/flows";
import Image from "next/image";
import Link from "next/link";
import styles from "./BeginnerBasics.module.scss";
import TemplateCard from "./TemplateCard";

// Small cards with the 3 flows (excluding basic-prompting)
const smallCards = FLOWS
  .filter(flow => flow.slug !== "basic-prompting")
  .map(flow => ({
    id: flow.slug,
    name: flow.title,
    description: flow.shortDescription,
    categories: [flow.category, flow.subcategory],
    iconType: flow.iconType,
    slug: flow.slug
  }));

export default function BeginnerBasics() {
  return (
    <section className={styles.beginnerBasics}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>Beginner basics</div>
        
        <div className={styles.templatesContainer}>
          {/* Large Card */}  
          <Link href="/templates/basic-prompting" className={styles.largeCard}>
            <div className={styles.leftContent}>
              <div className={styles.iconContainer}>
                <Image
                  src="/images/basic.png"
                  alt="Basic Prompting icon"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className={styles.cardTitle}>Basic Prompting</h3>
              <p className={styles.cardDescription}>
                Perform basic prompting with an OpenAI model.
              </p>
              <div className={styles.categoryButtons}>
                <button className={styles.categoryButton}>Basic</button>
                <button className={styles.categoryButton}>Prompting</button>
              </div>
            </div>
            <div className={styles.rightContent}>
              <iframe
                src="https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12"
                title="Basic Prompting Flow Preview"
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
