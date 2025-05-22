"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss"; // Make sure to import the styles
import Image from "next/image";

interface Model {
  img: string;
  name: string;
  value: string;
}

const models = [
  { img: "l3", name: "llama-3.2", value: "llama-3.2" },
  {
    img: "4o",
    name: "gpt-4o-mini",
    value: "gpt-4o-mini",
  },
  { img: "m8", name: "mixtral-8x7B", value: "mixtral-8x7B" },
];

const ModelComponent = () => {
  const [selectedModel, setSelectedModel] = useState<Model>(models[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.modelContainer}>
      <div className={styles.modelTitle}>Model</div>
      <div className={styles.modelDropdown} onClick={toggleDropdown}>
        <div className={styles.selected}>
          <div className={styles.icon}>{selectedModel.img}</div>
          <p className={styles.name}>{selectedModel?.name}</p>
        </div>
        <Image
          src="/assests/icon-dropdown.svg"
          alt="icon"
          width={20}
          height={20}
        />
        {isDropdownOpen && (
          <div className={styles.dropdownList}>
            {models.map((model) => (
              <div
                key={model.value}
                className={`${styles.dropdownItem} ${model.value === selectedModel.value ?  styles.selectedItem : ''}`}
                onClick={() => handleModelSelect(model)}
              >
                <div className={styles.selected}>
                  <div className={styles.icon}>{model.img}</div>
                  <p className={styles.name}>{model?.name}</p>
                </div>
                {model.value === selectedModel.value && <Image
                  src="/assests/icon-check.svg"
                  alt="icon"
                  width={20}
                  height={20}
                />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelComponent;
