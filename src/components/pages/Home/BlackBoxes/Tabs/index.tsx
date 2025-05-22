"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState("Medium");

  const tabs = ["Short", "Medium", "Long"];

  return (
    <div className={styles.container}>
      <div className={styles.title}>Response Length</div>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;