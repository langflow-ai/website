"use client";

// Dependencies
import { useState } from "react";

// Components
import Display from "@/components/ui/Display";
import MarketoForm from "@/components/ui/form";

// Utils
import { DOWNLOAD_OPTIONS } from "@/utils/constants";

// Styles
import styles from "./styles.module.scss";

const DownloadForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleDownload = async (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (formSubmitted) {
    return (
      <div className={styles.list}>
        {DOWNLOAD_OPTIONS.map((option, index) => (
          <div key={index} className={styles.listItem}>
            <div
              className={`${styles.detailsItem} ${option.isComingSoon ? styles.opacity : ""}`}
            >
              {option.icon}
              <Display size={100} weight={600} className={styles.itemName}>
                {option.name}
              </Display>
            </div>

            {option.isComingSoon ? (
              <Display size={100} weight={400} className={styles.comingSoon}>
                Coming Soon
              </Display>
            ) : (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDownload(option.link, option.fileName);
                }}
                className={styles.downloadButton}
              >
                <Display
                  size={100}
                  weight={600}
                  className={"text-center text-black"}
                >
                  {option.btnText}
                </Display>
              </a>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Display className="text-white" size={100} weight={400}>
        Fill out the form below to receive access to download the desktop app
        for Mac.
      </Display>
      <MarketoForm
        showFootNote={false}
        onSuccess={() => setFormSubmitted(true)}
        id={5302}
      />
    </>
  );
};

export default DownloadForm;
