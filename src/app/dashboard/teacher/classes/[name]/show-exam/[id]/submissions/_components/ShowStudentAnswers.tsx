import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import StudentCardWithImage from "./StudentCardWithImage";
import axios from "axios";
import { MainDomain } from "@/variables/MainDomain";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import SmallLoader from "@/components/Global/SmallLoader";
import ExamQuestionsWithStudentAnsewr from "./ExamQuestionsWithStudentAnsewr";
import { ErrorResponseType, ExamQuestionType } from "@/lib/globalTypes";
import GlobalToast from "@/components/Global/GlobalToast";
type Props = {
  imageUrl: string;
  name: string;
  id: string;
  className: string;
  token: string;
  examId: string;
  studentMark: number;
  totalMark: number;
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
  const res = await axios.get(
    `${MainDomain}/api/get/class/${className}/exams/${examId}/${stdId}/student-answers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
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

export default function ShowStudentAnswers({
  id,
  imageUrl,
  name,
  className,
  examId,
  token,
  studentMark,
  totalMark,
}: Props) {
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

  return (
    <AlertDialog onOpenChange={setOpened} open={opened}>
      <AlertDialogTrigger asChild>
        <Button className="bg-Second-Card-bg hover:bg-Second-black text-white border border-soft-border">
          Show
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <div className="overflow-y-auto">
          <AlertDialogHeader className="contents space-y-0 text-left">
            <AlertDialogTitle className="px-6 pt-6 text-base flex items-center justify-between flex-wrap">
              <div>
                <p>Answers</p>
                <p className="text-sm">
                  {studentMark}/{totalMark}
                </p>
              </div>
              <div className="bg-Second-black p-1 rounded-2xl w-fit pr-10">
                <StudentCardWithImage id={id} imageUrl={imageUrl} name={name} />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white" asChild>
              {isLoading ? (
                <div className="p-6 flex items-center justify-center gap-2 ">
                  <SmallLoader color="white" />
                  Loading....
                </div>
              ) : (
                data && (
                  <div className="p-6 flex flex-col gap-3">
                    {data.map((q, index) => (
                      <ExamQuestionsWithStudentAnsewr
                        corrections={examCorrection}
                        setExamCorrection={setExamCorrection}
                        questionData={q}
                        index={index}
                        key={q.id}
                      />
                    ))}
                  </div>
                )
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter className="border-t border-soft-border px-6 py-4">
          <AlertDialogCancel className="bg-red-500 sm:w-20 w-full rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={() => {
              mutate({
                student_id: id,
                examCorrection,
                token,
                exam_id: examId,
              });
            }}
            disabled={isPending}
            type="button"
            className="bg-main-text min-w-20 text-black hover:text-black hover:opacity-85 hover:bg-main-text border border-main-text">
            {isPending ? <SmallLoader /> : "Save"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
