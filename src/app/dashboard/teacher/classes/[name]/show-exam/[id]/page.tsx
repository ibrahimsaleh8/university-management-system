import { ExamQuestionType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { cookies } from "next/headers";
import ExamQuestion from "./_components/ExamQuestion";

export type typeExamQuestionDataType = {
  id: number;
  question: string;
  mark: number;
  chooses?: string[];
  type: ExamQuestionType;
  rightAnswer?: string;
};

export default async function ShowExamById({
  params,
}: {
  params: Promise<{ id: string; name: string }>;
}) {
  const { id, name } = await params;
  const token = (await (await cookies()).get("token")?.value) as string;

  const res = await fetch(
    `${MainDomain}/api/get/class/${name}/exams/${id}/questions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const questions: typeExamQuestionDataType[] = await res.json();

  return (
    <div className="flex flex-col gap-5 mt-5">
      {questions.map((question, i) => (
        <ExamQuestion key={i} Qnumber={i + 1} Qdata={question} />
      ))}
    </div>
  );
}
