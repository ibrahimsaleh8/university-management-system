"use client";
import { ClockAlert, FileCheck, Plus, Timer } from "lucide-react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { timeConverter } from "@/lib/TimeConverter";
import { Button } from "@/components/ui/button";
import ExamInstructions from "./ExamInstructions";
import SmallExamInfo from "./SmallExamInfo";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import { ExamStatusType } from "@/lib/globalTypes";
import ExamStatusPadge from "@/app/dashboard/_components/ExamStatusPadge";
type Props = {
  examId: string;
  className: string;
  token: string;
};

type ExamDataResponse = {
  title: string;
  duration: number;
  endDate: Date;
  totalMark: number;
  questions: number;
  status: ExamStatusType;
};

async function getExamDetails(
  examId: string,
  className: string,
  token: string
): Promise<ExamDataResponse> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-class/${className}/exams/${examId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function ShowExamDetails({ examId, className, token }: Props) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["student_exam_details", examId],
    queryFn: () => getExamDetails(examId, className, token),
  });
  if (error && isError) throw new Error(error.message);

  return isLoading ? (
    <>Loading</>
  ) : (
    data && (
      <div className="flex flex-col gap-5 p-2 w-full">
        {/* Header */}
        <div className="flex items-center flex-col md:flex-row justify-between gap-2 flex-wrap">
          <div className="flex flex-col gap-0.5 font-medium text-low-white">
            <p className="flex items-center gap-1">
              <ClockAlert className="w-5 h-5 text-red-500" />
              Last Time To Enroll
            </p>

            <p className="text-xs pl-5">{timeConverter(data.endDate)}</p>
          </div>
          <h1 className="text-xl font-bold capitalize">{data.title}</h1>
          <ExamInstructions />
        </div>

        {/* Top Info */}
        <div className="flex flex-col gap-7 md:w-3/4 w-full mx-auto p-3 bg-Second-black rounded-2xl black-box-shadow">
          <div className="flex items-center gap-5 justify-between  flex-wrap">
            <SmallExamInfo
              icon={<Timer className="w-6 h-6 text-main-text" />}
              title={`Duration`}
              value={`${data.duration} Miniutes`}
            />
            <SmallExamInfo
              icon={<FileCheck className="w-6 h-6 text-main-text" />}
              title={`Total Marks`}
              value={`${data.totalMark}`}
            />
            <SmallExamInfo
              icon={<FaRegQuestionCircle className="w-6 h-6 text-main-text" />}
              title={`Questions`}
              value={`${data.questions}`}
            />
          </div>
          {data.status == "ONGOING" ? (
            <Button className="min-w-36  mx-auto bg-main-text hover:bg-transparent text-black hover:text-main-text duration-300 border border-main-text">
              <Plus /> Enroll Now
            </Button>
          ) : (
            <div className="flex items-center justify-center">
              <ExamStatusPadge status={data.status} />
            </div>
          )}
        </div>
      </div>
    )
  );
}
