"use client";

import { FC, useState } from "react";

// Components
import Text from "@/components/ui/text";

// Hooks
import useEvents from "./hooks/useEvents";

// Styles
import styles from "./styles.module.scss";
import Card from "./Card";

const Grid: FC = () => {
  // Local State
  const [active, setActive] = useState<"upcoming" | "past">("upcoming");

  const { events, count, loading } = useEvents(active);
  console.log(events);

  return (
    <section className={styles.grid}>
      <div className="container">
        <div className="row">
          <div className={`col-lg-12 ${styles.heading}`}>
            <Text size={200} tagName="h2">
              Showing {count} Results.
            </Text>
            <div className={styles.tabs}>
              <button
                data-active={active === "upcoming"}
                onClick={() => setActive("upcoming")}
              >
                Upcoming
              </button>
              <button
                data-active={active === "past"}
                onClick={() => setActive("past")}
              >
                Past
              </button>
            </div>
          </div>
        </div>

        <div className={`row ${styles.list}`}>
          {events?.map((event, key) => (
            <div
              className={`col-lg-12 ${styles.event}`}
              key={`${event.slug}--${key}`}
            >
              <Card event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Grid;
