"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import GlowCircle from "@/components/ui/icons/GlowCircle";
import IconChevup from "@/components/ui/icons/IconChevup";
import IconChevdown from "@/components/ui/icons/IconChevdown";

const CrousalComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const data = [
    {
      title: "Chat",
      src: "/images/content-chat.png",
      color: "#3B82F6",
      circles: 2,
      circlePositions: [
        { top: "30%", left: -16.5 },
        { top: "60%", right: -16.5 },
      ],
      circleTypes: ["purple", "pink"],
    },
    {
      title: "Model",
      src: "/images/content-model.png",
      color: "#10B981",
      circles: 3,
      circlePositions: [
        { top: "30%", left: -16.5 },
        { top: "60%", right: -16.5 },
        { top: "80%", right: -16.5 },
      ],
      circleTypes: ["purple", "pink", "pink"],
    },
    {
      title: "Agent",
      src: "/images/content-agent.png",
      color: "#F59E0B",
      circles: 2,
      circlePositions: [
        { top: "20%", left: -16.5 },
        { top: "50%", right: -16.5 },
      ],
      circleTypes: ["pink", "cyan"],
    },
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.button} onClick={handlePrev}>
        <IconChevup />
      </div>
      <div className={styles.carouselWrapper}>
        <motion.div
          className={styles.carousel}
          animate={{ y: -activeIndex * 180 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            // onStart: () => setIsAnimating(true),
            onComplete: handleAnimationComplete,
          }}
        >
          {data.map((item, index) => (
            <div key={index} className={styles.carouselItem}>
              {item.circlePositions.map((pos, i) => (
                <div key={i} className={styles.circleContainer} style={pos}>
                  {isAnimating ? (
                    <div className={styles.dullCircle}>
                      <GlowCircle isDull />
                    </div>
                  ) : index === activeIndex ? (
                    item.circleTypes[i] === "purple" ? (
                      <GlowCircle filterName="purple" />
                    ) : item.circleTypes[i] === "pink" ? (
                      <GlowCircle filterName="pink" />
                    ) : (
                      <GlowCircle filterName="cyan" />
                    )
                  ) : (
                    <GlowCircle isDull />
                  )}
                </div>
              ))}
              <Image src={item.src} alt={item.title} width={214} height={136} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className={styles.button} onClick={handleNext}>
        <IconChevdown />
      </div>
    </div>
  );
};

export default CrousalComponent;
