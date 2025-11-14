"use client";

// Dependencies
import type { ImageProps } from "next/image";
import BaseImage from "next/image";

// Props types
type Props = Omit<ImageProps, "src"> & {
  /**
   * The image path (now a static path instead of Sanity image).
   */
  image: string | { src?: string; alt?: string };
};

const Image = ({ alt, image, ...props }: Props): JSX.Element => {
  // Handle both string and object image formats
  const imageSrc = typeof image === "string" ? image : image?.src || "";
  const imageAlt = alt || (typeof image === "object" ? image?.alt : "") || "";

  const imgProps = {
    src: imageSrc,
    alt: imageAlt,
    sizes:
      "(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px",
    ...props,
  };

  return <BaseImage loading="lazy" {...imgProps} />;
};

export default Image;
