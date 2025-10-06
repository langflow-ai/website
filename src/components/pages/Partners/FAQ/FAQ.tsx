"use client";

import IconChevdown from "@/components/ui/icons/IconChevdown";
import IconChevup from "@/components/ui/icons/IconChevup";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import { trackApplyClick } from "@/lib/utils/analytics";
import { useState } from "react";
import ApplicationFormModal from "../ApplicationFormModal/ApplicationFormModal";
import styles from "./styles.module.scss";

const FAQ_ITEMS = [
  {
    question: "What do I need to send?",
    answer: "To apply, you'll need to provide company information, contact details, and at least one detailed case study demonstrating successful Langflow implementation. The case study should include business impact, technical architecture, and measurable results. Optional attachments like flow diagrams, code samples, or additional documentation are welcome to strengthen your application."
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const openApplicationModal = (source: string) => {
    trackApplyClick(source);
    setIsModalOpen(true);
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
        
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <Text size={500} weight={Weight.Bold} className={styles.ctaTitle}>
              Ready to rule the AI market?
            </Text>
            <Text size={300} weight={Weight.Regular} className={styles.ctaDescription}>
              Stop waiting. Start building. Join the elite partners who are already winning with Langflow.
            </Text>
            <button className={styles.ctaButton} onClick={() => openApplicationModal('hero')}>
              <Text size={300} weight={Weight.Semibold} className={styles.ctaButtonText}>
                Apply Now - It Takes 2 Minutes
              </Text>
            </button>
          </div>
        </div>
      </div>
      
      <ApplicationFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
};

export default FAQ;
