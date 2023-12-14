import moment from "moment-timezone";

export const getFormattedTime = (date: string): string => {
  const userTimeZone = moment.tz.guess();
  const currentDate = moment();
  const pastDate = moment.utc(date);
  pastDate.tz(userTimeZone);

  const duration = moment.duration(currentDate.diff(pastDate));

  const seconds = duration.asSeconds();
  const minutes = duration.asMinutes();
  const hours = duration.asHours();
  const days = duration.asDays();
  const weeks = duration.asWeeks();
  const months = duration.asMonths();
  const years = duration.asYears();

  const formattedTime = (value: number, unit: string) =>
    `${Math.floor(value)} ${unit}${value !== 1 ? "s" : ""} ago`;

  if (seconds < 60) {
    return formattedTime(seconds, "second");
  } else if (minutes < 60) {
    return formattedTime(minutes, "minute");
  } else if (hours < 24) {
    return formattedTime(hours, "hour");
  } else if (days < 7) {
    return formattedTime(days, "day");
  } else if (weeks < 4) {
    return formattedTime(weeks, "week");
  } else if (months < 12) {
    return formattedTime(months, "month");
  } else {
    return formattedTime(years, "year");
  }
};
