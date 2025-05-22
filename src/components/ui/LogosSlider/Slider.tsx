"use client";

import { FC, ReactElement } from "react";
import useCheckMobile from "@/hooks/useCheckMobile";
import styles from "./styles.module.scss";
import Slider from "../Slider";

// Props types
type Props = {
  className?: string;
  title?: string;
  time?: number;
  logos: FC[]; 
  gap?: number;
};

const LogosSlider: FC<Props> = ({
  className,
  gap = 24,
  time,
  logos,
}) => {
  const {isChecking, isMobile } = useCheckMobile(1700);
  const useSlider = !isChecking && isMobile;

  // Render logos as components with keys
  const images: ReactElement[] = logos.map((LogoComponent, index) => (
    <LogoComponent key={index} />
  ));

  return (
    <div className={`row ${styles.logos} ${isMobile ? styles.logos_isMobile : 'container-wide'} ${className ?? ""}`}>
      <div className="col-lg-12" style={{ padding: 0 }}>
        {useSlider ? (
          <Slider
            className={styles.slider}
            time={time ?? logos.length * 6}
            gap={useSlider ? 48 : gap}
          >
            {images}
          </Slider>
        ) : (
          <div className={styles.logos}>{images}</div>
        )}
      </div>
    </div>
  );
};

export default LogosSlider;
