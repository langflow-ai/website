// Dependencies
import type { CSSProperties, FC, PropsWithChildren } from "react";
import { draftMode } from "next/headers";

// Components
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/footer";
import Preview from "@/components/ui/Preview";

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

  return (
    <>
      <header className={styles.header}>
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
