import { StudentAnswersDataType } from "@/app/dashboard/student/classes/[name]/show-exam/[id]/_components/ShowQuestions";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ErrorResponseType } from "./globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";

type AnswerSubmisionsDataType = {
  token: string;
  examId: string;
  studentAnswers: StudentAnswersDataType[];
};
async function submitStudentAnswers(data: AnswerSubmisionsDataType) {
  await axios.post(
    `${MainDomain}/api/create/student-exam-answers`,
    {
      examId: data.examId,
      studentAnswers: data.studentAnswers,
    },
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
}
export const SubmitStudentExam = ({
  examId,
  className,
}: {
  className: string;
  examId: string;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: AnswerSubmisionsDataType) => submitStudentAnswers(data),
    onError: (err: ErrorResponseType) => {
      GlobalToast({
        icon: "error",
        title: err.response.data.message,
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["student_exam_details", examId],
      });
      queryClient.refetchQueries({
        queryKey: ["student_class_exams", className],
      });

      GlobalToast({
        icon: "success",
        title: "Answers has been submitted success",
      });
    },
  });
  return {
    mutate,
    isPending,
  };
};
