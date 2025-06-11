"use client";

// Dependencies
import { usePathname } from "next/navigation";

// Styles
import styles from "./styles.module.scss";

const Preview = () => {
  const pathname = usePathname();
  return (
    <a
      className={styles.preview}
      href={`/api/disable-preview?slug=${pathname}`}
    >
      Preview
    </a>
  );
};

export default Preview;
