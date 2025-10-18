import { Template } from "@/lib/types/templates";
import Tag from "../common/Tag";
import styles from "./TemplateSummary.module.scss";

interface TemplateSummaryProps {
  template: Template;
  className?: string;
}

export default function TemplateSummary({ template, className = "" }: TemplateSummaryProps) {
  const { whatYouDo, whatYouLearn, whyItMatters, segments } = template;

  const formatLabel = (value: string) =>
    value
      .split("-")
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(" ");

  return (
    <div className={`${styles.templateSummary} ${className}`}>
      {whatYouDo && whatYouDo.length > 0 && (
        <section>
          <h3 className={styles.sectionTitle}>What you&apos;ll do</h3>
          <ul className={styles.list}>
            {whatYouDo.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <span className={styles.checkIcon} aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {whatYouLearn && whatYouLearn.length > 0 && (
        <section>
          <h3 className={styles.sectionTitle}>What you&apos;ll learn</h3>
          <div className={styles.learnGrid}>
            {whatYouLearn.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <span className={styles.dotIcon} aria-hidden="true">
                  <span className={styles.dotIconInner} />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {whyItMatters && (
        <section>
          <h3 className={styles.sectionTitle}>Why it matters</h3>
          <div className={styles.listItem}>
            <span className={styles.starIcon} aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <p className={styles.whyItMatters}>{whyItMatters}</p>
          </div>
        </section>
      )}

      {segments && segments.length > 0 && (
        <section>
          <h3 className={styles.sectionTitle}>Categories</h3>
          <div className={styles.categories}>
            {segments.map((segment) => (
              <Tag key={segment} label={formatLabel(segment)} className={styles.tagHighlight} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
