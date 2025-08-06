import { MainDomain } from "@/variables/MainDomain";
import axios from "axios";
import ExamStatusPadge from "./ExamStatusPadge";
import { timeConverter } from "@/lib/TimeConverter";
import { ClockArrowDown, ClockArrowUp, Star, Timer } from "lucide-react";
import ExamSmallParagraph from "./ExamSmallParagraph";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltRight } from "react-icons/fa";

type Props = {
  name: string;
  token: string;
};
export type StudentExamResponse = {
  id: string;
  title: string;
  duration: number;
  created_at: Date;
  endDate: Date;
  totalMark: number;
  startDate: Date;
  status: string;
  questions: number;
};

async function getExams(
  className: string,
  token: string
): Promise<StudentExamResponse[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-class/${className}/exams`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowStudentsExam({}: Props) {
  return (
    <div className="flex gap-3">
      <div className="sm:w-96 w-full black-box-shadow max-w-full p-3 border border-soft-border bg-card-bg rounded-2xl flex flex-col gap-2">
        {/* Top */}
        <div className="flex items-center gap-2 justify-between flex-wrap">
          <ExamStatusPadge status="SCHEDULED" />
          <p className="font-bold">91/100</p>
        </div>

        {/* Title */}
        <p className="text-main-text font-bold text-lg">First Exam</p>

        {/* Small Info */}
        <div className="flex flex-col gap-2">
          <ExamSmallParagraph
            icon={<ClockArrowUp className="w-4 h-4" />}
            title={"Starting on : " + timeConverter("2025-07-29T15:27:30.933Z")}
          />
          <ExamSmallParagraph
            icon={<ClockArrowDown className="w-4 h-4" />}
            title={"Ending on : " + timeConverter("2025-07-29T15:27:30.933Z")}
          />
          <ExamSmallParagraph
            icon={<Timer className="w-4 h-4" />}
            title={`Duration : ${10} Minutes`}
          />
          <ExamSmallParagraph
            icon={<Star className="w-4 h-4" />}
            title={`Total Marks : ${10} Degrees`}
          />
        </div>

        {/* Bottom */}
        <div className="mt-auto bg-[#181C22] p-4">
          <Button className="w-full" variant={"mainWithShadow"}>
            Join Exam
            <FaLongArrowAltRight className="w-4 h-4" />

          </Button>
        </div>
      </div>
    </div>
  );
}
