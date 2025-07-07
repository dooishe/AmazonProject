export function isSatSun(day) {
  const dayString = day.format("dddd");
  return dayString === "Saturday" || dayString === "Sunday";
}
