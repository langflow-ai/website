// Dependencies
import { FC } from "react";

// Types
import type { Event } from "@/lib/types/sanity.types";

// Components
import Hero from "../Hero";
import Content from "@/components/pages/Event/Content";
import Talks from "../Talks";

// Props types
type Props = {
  event: Event & {
    talks?: Array<{
      _id: string;
      title?: string;
      slug?: { current?: string };
      date?: string;
      thumbnail?: any;
      speakers?: Array<{
        _id: string;
        name?: string;
        slug?: { current?: string };
        avatar?: any;
      }>;
    }>;
  };
};
const Template: FC<Props> = ({ event }) => {
  return (
    <>
      <Hero
        dates={event.dates || []}
        location={event.location}
        title={event.title}
        type={event.type}
        thumbnail={event.thumbnail}
        slug={event.slug}
        body={event.body}
      />
      {event.body && <Content content={event.body} />}
      {event.talks && event.talks.length > 0 && (
        <Talks talks={event.talks} />
      )}
    </>
  );
};

export default Template;
