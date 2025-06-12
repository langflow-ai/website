"use client";

// Dependencies
import { PortableText as BasePortableText } from "@portabletext/react";

// Components
import Small from "./block/Small";
import Code from "./types/Code";
import HeadingText from "./block/Heading";
import Image from "./types/Image";

interface Props {
  value: any;
  components?: any;
}

const DEFAULT_SERIALIZERS = {
  block: {
    small: Small,
    h1: HeadingText,
    h2: HeadingText,
    h3: HeadingText,
    h4: HeadingText,
    h5: HeadingText,
    h6: HeadingText,
  },
  types: {
    code: Code,
    image: Image,
  },
};

const merge = (...objects: any) => {
  const isObject = (obj: any) => obj && typeof obj === "object";

  return objects.reduce((acc: any, obj: any) => {
    if (!isObject(acc) || !isObject(obj)) {
      return obj;
    }

    Object.keys(obj).forEach((key) => {
      if (isObject(acc[key]) && isObject(obj[key])) {
        acc[key] = merge(acc[key], obj[key]);
      } else {
        acc[key] = obj[key];
      }
    });

    return acc;
  }, {});
};

const PortableText = ({ value, components }: Props) => {
  const serializers =
    merge(DEFAULT_SERIALIZERS, components) || DEFAULT_SERIALIZERS;
  return <BasePortableText value={value} components={serializers} />;
};

export default PortableText;
