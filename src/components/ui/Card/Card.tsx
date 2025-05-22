"use client";

// Card.tsx
import React, { useState } from 'react';
import styles from './styles.module.scss';

interface CardProps {
  children: (hovered: boolean) => React.ReactNode;
  text: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, text, className }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.card}>
      <div
        className={`${styles.cardContainer} ${className || ''}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children(hovered)}
      </div>
      <div className={styles.cardText}>
        <h4>{text}</h4>
      </div>
    </div>
  );
};

export default Card;
