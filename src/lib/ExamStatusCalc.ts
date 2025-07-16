import { ExamStatusType } from "./globalTypes";

export const ExamStatusCalc = (
  startTime: Date | string,
  endTime: Date | string,
  status: ExamStatusType
): ExamStatusType => {
  const now = new Date().getTime();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if (status === "CANCELLED") return "CANCELLED";

  if (now < start) {
    return "SCHEDULED";
  } else if (now >= start && now <= end) {
    return "ONGOING";
  } else {
    return "ENDED";
  }
};
