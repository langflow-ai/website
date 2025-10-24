"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ContentSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const ContentSection = ({ children, className = "", id }: ContentSectionProps) => {
  return (
    <section id={id} className={`${styles.contentSection} container-wide ${className}`}>
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
