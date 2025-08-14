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
import SmallLoader from "@/components/Global/SmallLoader";
import ExamQuestionsWithStudentAnsewr from "./ExamQuestionsWithStudentAnsewr";
import { useShowStudentAnswers } from "./useShowStudentAnswers";
import { Check } from "lucide-react";
type Props = {
  imageUrl: string;
  name: string;
  id: string;
  className: string;
  token: string;
  examId: string;
  studentMark: number;
  totalMark: number;
  isMarked: boolean;
};

export default function ShowStudentAnswers({
  id,
  imageUrl,
  name,
  className,
  examId,
  token,
  studentMark,
  totalMark,
  isMarked,
}: Props) {
  const {
    data,
    examCorrection,
    isLoading,
    isPending,
    mutate,
    setExamCorrection,
    setOpened,
    opened,
  } = useShowStudentAnswers({ className, examId, id, token });
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
                <div className="flex items-center gap-3">
                  <p className="text-sm">
                    {studentMark}/{totalMark}
                  </p>
                  <>
                    {isMarked ? (
                      <p className="text-main-text flex items-center gap-1 text-xs">
                        <Check className="w-4 h-4" />
                        Marked
                      </p>
                    ) : (
                      <p className="flex items-center gap-1 text-xs text-red-400">
                        Not Marked Yet
                      </p>
                    )}
                  </>
                </div>
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
