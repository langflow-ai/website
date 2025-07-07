// Dependencies
import { FC } from "react";

// Types
import type { Event } from "@/lib/types/sanity.types";

// Components
import Hero from "../Hero";
import Content from "@/components/pages/Page/Content";

// Props types
type Props = {
  event: Event;
};
const Template: FC<Props> = ({ event }) => {
  return (
    <>
      <Hero
        dates={event.dates || []}
        intro={event.introduction}
        location={event.location}
        title={event.title}
        type={event.type}
        ctas={event.ctas}
      />

      {event.sections?.map((section, index) => {
        switch (section._type) {
          case "section.content":
            return <Content key={section._key} {...section} center={false} />;
          default:
            return <section key={(section as any)._key || index}></section>;
        }
      })}
    </>
  );
};

export default Template;
