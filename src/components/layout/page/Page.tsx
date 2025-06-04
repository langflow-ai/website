// Dependencies
import type { CSSProperties, FC, PropsWithChildren } from "react";

// Components
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";

// Styles
import styles from "./styles.module.scss";
import Topbar from "@/components/ui/Topbar";

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
  const topbarContent = {
    home: {
      title:
        "IBM Acquires DataStax, Accelerating Production AI & NoSQL Data at Scale",
      linkTo: "https://www.datastax.com/blog/datastax-joins-ibm?utm_medium=display&utm_source=langflow&utm_campaign=ibm-close-2025&utm_content=home_banner",
      linkText: "Read more",
    },
    desktop: {
      title:
        "IBM Acquires DataStax, Accelerating Production AI & NoSQL Data at Scale",
      linkTo: "https://www.datastax.com/blog/datastax-joins-ibm?utm_medium=display&utm_source=langflow&utm_campaign=ibm-close-2025&utm_content=home_banner",
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
    </div>
  );
};

export default Page;
