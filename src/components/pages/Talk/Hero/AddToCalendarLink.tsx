"use client";

// Dependencies
import { FC } from "react";
import { downloadICS, ICSEventData } from "@/lib/utils/ics";

// Components
import Link from "@/components/ui/Link";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  calendarData: ICSEventData;
};

const AddToCalendarLink: FC<Props> = ({ calendarData }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const filename = `${calendarData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`;
    downloadICS(calendarData, filename);
  };

  return (
    <div className={styles.addToCalendarContainer}>
      <Link
        href="#"
        onClick={handleClick}
        className={styles.addToCalendar}
      >
        <span>+ Add to Calendar</span>
      </Link>
    </div>
  );
};

export default AddToCalendarLink;

