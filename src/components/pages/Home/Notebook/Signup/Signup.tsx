"use client";
import React, { useState } from 'react';
import styles from './styles.module.scss';
import Code from '@/components/ui/icons/Code';
import Cloud from '@/components/ui/icons/Cloud';
import Terminal from '@/components/ui/icons/Terminal';
import Dialog from '@/components/ui/icons/Dialog';
interface SignupProps {
    isHovered: boolean;
  }

const Signup = ({isHovered}:SignupProps) => {
  const [activeButton, setActiveButton] = useState<string | null>("code");

  const sliderTransform = activeButton === 'code' ? 'translateX(50%)' : 'translateX(-50%)';

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.slider}
        style={{ transform: sliderTransform }}
      >
        <div className={(isHovered && activeButton === 'code')?`${styles.code_container} ${styles.hover}`: styles.code_container}>
          <Terminal className={styles.animate} isHovered={isHovered && activeButton === 'code'} />
        </div>
        <div className={(isHovered && activeButton === 'cloud')?`${styles.code_container} ${styles.hover}`: styles.code_container}>
          <Dialog className={styles.animate} isHovered={isHovered && activeButton === 'cloud'}/>
        </div>
      </div>
      <div className={styles.groupButton}>
        <button
          className={`${activeButton === 'code' ?  isHovered?`${styles.active} ${styles.active_onhover }`:styles.active : ''}`}
          onClick={() => handleButtonClick('code')}
        >
       <Code stroke={isHovered ? "#FFFFFF" : (activeButton === "code" ? "#000000" : "#52525B")} size="18" /> pip install
        </button>
        <button
          className={`${activeButton === 'cloud' ?  isHovered?`${styles.active} ${styles.active_onhover }`:styles.active : ''}`}
          onClick={() => handleButtonClick('cloud')}
        >
        <Cloud stroke={isHovered ? "#FFFFFF" : (activeButton === "cloud" ? "#000000" : "#52525B")} size="18" /> Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
