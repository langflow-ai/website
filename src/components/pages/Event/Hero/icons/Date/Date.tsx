import { FC } from "react";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  className?: string;
  date?: string;
  month?: string | null;
};

const Dates: FC<Props> = ({ className, date, month }) => {
  return (
    <span className={`${styles.icon} ${className}`} data-month={month}>
      <span>{date}</span>
    </span>
  );
};

export default Dates;
