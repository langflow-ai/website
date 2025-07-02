// Dependencies
import { FC } from "react";

// Types
import type { SectionContent } from "@/lib/types/sanity.types";

// Components
import Display from "@/components/ui/Display";

// Styles
import styles from "./styles.module.scss";
import Text from "@/components/ui/text";
import PortableText from "@/components/external/PortableText";

// Props types
type Props = SectionContent & {
  center?: boolean;
};

const Content: FC<Props> = ({ content, title, sectionId, center = true }) => {
  return (
    <section className={styles.content} id={sectionId}>
      <div className="container">
        <div className={`row ${center ? "justify-content-center" : ""}`}>
          <div className="col-lg-9">
            {title && (
              <div className={styles.heading}>
                <Display size={400} tagName="h2">
                  {title}
                </Display>

                <hr />
              </div>
            )}

            <Text className={styles.article} size={300} tagName="article">
              <PortableText value={content} />
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
