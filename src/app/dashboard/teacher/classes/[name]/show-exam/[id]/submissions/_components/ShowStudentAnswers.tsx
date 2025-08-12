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
import { useQuery } from "@tanstack/react-query";
type Props = {
  imageUrl: string;
  name: string;
  id: string;
  className: string;
  token: string;
  examId: string;
};
type ExamQuestionResponse = {
  id: string;
  question: string;
  rightAnswer: string;
  mark: number;
  answers: {
    id: string;
    score: number;
    answer: string;
  }[];
};

async function getExamQuestionsWithAnswers(
  className: string,
  examId: string,
  token: string
): Promise<ExamQuestionResponse[]> {
  const res = await axios.get(
    `${MainDomain}/api/get/class/${className}/exams/${examId}/submissons`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
}

export default function ShowStudentAnswers({
  id,
  imageUrl,
  name,
  className,
  examId,
  token,
}: Props) {
  const {} = useQuery({
    queryKey: ["student_answers"],
    queryFn: () => getExamQuestionsWithAnswers(className, examId, token),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-Second-Card-bg hover:bg-Second-black text-white border border-soft-border">
          Show
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <div className="overflow-y-auto">
          <AlertDialogHeader className="contents space-y-0 text-left">
            <AlertDialogTitle className="px-6 pt-6 text-base flex items-center justify-between flex-wrap">
              <p>Answers</p>
              <div className="bg-Second-black p-1 rounded-2xl w-fit pr-10">
                <StudentCardWithImage id={id} imageUrl={imageUrl} name={name} />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="p-6">Loading....</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter className="border-t border-soft-border px-6 py-4">
          <AlertDialogCancel className="bg-red-500 w-20 rounded-sm !p-2 text-white border-red-500 hover:bg-red-600 hover:text-white duration-300">
            Cancel
          </AlertDialogCancel>
          <Button
            type="button"
            className="bg-main-text min-w-20 text-black hover:text-black hover:opacity-85 hover:bg-main-text border border-main-text">
            Save
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
