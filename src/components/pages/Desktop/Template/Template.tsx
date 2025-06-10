// Dependencies
import { FC, PropsWithChildren } from "react";

// Components
import DownloadButton from "@/components/ui/Buttons";
import PrizeBadge from "@/components/ui/prizeBadge";
import Display from "@/components/ui/Display";

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
                <PrizeBadge />
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
                
                <DownloadButton url="/desktop-form" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
