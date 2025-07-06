export function timeConverter(time: Date | string) {
  const ann_created_at = `${new Date(time).getDate()}/${
    new Date(time).getMonth() + 1
  }/${new Date(time).getFullYear()} - ${new Date(time).toLocaleTimeString()}`;
  return ann_created_at;
}
