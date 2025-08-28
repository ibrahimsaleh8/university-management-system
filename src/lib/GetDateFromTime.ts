export function GetDateFromTime(time: Date | string) {
  const date = new Date(time);

  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", {
    month: "long",
  });
  const year = date.getFullYear();

  return `${monthName} ${day < 10 ? "0" + day : day}, ${year}`;
}
