// Dependencies
import { FC } from "react";

// Types

// Components
import Image from "@/components/ui/media/SanityImage";

import styles from "./styles.module.scss";

type Props = {
  value:
    | {
        _key: string;
        _type: "image";
        asset: {
          _ref: string;
          _type: "reference";
        };
      }
    | string;
  isInline: boolean;
  index: number;
  renderNode?: unknown;
};

const BlockImage: FC<Props> = (props) => {
  const { value } = props;
  // Convert Sanity asset reference to string path if needed
  const imagePath =
    typeof value === "string"
      ? value
      : `/content/images/posts/${value._key || "placeholder"}.png`;

  return (
    <figure className={styles.image}>
      <Image image={imagePath} alt={""} />
    </figure>
  );
};

export default BlockImage;
