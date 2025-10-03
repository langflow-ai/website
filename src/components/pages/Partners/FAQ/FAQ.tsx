"use client";

import IconChevdown from "@/components/ui/icons/IconChevdown";
import IconChevup from "@/components/ui/icons/IconChevup";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import { useState } from "react";
import styles from "./styles.module.scss";

const FAQ_ITEMS = [
  {
    question: "Do I need to upload a .zip?",
    answer: "No. Upload one Case Study PDF. Optional attachments like flows or code are welcome."
  },
  {
    question: "How long does review take?",
    answer: "Up to 10 business days."
  },
  {
    question: "Will my info be confidential?", 
    answer: "Yes. We only use submitted materials for evaluation. NDA available upon request."
  },
  {
    question: "How can I use the badge?",
    answer: "On your website, proposals, and marketing collateral."
  },
  {
    question: "When will the directory be live?",
    answer: "After approval, your listing goes live within 3 business days."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <section className={styles.faq}>
      <div className={`${styles.container} container-wide`}>
        <div className={styles.header}>
          <Text size={600} weight={Weight.Bold} className={styles.title}>
            Frequently Asked Questions
          </Text>
          <Text size={400} weight={Weight.Regular} className={styles.description}>
            Have questions about our partner program? Find answers to the most common questions below.
          </Text>
        </div>
        
        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.questionButton}
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <Text size={400} weight={Weight.Semibold} className={styles.question}>
                  {item.question}
                </Text>
                <div className={styles.icon}>
                  {openItems.includes(index) ? <IconChevup /> : <IconChevdown />}
                </div>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`${styles.answer} ${openItems.includes(index) ? styles.answerOpen : ''}`}
              >
                <Text size={300} weight={Weight.Regular} className={styles.answerText}>
                  {item.answer}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
