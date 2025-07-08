import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { CardPreview, Event, SeoSlug } from "./sanity.types";

export type InstantBook = {
  uuid: string;
  task_id: number;
  org_id: number;
  environment: number;
};

export type Seo = {
  title: string;
  thumbnail?: SanityImageSource;
  slug: SeoSlug;
};

export type EventCard = Required<
  Pick<Event, "type" | "title" | "dates" | "thumbnail">
> & {
  slug: string;
  description: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body: string;
  publishedAt: string;
  featureImage: SanityImageSource;
  author: {
    name: string;
    slug: { current: string };
    avatar: SanityImageSource;
  };
};
