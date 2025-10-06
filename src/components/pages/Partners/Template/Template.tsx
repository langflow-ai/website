import PartnersAnalytics from "../Analytics";
import Benefits from "../Benefits";
import Eligibility from "../Eligibility";
import FAQ from "../FAQ";
import Hero from "../Hero";
import HowItWorks from "../HowItWorks";
import StructuredData from "../StructuredData";
import TrustProof from "../TrustProof";

const Template = () => {
  return (
    <>
      <StructuredData />
      <PartnersAnalytics />
      <Hero />
      <Benefits />
      <HowItWorks />
      {/* <WhatHappensNext /> */}
      <Eligibility />
      <TrustProof />
      <FAQ />
    </>
  );
};

export default Template;
