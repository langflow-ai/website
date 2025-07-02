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
