// Dependencies
import { FC, PropsWithChildren } from "react";
import dynamic from "next/dynamic";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";

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
              <Display
                size={300}
                weight={500}
                className={styles.form__title}
                fontFamily="inter"
              >
                Contact Us
              </Display>
              <UrxForms
                formId="urx-54088"
                stageFormId="urx-t53108"
                instanceId="urx-form-1"
                success={
                  <Text size={200} className="mt-2">
                    We've received your request and someone from our team will
                    reach out shortly.
                  </Text>
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
