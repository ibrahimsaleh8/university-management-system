import { timeConverter } from "@/lib/TimeConverter";
import {
  AlarmClock,
  ClockArrowDown,
  ClockArrowUp,
  MoveRight,
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
  students,
  title,
  totalMark,
  clasName,
  id,
}: ClassExamDataType & { clasName: string }) {
  return (
    <div className="black-box-shadow w-full flex flex-col gap-5 bg-Second-black rounded-2xl p-5 text-white">
      {/* Exam Header */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <ExamStatusPadge status={status} />
        {/* Times  */}
        <div className="flex items-center gap-5 md:text-sm text-xs flex-wrap">
          <p className="flex items-center gap-1">
            <ClockArrowUp className="w-5 h-5 text-main-text" /> Starting On:
            <span className="text-low-white">{timeConverter(startDate)}</span>
          </p>
          <p className="flex items-center gap-1">
            <ClockArrowDown className="w-5 h-5 text-red-500" />
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
        <div className="flex items-center gap-3 text-sm">
          <p className="flex items-center gap-1">
            <PiShieldCheckFill className="w-5 h-5 text-main-text" />
            Mark : {totalMark}
          </p>
          <p className="flex items-center gap-1">
            <AlarmClock className="w-5 h-5 text-low-white" />
            Duration : {duration} Minutes
          </p>
          <p className="flex items-center gap-1">
            <UserCheck className="w-5 h-5 text-amber-400" />
            Submissions : {students}
          </p>
        </div>

        <div>
          <Link
            className="flex items-center gap-2 bg-white px-3 py-1 rounded-md text-black font-medium text-sm"
            href={`/dashboard/teacher/classes/${clasName}/show-exam/${id}`}>
            Show Exam
            <MoveRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
