export function isSatSun(day) {
  const dayString = day.format("dddd");
  return dayString === "Saturday" || dayString === "Sunday";
}
export function formatIsoToMonthDay(isoDate) {
  const date = new Date(isoDate);
  const options = { month: "long", day: "numeric" };
  const formatted = date.toLocaleString("en-US", options);
  return formatted;
}
