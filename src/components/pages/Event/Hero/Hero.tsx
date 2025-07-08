// Types
import { FC } from "react";

// Types
import type { CtaLink, DateWithTimeField } from "@/lib/types/sanity.types";

// Components
import DateIcon from "./icons/Date";
import LocationIcon from "./icons/Location";
import Display from "@/components/ui/Display";
import Lines, { Mode } from "@/components/ui/Lines";
import Link from "@/components/ui/Link";
import SocialShare from "@/components/external/SocialShare";

// Utilities
import {
  getEventDate,
  getEventUpcomingDate,
} from "../../EventsHub/Grid/Card/utils";

// Styles
import styles from "./styles.module.scss";
import Button from "@/components/ui/button";

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
};

const Hero: FC<Props> = ({
  ctas = [],
  dates,
  intro,
  location,
  title,
  type,
}) => {
  // // Local Variables
  const upcomingDate = getEventUpcomingDate(dates || []);
  const upcomingMonth = getEventUpcomingDate(dates || [], "month");
  const info = {
    dates: `${getEventDate(dates || [], "\\\\")}`,
    location: location,
  };

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
          </div>
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
          <div className={`col-lg-3 d-flex justify-content-lg-end`}>
            {title && <SocialShare className={styles.share} title={title} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
