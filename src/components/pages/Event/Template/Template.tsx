// Dependencies
import { FC, Suspense } from "react";
import dynamic from "next/dynamic";

// Types
import type { Event } from "@/lib/types/sanity.types";

// Components
import Hero from "../Hero";

// Dynamic imports for better code splitting
const Content = dynamic(() => import("@/components/pages/Event/Content"), {
  loading: () => <div style={{ height: "400px" }} />,
});

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

      {event.body && (
        <Suspense fallback={<div style={{ height: "400px" }} />}>
          <Content content={event.body} />
        </Suspense>
      )}
    </>
  );
};

export default Template;
