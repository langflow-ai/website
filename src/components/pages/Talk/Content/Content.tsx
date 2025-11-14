// Dependencies
import { FC } from "react";

// Components
import Text from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  content: string;
};

const Content: FC<Props> = ({ content }) => {
  return (
    <section className={styles.content}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <Text className={styles.article} size={300} tagName="article">
              {content}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;




