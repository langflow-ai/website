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
      <MarketoForm showFootNote={false} id={5302} />
    </div>
  );
};

export default ContactForm;
