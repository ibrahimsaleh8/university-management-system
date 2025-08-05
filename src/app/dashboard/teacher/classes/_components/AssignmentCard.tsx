"use client";
import { timeConverter } from "@/lib/TimeConverter";
import { Check, ClipboardList, SquareArrowOutUpRight } from "lucide-react";
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
  const time = timeConverter(data.created_at);
  return (
    <div className="w-full p-4 black-box-shadow bg-Second-black rounded-md flex flex-col gap-4">
      {/* Header */}
      <div className="w-full flex items-center gap-3 justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-main-text" />
          <p title="adadasdsad" className="font-bold capitalize line-clamp-1">
            {data.title}
          </p>
        </div>
        <p className="text-xs text-low-white">{time}</p>
      </div>
      {/* Description */}
      <div className="text-sm">
        <p>{data.description} </p>
      </div>
      {/* Link */}
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
          <div className="bg-soft-border px-4 py-1.5 rounded-md cursor-pointer">
            <p className="flex items-center gap-1 text-xs">
              <Check className="w-4 h-4" />
              Submissions: {data.submissions}
            </p>
          </div>
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
