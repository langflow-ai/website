import IconCheck from "@/components/ui/icons/IconCheck";
import IconEmail from "@/components/ui/icons/IconEmail";
import IconStar from "@/components/ui/icons/IconStar";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import styles from "./styles.module.scss";

const TIMELINE_ITEMS = [
  {
    icon: <IconEmail />,
    title: "Decision by Email",
    description: "You'll receive a decision by email within 10 business days"
  },
  {
    icon: <IconStar />,
    title: "Profile Published",
    description: "If approved, we'll publish your profile and share the badge kit"
  },
  {
    icon: <IconCheck />,
    title: "Ongoing Opportunities",
    description: "We'll occasionally invite you to spotlights and qualified customer introductions"
  }
];

const WhatHappensNext = () => {
  return (
    <section className={styles.whatHappensNext}>
      <div className={`${styles.container} container-wide`}>
        <div className={styles.header}>
          <Text size={600} weight={Weight.Bold} className={styles.title}>
            What Happens Next
          </Text>
          <Text size={400} weight={Weight.Regular} className={styles.description}>
            Here's what to expect after you submit your application
          </Text>
        </div>
        
        <div className={styles.timeline}>
          {TIMELINE_ITEMS.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineIcon}>
                {item.icon}
              </div>
              <div className={styles.timelineContent}>
                <Text size={500} weight={Weight.Semibold} className={styles.timelineTitle}>
                  {item.title}
                </Text>
                <Text size={300} weight={Weight.Regular} className={styles.timelineDescription}>
                  {item.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatHappensNext;
