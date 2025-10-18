"use client";

import TemplateCard from "../BeginnerBasics/TemplateCard";
import styles from "./Trending.module.scss";

const mockTemplates = [
  {
    id: "1",
    name: "Basic Prompting",
    description: "Perform basic prompting with an OpenAI model.",
    categories: ["Category", "Sub-category"],
    iconType: "basic" as const
  },
  {
    id: "2", 
    name: "Memory Chatbot",
    description: "Create a chatbot that saves and references previous messages.",
    categories: ["Category", "Sub-category"],
    iconType: "robot" as const
  },
  {
    id: "3",
    name: "Basic Prompting",
    description: "Perform basic prompting with an OpenAI model.",
    categories: ["Category", "Sub-category"],
    iconType: "basic" as const
  }
];

export default function Trending() {
  return (
    <section className={styles.trending}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Trending</h2>
        
        <div className={styles.templatesContainer}>
          {mockTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              title={template.name}
              description={template.description}
              categories={template.categories}
              iconType={template.iconType}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
