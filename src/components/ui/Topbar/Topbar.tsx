// "use client";
import React from "react";
import Display from "@/components/ui/Display";
import { Weight } from "@/components/ui/Display/types";
import styles from "./styles.module.scss";
import Link from "@/components/ui/Link";
import Speaker from "../icons/Speaker";
// import useCheckMobile from "@/hooks/useCheckMobile";

interface Props {
  title: string;
  linkTo: string;
  linkText: string;
}

const Topbar = (_: Props) => {
  // const { isMobile } = useCheckMobile(638);
  return (
    <div className={styles.topbar}>
      <Speaker color="black" />
      <Display size={100} weight={Weight.Regular} className={styles.text}>
        <Link
          href="https://luma.com/open-rag-summit?utm_source=langflow"
          target="_blank"
        >
          Be the first to find out what's next for RAG at the OpenRAG Summit on
          11/13
        </Link>
      </Display>
      {/* {!isMobile ? (
        <div className={styles.textContainer}>
          <Display size={100} weight={Weight.Regular} className={styles.text}>
            {title}
          </Display>
          <Link href={linkTo}>{linkText}</Link>
        </div>
      ) : (
        <div className={styles.textContainer}>
          <Display size={100} weight={Weight.Regular} className={styles.text}>
            {title} <Link href={linkTo}>{linkText}</Link>
          </Display>
        </div>
      )} */}
    </div>
  );
};

export default Topbar;
