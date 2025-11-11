// Dependencies
import { FC, PropsWithChildren } from "react";
import dynamic from "next/dynamic";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import StaticImage from "@/components/ui/media/StaticImage";

const UrxForms = dynamic(() => import("@/components/ui/UrxForms/UrxForms"), {
  loading: () => <div style={{ height: "400px" }} />,
});

// Styles
import styles from "./styles.module.scss";

const Template: FC<PropsWithChildren> = () => {
  return (
    <section className={styles.template}>
      <div className={`container-new h-100 ${styles.container}`}>
        <div className={styles.left}>
          <Display
            className={`text-white ${styles.heading}`}
            size={600}
            weight={500}
            tagName="h1"
          >
            We're here for you!
          </Display>
          <Display
            className={`text-white ${styles.subtitle}`}
            size={100}
            weight={300}
            tagName="p"
          >
            Have a question, need premier support, or want to learn more about
            our professional services? We're here to help.
          </Display>
          <StaticImage
            src="/images/contact-us-image.webp"
            alt="Contact Us"
            width={680}
            height={419}
          />
        </div>
        <div className={`col ${styles.right}`}>
          <div className={styles.content}>
            <div className={styles.form}>
              <Display size={400} weight={500} tagName="h2">
                Contact Us
              </Display>
              <UrxForms
                formId="urx-54088"
                stageFormId="urx-t53108"
                instanceId="urx-form-1"
                className={styles.urx}
                success={
                  <Text size={200} className="mt-3" tagName="p">
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
