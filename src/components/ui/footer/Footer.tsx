// Components
import Display from "@/components/ui/Display";
import Social from "@/components/ui/Social";

// Styles
import styles from "./styles.module.scss";
import Link from "../Link";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <div className={styles.container}>
        <div className={styles.right}>
          <Social />
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.copyright}>
            <Display
              size={100}
              weight={400}
              className={styles.innerContainer_font}
            >
              {`© ${new Date().getFullYear()}. All rights reserved`}
            </Display>
          </div>
          <div className={styles.left}>
            <Display
              size={100}
              weight={600}
              className={styles.innerContainer_font}
            >
              ·
            </Display>
          </div>

          <div className={styles.left}>
            <Display
              size={100}
              weight={400}
              className={styles.innerContainer_font}
            >
              <Link href={"/preferences"}>{"Manage Privacy Choices"}</Link>
            </Display>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
