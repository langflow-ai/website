// Components
import { KitForm } from "../KitForm/KitForm";
import Display from "@/components/ui/Display";
import Button from "@/components/ui/button/Button";
import { ButtonTypes } from "@/components/ui/button/types";

// Styles
import styles from "./styles.module.scss";

// Utils
import { NEWSLETTER_BLURB } from "@/utils/constants";

const Template = () => {
  return (
    <section className={styles.template}>
      <div
        className={`${styles.content} ${styles.container} container container-wide h-100`}
      >
        <div className="col">
          <Display
            className={`spacer--bottom-4 text-white  ${styles.heading}`}
            size={200}
            weight={400}
            tagName="h1"
          >
            {"AI++ newsletter"}
          </Display>
          <Display
            className="spacer--bottom-4 text-white pt-5"
            size={200}
            weight={400}
          >
            {NEWSLETTER_BLURB}
          </Display>

          <Button
            href="https://news.langflow.org"
            variant={ButtonTypes.BORDER}
            className={styles.button}
          >
            Check out the latest issues
          </Button>
        </div>
        <div className="col">
          <KitForm />
        </div>
      </div>
    </section>
  );
};

export default Template;
