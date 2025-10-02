"use client";

import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface SearchSectionProps {
  children: ReactNode;
  className?: string;
}

const SearchSection = ({ children, className = "" }: SearchSectionProps) => {
  return (
    <section className={`${styles.searchSection} container-wide ${className}`}>
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

export default SearchSection;
