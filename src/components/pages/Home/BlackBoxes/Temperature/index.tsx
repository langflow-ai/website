"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const TemperatureComponent = () => {
  const [temperature, setTemperature] = useState(0.5);
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>Temperature</div>
        <div className={styles.temperature}>{temperature}</div>
      </div>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.activeTrack}
          style={{ width: `${temperature===1 ? 94 : temperature * 100}%` }}
        />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          className={styles.slider}
          title="Temperature"
        />
      </div>
      <div className={styles.captions}>
        <div className={styles.captions_precise}>
          <Image
            src="/assests/icon-precise.svg"
            alt="icon"
            width={16}
            height={16}
          />
          <p>Precise</p>
        </div>
        <div className={styles.captions_creative}>
          <Image
            src="/assests/icon-creative.svg"
            alt="icon"
            width={16}
            height={16}
          />
          <p>Creative</p>
        </div>
      </div>
    </div>
  );
};

export default TemperatureComponent;
