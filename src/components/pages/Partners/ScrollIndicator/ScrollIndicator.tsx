"use client";

import DownArrow from "@/components/icons/downArrow/DownArrow";
import styles from "./styles.module.scss";

const ScrollIndicator = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById("how-it-works");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.scrollIndicator} onClick={scrollToNext}>
      <div className={styles.arrowContainer}>
        <DownArrow />
      </div>
      <div className={styles.arrowContainer}>
        <DownArrow />
      </div>
      <div className={styles.arrowContainer}>
        <DownArrow />
      </div>
    </div>
  );
};

export default ScrollIndicator;
