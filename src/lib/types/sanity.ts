import { CardPreview, Event, SeoSlug } from "./sanity.types";

export type InstantBook = {
  uuid: string;
  task_id: number;
  org_id: number;
  environment: number;
};

export type Seo = {
  title: string;
  thumbnail?: string;
  slug: SeoSlug;
  description?: string;
};

export type EventCard = Required<
  Pick<Event, "type" | "title" | "dates" | "thumbnail">
> & {
  slug: string;
  description: string;
  body?: string | any;
  location?: string;
};

export type AuthorClip = {
  name: string;
  slug?: { current: string };
  avatar?: string;
}

export type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body: string;
  publishedAt: string;
  featureImage: string;
  author?: AuthorClip;
  authors?: AuthorClip[];
};

export type PageForSiteMap = {
  _id: string;
  slug: string;
  _updatedAt: string;
};
