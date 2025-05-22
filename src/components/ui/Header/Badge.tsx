// Components
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";

const Badge = () => {
  return (
    <div className={styles.badge}>
      <Display size={20} tagName="div" className={styles.badge_heading}>
        Coming Soon
      </Display>
    </div>
  );
};

export default Badge;
