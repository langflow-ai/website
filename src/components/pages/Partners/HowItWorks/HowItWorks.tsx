import IconCheck from "@/components/ui/icons/IconCheck";
import IconClock from "@/components/ui/icons/IconClock";
import IconStar from "@/components/ui/icons/IconStar";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import styles from "./styles.module.scss";

const STEPS = [
  {
    icon: <IconCheck />,
    title: "Apply",
    description: "Submit your company details and case study PDF through our streamlined application process."
  },
  {
    icon: <IconClock />,
    title: "Review", 
    description: "Our team reviews your application for technical fit and business alignment within 10 business days."
  },
  {
    icon: <IconStar />,
    title: "Get Certified",
    description: "Receive your partner badge, get listed in our directory, and access exclusive partner resources."
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
            Join our partner program in just 3 simple steps. The entire process typically takes 10 business days.
          </Text>
        </div>
        
        <div className={styles.steps}>
          {STEPS.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepIcon}>
                {step.icon}
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
