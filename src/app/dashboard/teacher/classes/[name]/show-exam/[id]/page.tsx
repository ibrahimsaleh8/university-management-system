import { ExamQuestionType, ExamStatusType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { cookies } from "next/headers";
import ExamHeader from "./_components/ExamHeader";
import ExamInfo from "./_components/ExamInfo";
import ExamQuestion from "./_components/ExamQuestion";
import BackButton from "@/app/dashboard/_components/forms/BackButton";
import DeleteExamModel from "./_components/DeleteExamModel";

export type typeExamQuestionDataType = {
  id: number;
  question: string;
  mark: number;
  chooses?: string[];
  type: ExamQuestionType;
  rightAnswer: string;
};
export type ExamResponseType = {
  title: string;
  class: {
    teacher: {
      first_name: string;
      last_name: string;
      image: string;
    };
    name: string;
  };
  course: {
    course: {
      name: string;
    };
  };
  created_at: string;
  duration: number;
  endDate: string;
  startDate: string;
  status: ExamStatusType;
  totalMark: number;
  questions: typeExamQuestionDataType[];
};

export default async function ShowExamById({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) {
  const { id, name } = await params;
  const token = (await (await cookies()).get("token")?.value) as string;

  const res = await fetch(`${MainDomain}/api/get/class/${name}/exams/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const examData: ExamResponseType = await res.json();

  console.log(examData);
  return (
    <div className="flex flex-col gap-4 sm:px-10 px-3 text-sm">
      <div className="flex items-center justify-between gap-3">
        <BackButton withText={false} />
        <DeleteExamModel className={name} examId={id} token={token} />
      </div>
      {/* HEAD */}
      <div className="flex flex-col relative gap-3 bg-Second-black p-4 overflow-hidden rounded-md exam-head-dash black-box-shadow">
        {/* Title */}
        <div className="flex items-center justify-center">
          <p className="capitalize sm:text-lg text-base font-medium text-center line-clamp-1">
            {examData.title}
          </p>
        </div>
        {/* Header */}
        <ExamHeader
          status={examData.status}
          className={examData.class.name}
          course={examData.course.course.name}
          create_at={examData.created_at}
          teacherImage={examData.class.teacher.image}
          teacherName={`${examData.class.teacher.first_name} ${examData.class.teacher.last_name}`}
        />

        {/* Exam Info */}
        <ExamInfo
          duration={examData.duration}
          ending_on={examData.endDate}
          full_mark={examData.totalMark}
          starting_on={examData.startDate}
        />
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-5 mt-5">
        {examData.questions.map((question, i) => (
          <ExamQuestion key={i} Qnumber={i + 1} Qdata={question} />
        ))}
      </div>
    </div>
  );
}
