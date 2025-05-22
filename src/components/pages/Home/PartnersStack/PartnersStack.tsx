import { PARTNERS_STACK_TEXT } from "@/utils/constants";
import { LOGOS } from "./constant";
import styles from "./styles.module.scss";
import Display from "@/components/ui/Display";
import Slider from "./Slider";

const PartnersStack = () => {
  return (
    <div className={`${styles.stack}`}>
      <div className="container-wide">
        <Display size={500} weight={400} className={styles.title}>
          {PARTNERS_STACK_TEXT.title}
        </Display>
        <p className={styles.description}>{PARTNERS_STACK_TEXT.description}</p>
      </div>
      <Slider logos={LOGOS} />
    </div>
  );
};

export default PartnersStack;
