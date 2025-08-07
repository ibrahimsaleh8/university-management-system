import { ClockAlert, FileCheck, Plus, Timer } from "lucide-react";
import SmallExamInfo from "./_components/SmallExamInfo";
import { FaRegQuestionCircle } from "react-icons/fa";
import { timeConverter } from "@/lib/TimeConverter";
import ExamInstructions from "./_components/ExamInstructions";
import { Button } from "@/components/ui/button";

export default async function ShowStudentExamById({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) {
  const { id, name } = await params;
  console.log("id", id);
  console.log("name", name);
  return (
    <div className="flex flex-col gap-5 p-2">
      {/* Header */}
      <div className="flex items-center flex-col md:flex-row justify-between gap-2 flex-wrap">
        <div className="flex flex-col gap-0.5 font-medium text-low-white">
          <p className="flex items-center gap-1">
            <ClockAlert className="w-5 h-5 text-red-500" />
            Last Time To Enroll
          </p>

          <p className="text-xs pl-5">
            {timeConverter("2004-03-04T00:00:00.000Z")}
          </p>
        </div>
        <h1 className="text-xl font-bold">Exam Title</h1>
        <ExamInstructions />
      </div>

      {/* Top Info */}
      <div className="flex flex-col gap-7 md:w-3/4 w-full mx-auto p-3 bg-Second-black rounded-2xl black-box-shadow">
        <div className="flex items-center gap-5 justify-between  flex-wrap">
          <SmallExamInfo
            icon={<Timer className="w-6 h-6 text-main-text" />}
            title={`Duration`}
            value={`20 Miniutes`}
          />
          <SmallExamInfo
            icon={<FileCheck className="w-6 h-6 text-main-text" />}
            title={`Total Marks`}
            value={`100`}
          />
          <SmallExamInfo
            icon={<FaRegQuestionCircle className="w-6 h-6 text-main-text" />}
            title={`Questions`}
            value={`10`}
          />
        </div>

        <Button className="min-w-36  mx-auto bg-main-text hover:bg-transparent text-black hover:text-main-text duration-300 border border-main-text">
          <Plus /> Enroll Now
        </Button>
      </div>
    </div>
  );
}
