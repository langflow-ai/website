// Dependencies
import { format } from "date-fns/format";
import { isMatch } from "date-fns/isMatch";
import { parseISO } from "date-fns/parseISO";

// Types
import type { DateWithTimeField } from "@/lib/types/sanity.types";

export function isSimpleTime(time: string): boolean {
  return isMatch(time, "HH:mm") || isMatch(time, "HH:mm:ss");
}

export function formatDate(
  value: string | null | undefined,
  dateFormat: string
): string | null {
  try {
    if (value) {
      const date: Date = parseISO(value);
      return format(date, dateFormat);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // invalid time value
  }

  return null;
}

export function formatTime(time: string, timeFormat: string): string | null {
  try {
    if (isSimpleTime(time)) {
      const date = parseISO(`1970-01-01T${time}`);
      return format(date, timeFormat);
    }

    const date = parseISO(time);
    return format(date, timeFormat);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    //
  }

  return null;
}

/**
 * Parse the Event dates
 * Convert the date to start-end date for the event
 *
 * @param {DateWithTimeField[]} dates
 * @return {string}
 */
export const getEventDate = (
  dates: DateWithTimeField[] = [],
  timeSeparator = " • "
): string | null => {
  // Validations
  if (dates.length === 0) return null;

  // Variables
  const { [0]: start, [dates.length - 1]: end } = dates;
  const startDate = formatDate(start.date as string, "MMM d");
  const endDate = formatDate(end.date as string, "MMM d");
  const startMonth = startDate?.replace(/\ [0-9]+/g, "");
  const endMonth = endDate?.replace(/\ [0-9]+/g, "");

  if (dates.length === 1) {
    const _date = formatDate(start.date as string, "MMMM dd, yyyy");
    const _time = !!start?.time ? `${formatTime(start.time, "h:mm a")}` : null;
    const timezone = start.timezone ? processEventDateTimezone(start, true) : "";

    return [_date, timezone ? `${_time} ${timezone}` : _time]
      .filter(Boolean)
      .join(timeSeparator);
  }

  if (startMonth === endMonth) {
    return `${startDate} - ${endDate?.replace(/\D+/, "")}`;
  }
  if (startMonth !== endMonth) {
    return `${startDate} - ${endDate}`;
  }

  return null;
};

/**
 * Get the most upcoming date from the event dates and format it to be only the day
 *
 * @param {DateWithTimeField[]} dates
 * @return {string}
 */
export const getEventUpcomingDate = (
  dates: DateWithTimeField[] = [],
  type = "day"
): string | null => {
  // Validations
  if (dates.length === 0) return null;

  const FORMATS: Record<string, string> = {
    day: "dd",
    month: "MMM",
  };
  const first = dates[0];

  return first ? formatDate(first.date, FORMATS[type] || "dd") : null;
};

/**
 * Parse the Event dates
 * Convert the date to start-end time for the event based on the set timezone
 *
 * @param {DateWithTimeField[]} dates
 * @return {string}
 */
export const getEventTime = (dates: DateWithTimeField[] = []): string => {
  // Validations
  if (dates.length === 0) return "";

  // Today
  const today = new Date().toISOString().substring(0, 10);
  const upcomingDate =
    dates
      ?.filter((date) => !!date?.date)
      .find((date) => (date.date as string) > today) || dates[0];

  if (upcomingDate) {
    const startTime = upcomingDate?.time;

    if (startTime) {
      return `${formatTime(startTime, "h:mm a")}`;
    }
  }

  return "";
};

/**
 * Process date timezone to remove settings content from sanity
 *
 * @param {EventDate} date
 * @return {string}
 */
export const processEventDateTimezone = (
  date: DateWithTimeField,
  hideUtc?: boolean
): string => {
  if (date.timezone) {
    let timeZone = dsTimezoneProcessor(date.timezone, hideUtc ? true : false);

    // if (date?.isDaylightSaving) {
    //   timeZone = DAYLIGHT_SAVING_TIMEZONES[timeZone] || timeZone;
    // }

    return timeZone;
  }

  return date.timezone || "";
};

/**
 * DsTimezone string processor
 * DsTimezone field includes a settings section inside the string
 * Region (UTC-offset) [Country|TimezoneId]
 *
 * This function removes the country and timezoneId from the string
 * and map offset to there respective timezones
 *
 * @param timezone string
 * @returns
 */
export function dsTimezoneProcessor(timezone: string, utc?: boolean): string {
  if (utc) {
    const offsetMatch = timezone.match(/(-\d{2})/);
    if (offsetMatch && offsetMatch[1] === "-03") {
      return "BRT";
    } else {
      return timezone.replace(/(\ )?(\[|\()(.*?)(\]|\))/g, "");
    }
  } else {
    return timezone.replace(/(\ )?\[(.*?)\]/, "");
  }
}
