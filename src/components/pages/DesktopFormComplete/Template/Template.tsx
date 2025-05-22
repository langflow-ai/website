// Dependencies
import { FC, PropsWithChildren } from "react";

// Components
import DownloadButton from "@/components/ui/Buttons";
import Display from "@/components/ui/Display";

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
              <DownloadButton
                url={
                  "https://github.com/langflow-ai/langflow/releases/download/1.4.0/Langflow_1.4.0_aarch64.dmg"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
