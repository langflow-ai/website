import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "../Hero";
import Quote from "../Quote";
import { QUOTES_DATA } from "@/utils/constants";

// Dynamic imports for better code splitting
const GetStarted = dynamic(() => import("../GetStarted"), {
  loading: () => <div style={{ height: "400px" }} />,
});

const PartnersStack = dynamic(() => import("../PartnersStack/PartnersStack"), {
  loading: () => <div style={{ height: "200px" }} />,
});

const DragNDrop = dynamic(() => import("../DragNDrop"), {
  loading: () => <div style={{ height: "600px" }} />,
});

const BlackBoxes = dynamic(() => import("../BlackBoxes"), {
  loading: () => <div style={{ height: "500px" }} />,
});

const Notebook = dynamic(() => import("../Notebook"), {
  loading: () => <div style={{ height: "400px" }} />,
});

const Template = () => {
  return (
    <>
      <Hero />
      <Quote {...QUOTES_DATA[0]} />
      <Suspense fallback={<div style={{ height: "500px" }} />}>
        <BlackBoxes />
      </Suspense>
      <Quote {...QUOTES_DATA[1]} />
      <Suspense fallback={<div style={{ height: "600px" }} />}>
        <DragNDrop />
      </Suspense>
      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <Notebook />
      </Suspense>
      <Suspense fallback={<div style={{ height: "200px" }} />}>
        <PartnersStack />
      </Suspense>
      <Quote {...QUOTES_DATA[2]} removePaddingOnMobile />
      <Suspense fallback={<div style={{ height: "400px" }} />}>
        <GetStarted />
      </Suspense>
    </>
  );
};

export default Template;
