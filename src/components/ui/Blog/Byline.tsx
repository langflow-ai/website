import SanityImage from "../media/SanityImage";
import Text from "../text";

type BylineProps = {
  author: {
    name?: string;
    slug?: {
      current?: string;
    };
    avatar?: any;
  };
  publishedAt: string;
};

export function Byline({ author, publishedAt }: BylineProps) {
  return (
    <div className="d-flex flex-row items-center gap-2">
      <SanityImage
        image={author?.avatar}
        alt={author?.name || ""}
        width={32}
        height={32}
        className="rounded-circle"
      />
      <div className="d-flex flex-column">
        <Text
          size={200}
          tagName="p"
          className="text-white"
          style={{ lineHeight: 1.2 }}
        >
          Written by {author?.name}
        </Text>
        <Text
          size={200}
          tagName="p"
          className="text-white"
          style={{ lineHeight: 1.2 }}
        >
          {Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(publishedAt!))}
        </Text>
      </div>
    </div>
  );
}
