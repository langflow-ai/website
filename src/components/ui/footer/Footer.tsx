// Components
import Display from "@/components/ui/Display";

// Utils
import { SOCIALS } from "@/utils/constants";

// Styles
import styles from "./styles.module.scss";
import Link from "@/components/ui/Link";

const Footer = () => {
  return (
    <section className={`${styles.footer}`}>
      <div className={styles.container}>
        <div className={styles.right}>
          {SOCIALS?.map((s, index) => (
            <div key={index}>
              <Link href={s.url} target="_blank">
                <div className={styles.social}>
                  {s.icon}
                  <Display size={100} weight={400}>
                    {s.count}
                  </Display>
                </div>
              </Link>
            </div>
          ))}
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
