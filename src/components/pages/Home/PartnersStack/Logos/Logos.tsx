//Dependencies
import { FC } from "react";

//Components
import Slider from "@/components/ui/Slider";

// Styles
import styles from "./styles.module.scss";
import StaticImage from "@/components/ui/media/StaticImage";


type Logo = {
  src: string; 
  name: string; 
};

type Props = {
  logos: Logo[];
};

const _chunk = <T,>(arr: T[], size: number): T[][] => {
  const groups = [];
  const length = Math.ceil(arr.length / size);

  for (let i = 0; i < arr.length; i += length) {
    groups.push(arr.slice(i, i + length));
  }

  return groups;
};

const Logos: FC<Props> = ({ logos = [] }) => {
  // Variables
  const chunkedLogos = _chunk<Logo>(logos, 4);

  return (
    <div className={styles.logos}>
      {chunkedLogos.map((chunk, key) => (
        <Slider
          className={styles.slider}
          time={chunk.length * 20}
          key={`chunk--slider-${key}`}
          gap={20}
          hoverable
        >
          {chunk?.map((logo, key) => (
            <figure className={styles.logo} key={key}>
              <StaticImage
                src={logo.src}
                alt={logo.name}
                width={32}
                height={32}
                loading="eager"
              />
              <figcaption>{logo.name}</figcaption>
            </figure>
          ))}
        </Slider>
      ))}
    </div>
  );
};

export default Logos;
