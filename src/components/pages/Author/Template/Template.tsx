// Dependencies
import { FC } from "react";

// Components
import Hero from "../Hero";
import Content from "../Content";

// Props types
type Props = {
  author: {
    _id: string;
    name?: string;
    slug?: { current?: string };
    bio?: string;
    avatar?: any;
    location?: string;
    social?: {
      github?: string | null;
      linkedin?: string | null;
      twitter?: string | null;
      website?: string | null;
    };
    posts?: Array<{
      _id: string;
      title?: string;
      slug?: { current?: string };
      excerpt?: string;
      publishedAt?: string;
      featureImage?: any;
    }>;
    talks?: Array<{
      _id: string;
      title?: string;
      slug?: { current?: string };
      description?: string;
      date?: string;
      duration?: number;
      location?: string;
      thumbnail?: any;
      event?: {
        _id: string;
        title?: string;
        slug?: { current?: string };
        type?: "virtual" | "in-person";
      };
    }>;
    events?: Array<{
      _id: string;
      title?: string;
      slug?: { current?: string };
      type?: "virtual" | "in-person";
      dates?: any[];
      location?: string;
      thumbnail?: any;
    }>;
  };
};

const Template: FC<Props> = ({ author }) => {
  return (
    <>

      <Hero
        name={author.name}
        bio={author.bio}
        avatar={author.avatar}
        location={author.location}
        twitter={author.social?.twitter || undefined}
        linkedin={author.social?.linkedin || undefined}
        github={author.social?.github || undefined}
        website={author.social?.website || undefined}
      />

      <Content
        posts={author.posts}
        talks={author.talks}
        events={author.events}
      />
    </>
  );
};

export default Template;


