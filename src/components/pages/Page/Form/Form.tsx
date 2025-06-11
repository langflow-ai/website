// Dependencies
import { FC } from "react";

// Types
import type { SectionForm } from "@/lib/types/sanity.types";

// Components
import PortableText from "@/components/external/PortableText";
import Display from "@/components/ui/Display";
import MarketoForm from "@/components/ui/form";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = SectionForm;

const Form: FC<Props> = ({ title, content, sectionId }) => {
  return (
    <section className={styles.form} id={sectionId}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-9 d-flex flex-column">
            <Display className="spacer--bottom-4" size={400} tagName="h2">
              {title}
            </Display>
            <Display className={styles.subtitle} size={100} tagName="div">
              <PortableText value={content} />
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
    </section>
  );
};

export default Form;
