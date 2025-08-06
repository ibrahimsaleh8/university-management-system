import ExamStatusPadge from "./ExamStatusPadge";
import { timeConverter } from "@/lib/TimeConverter";
import { ClockArrowDown, ClockArrowUp, Star, Timer } from "lucide-react";
import ExamSmallParagraph from "./ExamSmallParagraph";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { StudentExamResponse } from "./ShowStudentsExam";
import CountDownTime from "./CountDownTime";
type Props = {
  examData: StudentExamResponse;
};
export default function StudentExamCard({ examData }: Props) {
  return (
    <div className="w-full max-w-[27rem] black-box-shadow !overflow-hidden border border-soft-border bg-card-bg rounded-2xl flex flex-col gap-2">
      <div className="flex flex-col gap-4 p-3">
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
      <div className="mt-auto bg-[#181C22] font-medium p-4 border-t border-soft-border">
        {examData.status == "ONGOING" && (
          <Button className="w-full" variant={"mainWithShadow"}>
            Join Exam
            <FaLongArrowAltRight className="w-4 h-4" />
          </Button>
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

        {examData.status == "GRADED" && (
          <Button className="text-main-text bg-transparent border border-main-text w-full hover:bg-main-text hover:text-black duration-300">
            View Results
          </Button>
        )}
      </div>
    </div>
  );
}
