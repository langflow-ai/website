// Dependencies
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

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
    event?: {
      _id: string;
      title?: string;
      slug?: { current?: string };
      type?: "virtual" | "in-person";
    };
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
    });
  };

  return (
    <section className={styles.talks}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
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
                  {talk.thumbnail && (
                    <SanityImage
                      image={talk.thumbnail}
                      alt={talk.title || ""}
                      className={styles.image}
                      width={300}
                    />
                  )}
                  <div className={styles.content}>
                    {talk.event && (
                      <Text size={100} className={styles.event}>
                        {talk.event.title}
                      </Text>
                    )}
                    <Display size={300} tagName="h3" className={styles.title}>
                      {talk.title}
                    </Display>
                    {talk.description && (
                      <Text size={200} className={styles.description}>
                        {talk.description}
                      </Text>
                    )}
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
                    </div>
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


