// Dependencies
import { FC, PropsWithChildren, Suspense } from "react";
import dynamic from "next/dynamic";

// Components
import Display from "@/components/ui/Display";

// Dynamic imports for better code splitting
const DownloadButton = dynamic(() => import("@/components/ui/Buttons"), {
  loading: () => <div style={{ height: "60px" }} />,
});

const PrizeBadge = dynamic(() => import("@/components/ui/prizeBadge"), {
  loading: () => <div style={{ height: "40px" }} />,
});

// Styles
import styles from "./styles.module.scss";

const Template: FC<PropsWithChildren> = () => {
  return (
    <section className={styles.template}>
      <div className={`container h-100 ${styles.container}`}>
        <div className="row h-100">
          <div className="col">
            <div className={styles.content}>
              <div>
                <Suspense fallback={<div style={{ height: "40px" }} />}>
                  <PrizeBadge />
                </Suspense>
              </div>
              <div className={styles.title}>
                <Display
                  size={200}
                  className={`${styles.description} text-center text-white`}
                >
                  {
                    "Join thousands of developers accelerating their AI workflows. Start your first Langflow project now."
                  }
                </Display>

                <Suspense fallback={<div style={{ height: "60px" }} />}>
                  <DownloadButton url="/desktop-form" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
