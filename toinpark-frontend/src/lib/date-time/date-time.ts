/*

 - UTC Date and Time Utility Functions
 - convert utc time to local
 - convert local time to UTC

*/

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import type { TNullish } from "@/store/api/common-api-types";

dayjs.extend(utc);
dayjs.extend(timezone);
// get date with current time
function getDateWithCurrentTime(selectedDate: Date | TNullish): Date {
  if (!selectedDate) {
    throw new Error("selectedDate is required.");
  }
  const now = dayjs();
  return dayjs(selectedDate)
    .hour(now.hour())
    .minute(now.minute())
    .second(now.second())
    .millisecond(now.millisecond())
    .toDate();
}
// get timezone

function getUserTimeZone() {
  if (typeof Intl !== "object" || !Intl.DateTimeFormat) {
    throw new Error("Intl.DateTimeFormat is not supported in this environment");
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!timeZone) {
    throw new Error("Could not resolve the user's time zone");
  }

  return timeZone;
}

// convert utc time to local

export type TConvertUTCToLocalArgs = {
  utcDateTime?: string | TNullish;
  timeZone?: string;
  format?: string;
};

function convertUTCToLocal({
  utcDateTime,
  timeZone,
  format = "MMMM D, YYYY",
}: TConvertUTCToLocalArgs): string {
  if (!utcDateTime) {
    return "";
  }
  const tz = timeZone ?? getUserTimeZone();
  return dayjs.utc(utcDateTime).tz(tz).format(format);
}

function formatUTCToDateTime({
  utcDateTime,
  timeZone,
}: {
  utcDateTime?: string | TNullish;
  timeZone?: string;
}): string {
  if (!utcDateTime) {
    return "";
  }
  const tz = timeZone ?? getUserTimeZone();
  return dayjs.utc(utcDateTime).tz(tz).format("HH:mm MMMM D, YYYY");
}

export type TConvertLocalToUTCArgs = {
  localDateTime?: Date;
  timeZone?: string;
  format?: string;
  type?: "endOfDay" | "withCurrentTime" | "startOfDay";
};

// convert local time to UTC
function convertLocalToUTC({
  localDateTime,
  timeZone,
  format,
  type,
}: TConvertLocalToUTCArgs): string {
  if (!localDateTime) {
    return "";
  }
  const tz = timeZone ?? getUserTimeZone();

  if (type === "withCurrentTime") {
    const getDateTime = getDateWithCurrentTime(localDateTime);
    return dayjs.tz(getDateTime, tz).utc().toISOString();
  }

  if (type === "endOfDay") {
    return dayjs.tz(localDateTime, tz).endOf("day").utc().toISOString();
  }
  if (type === "startOfDay") {
    return dayjs.tz(localDateTime, tz).startOf("day").utc().toISOString();
  }

  if (format && format !== "") {
    return dayjs.tz(localDateTime, tz).utc().format(format);
  }
  return dayjs.tz(localDateTime, tz).utc().toISOString();
}

// convert utc string to local date

function convertUTCToLocalDate({
  utcDateTime,
}: {
  utcDateTime?: string;
}): Date | undefined {
  return dayjs(convertUTCToLocal({ utcDateTime })).toDate();
}

export {
  getUserTimeZone,
  convertLocalToUTC,
  convertUTCToLocal,
  convertUTCToLocalDate,
  formatUTCToDateTime,
};
