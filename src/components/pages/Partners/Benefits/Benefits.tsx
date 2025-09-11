import IconCheck from "@/components/ui/icons/IconCheck";
import StaticImage from "@/components/ui/media/StaticImage";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import styles from "./styles.module.scss";

const BENEFITS = [
  {
    icon: <IconCheck />,
    title: "Official listing on langflow.org",
    description: "Get featured in our official partner directory with your company information and solutions."
  },
  {
    icon: <IconCheck />,
    title: "Certified Partner badge",
    description: "Display the official Langflow Certified Partner badge on your website and marketing materials."
  },
  {
    icon: <IconCheck />,
    title: "Visibility to potential customers",
    description: "Reach thousands of developers and businesses looking for Langflow-powered solutions."
  },
  {
    icon: <IconCheck />,
    title: "Case studies & spotlights",
    description: "Showcase your success stories and get featured in our partner spotlights and case studies."
  },
  {
    icon: <IconCheck />,
    title: "Free to join",
    description: "No fees or hidden costs. Join our partner program completely free of charge."
  }
];

const Benefits = () => {
  return (
    <section id="benefits" className={styles.benefits}>
      <div className={`${styles.container} container-wide`}>
        <div className={styles.grid}>
          {BENEFITS.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.icon}>
                {benefit.icon}
              </div>
              <div className={styles.content}>
                <Text size={500} weight={Weight.Semibold} className={styles.benefitTitle}>
                  {benefit.title}
                </Text>
                <Text size={300} weight={Weight.Regular} className={styles.benefitDescription}>
                  {benefit.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
      <StaticImage
        src="/images/getStarted.png"
        alt="gradient background"
        fill
        priority
        className={styles.gradientOverlay}
      />
    </section>
  );
};

export default Benefits;
