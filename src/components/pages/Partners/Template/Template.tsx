import PartnersAnalytics from "../Analytics";
import ApplicationForm from "../ApplicationForm";
import Benefits from "../Benefits";
import Eligibility from "../Eligibility";
import FAQ from "../FAQ";
import Hero from "../Hero";
import HowItWorks from "../HowItWorks";
import StructuredData from "../StructuredData";
import TrustProof from "../TrustProof";
import WhatHappensNext from "../WhatHappensNext";

const Template = () => {
  return (
    <>
      <StructuredData />
      <PartnersAnalytics />
      <Hero />
      <Benefits />
      <HowItWorks />
      <WhatHappensNext />
      <Eligibility />
      <FAQ />
      <ApplicationForm />
      <TrustProof />
    </>
  );
};

export default Template;
