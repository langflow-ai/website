"use client";

import Button from "@/components/ui/button/Button";
import { ButtonTypes } from "@/components/ui/button/types";
import IconInfo from "@/components/ui/icons/IconInfo";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import ScrollIndicator from "../ScrollIndicator";
import styles from "./styles.module.scss";

const Hero = () => {
  const scrollToApply = () => {
    const element = document.getElementById("apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero}>
      <div className={`${styles.container} container-wide`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Build with Langflow. Become a Certified Partner.
          </h1>
          <Text size={400} weight={Weight.Regular} className={styles.description}>
            Join our partner program to get official recognition, visibility to potential customers, and showcase your Langflow-powered solutions.
          </Text>
          <div className={styles.buttonGroup}>
            <Button
              variant={ButtonTypes.FILLED}
              onClick={scrollToApply}
              data-attr="partners-hero-apply"
            >
              Apply now
            </Button>
            <Button
              variant={ButtonTypes.BORDER}
              onClick={scrollToHowItWorks}
              data-attr="partners-hero-overview"
              icon={<IconInfo />}
            >
              Program overview
            </Button>
          </div>
          
          <div className={styles.benefitsPreview}>
            <Text size={400} weight={Weight.Regular} className={styles.benefitsDescription}>
              Join our partner program and unlock exclusive benefits designed to help you grow your business with Langflow.
            </Text>
            <ScrollIndicator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
