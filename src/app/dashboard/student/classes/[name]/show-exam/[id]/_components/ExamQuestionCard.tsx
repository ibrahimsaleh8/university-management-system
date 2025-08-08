"use client";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { QuestionExamDataType, StudentAnswersDataType } from "./ShowQuestions";
import { Dispatch, SetStateAction } from "react";
type Props = {
  Qnumber: number;
  Qdata: QuestionExamDataType;
  studentAnswer: StudentAnswersDataType[];
  setStudentAnswer: Dispatch<SetStateAction<StudentAnswersDataType[]>>;
};
export default function ExamQuestionCard({
  Qdata,
  Qnumber,
  studentAnswer,
  setStudentAnswer,
}: Props) {
  const Answer =
    studentAnswer.find((ans) => ans.questionId === Qdata.id) || null;

  const HandleChange = (text: string) => {
    setStudentAnswer((prev) => {
      const updated = prev.filter((ans) => ans.questionId !== Qdata.id);
      return [...updated, { answer: text, questionId: Qdata.id }];
    });
  };

  return (
    <div className="flex flex-col gap-3 bg-Second-black p-4 rounded-md border border-soft-border">
      <p className="flex items-center gap-3 flex-wrap">
        <span className="text-sm p-1.5 bg-main-text text-black rounded-sm font-medium">
          Q-{Qnumber}
        </span>
        <span className="text-xl font-medium">
          {Qdata.question} {!Qdata.question.endsWith("?") && "?"}
        </span>

        <span className="ml-auto text-low-white">({Qdata.mark} Degree)</span>
      </p>
      <div className="mt-4">
        {/* Choose */}
        {(Qdata.type == "CHOOSE" || Qdata.type == "TRUE_FALSE") && (
          <RadioGroup
            defaultValue={
              Answer && Answer.questionId == Qdata.id ? Answer.answer : ""
            }
            onValueChange={(e) => HandleChange(e)}
            className="pl-1 gap-3">
            {Qdata.type == "CHOOSE" &&
              Qdata.chooses &&
              Qdata.chooses.map((choose, i) => (
                <label
                  key={i}
                  className="flex items-center cursor-pointer border border-[#0e0e0e] hover:border-soft-border duration-300 gap-4 bg-[#0e0e0e] p-3 rounded-sm"
                  htmlFor={`${Qnumber}-choose-${i}`}>
                  <RadioGroupItem
                    id={`${Qnumber}-choose-${i}`}
                    value={choose}
                  />

                  {choose}
                </label>
              ))}
            {Qdata.type == "TRUE_FALSE" && (
              <>
                <label
                  className="flex items-center cursor-pointer border border-[#0e0e0e] hover:border-soft-border duration-300 gap-4 bg-[#0e0e0e] p-3 rounded-sm"
                  htmlFor={`${Qnumber}-true`}>
                  <RadioGroupItem id={`${Qnumber}-true`} value="true" />
                  True
                </label>
                <label
                  className="flex items-center cursor-pointer border border-[#0e0e0e] hover:border-soft-border duration-300 gap-4 bg-[#0e0e0e] p-3 rounded-sm"
                  htmlFor={`${Qnumber}-false`}>
                  <RadioGroupItem id={`${Qnumber}-false`} value="false" />
                  False
                </label>
              </>
            )}
          </RadioGroup>
        )}

        {Qdata.type == "WRITE" && (
          <>
            <Textarea
              onChange={(e) => HandleChange(e.target.value)}
              defaultValue={
                Answer && Answer.questionId == Qdata.id ? Answer.answer : ""
              }
              id={`${Qnumber}-write-Answer`}
              placeholder="Write your answer"
              className="w-full bg-[#0e0e0e] h-32 resize-none"
            />
          </>
        )}
      </div>
    </div>
  );
}
