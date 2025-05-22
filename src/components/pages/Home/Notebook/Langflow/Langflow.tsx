// Langflow.tsx
"use client";

import React from 'react';
import styles from './styles.module.scss';
import Code from '@/components/ui/icons/Code';
import Cloud from '@/components/ui/icons/Cloud';
import Mask from '@/components/ui/icons/Mask';
import Codebase from '@/components/ui/icons/Codebase';

interface LangflowProps {
  isHovered: boolean;
}

const Langflow: React.FC<LangflowProps> = ({ isHovered }) => {
  return (
    <div className={styles.container}>
      <div className={isHovered?`${styles.modes} ${styles.hover} `:`${styles.modes}`}>
        <Code className={styles.code_container}  stroke={isHovered ? "white" : "#52525B"} /> 
        <Cloud className={styles.cloud_container} stroke={isHovered ? "white" : "#52525B"} />
        <div className={styles.mask}><Mask /></div>
        <div className={isHovered ? styles.script : styles.code}>
          {isHovered ? <Codebase isHovered={isHovered} className={styles.animate} /> : <Codebase />}
        </div>
      </div>
    </div>
  );
};

export default Langflow;
