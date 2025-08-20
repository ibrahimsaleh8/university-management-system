import { AlarmClock, SquareArrowOutUpRight, TriangleAlert } from "lucide-react";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { StudentAssignmentResponse } from "./ShowStudentAssignments";
import SubmitAssignmentSubmisson from "./SubmitAssignmentSubmisson";
import { timeConverter } from "@/lib/TimeConverter";
import AssignmentStatusPadge from "@/app/dashboard/teacher/classes/[name]/assignment-submissons/[id]/_components/AssignmentStatusPadge";
type Props = {
  assignmentData: StudentAssignmentResponse;
  token: string;
  className: string;
};
export default function StudentAssignment({
  assignmentData,
  token,
  className,
}: Props) {
  return (
    <div className="sm:w-[45rem] w-full black-box-shadow max-w-full p-4 border border-soft-border bg-card-bg rounded-2xl flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2 justify-between flex-wrap">
        <p className="text-lg font-bold capitalize">{assignmentData.title}</p>
        <p className="text-xs">{GetDateFromTime(assignmentData.created_at)}</p>
      </div>
      {/* Body */}
      <div className="flex flex-col gap-3 capitalize">
        <p>{assignmentData.description} </p>
        {assignmentData.external_url && (
          <a
            className="px-4 py-1 flex items-center gap-1 text-sm bg-amber-300 hover:bg-amber-400 duration-300 text-black w-fit rounded-sm"
            href={assignmentData.external_url}
            target="_blank">
            External Link <SquareArrowOutUpRight className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Bottom */}
      <div className="flex items-center gap-2 mt-auto justify-between flex-wrap">
        <p className="text-sm text-red-500 bg-[#45141459] px-3 flex items-center gap-1 py-1 rounded-sm">
          <AlarmClock className="w-4 h-4" />
          Deadline: {GetDateFromTime(assignmentData.deadline)}
        </p>
        {assignmentData.isSubmited && assignmentData.submissionDetails ? (
          <div className="flex items-center gap-1 flex-col">
            <div className="flex items-center gap-2">
              <AssignmentStatusPadge
                status={assignmentData.submissionDetails.status}
              />
              {assignmentData.submissionDetails.status == "GRADED" ? (
                <p className="capitalize text-sm px-4 py-1 rounded-sm font-medium bg-glass-green text-main-text">
                  Grade: {assignmentData.submissionDetails.grade ?? 0} / 100
                </p>
              ) : (
                <p className="capitalize text-xs px-4 py-1.5 rounded-sm font-medium bg-glass-orange text-orange-400">
                  wating grade
                </p>
              )}
            </div>
            <p className="text-xs text-low-white">
              Submited At:
              {timeConverter(assignmentData.submissionDetails.submited_at)}
            </p>
          </div>
        ) : (
          !assignmentData.isFinished && (
            <SubmitAssignmentSubmisson
              className={className}
              assignmentId={assignmentData.id}
              token={token}
            />
          )
        )}
        {assignmentData.isFinished && !assignmentData.isSubmited && (
          <p className="text-sm text-red-500 flex items-center gap-1">
            <TriangleAlert className="w-4 h-4" />
            You missed the deadline and did not submit the assignment.
          </p>
        )}
      </div>
    </div>
  );
}
