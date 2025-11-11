"use client";

// Dependencies
import { FC, PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";

// Components
import Display from "@/components/ui/Display";
import TopBadge from "@/components/ui/icons/TopBadge";
import UrxForms from "@/components/ui/UrxForms";
import DownloadOptions from "@/components/ui/DownloadForm/DownloadOptions";

// Styles
import styles from "./styles.module.scss";

const Template: FC<PropsWithChildren> = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.template}>
      <div
        className={`container-new h-100 ${styles.container} ${isScrolled ? styles.scrolled : styles.margin}`}
      >
        <div className={`col ${styles.left}`}>
          <Display
            size={200}
            className={`${styles.heading} text-white`}
            tagName="h1"
          >
            Langflow for Desktop
          </Display>
          <TopBadge />
          <div className={styles.imageContainer}>
            <Image
              src="/images/desktop-laptop.webp"
              alt="Langflow for Desktop"
              width={648}
              height={480}
              className={styles.imageHero}
            />
          </div>
        </div>
        <div className={`col ${styles.right}`}>
          <div className={styles.form}>
            <Display
              className="text-white"
              size={400}
              weight={500}
              tagName="h2"
            >
              Download the App
            </Display>
            <UrxForms
              formId="urx-54089"
              stageFormId="urx-t53109"
              buttonText="Download Langflow"
              instanceId="urx-form-2"
              success={<DownloadOptions />}
              text="Fill out the form below to receive access to download the desktop app for Mac or Windows."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
