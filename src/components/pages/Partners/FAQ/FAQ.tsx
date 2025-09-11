"use client";

import IconChevdown from "@/components/ui/icons/IconChevdown";
import IconChevup from "@/components/ui/icons/IconChevup";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import { useState } from "react";
import styles from "./styles.module.scss";

const FAQ_ITEMS = [
  {
    question: "What file format and size should my project zip be?",
    answer: "Please submit your project as a .zip file. Include your Langflow flows, documentation, and any relevant code or assets that demonstrate your implementation."
  },
  {
    question: "Will my project information be kept confidential?",
    answer: "Yes, all submitted materials are treated as confidential and used solely for partner evaluation purposes. We will not share your project details without your explicit consent."
  },
  {
    question: "How long does the review process take?",
    answer: "We typically review applications within 5-7 business days. You'll receive an email notification once your application has been processed, regardless of the outcome."
  },
 /*  {
    question: "Can I update my partner profile after approval?",
    answer: "Yes, you can update your partner profile, case studies, and company information at any time through our partner portal. We encourage keeping your information current."
  }, */
  {
    question: "How can I use the Certified Partner badge?",
    answer: "Once approved, you'll receive official badge assets and usage guidelines. You can display the badge on your website, marketing materials, and business cards following our brand guidelines."
  },
  {
    question: "When will the public partner directory be available?",
    answer: "The public partner directory will be launched in Q2 2024. All approved partners will be automatically included and can opt out if desired."
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
