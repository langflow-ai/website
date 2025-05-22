"use client";

import React from "react";
import styles from "./styles.module.scss";
import Card from "@/components/ui/Card";
import { CARDS, NOTEBOOK } from "@/utils/constants";
import useCheckMobile from "@/hooks/useCheckMobile";
import StaticImage from "@/components/ui/media/StaticImage";

const Notebook = () => {
  const { isMobile } = useCheckMobile();

  return (
    <div className="container-wide">
      <div className={styles.content}>
        <h2>{NOTEBOOK.title}</h2>
        <p>{NOTEBOOK.description}</p>
      </div>
      <div className={`row ${styles.row}`}>
        {CARDS.map(({ text, Component, background, image }, idx) => (
          <div key={idx} className="col-12 col-lg-6 col-xl-4">
            <Card
              className={background ? styles.background : undefined}
              text={text}
            >
              {isMobile
                ? () => <StaticImage src={image} alt={text} fill />
                : (isHovered: boolean) => <Component isHovered={isHovered} />}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notebook;
