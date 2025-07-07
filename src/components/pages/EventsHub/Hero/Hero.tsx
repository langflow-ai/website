// Dependencies
import { FC } from "react";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";

const Hero: FC = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-6">
            <Display size={500} tagName="h1">
              Events
            </Display>
            <Text size={300} tagName="div">
              Explore upcoming livestreams, meetups, conferences and more.
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
