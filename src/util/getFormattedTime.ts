import moment from "moment";

export const getFormattedTime = (date: string) => {
  const currentDate = moment();
  const pastDate = moment(date);

  const duration = moment.duration(currentDate.diff(pastDate));

  const seconds = duration.asSeconds();
  const minutes = duration.asMinutes();
  const hours = duration.asHours();
  const days = duration.asDays();
  const weeks = duration.asWeeks();
  const months = duration.asMonths();
  const years = duration.asYears();

  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  } else if (days < 7) {
    return `${Math.floor(days)} days ago`;
  } else if (weeks < 4) {
    return `${Math.floor(weeks)} weeks ago`;
  } else if (months < 12) {
    return `${Math.floor(months)} months ago`;
  } else {
    return `${Math.floor(years)} years ago`;
  }
};
