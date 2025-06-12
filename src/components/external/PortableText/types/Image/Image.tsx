// Dependencies
import { FC } from "react";

// Types

// Components
import Image from "@/components/ui/media/SanityImage";

import styles from "./styles.module.scss";

type Props = {
  value: {
    _key: string;
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  isInline: boolean;
  index: number;
  renderNode?: unknown;
};

const BlockImage: FC<Props> = (props) => {
  const { value } = props;
  return (
    <figure className={styles.image}>
      <Image image={value} alt={""} />
    </figure>
  );
};

export default BlockImage;
