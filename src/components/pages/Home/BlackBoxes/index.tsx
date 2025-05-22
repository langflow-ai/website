"use client";
import React from "react";
import styles from "./styles.module.scss";
import { ReactCompareSlider } from "react-compare-slider";
import Image from "next/image";
import ModelSelector from "./ModelSelector";
import TemperatureComponent from "./Temperature";
import CrousalComponent from "./Crousal";
import TabsComponent from "./Tabs";

const BlackBoxes = () => {
  return (
    <div className={`${styles.container} container-wide`}>
      <div className={styles.container_title}>Ditch the Black Boxes</div>
      <div className={styles.boxContainer}>
        <div className={styles.boxWrapper}>
          <div className={`${styles.box} ${styles.box_first}`}>
            <div className={styles.grid}>
              <div className={styles.model}>
                <ModelSelector />
                <TemperatureComponent />
                <TabsComponent />
              </div>
            </div>
          </div>
          <div className={styles.boxTitle}>Control the complexity</div>
        </div>
        <div className={styles.boxWrapper}>
          <div className={`${styles.box} ${styles.box_second}`}>
            <div className={styles.grid}>
              <CrousalComponent />
            </div>
          </div>
          <div className={styles.boxTitle}>Swap and compare</div>
        </div>
        <div className={styles.boxWrapper}>
          <div className={`${styles.box} ${styles.box_third}`}>
            <div className={styles.grid}>
              <ReactCompareSlider
                itemOne={
                  <Image
                    src="/slider-left.png"
                    alt="slider-left"
                    width={340}
                    height={340}
                  />
                }
                itemTwo={
                  <Image
                    src="/slider-right.png"
                    alt="slider-right"
                    fill
                    className={styles.sliderImage}
                  />
                }
                handle={
                  <div className={styles.sliderHandle}>
                    <Image
                      src="/slider-handle.png"
                      alt="slider-handle"
                      width={47}
                      height={47}
                      className={styles.sliderHandle_image}
                    />
                  </div>
                }
              />
            </div>
          </div>
          <div className={styles.boxTitle}>Python under the hood</div>
        </div>
      </div>
    </div>
  );
};

export default BlackBoxes;
