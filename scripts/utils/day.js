import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export function isSatSun(day) {
  const dayString = day.format("dddd");
  return dayString === "Saturday" || dayString === "Sunday";
}
export function countDaysBetween(startDate, endDate) {
  return dayjs(endDate)
    .startOf("day")
    .diff(dayjs(startDate).startOf("day"), "day");
}
