"use client";

// Dependencies
import { FC, PropsWithChildren } from "react";
import Image from "next/image";

// Components
import Display from "@/components/ui/Display";
import TopBadge from "@/components/ui/icons/TopBadge";
import UrxForms from "@/components/ui/UrxForms";
import DownloadOptions from "@/components/ui/DownloadForm/DownloadOptions";

// Styles
import styles from "./styles.module.scss";

const Template: FC<PropsWithChildren> = () => {
  return (
    <section className={styles.template}>
      <div className={`container h-100 ${styles.container}`}>
        <div className={`col ${styles.left}`}>
          <Display size={200} className={`${styles.heading} text-white`}>
            Langflow for Desktop
          </Display>
          <TopBadge />
          <div className={styles.imageContainer}>
            <Image
              src="/images/desktop-hero.png"
              alt="Langflow for Desktop"
              width={680}
              height={442}
              className={styles.imageHero}
            />
          </div>
        </div>
        <div className={`col ${styles.right}`}>
          <div className={styles.content}>
            <div className={styles.form}>
              <Display className="text-white" size={400} weight={500}>
                Download the App
              </Display>
              <UrxForms
                formId="urx-54089"
                stageFormId="urx-t53109"
                instanceId="urx-form-2"
                success={<DownloadOptions />}
                text="Fill out the form below to receive access to download the desktop app for Mac or Windows."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
