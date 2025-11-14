// Dependencies
import { FC } from "react";
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  slides?: string;
  recording?: string;
  resources?: Array<{
    _key?: string;
    _type?: string;
    title?: string;
    label?: string;
    url?: string;
  }>;
};

const Links: FC<Props> = ({ slides, recording, resources }) => {
  const hasResources = slides || recording || (resources && resources.length > 0);
  
  if (!hasResources) {
    return null;
  }


  const allResources = [
    ...(slides ? [{ label: "Slides", url: slides }] : []),
    ...(resources || []).filter((r) => r.url),
  ];

  return (
    <section className={styles.links}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <Display size={400} tagName="h2" className={styles.heading}>
              Resources
            </Display>
            <div className={styles.resourceList}>
              {allResources.map((resource, index) => {
                if (!resource.url) return null;
                return (
                  <Link
                    key={resource._key || resource.url || index}
                    href={resource.url}
                    target="_blank"
                    download={resource.label === "Slides"}
                    rel="noopener noreferrer"
                    className={styles.resourceLink}
                  >
                    {(resource.label || resource.title) && (
                      <span className={styles.resourceLabel}>
                        {resource.label || resource.title}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Links;


