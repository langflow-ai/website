"use client";

// Dependencies
import { FC } from "react";
import { downloadICS, ICSEventData } from "@/lib/utils/ics";

// Components
import Button from "@/components/ui/button/Button";
import { ButtonTypes } from "@/components/ui/button/types";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  url?: string;
  className?: string;
  timezone?: string;
  startDateString?: string;
  startTimeString?: string;
  endDateString?: string;
  endTimeString?: string;
};

const AddToCalendar: FC<Props> = ({
  title,
  description,
  location,
  startDate,
  endDate,
  url,
  className,
  timezone,
  startDateString,
  startTimeString,
  endDateString,
  endTimeString,
}) => {
  const handleClick = () => {
    const eventData: ICSEventData = {
      title,
      description,
      location,
      startDate,
      endDate,
      url,
      timezone,
      startDateString,
      startTimeString,
      endDateString,
      endTimeString,
    };

    const filename = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.ics`;
    downloadICS(eventData, filename);
  };

  return (
    <Button
      variant={ButtonTypes.BORDER}
      onClick={handleClick}
      className={className}
      icon={
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
      }
    >
      Add to Calendar
    </Button>
  );
};

export default AddToCalendar;

