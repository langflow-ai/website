// Dependencies
import { FC, PropsWithChildren } from 'react';

// Components
import Display from '@/components/ui/Display';

// Styles
import styles from './styles.module.scss';
import TopBadge from '@/components/ui/icons/TopBadge';
import Image from 'next/image';
import DownloadForm from '@/components/ui/DownloadForm';

const Template: FC<PropsWithChildren> = () => {
  return (
    <section className={styles.template}>
      <div className={`container h-100 ${styles.container}`}>
        <div className={`col ${styles.left}`}>
          <Display size={200} className={`${styles.heading} text-white`}>
            Langflow for Desktop
          </Display>
          <TopBadge />
          <div className={styles.imageContainer}>
            <Image src="/images/desktop-hero.png" alt="Langflow for Desktop" width={680} height={442} className={styles.imageHero} />
          </div>
        </div>
        <div className={`col ${styles.right}`}>
          <div className={styles.content}>
            <div className={styles.form}>
              <Display className="text-white" size={400} weight={500}>
                Download the App
              </Display>
              <DownloadForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
