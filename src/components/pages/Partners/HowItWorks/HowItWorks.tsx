import IconCheck from "@/components/ui/icons/IconCheck";
import IconClock from "@/components/ui/icons/IconClock";
import IconEmail from "@/components/ui/icons/IconEmail";
import IconInfo from "@/components/ui/icons/IconInfo";
import IconStar from "@/components/ui/icons/IconStar";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import styles from "./styles.module.scss";

const STEPS = [
  {
    icon: <IconEmail />,
    title: "Apply",
    description: "Submit your company details and case study PDF through our streamlined application process."
  },
  {
    icon: <IconClock />,
    title: "Review", 
    description: "Our team reviews your application for technical fit and business alignment within 10 business days."
  },
  {
    icon: <IconInfo />,
    title: "Decision",
    description: "We evaluate your application and make a decision based on technical compatibility and business alignment."
  },
  {
    icon: <IconCheck />,
    title: "Profile Published",
    description: "Your partner profile goes live in our directory, showcasing your expertise to our community."
  },
  {
    icon: <IconStar />,
    title: "Get Certified",
    description: "Receive your partner badge and get listed in our directory with verified status."
  },
  {
    icon: <IconStar />,
    title: "Access Benefits",
    description: "Access exclusive partner resources, training materials, and marketing opportunities."
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
        </div>
        
        <div className={styles.roadmap}>
          <div className={styles.roadmapRow}>
            {STEPS.slice(0, 3).map((step, index) => (
              <div key={index} className={styles.roadmapCard}>
                <div className={styles.step}>
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
                {index < 2 && <div className={styles.arrowRight} />}
              </div>
            ))}
          </div>
          
          <div className={styles.roadmapRow}>
            {STEPS.slice(3, 6).map((step, index) => (
              <div key={index + 3} className={styles.roadmapCard}>
                <div className={styles.step}>
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
                {index < 2 && <div className={styles.arrowRight} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
