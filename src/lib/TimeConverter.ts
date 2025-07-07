export function timeConverter(time: Date | string) {
  const days = new Date(time).getDate();
  const months = new Date(time).getMonth() + 1;

  const ann_created_at = `${days < 10 ? "0" + days : days}/${
    months < 10 ? "0" + months : months
  }/${new Date(time).getFullYear()} - ${new Date(time).toLocaleTimeString()}`;
  return ann_created_at;
}
