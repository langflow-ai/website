import { Template } from "@/lib/types/templates";
import Link from "next/link";
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
                  <p className={styles.index}>{index + 1}. </p>
                <p>{item}</p>
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
                <p>&#8226; {item}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {whyItMatters && (
        <section>
          <h3 className={styles.sectionTitle}>Why it matters</h3>
          <div className={styles.listItem}>
            <p className={styles.whyItMatters}>{whyItMatters}</p>
          </div>
        </section>
      )}

      {segments && segments.length > 0 && (
        <section className={styles.categoriesSection}>
          <div className={styles.categoriesContainer}>
            <span className={styles.categoriesLabel}>Categories</span>
            <div className={styles.categoriesButtons}>
              {segments.map((segment) => (
                <Link
                  key={segment}
                  href={`/use-cases?segments=${encodeURIComponent(segment)}`}
                  className={styles.categoryButton}
                  aria-label={`Browse use cases in ${formatLabel(segment)}`}
                >
                  {formatLabel(segment)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
