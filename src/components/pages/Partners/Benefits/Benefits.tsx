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
    title: "Visibility to enterprise buyers",
    description: "Reach thousands of developers and businesses looking for Langflow-powered solutions."
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className={styles.benefits}>
      <div className={`${styles.container} container-wide`}>
        <header className={styles.header}>
          <h2 className={styles.title}>Partner Benefits</h2>
          <p className={styles.description}>
            Join our partner program and unlock exclusive benefits designed to help you grow your business with Langflow.
          </p>
        </header>
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
