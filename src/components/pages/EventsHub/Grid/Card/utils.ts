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
  dates: DateWithTimeField[] = []
): string | null => {
  // Validations
  if (dates.length === 0) return null;

  // Variables
  const { [0]: start, [dates.length - 1]: end } = dates;
  const startDate = formatDate(start.date as string, "MMM d");
  const endDate = formatDate(end.date as string, "MMM d");
  const startMonth = startDate?.replace(/\ [0-9]+/g, "");
  const endMonth = endDate?.replace(/\ [0-9]+/g, "");

  console.log(start, end);

  if (dates.length === 1) {
    const _date = formatDate(start.date as string, "MMMM dd, yyyy");
    const _time = !!start?.time ? `${formatTime(start.time, "h:mm a")}` : null;

    return [_date, _time].filter(Boolean).join(" • ");
  }

  if (startMonth === endMonth) {
    return `${startDate} - ${endDate?.replace(/\D+/, "")}`;
  }
  if (startMonth !== endMonth) {
    return `${startDate} - ${endDate}`;
  }

  return null;
};
