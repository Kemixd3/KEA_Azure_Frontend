export default function formatBirthDate(date, displayYearOnly = false) {
  if (displayYearOnly) {
    const options = { year: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  } else {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }
}
