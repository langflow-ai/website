import ApplicationForm from "../ApplicationForm";
import Benefits from "../Benefits";
import Eligibility from "../Eligibility";
import FAQ from "../FAQ";
import Hero from "../Hero";
import HowItWorks from "../HowItWorks";

const Template = () => {
  return (
    <>
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
