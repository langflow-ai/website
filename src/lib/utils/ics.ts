// ICS file generation utility

/**
 * Extract IANA timezone ID from Sanity timezone string
 * Format: "Region (UTC-offset) [Country|TimezoneId]" or "EST (UTC-05)" or "America/New_York"
 * Returns the TimezoneId if found, otherwise null
 */
function extractTimezoneId(timezone: string): string | null {
  if (!timezone) return null;

  // Try to extract timezone ID from brackets: [Country|TimezoneId]
  const bracketMatch = timezone.match(/\[([^\]]+)\]/);
  if (bracketMatch) {
    const content = bracketMatch[1];
    // If it contains a pipe, take the part after the pipe (TimezoneId)
    const parts = content.split("|");
    if (parts.length > 1) {
      return parts[parts.length - 1].trim();
    }
    return content.trim();
  }

  // Check if it's already an IANA timezone (contains /)
  if (timezone.includes("/")) {
    return timezone.trim();
  }

  // Map common timezone abbreviations to IANA timezone IDs
  const timezoneMap: Record<string, string> = {
    "EST": "America/New_York",
    "EDT": "America/New_York",
    "CST": "America/Chicago",
    "CDT": "America/Chicago",
    "MST": "America/Denver",
    "MDT": "America/Denver",
    "PST": "America/Los_Angeles",
    "PDT": "America/Los_Angeles",
    "GMT": "Europe/London",
    "UTC": "UTC",
    "CET": "Europe/Paris",
    "CEST": "Europe/Paris",
  };

  // Extract timezone abbreviation (like "EST" from "EST (UTC-05)")
  const abbrevMatch = timezone.match(/^([A-Z]{3,4})/);
  if (abbrevMatch) {
    const abbrev = abbrevMatch[1];
    if (timezoneMap[abbrev]) {
      return timezoneMap[abbrev];
    }
  }

  return null;
}

/**
 * Format a date to ICS format in UTC (YYYYMMDDTHHmmssZ)
 * Used for DTSTAMP which should always be in UTC
 */
function formatICSDateUTC(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

/**
 * Format a date to ICS format as floating time (YYYYMMDDTHHmmss)
 * Floating time has no timezone indicator, so calendar apps interpret it
 * in the user's local timezone. This is appropriate for event times.
 */
function formatICSDateFloating(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Format a date to ICS format with timezone (TZID format)
 * Format: TZID=TimezoneId:YYYYMMDDTHHmmss
 * If dateString and timeString are provided, uses them directly (assumes they're in the timezone)
 * Otherwise, uses the Date object (which may be in local timezone)
 */
function formatICSDateWithTimezone(
  date: Date,
  timezoneId: string,
  dateString?: string,
  timeString?: string
): string {
  let year: string, month: string, day: string, hours: string, minutes: string, seconds: string;

  if (dateString && timeString) {
    // Use the raw date/time strings directly (they're already in the correct timezone)
    const dateParts = dateString.split("-");
    year = dateParts[0];
    month = dateParts[1];
    day = dateParts[2];
    
    const timeParts = timeString.split(":");
    hours = timeParts[0].padStart(2, "0");
    minutes = (timeParts[1] || "00").padStart(2, "0");
    seconds = "00";
  } else {
    // Fallback to Date object (may not be accurate if timezone differs)
    year = String(date.getFullYear());
    month = String(date.getMonth() + 1).padStart(2, "0");
    day = String(date.getDate()).padStart(2, "0");
    hours = String(date.getHours()).padStart(2, "0");
    minutes = String(date.getMinutes()).padStart(2, "0");
    seconds = String(date.getSeconds()).padStart(2, "0");
  }

  return `TZID=${timezoneId}:${year}${month}${day}T${hours}${minutes}${seconds}`;
}

/**
 * Escape text for ICS format
 */
function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export interface ICSEventData {
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  url?: string;
  timezone?: string;
  // Optional raw date/time strings for timezone-aware formatting
  startDateString?: string;
  startTimeString?: string;
  endDateString?: string;
  endTimeString?: string;
}

/**
 * Generate ICS file content
 */
export function generateICS(data: ICSEventData): string {
  const {
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
  } = data;

  // Extract timezone ID if available
  const timezoneId = timezone ? extractTimezoneId(timezone) : null;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Langflow//Langflow Website//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  lines.push("BEGIN:VEVENT");
  lines.push(`UID:${Date.now()}-${Math.random().toString(36).substring(2, 9)}@langflow.org`);
  lines.push(`DTSTAMP:${formatICSDateUTC(new Date())}`);

  // Use timezone-aware format if timezone is available, otherwise use floating time
  if (timezoneId) {
    lines.push(
      `DTSTART;${formatICSDateWithTimezone(startDate, timezoneId, startDateString, startTimeString)}`
    );
    lines.push(
      `DTEND;${formatICSDateWithTimezone(endDate, timezoneId, endDateString, endTimeString)}`
    );
  } else {
    lines.push(`DTSTART:${formatICSDateFloating(startDate)}`);
    lines.push(`DTEND:${formatICSDateFloating(endDate)}`);
  }

  lines.push(`SUMMARY:${escapeICS(title)}`);

  if (description) {
    lines.push(`DESCRIPTION:${escapeICS(description)}`);
  }

  if (location) {
    lines.push(`LOCATION:${escapeICS(location)}`);
  }

  if (url) {
    lines.push(`URL:${url}`);
  }

  // Add 24-hour reminder
  lines.push(
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Reminder: ${escapeICS(title)}`,
    "END:VALARM"
  );

  lines.push("END:VEVENT", "END:VCALENDAR");

  return lines.join("\r\n");
}

/**
 * Download ICS file
 */
export function downloadICS(data: ICSEventData, filename: string = "event.ics"): void {
  const icsContent = generateICS(data);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

