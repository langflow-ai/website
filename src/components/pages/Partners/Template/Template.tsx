import PartnersAnalytics from "../Analytics";
import ApplicationForm from "../ApplicationForm";
import Benefits from "../Benefits";
import Eligibility from "../Eligibility";
import FAQ from "../FAQ";
import Hero from "../Hero";
import HowItWorks from "../HowItWorks";
import StructuredData from "../StructuredData";

const Template = () => {
  return (
    <>
      <StructuredData />
      <PartnersAnalytics />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Eligibility />
      <FAQ />
      <ApplicationForm />
    </>
  );
};

export default Template;
