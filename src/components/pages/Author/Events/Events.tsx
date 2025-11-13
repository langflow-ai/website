// Dependencies
import { FC } from "react";
import Link from "next/link";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import SanityImage from "@/components/ui/media/SanityImage";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  events: Array<{
    _id: string;
    title?: string;
    slug?: { current?: string };
    type?: "virtual" | "in-person";
    dates?: any[];
    location?: string;
    thumbnail?: any;
  }>;
};

const Events: FC<Props> = ({ events }) => {
  if (!events || events.length === 0) {
    return null;
  }

  const formatDate = (dates?: any[]) => {
    if (!dates || dates.length === 0) return null;
    const firstDate = dates[0]?.date;
    if (!firstDate) return null;
    const date = new Date(firstDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className={styles.events}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <Display size={400} tagName="h2" className={styles.heading}>
              Events ({events.length})
            </Display>
            <div className={styles.grid}>
              {events.map((event) => (
                <Link
                  key={event._id}
                  href={`/events/${event.slug?.current}`}
                  className={styles.event}
                >
                  {event.thumbnail && (
                    <SanityImage
                      image={event.thumbnail}
                      alt={event.title || ""}
                      className={styles.image}
                      width={300}
                    />
                  )}
                  <div className={styles.content}>
                    <div className={styles.meta}>
                      {event.type && (
                        <Text size={100} className={styles.type}>
                          {event.type === "in-person" ? "In Person" : "Virtual"}
                        </Text>
                      )}
                      {formatDate(event.dates) && (
                        <Text size={100} className={styles.date}>
                          {formatDate(event.dates)}
                        </Text>
                      )}
                    </div>
                    <Display size={300} tagName="h3" className={styles.title}>
                      {event.title}
                    </Display>
                    {event.location && (
                      <Text size={200} className={styles.location}>
                        {event.location}
                      </Text>
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

export default Events;



