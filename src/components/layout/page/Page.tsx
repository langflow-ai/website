// Dependencies
import type { CSSProperties, FC, PropsWithChildren } from "react";
import { draftMode } from "next/headers";

// Components
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import Preview from "@/components/ui/Preview";
import Topbar from "@/components/ui/Topbar";

// Styles
import styles from "./styles.module.scss";

type Props = PropsWithChildren<{
  legacy?: boolean;
  className?: string;
  style?: CSSProperties;
  type?: "normal" | "home" | "desktop";
}>;

const Page: FC<Props> = ({
  className,
  children,
  legacy,
  style,
  type = "normal",
}) => {
  const isDrafMode = draftMode().isEnabled;

  const topbarContent = {
    home: {
      title:
        "IBM Acquires DataStax, Accelerating Production AI & NoSQL Data at Scale",
      linkTo:
        "https://www.datastax.com/blog/datastax-joins-ibm?utm_medium=display&utm_source=langflow&utm_campaign=ibm-close-2025&utm_content=home_banner",
      linkText: "Read more",
    },
    desktop: {
      title:
        "IBM Acquires DataStax, Accelerating Production AI & NoSQL Data at Scale",
      linkTo:
        "https://www.datastax.com/blog/datastax-joins-ibm?utm_medium=display&utm_source=langflow&utm_campaign=ibm-close-2025&utm_content=home_banner",
      linkText: "Read more",
    },
  };
  return (
    <>
      <header className={styles.header}>
        {type !== "normal" && (
          <Topbar
            title={topbarContent[type].title}
            linkTo={topbarContent[type].linkTo}
            linkText={topbarContent[type].linkText}
          />
        )}
        <Header />
      </header>

      <main
        className={`${className} ${legacy ? "legacy" : ""}`}
        id={"page"}
        style={style}
      >
        {children}
      </main>

      <Footer />

      {isDrafMode && <Preview />}
    </>
  );
};

export default Page;
