// Dependencies
import { FC, PropsWithChildren } from 'react';

// Components
import Display from '@/components/ui/Display';
import ContactForm from '@/components/ui/ContactForm';

// Styles
import styles from './styles.module.scss';


const Template: FC<PropsWithChildren> = () => {
  return (
    <section className={styles.template}>
      <div className={`container h-100 ${styles.container}`}>
      <Display className={`text-white ${styles.heading}`} size={400} weight={500}>
              We're here for you!
      </Display>
      <Display className={`text-white ${styles.subtitle}`} size={100} weight={400}>
      Have a question, need premier support, or want to learn more about our professional services? We're here to help.
      </Display>
        <div className={`col ${styles.right}`}>
          <div className={styles.content}>
            <div className={styles.form}>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
