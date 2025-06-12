// Dependencies
import { FC, ReactNode } from "react";

// Styles
import styles from "./styles.module.scss";

type Props = {
  children: ReactNode;
  index: number;
  isInline: boolean;
  node: {
    _key: string;
    _type: "block";
    children: any;
    markDefs: [];
    style: "small";
  };
  value: {
    _key: string;
    _type: "block";
    children: any;
    markDefs: [];
    style: "small";
  };
  renderNode?: unknown;
};

const SmallText: FC<Props> = (props) => {
  return <small className={styles.small}>{props.children}</small>;
};

export default SmallText;
