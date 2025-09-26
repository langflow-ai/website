// Dependencies
import type { Metadata } from "next";

//Components
import Page from "@/components/layout/page";
import Template from "@/components/pages/EventsHub/Template";

export const generateMetadata = (): Metadata => {
  return {
    title: "Events",
    description: "Discover upcoming Langflow events, workshops, and community meetups",
  };
};

const EventsPage = async () => {
  return (
    <Page className="layout " type="normal">
      <Template />
    </Page>
  );
};

export default EventsPage;
