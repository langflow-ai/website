// Dependencies
import { FC } from "react";
import NextLink from "next/link";
import Image from "next/image";

// Components
import Display from "@/components/ui/Display";
import Link from "@/components/ui/Link";
import SocialShare from "@/components/external/SocialShare";
import Text from "@/components/ui/text";
import AddToCalendarLink from "./AddToCalendarLink";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  title?: string;
  date?: string;
  duration?: number;
  location?: string;
  slug?: { current?: string };
  event?: {
    _id: string;
    title?: string;
    slug?: { current?: string };
    type?: "virtual" | "in-person";
  };
  speakers?: Array<{
    _id: string;
    name?: string;
    slug?: { current?: string };
    avatar?: any;
    bio?: string;
  }>;
};

const Hero: FC<Props> = ({
  title,
  date,
  duration,
  location,
  slug,
  event,
  speakers,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Los_Angeles",
    });
  };

  const getCalendarData = () => {
    if (!date || !title) return null;

    const startDate = new Date(date);
    const endDate = duration
      ? new Date(startDate.getTime() + duration * 60 * 1000)
      : new Date(startDate.getTime() + 60 * 60 * 1000); // Default 1 hour

    const url = slug?.current
      ? `https://www.langflow.org/talks/${slug.current}`
      : undefined;

    return {
      title,
      location,
      startDate,
      endDate,
      url,
    };
  };

  const calendarData = getCalendarData();

  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={`row ${styles.main}`}>
          <div className="col-lg-9">
            {event && (
              <Link href={`/events/${event.slug?.current}`}>
                <Display className={styles.event} size={100}>
                  <svg
                    width="6"
                    height="13"
                    viewBox="0 0 6 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.16196 0.792358L5.45785 6.5021L2.16196 12.2058L0 12.2076L3.29589 6.5021L0 0.792358H2.16196Z" fill="currentColor"></path>
                  </svg>{event.title}
                </Display>
              </Link>
            )}
            <Display className={styles.title} size={600} tagName="h2">
              {title}
            </Display>
            <div className="row w-100">
          <div>
            <div className={styles.details}>
              {date && (
                <div className={styles.details__item}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.8333 2.5H15V1.66667C15 1.20833 14.625 0.833333 14.1667 0.833333C13.7083 0.833333 13.3333 1.20833 13.3333 1.66667V2.5H6.66667V1.66667C6.66667 1.20833 6.29167 0.833333 5.83333 0.833333C5.375 0.833333 5 1.20833 5 1.66667V2.5H4.16667C2.79167 2.5 1.66667 3.625 1.66667 5V16.6667C1.66667 18.0417 2.79167 19.1667 4.16667 19.1667H15.8333C17.2083 19.1667 18.3333 18.0417 18.3333 16.6667V5C18.3333 3.625 17.2083 2.5 15.8333 2.5ZM15.8333 16.6667H4.16667V8.33333H15.8333V16.6667Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className={styles.details__item__data}>
                    {formatDate(date)}
                  </span>
                </div>
              )}
              {calendarData && (
                <AddToCalendarLink calendarData={calendarData} />
              )}
            </div>
          </div>
        </div>
            {speakers && speakers.length > 0 && (
              <div className={styles.speakers}>
                {speakers.map((speaker) => {
                  // Avatar is now a direct URL string
                  const avatarUrl = typeof speaker.avatar === 'string' ? speaker.avatar : null;

                  return (

                    <NextLink
                    href={`/people/${speaker.slug!.current}`}
                    className={styles.name}
                  >
                    <div key={speaker._id} className={styles.speaker}>
                      {avatarUrl && (
                        <Image
                          src={avatarUrl}
                          alt={speaker.name || "Speaker"}
                          className={styles.avatar}
                          width={48}
                          height={48}
                        />
                      )}
                      {speaker.slug?.current ? (
                          speaker.name
                      ) : (
                        <Text className={styles.name} size={200}>
                          {speaker.name}
                        </Text>
                      )}
                    </div>
                    </NextLink>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;


