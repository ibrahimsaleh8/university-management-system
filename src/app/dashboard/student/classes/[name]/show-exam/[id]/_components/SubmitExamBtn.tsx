import { Button } from "@/components/ui/button";
import { StudentAnswersDataType } from "./ShowQuestions";
import { SubmitStudentExam } from "@/lib/SubmitStudentExam";
import SmallLoader from "@/components/Global/SmallLoader";
type parops = {
  token: string;
  examId: string;
  studentAnswers: StudentAnswersDataType[];
  className: string;
};

export default function SubmitExamBtn({
  examId,
  className,
  studentAnswers,
  token,
}: parops) {
  const { mutate, isPending } = SubmitStudentExam({ examId, className });
  return (
    <Button
      onClick={() => {
        mutate({
          examId,
          studentAnswers,
          token,
        });
        localStorage.removeItem("student_answers");
      }}
      disabled={isPending}
      className="min-w-48"
      variant={"mainWithShadow"}>
      {isPending ? <SmallLoader /> : "Submit Exam"}
    </Button>
  );
}
