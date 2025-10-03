"use client";

import Button from "@/components/ui/button/Button";
import { ButtonTypes } from "@/components/ui/button/types";
import IconInfo from "@/components/ui/icons/IconInfo";
import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import { trackApplyClick } from "@/lib/utils/analytics";
import { useEffect, useState } from "react";
import ScrollIndicator from "../ScrollIndicator";
import styles from "./styles.module.scss";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) {
        const heroElement = document.querySelector('.hero') as HTMLElement;
        const heroHeight = heroElement?.offsetHeight || 0;
        setShowStickyCTA(window.scrollY > heroHeight * 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollToApply = (source: string) => {
    trackApplyClick(source);
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
    <>
      <section className={styles.hero}>
        <div className={`${styles.container} container-wide`}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Become a Langflow Certified Partner
            </h1>
            <Text size={400} weight={Weight.Regular} className={styles.description}>
            Get listed, earn trust, and win customers with verified Langflow expertise.
            </Text>
            <div className={styles.buttonGroup}>
              <Button
                variant={ButtonTypes.FILLED}
                onClick={() => scrollToApply('hero')}
                data-attr="partners-hero-apply"
                className={styles.primaryCTA}
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
              Get official recognition, appear in our partner directory, and showcase outcomes that matter to
              buyers
              </Text>
              <ScrollIndicator />
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky CTA for mobile */}
      {isMobile && showStickyCTA && (
        <div className={styles.stickyCTA}>
          <Button
            variant={ButtonTypes.FILLED}
            onClick={() => scrollToApply('sticky')}
            data-attr="partners-sticky-apply"
            className={styles.stickyButton}
          >
            Apply now
          </Button>
        </div>
      )}
    </>
  );
};

export default Hero;
