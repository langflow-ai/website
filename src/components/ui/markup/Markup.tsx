"use client";

// Dependencies
import { ComponentProps, ElementType } from "react";

// Components
import { Markup as BaseMarkup } from "interweave";

// Props types
type Props = ComponentProps<typeof BaseMarkup> & {
  /**
   * Indicates whether actual dangerouslySetInnerHTML prop should be used
   * instead of a better markup handling.
   */
  raw?: boolean;
  autoplayVideos?: boolean;
  id?: string;
  onImageClick?: (img: string) => void;
};

const Markup = ({
  className = "",
  content,
  raw = false,
  tagName = "div",
  ...props
}: Props): JSX.Element => {
  if (!props.allowAttributes) {
    props.allowAttributes = true;
  }

  // Variables
  const Element = tagName as ElementType;

  return raw ? (
    <Element
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <BaseMarkup
      className={className}
      content={content}
      tagName={tagName}
      {...props}
    />
  );
};

export default Markup;
