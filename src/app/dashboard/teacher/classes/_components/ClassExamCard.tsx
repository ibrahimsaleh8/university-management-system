import { timeConverter } from "@/lib/TimeConverter";
import {
  AlarmClock,
  ClockArrowDown,
  ClockArrowUp,
  Eye,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { PiShieldCheckFill } from "react-icons/pi";
import { ClassExamDataType } from "./ShowClassExams";
import ExamStatusPadge from "@/app/dashboard/_components/ExamStatusPadge";
export default function ClassExamCard({
  duration,
  startDate,
  endDate,
  status,
  title,
  totalMark,
  clasName,
  id,
  autoMark,
}: ClassExamDataType & { clasName: string }) {
  return (
    <div className="black-box-shadow w-full flex flex-col gap-5 bg-Second-black rounded-md p-5 text-white">
      {/* Exam Header */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div className="flex gap-2 items-center flex-wrap">
          <ExamStatusPadge status={status} />
          {autoMark && (
            <p className="text-xs px-3 py-1 bg-glass-yellow text-yellow-300 rounded-sm">
              Auto-Mark
            </p>
          )}
        </div>
        {/* Times  */}
        <div className="flex items-center gap-5 md:text-sm text-xs flex-wrap">
          <p className="flex items-center gap-1">
            <ClockArrowUp className="w-4 h-4 text-main-text" /> Starting On:
            <span className="text-low-white">{timeConverter(startDate)}</span>
          </p>
          <p className="flex items-center gap-1">
            <ClockArrowDown className="w-4 h-4 text-red-500" />
            Ending On:{" "}
            <span className="text-low-white">{timeConverter(endDate)}</span>
          </p>
        </div>
      </div>

      {/* Title */}
      <p className="capitalize text-lg font-medium">{title}</p>

      {/* Bottom */}
      <div className="flex items-center gap-3 justify-between mt-auto flex-wrap">
        {/* Left */}
        <div className="flex items-center gap-3 text-sm flex-wrap">
          <p className="flex items-center gap-1 text-low-white">
            <PiShieldCheckFill className="w-4 h-4 " />
            {totalMark} Marks
          </p>
          <p className="flex items-center gap-1 text-low-white">
            <AlarmClock className="w-4 h-4 " />
            {duration} Minutes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/teacher/classes/${clasName}/show-exam/${id}/submissions`}
            className="flex items-center gap-2 bg-transparent hover:bg-amber-400 hover:text-black duration-300 border border-amber-400 px-2 py-2 rounded-sm text-amber-400 font-medium text-sm">
            <UserCheck className="w-4 h-4" />
            Submissions
          </Link>
          <Link
            className="flex items-center gap-2 bg-transparent border hover:bg-white hover:text-black duration-300 border-low-white px-2 py-2 rounded-sm text-white font-medium text-sm"
            href={`/dashboard/teacher/classes/${clasName}/show-exam/${id}`}>
            <Eye className="w-4 h-4" />
            Show
          </Link>
        </div>
      </div>
    </div>
  );
}
