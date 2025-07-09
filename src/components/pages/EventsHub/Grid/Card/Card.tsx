// Dependencies
import { FC } from "react";

// Types
import type { EventCard } from "@/lib/types/sanity";

// Components
import Display from "@/components/ui/Display";
import Link from "@/components/ui/Link";
import Image from "@/components/ui/media/SanityImage";
import Text from "@/components/ui/text";

// Styles
import styles from "./styles.module.scss";
import { getEventDate } from "./utils";

// Props types
type Props = {
  event: EventCard;
};

const Card: FC<Props> = ({ event }) => {
  console.log(event);
  return (
    <div className={`row ${styles.card}`}>
      <div className="col-lg-4">
        <Link href={event.slug}>
          <Image image={event.thumbnail} alt={event.title} />
        </Link>
      </div>
      <div className="col-lg-8 d-flex flex-column align-items-start">
        <Display className={styles.info} size={100} tagName="div">
          <span>{event.type}</span>
          <span>&nbsp;·&nbsp;</span>
          <span>{getEventDate(event.dates)}</span>
        </Display>

        <Link href={event.slug}>
          <Display size={300} tagName="h4">
            {event.title}
          </Display>
        </Link>
        <Text size={200} tagName="p">
          {event.description}
        </Text>
        <Link href={event.slug}>
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
      </div>
    </div>
  );
};

export default Card;
