// Dependencies
import { FC } from "react";

// Types
import type { Event } from "@/lib/types/sanity.types";

// Components
import Hero from "../Hero";
import Content from "@/components/pages/Event/Content";

// Props types
type Props = {
  event: Event;
};
const Template: FC<Props> = ({ event }) => {
  return (
    <>
      <Hero
        dates={event.dates || []}
        location={event.location}
        title={event.title}
        type={event.type}
      />

      {event.body && <Content content={event.body} />}
    </>
  );
};

export default Template;
