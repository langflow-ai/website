// Dependencies
import { type FC } from "react";

// Types
import type { Page as PageType } from "@/lib/types/sanity.types";

// Components
import Text from "@/components/ui/text";
import Display from "@/components/ui/Display";
import { Markdown } from "@/components/ui/Blog/Markdown";
import { BackgroundGradient } from "@/components/BackgroundGradient";

type Props = {
  page: PageType;
};

const Template: FC<Props> = ({ page }) => {
  const { body, title } = page;

  return (
    <>
      <BackgroundGradient />
      <article
        className="d-flex flex-column gap-4 blog-article"
        style={{
          padding: "1.5rem",
          paddingTop: `7.225rem`,
          minHeight: "100dvh",
        }}
      >
        <Display size={700} tagName="h1" className="m-0">
          {title}
        </Display>

        <Text size={300} tagName="div" className="article d-grid gap-4">
          {body && <Markdown>{body}</Markdown>}
        </Text>
      </article>
    </>
  );
};

export default Template;
