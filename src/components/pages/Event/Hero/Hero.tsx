// Types
import { FC } from "react";
import { parseISO } from "date-fns/parseISO";

// Types
import type { CtaLink, DateWithTimeField } from "@/lib/types/sanity.types";

// Utilities
import { getBodyTextForICS } from "@/lib/utils/getBodyTextForICS";

// Components
import DateIcon from "./icons/Date";
import LocationIcon from "./icons/Location";
import Display from "@/components/ui/Display";
import Lines, { Mode } from "@/components/ui/Lines";
import Link from "@/components/ui/Link";
import SocialShare from "@/components/external/SocialShare";
import SanityImage from "@/components/ui/media/SanityImage";
import AddToCalendar from "@/components/ui/AddToCalendar";

// Utilities
import {
  getEventDate,
  getEventUpcomingDate,
} from "../../EventsHub/Grid/Card/utils";

// Styles
import styles from "./styles.module.scss";

// Constants
const LABELS: Record<"virtual" | "in-person", string> = {
  "in-person": "In Person",
  virtual: "Virtual",
};

// Props types
type Props = {
  ctas?: CtaLink[];
  dates: DateWithTimeField[];
  location?: string;
  title?: string;
  type?: "virtual" | "in-person";
  intro?: any;
  thumbnail?: any;
  slug?: { current?: string };
  body?: string | any;
};

const Hero: FC<Props> = ({
  dates,
  location,
  title,
  type,
  thumbnail,
  slug,
  body,
}) => {
  // // Local Variables
  const upcomingDate = getEventUpcomingDate(dates || []);
  const upcomingMonth = getEventUpcomingDate(dates || [], "month");
  const info = {
    dates: `${getEventDate(dates || [], "\\\\")}`,
    location: location,
  };

  const getCalendarData = () => {
    if (!dates || dates.length === 0 || !title) return null;

    // Get the first date as start date
    const firstDate = dates[0];
    if (!firstDate?.date) return null;

    // Parse start date
    let startDate: Date;
    try {
      const dateStr = firstDate.date as string;
      startDate = parseISO(dateStr);

      // If there's a time, add it to the date
      if (firstDate.time) {
        const timeStr = firstDate.time;
        if (timeStr.includes(":")) {
          const [hours, minutes] = timeStr.split(":").map(Number);
          startDate.setHours(hours || 0, minutes || 0, 0, 0);
        }
      }
    } catch {
      return null;
    }

    // Get the end date using endTime if available, otherwise use last date or default
    let endDate: Date;
    
    // Check if first date has endTime (for single date events with time range)
    if (firstDate.endTime) {
      try {
        endDate = new Date(startDate);
        const timeStr = firstDate.endTime;
        if (timeStr.includes(":")) {
          const [hours, minutes] = timeStr.split(":").map(Number);
          endDate.setHours(hours || 0, minutes || 0, 0, 0);
        }
      } catch {
        endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
      }
    } else if (dates.length > 1) {
      // Multiple dates - use the last date
      const lastDate = dates[dates.length - 1];
      if (lastDate?.date) {
        try {
          const dateStr = lastDate.date as string;
          endDate = parseISO(dateStr);

          // If there's an endTime on the last date, use it
          if (lastDate.endTime) {
            const timeStr = lastDate.endTime;
            if (timeStr.includes(":")) {
              const [hours, minutes] = timeStr.split(":").map(Number);
              endDate.setHours(hours || 0, minutes || 0, 0, 0);
            }
          } else if (lastDate.time) {
            // If there's a start time on end date, use it
            const timeStr = lastDate.time;
            if (timeStr.includes(":")) {
              const [hours, minutes] = timeStr.split(":").map(Number);
              endDate.setHours(hours || 0, minutes || 0, 0, 0);
            }
          } else {
            // If no time on end date, set to end of day
            endDate.setHours(23, 59, 59, 999);
          }
        } catch {
          endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
        }
      } else {
        endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
      }
    } else {
      // Single date event without endTime, default to 1 day duration
      endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    }

    const url = slug?.current
      ? `https://www.langflow.org/events/${slug.current}`
      : undefined;

    const bodyText = body ? getBodyTextForICS(body) : undefined;

    return {
      title,
      description: bodyText,
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
        <div className="row">
          <div className="col">
            <Link className={styles.back} href="/events">
              <svg
                width="6"
                height="13"
                viewBox="0 0 6 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.16196 0.792358L5.45785 6.5021L2.16196 12.2058L0 12.2076L3.29589 6.5021L0 0.792358H2.16196Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Back to Events</span>
            </Link>
          </div>
        </div>
        <div className={`row ${styles.main}`}>
          <div className="col-lg-9">
            {type && (
              <Display className={styles.attendance} size={100}>
                {LABELS[type]}
              </Display>
            )}
            <Display className={styles.title} size={600} tagName="h2">
              {title}
            </Display>
            {thumbnail && (
              <div className={`d-lg-none ${styles.image}`}>
                <SanityImage image={thumbnail} alt={title || "Event image"} />
              </div>
            )}
          </div>
          {thumbnail && (
            <div className="col-lg-3 d-none d-lg-block">
              <div className={styles.image}>
                <SanityImage image={thumbnail} alt={title || "Event image"} />
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-lg-9">
            <div className={styles.details}>
              {Object.entries(info)
                .filter(([key, value]) => !!key && !!value)
                .map(([key, value]) => (
                  <div className={styles.details__item} key={key}>
                    {key === "dates" && upcomingDate && (
                      <DateIcon
                        className={styles.icon}
                        month={upcomingMonth}
                        date={upcomingDate}
                      />
                    )}
                    {key === "location" && <LocationIcon />}
                    <span className={styles.details__item__data}>
                      <Lines
                        text={value?.replace("\\\\", "\n") || ""}
                        mode={Mode.Break}
                        wrap
                      />
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className={`col-lg-3 d-flex justify-content-lg-end flex-column`} style={{ gap: 'var(--spacer-3)' }}>
            {calendarData && (
              <AddToCalendar
                title={calendarData.title}
                description={calendarData.description}
                location={calendarData.location}
                startDate={calendarData.startDate}
                endDate={calendarData.endDate}
                url={calendarData.url}
              />
            )}
            {title && <SocialShare className={styles.share} title={title} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
