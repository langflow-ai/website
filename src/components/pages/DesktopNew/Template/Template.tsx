// Dependencies
import { FC, PropsWithChildren, Suspense } from "react";
import dynamic from "next/dynamic";

// Components
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";
import Image from "next/image";

// Dynamic imports for better code splitting
const TopBadge = dynamic(() => import("@/components/ui/icons/TopBadge"), {
  loading: () => <div style={{ height: "40px" }} />,
});

const DownloadForm = dynamic(() => import("@/components/ui/DownloadForm"), {
  loading: () => <div style={{ height: "400px" }} />,
});

const Template: FC<PropsWithChildren> = () => {
  return (
    <section className={styles.template}>
      <div className={`container h-100 ${styles.container}`}>
        <div className={`col ${styles.left}`}>
          <Display size={200} className={`${styles.heading} text-white`}>
            Langflow for Desktop
          </Display>
          <Suspense fallback={<div style={{ height: "40px" }} />}>
            <TopBadge />
          </Suspense>
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
              <Suspense fallback={<div style={{ height: "400px" }} />}>
                <DownloadForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
