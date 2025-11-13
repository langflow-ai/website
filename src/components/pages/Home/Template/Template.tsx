import Hero from "../Hero";
import Quote from "../Quote";
import GetStarted from "../GetStarted";
import PartnersStack from "../PartnersStack/PartnersStack";
import DragNDrop from "../DragNDrop";
import BlackBoxes from "../BlackBoxes";
import Notebook from "../Notebook";
import { QUOTES_DATA } from "@/utils/constants";

const Template = () => {
  return (
    <>
      <Hero />
      <Quote {...QUOTES_DATA[0]} />
      <BlackBoxes />
      <Quote {...QUOTES_DATA[1]} />
      <DragNDrop />
      <Notebook />
      <PartnersStack />
      <Quote {...QUOTES_DATA[2]} removePaddingOnMobile />
      <GetStarted />
    </>
  );
};

export default Template;
