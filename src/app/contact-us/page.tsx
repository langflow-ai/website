// Dependencies
import type { Metadata } from "next";
import { Suspense } from "react";

// Components
import Page from "@/components/layout/page";
import Template from "@/components/pages/ContactUs/Template/Template";

export const generateMetadata = (): Metadata => {
  return {
    title: "Contact Us",
    description: "Get in touch with the Langflow team",
  };
};

const Desktop = async () => {
  return (
    <Page className="layout " type="desktop">
      <Suspense fallback={<div>Loading...</div>}>
        <Template />
      </Suspense>
    </Page>
  );
};

export default Desktop;
