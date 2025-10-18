"use client";

import Image from "next/image";
import styles from "./BeginnerBasics.module.scss";
import TemplateCard from "./TemplateCard";

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

export default function BeginnerBasics() {
  return (
    <section className={styles.beginnerBasics}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>Beginner basics</div>
        
        <div className={styles.templatesContainer}>
          {/* Large Card */}  
          <div className={styles.largeCard}>
            <div className={styles.leftContent}>
              <div className={styles.iconContainer}>
                <Image
                  src="/images/robot.png"
                  alt="Robot icon"
                  width={24}
                  height={24}
                />
              </div>
              <h3 className={styles.cardTitle}>Memory Chatbot</h3>
              <p className={styles.cardDescription}>
                Create a chatbot that saves and references previous messages.
              </p>
              <div className={styles.categoryButtons}>
                <button className={styles.categoryButton}>Category</button>
                <button className={styles.categoryButton}>Sub-category</button>
              </div>
            </div>
            <div className={styles.rightContent}>
              <iframe
                src="https://ubuntu-production-da92.up.railway.app/flow/9e15c125-463a-4815-bd55-b52b55f57b12"
                title="Memory Chatbot Flow Preview"
                className={styles.iframe}
                allow="clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </div>

          {/* Small Cards */}
          <div className={styles.smallCards}>
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
      </div>
    </section>
  );
}
