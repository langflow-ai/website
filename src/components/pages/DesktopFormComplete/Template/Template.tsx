// Dependencies
import { FC, PropsWithChildren, Suspense } from "react";
import dynamic from "next/dynamic";

// Components
import Display from "@/components/ui/Display";

// Dynamic imports for better code splitting
const DownloadButton = dynamic(() => import("@/components/ui/Buttons"), {
  loading: () => <div style={{ height: "60px" }} />,
});

// Styles
import styles from "./styles.module.scss";

const Template: FC<PropsWithChildren> = () => {
  return (
    <section className={styles.template}>
      <div className="container container-wide h-100">
        <div className="row h-100">
          <div className="col d-flex justify-content-center">
            <div className={styles.content}>
              <Display size={400} className="text-white text-center">
                {"Thank you for your interest in using Langflow Desktop!"}
              </Display>
              <Display size={100} className="text-center text-white ">
                {"Your download link is now available!"}
              </Display>
              <Suspense fallback={<div style={{ height: "60px" }} />}>
                <DownloadButton
                  url={
                    "https://github.com/langflow-ai/langflow/releases/download/1.4.2/Langflow_aarch64.dmg"
                  }
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
