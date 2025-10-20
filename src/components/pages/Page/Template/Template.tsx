// Dependencies
import { type FC } from "react";

// Types
import type { Page as PageType } from "@/lib/types/sanity.types";

// Components
import Text from "@/components/ui/text";
import Display from "@/components/ui/Display";
import { Markdown } from "@/components/ui/Blog/Markdown";
import { BackgroundGradient } from "@/components/BackgroundGradient";

// Styles
import styles from "./styles.module.scss";

type Props = {
  page: PageType;
};

const Template: FC<Props> = ({ page }) => {
  const { body, title } = page;

  return (
    <>
      <BackgroundGradient />
      <article className={`container ${styles.article}`}>
        <div className="row mb-4">
          <div className="col">
            <Display size={700} tagName="h1" className="m-0">
              {title}
            </Display>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col">
            <Text size={300} tagName="div" className="article d-grid gap-4">
              {body && <Markdown>{body}</Markdown>}
            </Text>
          </div>
        </div>
      </article>
    </>
  );
};

export default Template;
