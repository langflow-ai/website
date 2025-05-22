import React from "react";
import Image from "next/image";
import TopBagde from "../../../../public/assests/topBadge.svg";
import styles from "./styles.module.scss";
const PrizeBadge = () => {
  return (
    <div className={styles.container}>
      <Image src={TopBagde} width={250} height={54} alt="Top Product Badge" />
    </div>
  );
};

export default PrizeBadge;
