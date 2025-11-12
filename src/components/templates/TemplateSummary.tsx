import { Template } from "@/lib/types/templates";
import { Flow } from "@/lib/use-cases";
import Link from "next/link";
import styles from "./TemplateSummary.module.scss";

interface TemplateSummaryProps {
  template: Template;
  flow?: Flow; // if provided, use flow.category/subcategory as categories
  className?: string;
}

export default function TemplateSummary({ template, flow, className = "" }: TemplateSummaryProps) {
  const { whatYouDo, whatYouLearn, whyItMatters, segments, introText, howItWorks, exampleUseCases, extendingText } = template;

  const formatLabel = (value: string) =>
    value
      .split("-")
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(" ");

  // Helper function to render text with line breaks
  const renderTextWithBreaks = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className={styles.textParagraph}>
        {paragraph}
      </p>
    ));
  };

  return (
    <div className={`${styles.templateSummary} ${className}`}>
      {/* Intro Text */}
      {introText && (
        <section>
          <p className={styles.introText}>{introText}</p>
        </section>
      )}

      {/* How it works */}
      {howItWorks && (
        <section>
          <h3 className={styles.sectionTitle}>How it works</h3>
          <div className={styles.textContent}>
            {renderTextWithBreaks(howItWorks)}
          </div>
        </section>
      )}

      {/* Example use cases */}
      {exampleUseCases && exampleUseCases.length > 0 && (
        <section>
          <h3 className={styles.sectionTitle}>Example use cases</h3>
          <ul className={styles.list}>
            {exampleUseCases.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <p>&#8226; {item}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Extending text */}
      {extendingText && (
        <section>
          <div className={styles.textContent}>
            {renderTextWithBreaks(extendingText)}
          </div>
        </section>
      )}

      {/* Legacy sections - keep for backward compatibility */}
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

      {(flow || (segments && segments.length > 0)) && (
        <section className={styles.categoriesSection}>
          <div className={styles.categoriesContainer}>
            <span className={styles.categoriesLabel}>Categories</span>
            <div className={styles.categoriesButtons}>
              {flow
                ? (
                  [flow.category, flow.subcategory].filter(Boolean).map((cat, idx) => (
                    <Link
                      key={`${cat}-${idx}`}
                      href={`/use-cases?categories=${encodeURIComponent(
                        idx === 0 ? cat : `${flow.category}-${flow.subcategory}`
                      )}`}
                      className={styles.categoryButton}
                      aria-label={`Browse use cases in ${cat}`}
                    >
                      {cat}
                    </Link>
                  ))
                )
                : (
                  segments.map((segment) => (
                    <Link
                      key={segment}
                      href={`/use-cases?segments=${encodeURIComponent(segment)}`}
                      className={styles.categoryButton}
                      aria-label={`Browse use cases in ${formatLabel(segment)}`}
                    >
                      {formatLabel(segment)}
                    </Link>
                  ))
                )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
