import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import GlobalToast from "@/components/Global/GlobalToast";
import {
  ExamCorrection,
  ExamQuestionWithAnswerType,
} from "./useShowStudentAnswers";
type Props = {
  questionData: ExamQuestionWithAnswerType;
  index: number;
  setExamCorrection: Dispatch<SetStateAction<ExamCorrection[]>>;
  corrections: ExamCorrection[];
};
export default function ExamQuestionsWithStudentAnsewr({
  index,
  questionData,
  setExamCorrection,
  corrections,
}: Props) {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(
    !questionData.studentAnswer.isMarked
      ? null
      : (questionData.mark >= questionData.studentAnswer.score &&
          questionData.studentAnswer.score != 0) ||
        questionData.rightAnswer == questionData.studentAnswer.answer
      ? true
      : questionData.studentAnswer.score == 0 && false
  );

  const [writtenMark, setWrittenMark] = useState(0);
  const markQuestion = (isCorrectAnswer: boolean) => {
    setExamCorrection((prev) => [
      ...prev.filter(
        (answer) => answer.studentAnswerId !== questionData.studentAnswer.id
      ),
      {
        studentAnswerId: questionData.studentAnswer.id,
        isMarked: true,
        score:
          questionData.type === "WRITE"
            ? writtenMark
            : isCorrectAnswer
            ? questionData.mark
            : 0,
      },
    ]);
  };

  const styleStudentAnswer =
    isCorrect == true
      ? "bg-glass-green border-green-600"
      : isCorrect == false
      ? "bg-glass-red border-red-600"
      : "bg-Second-Card-bg border-soft-border";
  return (
    <div className="bg-Second-black p-3 rounded-sm w-full flex flex-col gap-3 relative">
      {corrections.findIndex(
        (c) => c.studentAnswerId == questionData.studentAnswer.id
      ) != -1 && (
        <p className="bg-green-600 rounded-full w-5 h-5 flex items-center justify-center absolute right-[-4px] top-[-6px]">
          <Check className="w-4 h-4" />
        </p>
      )}

      <p className="font-bold">
        {index + 1} - {questionData.question}
      </p>

      {/* Right Answer */}
      <div className="flex flex-col gap-1">
        <p>Correct Answer:</p>
        <p className="flex items-center gap-2 py-2 px-3 bg-[#0D1D12] border border-[#193f25] rounded-sm">
          <Check className="w-4 h-4 text-main-text" />
          <span>{questionData.rightAnswer}</span>
        </p>
      </div>

      {/* Student Answer */}
      <div className="flex flex-col gap-1">
        <p>Student Answer:</p>
        {!questionData.studentAnswer.empty ? (
          <p
            className={`flex items-center gap-2 py-2 px-3 border rounded-sm ${styleStudentAnswer}`}>
            {isCorrect == true ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              isCorrect == false && <X className="w-4 h-4 text-red-500" />
            )}
            {questionData.studentAnswer.answer}
          </p>
        ) : (
          <p
            className={`flex items-center gap-2 text-red-500 py-2 px-3 border rounded-sm bg-glass-red border-red-600`}>
            Student {"Did't"} Answer to this Question
          </p>
        )}
      </div>

      {/* Bottom */}
      <div className="flex flex-wrap justify-between gap-3 items-center">
        <div className="flex flex-col gap-1">
          <p>Mark Answer:</p>
          {questionData.type == "WRITE" ? (
            <div className="flex items-center gap-1 ">
              <Input
                onChange={(e) => setWrittenMark(+e.target.value)}
                type="number"
                defaultValue={writtenMark}
                placeholder="Mark"
                className="bg-Second-Card-bg w-32"
                min={0}
                max={questionData.mark}
              />
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  if (writtenMark > questionData.mark) {
                    GlobalToast({
                      icon: "warning",
                      title: `Your mark is greater than ${questionData.mark}`,
                    });
                    return;
                  }
                  markQuestion(writtenMark > 0);
                }}>
                Mark
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setIsCorrect(true);
                  markQuestion(true);
                }}
                className="bg-green-500 hover:bg-green-600">
                <Check />
              </Button>
              <Button
                onClick={() => {
                  setIsCorrect(false);
                  markQuestion(false);
                }}
                variant={"destructive"}>
                <X />
              </Button>
            </div>
          )}
        </div>
        <p className="bg-glass-main-text text-main-text p-2 rounded-sm w-fit">
          Score: {questionData.mark}
        </p>
      </div>
    </div>
  );
}
