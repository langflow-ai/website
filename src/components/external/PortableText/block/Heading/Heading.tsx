// Dependencies
import { slugify } from "@/lib/utils/str";
import { Children, ElementType, FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
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
}>;

const HeadingText: FC<Props> = (props) => {
  const Element: ElementType = props.value.style;
  const text = Children.map(props.children, (child) =>
    typeof child === "string" ? child : null
  )
    ?.filter(Boolean)
    .join(" ");

  return <Element id={slugify(text)}>{props.children}</Element>;
};

export default HeadingText;
