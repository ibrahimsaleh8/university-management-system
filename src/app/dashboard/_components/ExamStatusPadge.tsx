import { ExamStatus } from "@prisma/client";
import { FaFlagCheckered, FaRunning } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

export default function ExamStatusPadge({ status }: { status: ExamStatus }) {
  const statusClasses =
    status == "SCHEDULED"
      ? "text-black bg-amber-400"
      : status == "CANCELLED"
      ? "text-white bg-red-500"
      : status == "ENDED"
      ? "text-white bg-green-700"
      : status == "ONGOING" && "text-black bg-low-white";
  return (
    <p
      className={`px-4 flex items-center gap-1 capitalize py-1 text-sm font-medium rounded-md w-fit ${statusClasses}`}>
      {status == "SCHEDULED" && <GiSandsOfTime className="w-5 h-5" />}
      {status == "ENDED" && <FaFlagCheckered className="w-5 h-5" />}
      {status == "CANCELLED" && <MdCancel className="w-5 h-5" />}
      {status == "ONGOING" && <FaRunning className="w-5 h-5" />}

      {status.toLowerCase()}
    </p>
  );
}
