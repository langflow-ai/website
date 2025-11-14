// Dependencies
import { FC } from "react";

// Components
import Hero from "../Hero";
import Content from "../Content";
import Links from "../Links";
import Recording from "../Recording";

// Props types
type Props = {
  talk: {
    _id: string;
    title?: string;
    slug?: { current?: string };
    description?: string;
    body?: any;
    date?: string;
    duration?: number;
    location?: string;
    slides?: string;
    recording?: string;
    thumbnail?: any;
    resources?: Array<{
      _key?: string;
      _type?: string;
      title?: string;
      url?: string;
    }>;
    speakers?: Array<{
      _id: string;
      name?: string;
      slug?: { current?: string };
      avatar?: any;
      bio?: string;
    }>;
    event?: {
      _id: string;
      title?: string;
      slug?: { current?: string };
      type?: "virtual" | "in-person";
      dates?: any[];
      location?: string;
    };
    tags?: Array<{
      _id: string;
      title?: string;
      slug?: { current?: string };
    }>;
  };
};

const Template: FC<Props> = ({ talk }) => {
  return (
    <>
      <Hero
        title={talk.title}
        date={talk.date}
        duration={talk.duration}
        location={talk.location}
        slug={talk.slug}
        event={talk.event}
        speakers={talk.speakers}
      />

      {talk.body && <Content content={talk.body} />}
      {talk.recording && (
        <Recording src={talk.recording} />
      )}
      {(talk.slides || talk.recording || (talk.resources && talk.resources.length > 0)) && (
        <Links 
          slides={talk.slides} 
          recording={talk.recording}
          resources={talk.resources}
        />
      )}
    </>
  );
};

export default Template;


