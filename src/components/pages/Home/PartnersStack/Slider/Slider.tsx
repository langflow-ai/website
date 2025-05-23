// Styles
import { LOGOS } from '../constant';
import styles from './styles.module.scss';

type Logo = {
  name: string;
  svg: JSX.Element;
};

const _chunk = <T,>(arr: T[], size: number): T[][] => {
  const groups = [];
  const length = Math.ceil(arr.length / size);

  for (let i = 0; i < arr.length; i += length) {
    groups.push(arr.slice(i, i + length));
  }

  return groups;
};

const Slider = () => {
  const chunkedLogos = _chunk<Logo>(LOGOS, 4);
  return (
    <div className={styles.container}>
      <article className={styles.wrapper}>
        {chunkedLogos.map((chunk, index) => (
          <div className={`${styles.marquee} ${index % 2 !== 0 ? styles.marquee__reverse : ''}`} key={index}>
            <div className={styles.marquee__group}>
              {chunk.map((logo, key) => (
                <figure className={styles.logo} key={key}>
                  {logo.svg}
                  <figcaption>{logo.name}</figcaption>
                </figure>
              ))}
              {chunk.map((logo, key) => (
                <figure className={styles.logo} key={`dup-${key}`}>
                  {logo.svg}
                  <figcaption>{logo.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};

export default Slider;
