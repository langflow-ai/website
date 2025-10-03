// Dependencies
import { type FC, Suspense } from "react";
import dynamic from "next/dynamic";

// Types
import type { Page as PageType } from "@/lib/types/sanity.types";

// Components
import Text from "@/components/ui/text";
import Display from "@/components/ui/Display";
import { BackgroundGradient } from "@/components/BackgroundGradient";

// Dynamic imports for better code splitting
const Markdown = dynamic(
  () =>
    import("@/components/ui/Blog/Markdown").then((mod) => ({
      default: mod.Markdown,
    })),
  {
    loading: () => <div style={{ height: "200px" }} />,
  }
);

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
              {body && (
                <Suspense fallback={<div style={{ height: "200px" }} />}>
                  <Markdown>{body}</Markdown>
                </Suspense>
              )}
            </Text>
          </div>
        </div>
      </article>
    </>
  );
};

export default Template;
