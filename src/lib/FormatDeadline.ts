export function formatDeadline(deadline: string | Date) {
  const dateObj = typeof deadline === "string" ? new Date(deadline) : deadline;
  if (isNaN(dateObj.getTime())) return ""; // fallback for invalid date
  return dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
}
