// Dependencies
import { FC, PropsWithChildren, Suspense } from "react";
import dynamic from "next/dynamic";

// Components
import Display from "@/components/ui/Display";

// Dynamic imports for better code splitting
const UrxForms = dynamic(() => import("@/components/ui/UrxForms/UrxForms"), {
  loading: () => <div style={{ height: "400px" }} />,
});

// Styles
import styles from "./styles.module.scss";

const Template: FC<PropsWithChildren> = () => {
  return (
    <section className={styles.template}>
      <div className={`container h-100 ${styles.container}`}>
        <Display
          className={`text-white ${styles.heading}`}
          size={400}
          weight={500}
          tagName="h1"
        >
          We're here for you!
        </Display>
        <Display
          className={`text-white ${styles.subtitle}`}
          size={100}
          weight={400}
        >
          Have a question, need premier support, or want to learn more about our
          professional services? We're here to help.
        </Display>
        <div className={`col ${styles.right}`}>
          <div className={styles.content}>
            <div className={styles.form}>
              <Suspense fallback={<div style={{ height: "400px" }} />}>
                <UrxForms formId="urx-t53108" instanceId="urx-form-1" />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
