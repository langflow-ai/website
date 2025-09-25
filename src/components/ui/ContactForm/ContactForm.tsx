"use client";

// Components
import Display from "@/components/ui/Display";
import MarketoForm from "@/components/ui/form";

// Styles
import styles from "./styles.module.scss";

const ContactForm = () => {
  return (
    <div className={styles.contact}>
      <Display className={styles.contact__title} size={100} weight={400}>
        Contact us
      </Display>
      <MarketoForm
        showFootNote={false}
        id={5484}
        feedback={
          <Display size={100} weight={400}>
            We've received your request and someone from our team will reach out
            shortly.
          </Display>
        }
      />
    </div>
  );
};

export default ContactForm;
