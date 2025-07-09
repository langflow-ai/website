// Dependencies
import type { Metadata } from "next";

//Components
import Page from "@/components/layout/page";
import Template from "@/components/pages/EventsHub/Template";

export const generateMetadata = (): Metadata => {
  return {
    title: "Events | Langflow",
    description: "Langflow Events",
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
