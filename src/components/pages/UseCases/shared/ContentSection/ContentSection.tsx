"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
}

const ContentSection = ({ children, className = "" }: ContentSectionProps) => {
  return (
    <section className={`${styles.contentSection} container-wide ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
