"use client";

import Link from "next/link";
import styles from "./styles.module.scss";

interface BackLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const BackLink = ({ href, children, className = "" }: BackLinkProps) => {
  return (
    <Link href={href} className={`${styles.backLink} ${className}`}>
      {children}
    </Link>
  );
};

export default BackLink;
