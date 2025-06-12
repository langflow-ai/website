"use client";

// Dependencies
import type { ImageProps } from "next/image";
import BaseImage from "next/image";
import {
  useNextSanityImage,
  UseNextSanityImageBuilder,
} from "next-sanity-image";

// Backend
import { client } from "@/lib/backend/sanity/client";

// Types

// Props types
type Props = Omit<ImageProps, "src"> & {
  /**
   * The image from Sanity.
   */
  image: any;

  imageBuilder?: UseNextSanityImageBuilder;
};

const Image = ({ alt, image, imageBuilder, ...props }: Props): JSX.Element => {
  // Variables
  const imageProps: any = useNextSanityImage(client, image, { imageBuilder });

  const imgProps = {
    ...imageProps,
    alt: alt || image?.alt || "",
    sizes:
      "(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px",
    ...props,
  };

  return <BaseImage loading="lazy" {...imgProps} />;
};

export default Image;
