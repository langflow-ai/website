"use client";

import React from "react";
import styles from "./styles.module.scss";
import StaticImage from "@/components/ui/media/StaticImage";
import Button from "@/components/ui/button/Button";
import { ButtonTypes } from "@/components/ui/button/types";
import Github from "@/components/ui/icons/Github";
import { GET_STARTED } from "@/utils/constants";
import Link from "@/components/ui/Link";

const GetStarted = () => {
  const {
    title,
    description,
    buttons: { primary, secondary },
    image,
  } = GET_STARTED;

  return (
    <div className={styles.get_started}>
      <div className={`${styles.container} container`}>
        <div className={styles.container_content}>
          <h1 className={styles.container_title}>{title}</h1>
          <p className={styles.container_description}>{description}</p>
          <div className={styles.button_group}>
            <Link href={primary.link}>
              <Button
                variant={ButtonTypes.FILLED}
                onClick={() => {
                  return false;
                }}
                data-event="CTA Clicked"
                data-cta={primary.label}
                data-channel="webpage"
                data-text={primary.label}
                data-location="get-started"
              >
                {primary.label}
              </Button>
            </Link>
            <Link href={secondary.link}>
              <Button
                variant={ButtonTypes.BORDER}
                onClick={() => {
                  return false;
                }}
                icon={<Github />}
                data-event="CTA Clicked"
                data-cta={secondary.label}
                data-channel="webpage"
                data-text={secondary.label}
                data-location="get-started"
              >
                {secondary.label}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div onClick={image.onClick} style={{ cursor: "pointer" }}>
        <StaticImage
          src={image.src}
          alt={image.alt}
          fill
          priority
          className={styles.gradient_overlay}
        />
      </div>
    </div>
  );
};

export default GetStarted;
