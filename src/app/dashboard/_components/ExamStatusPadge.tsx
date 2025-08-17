import { ExamStatus } from "@prisma/client";
import { FaFlagCheckered, FaRunning } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

export default function ExamStatusPadge({ status }: { status: ExamStatus }) {
  const statusClasses =
    status == "SCHEDULED"
      ? "text-amber-400 bg-glass-orange"
      : status == "CANCELLED"
      ? "text-red-500 bg-glass-red"
      : status == "ENDED"
      ? "text-main-text bg-glass-green"
      : status == "ONGOING" && "text-blue-300 bg-glass-blue";
  return (
    <p
      className={`px-4 flex items-center gap-1.5 capitalize py-1 text-xs font-medium rounded-sm w-fit ${statusClasses}`}>
      {status == "SCHEDULED" && <GiSandsOfTime className="w-4 h-4" />}
      {status == "ENDED" && <FaFlagCheckered className="w-4 h-4" />}
      {status == "CANCELLED" && <MdCancel className="w-4 h-4" />}
      {status == "ONGOING" && <FaRunning className="w-4 h-4" />}

      {status.toLowerCase()}
    </p>
  );
}
