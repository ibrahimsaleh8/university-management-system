import { ErrorResponseType, ExamQuestionType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";

import axios, { AxiosError } from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
type Props = {
  id: string;
  className: string;
  token: string;
  examId: string;
};

type MarkAnswersMutation = {
  token: string;
  examCorrection: ExamCorrection[];
  student_id: string;
  exam_id: string;
};
type StudentAnswerType = {
  id: number;
  examQuestionId: string;
  answer?: string;
  empty: boolean;
  score: number;
  isMarked: boolean;
};

export type ExamQuestionWithAnswerType = {
  id: number;
  mark: number;
  question: string;
  rightAnswer: string;
  type: ExamQuestionType;
  studentAnswer: StudentAnswerType;
};

export type ExamCorrection = {
  studentAnswerId: number;
  isMarked: boolean;
  score: number;
};

async function getExamQuestionsWithAnswers(
  className: string,
  examId: string,
  token: string,
  stdId: string
): Promise<ExamQuestionWithAnswerType[]> {
  try {
    const res = await axios.get(
      `${MainDomain}/api/get/class/${className}/exams/${examId}/${stdId}/student-answers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
}

async function markAnswers({
  examCorrection,
  student_id,
  token,
  exam_id,
}: MarkAnswersMutation) {
  await axios.post(
    `${MainDomain}/api/create/mark-student-answers`,
    {
      examCorrection,
      student_id,
      exam_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const useShowStudentAnswers = ({
  className,
  examId,
  id,
  token,
}: Props) => {
  const [opened, setOpened] = useState(false);
  const [examCorrection, setExamCorrection] = useState<ExamCorrection[]>([]);
  const queryClinet = useQueryClient();

  // Api
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["student_exam_answers", id, examId],
    queryFn: () => getExamQuestionsWithAnswers(className, examId, token, id),
    enabled: opened,
  });
  if (error && isError) throw new Error(error.message);

  const { isPending, mutate } = useMutation({
    mutationFn: (data: MarkAnswersMutation) => markAnswers(data),
    onSuccess: () => {
      queryClinet.refetchQueries({
        queryKey: ["student_exam_answers", id, examId],
      });
      queryClinet.refetchQueries({
        queryKey: ["students_submissons", examId, className],
      });
      GlobalToast({
        title: "Student questions has been marked",
        icon: "success",
      });
    },
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        title: err.response.data.message,
        icon: "error",
      });
    },
  });
  return {
    isPending,
    mutate,
    data,
    isLoading,
    setExamCorrection,
    examCorrection,
    setOpened,
    opened,
  };
};
