'use client';
import React from 'react';
import styles from './styles.module.scss';
import { ReactCompareSlider } from 'react-compare-slider';
import Image from 'next/image';
import ModelSelector from './ModelSelector';
import TemperatureComponent from './Temperature';
import CrousalComponent from './Crousal';
import TabsComponent from './Tabs';
import useCheckMobile from '@/hooks/useCheckMobile';

const BlackBoxes = () => {
  const { isMobile } = useCheckMobile(1200);
  return (
    <div className={`${styles.container} container-wide`}>
      <div className={`${styles.container_title} `}>Ditch the Black Boxes</div>
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

            <div className={`${styles.settings_boxBorder} ${styles.settings_boxBorder__first}`} />
            <div className={styles.settings_boxMask} />
            <div className={`${styles.settings_cornerCover} ${styles.settings_bottomLeft}`} />
            <div className={`${styles.settings_cornerCover} ${styles.settings_bottomRight}`} />
          </div>
          <div className={styles.boxTitle}>Control the complexity</div>
        </div>
        <div className={styles.boxWrapper}>
          <div className={`${styles.box} ${styles.box_second}`}>
            <div className={styles.grid}>
              <CrousalComponent />
            </div>
            <div className={`${styles.settings_boxBorder} ${styles.settings_boxBorder__second}`} />
            <div className={styles.settings_boxMask} />
            <div className={`${styles.settings_cornerCover} ${styles.settings_bottomLeft}`} />
            <div className={`${styles.settings_cornerCover} ${styles.settings_bottomRight}`} />
          </div>
          <div className={styles.boxTitle}>Swap and compare</div>
        </div>
        <div className={styles.boxWrapper}>
          <div className={`${styles.box} ${styles.box_third}`}>
            <div className={styles.grid}>
              <ReactCompareSlider
                itemOne={<Image src="/images/slider-left.png" alt="slider-left" width={isMobile ? 340 : 300} height={isMobile ? 340 : 300} />}
                itemTwo={<Image src="/images/slider-right.png" alt="slider-right" fill className={styles.sliderImage} />}
                handle={
                  <div className={styles.sliderHandle}>
                    <Image src="/images/slider-handle.png" alt="slider-handle" width={47} height={47} className={styles.sliderHandle_image} />
                  </div>
                }
              />
            </div>
            <div className={`${styles.settings_boxBorder} ${styles.settings_boxBorder__third}`} />
            <div className={styles.settings_boxMask} />
            <div className={`${styles.settings_cornerCover} ${styles.settings_bottomLeft}`} />
            <div className={`${styles.settings_cornerCover} ${styles.settings_bottomRight}`} />
          </div>
          <div className={styles.boxTitle}>Python under the hood</div>
        </div>
      </div>
    </div>
  );
};

export default BlackBoxes;
