"use client";
import { timeConverter } from "@/lib/TimeConverter";
import {
  CalendarPlus,
  Check,
  ClipboardList,
  SquareArrowOutUpRight,
  TimerOff,
} from "lucide-react";
import AssignmentModel from "./AssignmentModel";
import { ClassAssignmentsDataType } from "./ClassAssignments";
import Link from "next/link";
import OperationsDropdown from "@/app/dashboard/_components/OperationsDropdown";

export default function AssignmentCard({
  data,
  token,
  className,
}: {
  data: ClassAssignmentsDataType;
  token: string;
  className: string;
}) {
  const created_at = timeConverter(data.created_at);
  const deadline = timeConverter(data.deadline);
  return (
    <div className="w-full p-4 black-box-shadow bg-Second-black rounded-md flex flex-col gap-4">
      {/* Header */}
      <div className="w-full flex items-center gap-3 justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-main-text" />
          <p
            title="adadasdsad"
            className="font-bold capitalize line-clamp-1 text-xl">
            {data.title}
          </p>
        </div>
        <Link
          href={`/dashboard/teacher/classes/${className}/assignment-submissons/${data.id}`}
          className="bg-amber-400 border border-amber-400 hover:bg-transparent hover:text-amber-400 duration-300 text-black font-medium px-4 py-1.5 rounded-sm cursor-pointer">
          <p className="flex items-center gap-1 text-xs">
            <Check className="w-4 h-4" />
            Submissions: {data.submissions}
          </p>
        </Link>
      </div>
      {/* Times */}
      <div className="flex items-center gap-4 flex-wrap">
        <p className="text-xs text-low-white flex items-center gap-1">
          <CalendarPlus className="w-4 h-4" />
          Posted: {created_at}
        </p>
        <p className="text-xs text-orange-500 flex items-center gap-1 font-medium">
          <TimerOff className="w-4 h-4" />
          Deadline: {deadline}
        </p>
      </div>

      {/* Description */}
      <div className="text-base capitalize">
        <p>{data.description} </p>
      </div>

      {/* Bottom */}
      <div className="flex items-end gap-3 justify-between flex-wrap">
        {data.external_url && (
          <div className="flex flex-col gap-1 mt-3">
            <Link
              className="px-4 py-1 hover:opacity-75 duration-300 w-fit gap-2 rounded-md bg-main-text text-black font-medium text-sm h-8 flex items-center justify-center"
              href={`${data.external_url}`}
              target="_blank">
              <SquareArrowOutUpRight className="w-4 h-4" /> Assignment Link
            </Link>
          </div>
        )}

        <div className="ml-auto flex items-center gap-3">
          <OperationsDropdown
            components={[
              <AssignmentModel
                token={token}
                type="edit"
                className={className}
                assignmentData={{
                  deadline: data.deadline,
                  description: data.description,
                  title: data.title,
                  external_url: data.external_url ?? undefined,
                  id: data.id,
                }}
                key={1}
              />,
              <AssignmentModel
                token={token}
                type="delete"
                className={className}
                assignmentId={data.id}
                key={1}
              />,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
