// Dependencies
import { FC } from "react";
import NextLink from "next/link";
import { getImageUrl } from "@/lib/backend/sanity/client";

// Components
import Display from "@/components/ui/Display";
import Link from "@/components/ui/Link";
import SocialShare from "@/components/external/SocialShare";
import Text from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  title?: string;
  description?: string;
  date?: string;
  duration?: number;
  location?: string;
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
  description,
  date,
  duration,
  location,
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
    });
  };

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
            <div className="row">
          <div className="col-lg-9">
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
              {duration && (
                <div className={styles.details__item}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 1.66667C5.4 1.66667 1.66667 5.4 1.66667 10C1.66667 14.6 5.4 18.3333 10 18.3333C14.6 18.3333 18.3333 14.6 18.3333 10C18.3333 5.4 14.6 1.66667 10 1.66667ZM10 16.6667C6.325 16.6667 3.33333 13.675 3.33333 10C3.33333 6.325 6.325 3.33333 10 3.33333C13.675 3.33333 16.6667 6.325 16.6667 10C16.6667 13.675 13.675 16.6667 10 16.6667ZM10.8333 10.8333V5.83333H9.16667V10.8333H10.8333Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className={styles.details__item__data}>
                    {duration} minutes
                  </span>
                </div>
              )}
              {location && (
                <div className={styles.details__item}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C6.5 0 3.66667 2.83333 3.66667 6.33333C3.66667 11.5833 10 20 10 20C10 20 16.3333 11.5833 16.3333 6.33333C16.3333 2.83333 13.5 0 10 0ZM10 8.5C8.625 8.5 7.5 7.375 7.5 6C7.5 4.625 8.625 3.5 10 3.5C11.375 3.5 12.5 4.625 12.5 6C12.5 7.375 11.375 8.5 10 8.5Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className={styles.details__item__data}>{location}</span>
                </div>
              )}
            </div>
          </div>
          <div className={`col-lg-3 d-flex justify-content-lg-end`}>
            {title && <SocialShare className={styles.share} title={title} />}
          </div>
        </div>
            {speakers && speakers.length > 0 && (
              <div className={styles.speakers}>
                {speakers.map((speaker) => {
                  const avatarUrl = speaker.avatar
                    ? getImageUrl(speaker.avatar)
                    : null;

                  return (

                    <NextLink
                    href={`/authors/${speaker.slug!.current}`}
                    className={styles.name}
                  >
                    <div key={speaker._id} className={styles.speaker}>
                      {avatarUrl && (
                        <img
                          src={avatarUrl}
                          alt={speaker.name || "Speaker"}
                          className={styles.avatar}
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
            
            {description && (
              <Text className={styles.description} size={300}>
                {description}
              </Text>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;


