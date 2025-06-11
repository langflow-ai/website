// Dependencies
import { type FC } from "react";

// Types
import { Page } from "@/lib/types/sanity.types";

// Components
import Content from "@/components/pages/Page/Content";
import Form from "@/components/pages/Page/Form";
import Hero from "@/components/pages/Page/Hero";

type Props = {
  sections?: Page["sections"];
};

const Template: FC<Props> = ({ sections }) => {
  return (
    <>
      {sections?.map((section, index) => {
        switch (section._type) {
          case "section.form":
            return <Form key={section._key} {...section} />;
          case "section.hero":
            return <Hero key={section._key} {...section} />;
          case "section.content":
            return <Content key={section._key} {...section} />;
          default:
            return <section key={(section as any)._key || index}></section>;
        }
      })}
    </>
  );
};

export default Template;
