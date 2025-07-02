"use client";

import SanityImage from "@/components/ui/media/SanityImage";
import { PortableText as BasePortableText } from "@portabletext/react";
import Code from "./types/Code";
import YouTubeEmbed from "@/components/ui/Blog/YouTubeEmbed";

const components = {
  marks: {
    code: (props: any) => {
      return (
        <code className="rounded-1 bg-dark text-white p-1">
          {props.children}
        </code>
      );
    },
  },
  types: {
    youtubeEmbed: (props: any) => {
      return <YouTubeEmbed url={props.value.url} />;
    },
    blockCode: (props: any) => {
      return <Code isInline={false} index={props.index} value={props.value} />;
    },
    image: (props: any) => {
      return (
        <figure className="my-0 mx-auto d-flex flex-column gap-2">
          <SanityImage
            className="h-auto w-full rounded-2"
            image={props.value.asset._ref}
            alt={props.value.alt}
          />
          {props.value.alt && (
            <figcaption
              style={{
                fontSize: "0.875rem",
              }}
              className="text-secondary text-center"
            >
              {props.value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

const PortableText = ({ value }: { value: any }) => {
  return <BasePortableText value={value} components={components} />;
};

export default PortableText;
