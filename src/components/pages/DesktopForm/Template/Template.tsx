// Components
import MarketoForm from "@/components/ui/form";
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";

const Template = () => {
  return (
    <section className={styles.template}>
      <div className="container container-wide h-100">
        <div className="row h-100">
          <div className="col">
            <div className={styles.content}>
              <div className={styles.form}>
                <Display
                  className="spacer--bottom-4  text-white pt-5 "
                  size={400}
                  weight={400}
                >
                  {
                    "Download Langflow Desktop"
                  }
                </Display>
                <Display
                  className="spacer--bottom-4  text-white pt-5 "
                  size={100}
                  weight={400}
                >
                  {
                    "Please be sure to provide your legal first and last name, company and work email address."
                  }
                </Display>

                <MarketoForm
                  allowBypass={true}
                  showFootNote={false}
                  successRedirect={"/desktop-form-complete"}
                  id={5302}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Template;
