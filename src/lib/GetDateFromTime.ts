export function GetDateFromTime(time: Date | string) {
  const days = new Date(time).getDate();
  const months = new Date(time).getMonth() + 1;

  const timeConverted = `${days < 10 ? "0" + days : days}/${
    months < 10 ? "0" + months : months
  }/${new Date(time).getFullYear()}`;
  return timeConverted;
}
