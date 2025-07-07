import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { CardPreview, Event } from "./sanity.types";

export type InstantBook = {
  uuid: string;
  task_id: number;
  org_id: number;
  environment: number;
};

export type EventCard = CardPreview &
  Required<Pick<Event, "type" | "title" | "dates">> & {
    slug: string;
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
