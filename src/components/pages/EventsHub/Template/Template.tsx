// Dependencies
import { Suspense } from "react";

// Components
import Grid from "@/components/pages/EventsHub/Grid";
import Hero from "@/components/pages/EventsHub/Hero";

const Template = () => {
  return (
    <>
      <Hero />
      <Suspense>
        <Grid />
      </Suspense>
    </>
  );
};

export default Template;
