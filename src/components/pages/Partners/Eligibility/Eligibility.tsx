import Text from "@/components/ui/text/Text";
import { Weight } from "@/components/ui/text/types";
import styles from "./styles.module.scss";

const Eligibility = () => {
  return (
    <section className={styles.eligibility}>
      <div className={`${styles.container} container-wide`}>
        <div className={styles.content}>
          <Text size={600} weight={Weight.Bold} className={styles.title}>
            Eligibility & Expectations
          </Text>
          
          <div className={styles.textContent}>
            <Text size={400} weight={Weight.Regular} className={styles.description}>
              Our partner program is designed for companies and individuals who are actively using Langflow 
              to build real-world solutions. There are no fees to join, and we welcome applications from 
              businesses of all sizes.
            </Text>
            
            <div className={styles.requirements}>
              <Text size={500} weight={Weight.Semibold} className={styles.requirementsTitle}>
                What we're looking for:
              </Text>
              <ul className={styles.requirementsList}>
                <li>
                  <Text size={300} weight={Weight.Regular}>
                    Demonstrated use of Langflow in production or client projects
                  </Text>
                </li>
                <li>
                  <Text size={300} weight={Weight.Regular}>
                    Ability to provide a detailed case study of your Langflow implementation
                  </Text>
                </li>
                <li>
                  <Text size={300} weight={Weight.Regular}>
                    Commitment to maintaining high-quality standards in your work
                  </Text>
                </li>
                <li>
                  <Text size={300} weight={Weight.Regular}>
                    Willingness to participate in partner activities and feedback sessions
                  </Text>
                </li>
              </ul>
            </div>

            <div className={styles.timeline}>
              <Text size={500} weight={Weight.Semibold} className={styles.timelineTitle}>
                Timeline:
              </Text>
              <Text size={300} weight={Weight.Regular} className={styles.timelineText}>
                We typically review applications within 5-7 business days. Once approved, 
                you'll receive your certification materials and be listed in our partner directory.
              </Text>
            </div>

            <div className={styles.note}>
              <Text size={300} weight={Weight.Regular} className={styles.noteText}>
                <strong>Note:</strong> We reserve the right to review and approve partner applications 
                based on our current program capacity and strategic alignment. All submitted materials 
                will be treated confidentially and used solely for partner evaluation purposes.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
