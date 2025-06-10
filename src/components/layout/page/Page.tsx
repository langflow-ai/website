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
      title: "Langflow Desktop for macOS is here!",
      linkTo: "/desktop",
      linkText: "Try the alpha",
    },
    desktop: {
      title:
        "IBM plans to Acquire DataStax, Accelerating Production AI & NoSQL Data at Scale",
      linkTo:
        "https://www.datastax.com/blog/ibm-plans-to-acquire-datastax?utm_medium=display&utm_source=langflow&utm_campaign=ibm-announce-feb-2025&utm_content=home_banner",
      linkText: "Read more",
    },
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {type !== "normal" && (
          <Topbar
            title={topbarContent[type].title}
            linkTo={topbarContent[type].linkTo}
            linkText={topbarContent[type].linkText}
          />
        )}
        <Header />
      </div>
      <main
        className={`${className} ${legacy ? "legacy" : ""}`}
        id={"page"}
        style={style}
      >
        {children}
      </main>

      <Footer />

      {isDrafMode && <Preview />}
    </div>
  );
};

export default Page;
