// components/TestimonialSection.tsx
import Image from 'next/image';
import styles from './styles.module.scss';
import AthenaVertical from '@/components/ui/icons/AthenaVertical/AthenaVertical';

type TestimonialSectionProps = {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
  icon?: React.ReactNode;
  removePaddingOnMobile?: boolean;
};

const Quote = ({ quote, authorName, authorTitle, authorImage, icon = <AthenaVertical />, removePaddingOnMobile = false }: TestimonialSectionProps) => {
  return (
    <section className={`${styles.testimonialSection} container-wide ${removePaddingOnMobile ? styles.removePaddingOnMobile : ''}`}>
      <p className={styles.quote}>“{quote}”</p>

      <div className={styles.detailsContainer}>
        <div className={styles.icon}>{icon}</div>
        <div className={`d-flex align-items-center ${styles.details}`}>
          <Image src={authorImage} alt={authorName} width={72} height={72} className={styles.authorImage} />
          <div className={styles.author}>
            <div className={styles.authorName}>{authorName}</div>
            <div className={styles.authorTitle}>{authorTitle}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
