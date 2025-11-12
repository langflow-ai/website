// Dependencies
import { FC } from "react";
import { parseISO } from "date-fns/parseISO";
import { downloadICS } from "@/lib/utils/ics";
import NextImage from "next/image";

// Types
import type { EventCard } from "@/lib/types/sanity";

// Components
import Display from "@/components/ui/Display";
import Link from "@/components/ui/Link";
import SanityImage from "@/components/ui/media/SanityImage";
import Text from "@/components/ui/text";

// Utilities
import { getBodyTextForICS } from "@/lib/utils/getBodyTextForICS";

// Styles
import styles from "./styles.module.scss";
import { getEventDate } from "./utils";

// Props types
type Props = {
  event: EventCard;
};

const Card: FC<Props> = ({ event }) => {
  const eventSlug = typeof event.slug === 'string' ? event.slug : event.slug?.current || '';
  const eventUrl = `/events/${eventSlug}`;
  const isStringThumbnail = typeof event.thumbnail === 'string';

  const getCalendarData = () => {
    if (!event.dates || event.dates.length === 0 || !event.title) return null;

    // Get the first date as start date
    const firstDate = event.dates[0];
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
    } else if (event.dates.length > 1) {
      // Multiple dates - use the last date
      const lastDate = event.dates[event.dates.length - 1];
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

    const url = event.slug
      ? `https://www.langflow.org${event.slug.startsWith('/') ? '' : '/'}${event.slug}`
      : undefined;

    const bodyText = event.body ? getBodyTextForICS(event.body) : event.description;

    // Determine end date/time strings
    let endDateString: string | undefined;
    let endTimeString: string | undefined;
    
    if (firstDate.endTime) {
      endDateString = firstDate.date as string;
      endTimeString = firstDate.endTime;
    } else if (event.dates.length > 1) {
      const lastDate = event.dates[event.dates.length - 1];
      endDateString = lastDate.date as string;
      endTimeString = lastDate.endTime || lastDate.time;
    }

    return {
      title: event.title,
      description: bodyText,
      location: undefined,
      startDate,
      endDate,
      url,
      timezone: firstDate.timezone,
      startDateString: firstDate.date as string,
      startTimeString: firstDate.time,
      endDateString,
      endTimeString,
    };
  };

  const calendarData = getCalendarData();

  return (
    <div className={`row ${styles.card}`}>
      <div className="col-lg-4">
        <Link href={eventUrl}>
          {isStringThumbnail ? (
            <NextImage
              src={event.thumbnail as string}
              alt={event.title}
              width={400}
              height={225}
              style={{ width: '100%', height: 'auto' }}
            />
          ) : (
            <SanityImage image={event.thumbnail} alt={event.title} />
          )}
        </Link>
      </div>
      <div className="col-lg-8 d-flex flex-column align-items-start">
        <Display className={styles.info} size={100} tagName="div">
          <span>{event.type}</span>
          <span>&nbsp;·&nbsp;</span>
          <span>{getEventDate(event.dates)}</span>
        </Display>

        <Link href={eventUrl}>
          <Display size={300} tagName="h4">
            {event.title}
          </Display>
        </Link>
        <Text size={200} tagName="p">
          {event.description}
        </Text>
        <div className={`d-flex align-items-center ${styles.actions}`} style={{ gap: 'var(--spacer-3)' }}>
          <Link href={eventUrl}>
            <span>Learn More</span>
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
          </Link>
          {calendarData && (
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const filename = `${calendarData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`;
                downloadICS(calendarData, filename);
              }}
            >
              <span>Add to Calendar</span>
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
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
