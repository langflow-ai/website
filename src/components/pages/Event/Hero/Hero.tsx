// Types
import { FC } from "react";

// Types
import type {
  DateWithTimeField,
  PortableText as SanityContent,
} from "@/lib/types/sanity.types";

// Components
import DateIcon from "./icons/Date";
import LocationIcon from "./icons/Location";
import PortableText from "@/components/external/PortableText";
import Display from "@/components/ui/Display";
import Link from "@/components/ui/Link";
import Text from "@/components/ui/text";
import SocialShare from "@/components/external/SocialShare";

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
  dates: DateWithTimeField[];
  location?: string;
  title?: string;
  type?: "virtual" | "in-person";
  intro?: any;
};

const Hero: FC<Props> = ({ dates, intro, location, title, type }) => {
  // // Local Variables
  const upcomingDate = getEventUpcomingDate(dates || []);
  const upcomingMonth = getEventUpcomingDate(dates || [], "month");
  const info = {
    dates: `${getEventDate(dates || [])}`,
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
            {intro && (
              <Text className={styles.intro} size={300} tagName="div">
                <PortableText value={intro} />
              </Text>
            )}

            {/* {ctas && (
              <div className={styles.ctas}>
                {ctas?.map((cta) => (
                  <Button
                    color={Color.Reverse}
                    href={cta.url}
                    key={cta._key}
                    variant={Variant.Link}
                    uppercase
                  >
                    {cta.text}
                  </Button>
                ))}
              </div>
            )} */}
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
                    <div>{value}</div>
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
