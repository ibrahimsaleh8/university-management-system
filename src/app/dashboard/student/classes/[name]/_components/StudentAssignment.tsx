import { AlarmClock, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetDateFromTime } from "@/lib/GetDateFromTime";
import { StudentAssignmentResponse } from "./ShowStudentAssignments";
type Props = {
  assignmentData: StudentAssignmentResponse;
};
export default function StudentAssignment({ assignmentData }: Props) {
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
        {assignmentData.isSubmited ? (
          <></>
        ) : (
          !assignmentData.isFinished && (
            <Button variant={"mainWithShadow"}>Submit</Button>
          )
        )}
      </div>
    </div>
  );
}
