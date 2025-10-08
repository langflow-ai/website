"use client";

// Dependencies
import React, { useMemo, useRef } from "react";
import styles from "./styles.module.scss";
import StaticImage from "@/components/ui/media/StaticImage";
import Button from "@/components/ui/button/Button";
import { ButtonTypes } from "@/components/ui/button/types";
import Github from "@/components/ui/icons/Github";
import Stack from "../Stack";
import ModelSelector from "../BlackBoxes/ModelSelector";
import TemperatureComponent from "../BlackBoxes/Temperature";
import InputComponent from "../BlackBoxes/InputField";
import { HERO_CONTENT } from "@/utils/constants";
import { positionHelpers } from "@/utils/positionHelpers";
import DrawLine from "../DragNDrop/DrawLine";
import {
  ElementConfig,
  useRelativeElementPositions,
} from "@/hooks/useRelativeElementPositions";
import { LineCoordinate } from "@/lib/types/paths";
import Link from "@/components/ui/Link";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const box1Ref = useRef<HTMLDivElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);
  const elementConfigs = useMemo(
    (): ElementConfig[] => [
      { ref: box1Ref, offsetY: 32 },
      { ref: box2Ref, offsetY: 32 },
    ],
    []
  );

  const positions = useRelativeElementPositions(containerRef, elementConfigs);

  const lines = useMemo<LineCoordinate[]>(() => {
    if (positions.length < 2 || !positions[0]?.width || !positions[1]?.width) {
      return [];
    }

    return [
      {
        id: "line-0",
        start: positionHelpers.getRightCenter(positions[0]),
        end: positionHelpers.getLeftCenter(positions[1]),
        style: "curveHeader",
      },
    ];
  }, [positions]);

  return (
    <section className={styles.hero}>
      <div className={`${styles.container} container-wide`}>
        <div className={styles.grid} ref={containerRef}>
          <div className={styles.left}>
            <div className={styles.content}>
              <div className={styles.content__wrapper}>
                <h1 ref={box1Ref} className={styles.content_title}>
                  {HERO_CONTENT.title}
                </h1>
                <p className={styles.content_description}>
                  {HERO_CONTENT.description}
                </p>
                <div className={styles.button_group}>
                  <Link href={HERO_CONTENT.buttons.primary.link}>
                    <Button
                      variant={ButtonTypes.FILLED}
                      onClick={() => {
                        return false;
                      }}
                      data-event="Langflow.org - CTA Clicked"
                      data-text={HERO_CONTENT.buttons.primary.label}
                      data-section="hero"
                    >
                      {HERO_CONTENT.buttons.primary.label}
                    </Button>
                  </Link>
                  <Link
                    href={HERO_CONTENT.buttons.secondary.link}
                    target="_blank"
                  >
                    <Button
                      variant={ButtonTypes.BORDER}
                      icon={<Github />}
                      onClick={() => {
                        return false;
                      }}
                      data-event="Langflow.org - CTA Clicked"
                      data-text={HERO_CONTENT.buttons.secondary.label}
                      data-section="hero"
                    >
                      {HERO_CONTENT.buttons.secondary.label}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.model} ref={box2Ref}>
            <InputComponent title="Input" />
            <ModelSelector />
            <InputComponent title="API Key" />
            <TemperatureComponent />
          </div>
        </div>
      </div>
      <Stack />
      <DrawLine lines={lines} instanceId="hero" />
      <StaticImage
        src={HERO_CONTENT.image.src}
        alt={HERO_CONTENT.image.alt}
        fill={HERO_CONTENT.image.fill}
        priority={HERO_CONTENT.image.priority}
        className={styles.gradient_overlay}
      />
    </section>
  );
};

export default Hero;
