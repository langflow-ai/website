// Dependencies
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Components
import Hero from "@/components/pages/EventsHub/Hero";

// Dynamic imports for better code splitting
const Grid = dynamic(() => import("@/components/pages/EventsHub/Grid"), {
  loading: () => <div style={{ height: "600px" }} />,
});

const Template = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<div style={{ height: "600px" }} />}>
        <Grid />
      </Suspense>
    </>
  );
};

export default Template;
