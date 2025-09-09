import ExamStatusPadge from "./ExamStatusPadge";
import { timeConverter } from "@/lib/TimeConverter";
import { ClockArrowDown, ClockArrowUp, Star, Timer } from "lucide-react";
import ExamSmallParagraph from "./ExamSmallParagraph";
import { StudentExamResponse } from "./ShowStudentsExam";
import CountDownTime from "./CountDownTime";
import Link from "next/link";
type Props = {
  examData: StudentExamResponse;
  className: string;
};

export default function StudentExamCard({ examData, className }: Props) {
  return (
    <div className="w-full black-box-shadow !overflow-hidden border border-soft-border bg-main-dark rounded-md flex flex-col gap-2">
      <div className="flex flex-col gap-4 p-4">
        {/* Top */}
        <div className="flex items-center gap-2 justify-between flex-wrap">
          <ExamStatusPadge status={examData.status} />
          {examData.status == "SCHEDULED" && (
            <CountDownTime targetDate={examData.endDate.toString()} />
          )}
        </div>

        {/* Title */}
        <p className="text-main-text font-bold text-lg">{examData.title}</p>

        {/* Small Info */}
        <div className="flex flex-col gap-4">
          <ExamSmallParagraph
            icon={<ClockArrowUp className="w-4 h-4" />}
            title={"Starting on : " + timeConverter(examData.startDate)}
          />
          <ExamSmallParagraph
            icon={<ClockArrowDown className="w-4 h-4" />}
            title={"Ending on : " + timeConverter(examData.endDate)}
          />
          <ExamSmallParagraph
            icon={<Timer className="w-4 h-4" />}
            title={`Duration : ${examData.duration} Minutes`}
          />
          <ExamSmallParagraph
            icon={<Star className="w-4 h-4" />}
            title={`Total Marks : ${examData.totalMark} Degrees`}
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto bg-Second-black font-medium p-4 border-t border-soft-border">
        {examData.status == "ONGOING" && !examData.isSubmitted && (
          <Link
            className="flex bg-transparent w-full border border-main-text rounded-md p-2 items-center justify-center text-main-text hover:bg-main-text hover:text-black duration-300 "
            href={`/dashboard/student/classes/${className}/show-exam/${examData.id}`}>
            Enter to exam
          </Link>
        )}

        {["ONGOING", "GRADED", "ENDED"].includes(examData.status) &&
        examData.isSubmitted &&
        examData.studentScore &&
        examData.autoMark ? (
          <p className="flex w-full items-center justify-center text-main-text">
            Score: {examData.studentScore} / {examData.totalMark}
          </p>
        ) : (
          !examData.autoMark &&
          examData.isMarked && (
            <p className="flex w-full items-center justify-center text-main-text">
              Score: {examData.studentScore} / {examData.totalMark}
            </p>
          )
        )}
        {examData.status == "SCHEDULED" && (
          <p className="capitalize text-low-white text-sm flex items-center justify-center p-2 border rounded-md border-low-white">
            Not Started yet
          </p>
        )}
        {examData.status == "CANCELLED" && (
          <p className="text-red-500 text-sm flex items-center justify-center">
            Exam was Cancelled
          </p>
        )}
        {examData.status == "ENDED" && (
          <p className="text-sm flex items-center justify-center text-green-500">
            Awating Grade
          </p>
        )}
        {examData.status == "ONGOING" &&
          examData.isSubmitted &&
          !examData.autoMark &&
          !examData.isMarked && (
            <p className="text-sm flex items-center justify-center text-main-text">
              Submitted Awaiting Grade
            </p>
          )}
      </div>
    </div>
  );
}
