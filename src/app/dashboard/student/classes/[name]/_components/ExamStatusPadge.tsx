import { ExamStatusType } from "@/lib/globalTypes";

export default function ExamStatusPadge({
  status,
}: {
  status: ExamStatusType;
}) {
  const statusClass =
    status == "CANCELLED"
      ? "bg-glass-red text-red-500"
      : status == "ENDED"
      ? "bg-glass-green text-green-500"
      : status == "GRADED"
      ? "text-main-text bg-glass-main-text"
      : status == "ONGOING"
      ? "bg-glass-orange text-yellow-300"
      : "bg-glass-blue text-blue-300";
  return (
    <p
      className={`capitalize font-medium text-xs py-1.5 px-2 w-fit rounded-sm ${statusClass}`}>
      {status.toLocaleLowerCase()}
    </p>
  );
}
