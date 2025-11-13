// Dependencies
import { FC } from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/backend/sanity/client";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import SanityImage from "@/components/ui/media/SanityImage";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  talks: Array<{
    _id: string;
    title?: string;
    slug?: { current?: string };
    description?: string;
    date?: string;
    duration?: number;
    location?: string;
    thumbnail?: any;
    speakers?: Array<{
      _id: string;
      name?: string;
      slug?: { current?: string };
      avatar?: any;
    }>;
  }>;
};

const Talks: FC<Props> = ({ talks }) => {
  if (!talks || talks.length === 0) {
    return null;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <section className={styles.talks}>
      <div className="container">
        <div className="row">
          <div>
            <Display size={400} tagName="h2" className={styles.heading}>
              Talks ({talks.length})
            </Display>
            <div className={styles.grid}>
              {talks.map((talk) => (
                <Link
                  key={talk._id}
                  href={`/talks/${talk.slug?.current}`}
                  className={styles.talk}
                >
                  {talk.speakers && talk.speakers.length > 0 && talk.speakers[0].avatar && (
                    <SanityImage
                      image={talk.speakers[0].avatar}
                      alt={talk.speakers[0].name || talk.title || ""}
                      className={styles.image}
                      width={300}
                    />
                  )}
                  <div className={styles.content}>
                    <div className={styles.meta}>
                      {talk.date && (
                        <Text size={100} className={styles.date}>
                          {formatDate(talk.date)}
                        </Text>
                      )}
                      {talk.duration && (
                        <Text size={100} className={styles.duration}>
                          {talk.duration} min
                        </Text>
                      )}
                      {talk.location && (
                        <Text size={100} className={styles.location}>
                          {talk.location}
                        </Text>
                      )}
                    </div>
                    <Display size={300} tagName="h3" className={styles.title}>
                      {talk.title}
                    </Display>
                    {talk.description && (
                      <Text size={200} className={styles.description}>
                        {talk.description}
                      </Text>
                    )}
                    {talk.speakers && talk.speakers.length > 0 && (
                      <div className={styles.speakers}>
                        <Text size={100} className={styles.speakersLabel}>
                          Speakers:
                        </Text>
                        <div className={styles.speakersList}>
                          {talk.speakers.map((speaker, idx) => (
                            <span key={speaker._id}>
                              {speaker.slug?.current ? (
                                <Link
                                  href={`/authors/${speaker.slug.current}`}
                                  className={styles.speakerLink}
                                >
                                  {speaker.name}
                                </Link>
                              ) : (
                                speaker.name
                              )}
                              {idx < (talk.speakers?.length ?? 0) - 1 && ", "}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Talks;


