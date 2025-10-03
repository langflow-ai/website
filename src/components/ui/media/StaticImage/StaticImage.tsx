"use client";

// Dependencies
import Image, { ImageProps } from "next/image";
import { useState } from "react";

// Utilities
import { loader } from "./";

/**
 *
 * @param {ImageProps} props
 * @returns {JSX.Element}
 */

const StaticImage = ({
  alt,
  fallback,
  src,
  priority = false,
  ...props
}: ImageProps & {
  fallback?: string;
}): JSX.Element => {
  const [hasError, setHasError] = useState<boolean>(false);

  // Validations
  if (!props.height) {
    props.height = 0;
  }
  if (!props.width) {
    props.width = 0;
  }

  return (
    <Image
      alt={alt}
      loader={loader}
      src={hasError && fallback ? fallback : src}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      {...props}
      onError={() => setHasError(true)}
    />
  );
};

export default StaticImage;
