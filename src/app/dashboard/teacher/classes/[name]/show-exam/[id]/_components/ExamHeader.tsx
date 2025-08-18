import ExamStatusPadge from "@/app/dashboard/_components/ExamStatusPadge";
import { ExamStatusType } from "@/lib/globalTypes";
import { timeConverter } from "@/lib/TimeConverter";
import { BookOpenText, CalendarDays } from "lucide-react";
import Image from "next/image";
import React from "react";
import { SiGoogleclassroom } from "react-icons/si";
type Props = {
  className: string;
  course: string;
  teacherName: string;
  teacherImage: string;
  create_at: string;
  status: ExamStatusType;
};
export default function ExamHeader({
  className,
  course,
  create_at,
  teacherImage,
  teacherName,
  status,
}: Props) {
  return (
    <div className="flex items-center flex-wrap flex-col border-b pb-3 border-soft-border sm:flex-row gap-3 justify-between">
      {/* Left */}
      <div className="flex flex-col gap-3 w-full sm:w-fit">
        <ExamStatusPadge status={status} />
        <p className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1">
            <SiGoogleclassroom className="w-4 h-4 text-low-white" />
            Class:
          </span>
          <span className="capitalize font-medium">{className}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1">
            <BookOpenText className="w-4 h-4 text-low-white" />
            Course:
          </span>
          <span className="capitalize font-medium">{course}</span>
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-4 w-full sm:w-fit">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full object-cover object-center"
            src={teacherImage}
            alt="Teacher Image"
            width={30}
            height={30}
          />
          <p className="capitalize">{teacherName} </p>
        </div>

        <p className="flex items-center gap-2">
          <span className="font-bold flex items-center gap-1">
            <CalendarDays className="w-4 h-4 text-low-white" />
            Created At:
          </span>
          <span className="text-sm">{timeConverter(create_at)}</span>
        </p>
      </div>
    </div>
  );
}
