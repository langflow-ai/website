// Components
import { KitForm } from "../KitForm/KitForm";
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";

const Template = () => {
  return (
    <section className={styles.template}>
      <div className={styles.content + " container container-wide h-100"}>
        <div className={styles.form}>
          <Display
            className="spacer--bottom-4 text-white pt-5"
            size={400}
            weight={400}
          >
            {"Sign up for the AI++ newsletter"}
          </Display>
          <Display
            className="spacer--bottom-4 text-white pt-5"
            size={100}
            weight={400}
          >
            {
              "Subscribe to the AI++ Newsletter to stay updated with the latest in AI, Agents and MCP."
            }
          </Display>

          <KitForm />
        </div>
      </div>
    </section>
  );
};

export default Template;
