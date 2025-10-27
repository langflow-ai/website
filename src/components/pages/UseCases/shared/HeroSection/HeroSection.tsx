"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface HeroSectionProps {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

const HeroSection = ({ title, description, children, className = "" }: HeroSectionProps) => {
  return (
    <section className={`${styles.hero} container-wide ${className}`}>
      <div className="container">
        <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className={styles.heroTitle}>
            {title}
          </h1>
          <p className={styles.heroDescription}>
            {description}
          </p>
          {children}
        </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
