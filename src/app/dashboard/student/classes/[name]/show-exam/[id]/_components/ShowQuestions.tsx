import { ExamQuestionType } from "@/lib/globalTypes";
import { MainDomain } from "@/variables/MainDomain";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import ExamQuestionCard from "./ExamQuestionCard";
import SubmitExamBtn from "./SubmitExamBtn";
import SmallLoader from "@/components/Global/SmallLoader";
import ExamCountdown from "./ExamCountdown";
type Props = {
  examId: string;
  className: string;
  token: string;
  enrollDate: Date;
  examDurationMinutes: number;
};
export type StudentAnswersDataType = {
  questionId: number;
  answer: string;
};
export type QuestionExamDataType = {
  id: number;
  question: string;
  mark: number;
  chooses?: string[] | undefined;
  type: ExamQuestionType;
};

async function getExamQuestions(
  examId: string,
  className: string,
  token: string
): Promise<QuestionExamDataType[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/student-class/${className}/exams/${examId}/questions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}
export default function ShowQuestions({
  examId,
  className,
  token,
  enrollDate,
  examDurationMinutes,
}: Props) {
  const { isLoading, error, isError, data } = useQuery({
    queryKey: ["exam_questions", examId],
    queryFn: () => getExamQuestions(examId, className, token),
  });
  if (error && isError) throw new Error(error.message);
  const [studentAnswers, setStudentAnswers] = useState<
    StudentAnswersDataType[]
  >([]);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("student_answers");
    if (savedAnswers) {
      setStudentAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    if (studentAnswers.length > 0) {
      localStorage.setItem("student_answers", JSON.stringify(studentAnswers));
    }
  }, [studentAnswers]);

  return isLoading ? (
    <div className="md:w-3/4 w-full mx-auto flex items-center gap-2 justify-center h-32">
      <SmallLoader color="white" /> Loading...
    </div>
  ) : (
    data && (
      <div className="flex flex-col gap-4 md:w-3/4 w-full mx-auto">
        <ExamCountdown
          className={className}
          examId={examId}
          studentAnswers={studentAnswers}
          token={token}
          enrollDate={enrollDate}
          examDurationMinutes={examDurationMinutes}
        />

        {data.map((question, i) => (
          <ExamQuestionCard
            Qdata={question}
            Qnumber={i + 1}
            key={question.id}
            setStudentAnswer={setStudentAnswers}
            studentAnswer={studentAnswers}
          />
        ))}
        <div className="mt-5">
          <SubmitExamBtn
            className={className}
            examId={examId}
            studentAnswers={studentAnswers}
            token={token}
          />
        </div>
      </div>
    )
  );
}
