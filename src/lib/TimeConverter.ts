export function timeConverter(time: Date | string) {
  const date = new Date(time);

  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", {
    month: "long",
  });
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${
    day < 10 ? "0" + day : day
  } ${monthName} ${year} - ${hours}:${minutes}`;
}
