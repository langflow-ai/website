"use client";

import React from "react";

import styles from "./styles.module.scss";
import { STACK_LOGOS, STACK_TEXT } from "@/utils/constants";
import LogosSlider from "@/components/ui/LogosSlider";

const Stack = () => {
  return (
    <div className={styles.stackContainer}>
      <div className={`${styles.stack} container-wide`}>
        <h5 className={styles.stack_heading}>{STACK_TEXT.heading}</h5>
      </div>
      <LogosSlider className={styles.slider} logos={STACK_LOGOS} />
    </div>
  );
};

export default Stack;
