import { AssignmentSubmissionStatus } from "@/lib/globalTypes";
import { Check, CheckCheck } from "lucide-react";

type Props = {
  status: AssignmentSubmissionStatus;
};
export default function AssignmentStatusPadge({ status }: Props) {
  const statusClasses =
    status == "SUBMITTED"
      ? "bg-glass-main-text text-main-text"
      : "bg-low-white text-black";

  return (
    <p
      className={`capitalize text-sm p-2 flex items-center gap-1 rounded-sm font-medium ${statusClasses}`}>
      {status == "SUBMITTED" ? (
        <Check className="w-4 h-4" />
      ) : (
        <CheckCheck className="w-4 h-4" />
      )}

      {status.toLowerCase()}
    </p>
  );
}
