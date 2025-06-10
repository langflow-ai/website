import React from "react";
import Display from "@/components/ui/Display";
import { Weight } from "@/components/ui/Display/types";
import styles from "./styles.module.scss";
import Link from "@/components/ui/Link";
import Speaker from "../icons/Speaker";

interface Props {
  title: string;
  linkTo: string;
  linkText: string;
}

const Topbar = ({title, linkTo, linkText}: Props) => {
  return (
    <div className={styles.topbar}>
      <Speaker />
      <div className={styles.textContainer}>
        <Display size={100} weight={Weight.Regular} className={styles.text}>
          {title}
        </Display>
        <Link href={linkTo}>{linkText}</Link>
      </div>
    </div>
  );
};

export default Topbar;
