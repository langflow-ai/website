import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import styles from "./styles.module.scss";

const STEPS = [
  {
    number: "01",
    title: "Apply",
    description: "Submit your application with company details and project description."
  },
  {
    number: "02", 
    title: "Review",
    description: "Our team reviews your application and Langflow usage within 5-7 business days."
  },
  {
    number: "03",
    title: "Submit Case Study",
    description: "Provide one detailed case study showcasing your Langflow implementation."
  },
  {
    number: "04",
    title: "Get Certified",
    description: "Receive your official Langflow Certified Partner badge and welcome package."
  },
  {
    number: "05",
    title: "Get Listed",
    description: "Your company appears in our official partner directory for maximum visibility."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className={styles.howItWorks}>
      <div className={`${styles.container} container-wide`}>
        <div className={styles.header}>
          <Text size={600} weight={Weight.Bold} className={styles.title}>
            How It Works
          </Text>
          <Text size={400} weight={Weight.Regular} className={styles.description}>
            Join our partner program in just 5 simple steps. The entire process typically takes 1-2 weeks.
          </Text>
        </div>
        
        <div className={styles.steps}>
          {STEPS.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>
                <Text size={500} weight={Weight.Bold} className={styles.number}>
                  {step.number}
                </Text>
              </div>
              <div className={styles.stepContent}>
                <Text size={500} weight={Weight.Semibold} className={styles.stepTitle}>
                  {step.title}
                </Text>
                <Text size={300} weight={Weight.Regular} className={styles.stepDescription}>
                  {step.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
