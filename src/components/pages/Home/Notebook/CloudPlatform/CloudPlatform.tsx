import React from "react";
import styles from "./styles.module.scss";
import AWS from "@/components/ui/icons/AWS";
import GoogleCloud from "@/components/ui/icons/GoogleCloud";
import Azure from "@/components/ui/icons/Azure";
import Tag from "./Tag";
interface CloudPlatformProps {
  isHovered: boolean;
}

const CloudPlatform = ({ isHovered }: CloudPlatformProps) => {
  const tags = ["ISO", "HIPAA", "SOC 2", "PCI"];
  const svgs = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="104"
      height="71"
      viewBox="0 0 104 71"
      fill="none"
      key={0}
    >
      <path
        d="M103 0C103 0 77.0093 70 0 70"
        stroke="#52525B"
        strokeWidth="1.25"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="57"
      viewBox="0 0 44 57"
      fill="none"
      key={1}
    >
      <path d="M1 57C1 12 43 1 43 1" stroke="#52525B" strokeWidth="1.25" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="43"
      height="57"
      viewBox="0 0 43 57"
      fill="none"
      key={2}
    >
      <path d="M42 0C42 45 1 56 1 56" stroke="#52525B" strokeWidth="1.25" />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="108"
      height="71"
      viewBox="0 0 108 71"
      fill="none"
      key={3}
    >
      <path d="M1 71C1 71 39.5 1 108 1" stroke="#52525B" strokeWidth="1.25" />
    </svg>,
  ];
  return (
    <div className={styles.platform_container}>
      {isHovered &&
        tags.map((tag, index) => (
          <div className={styles.tag} key={index}>
            <div>{svgs[index]}</div>
            <Tag key={index} text={tag} />
          </div>
        ))}
      <div
        className={
          isHovered
            ? `${styles.platform_container_platform} ${styles.platform_container_onHover}`
            : styles.platform_container_platform
        }
      >
        {isHovered ? (
          <AWS className={styles.animate} isHovered={isHovered} />
        ) : (
          <AWS />
        )}
      </div>
      <div
        className={
          isHovered
            ? `${styles.platform_container_platform} ${styles.platform_container_onHover}`
            : styles.platform_container_platform
        }
      >
        {isHovered ? (
          <GoogleCloud isHovered={isHovered} className={styles.animate} />
        ) : (
          <GoogleCloud />
        )}
      </div>
      <div
        className={
          isHovered
            ? `${styles.platform_container_platform} ${styles.platform_container_onHover}`
            : styles.platform_container_platform
        }
      >
        {isHovered ? (
          <Azure isHovered={isHovered} className={styles.animate} />
        ) : (
          <Azure />
        )}
      </div>
    </div>
  );
};

export default CloudPlatform;
