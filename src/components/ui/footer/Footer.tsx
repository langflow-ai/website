// Components
import Display from "@/components/ui/Display";
import Social from "@/components/ui/Social";

// Styles
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <section className={`${styles.footer}`}>
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

          {/* <div className={styles.left}>
            <Display
              size={100}
              weight={400}
              className={styles.innerContainer_font}
            >
              <Link href={"/preferences"} target="_blank">
                {"Manage Privacy Choices"}
              </Link>
            </Display>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Footer;
