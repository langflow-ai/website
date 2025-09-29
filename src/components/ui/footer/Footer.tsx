"use client";

// Components
import Display from "@/components/ui/Display";
import Social from "@/components/ui/Social";

// Styles
import styles from "./styles.module.scss";

const Footer = () => {
  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Trigger TrustArc consent banner
    if (typeof window !== 'undefined' && (window as any).truste?.eu?.clickListener) {
      (window as any).truste.eu.clickListener();
    }
  };

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
              <a href="#" onClick={handlePrivacyClick} style={{ cursor: 'pointer' }}>
                {"Manage Privacy Choices"}
              </a>
            </Display>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
