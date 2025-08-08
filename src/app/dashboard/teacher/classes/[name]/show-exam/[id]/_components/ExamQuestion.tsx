"use client";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/animate-ui/radix/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/animate-ui/radix/tooltip";
import { Input } from "@/components/ui/input";
import { RiErrorWarningLine } from "react-icons/ri";
import { typeExamQuestionDataType } from "../page";
import { Textarea } from "@/components/ui/textarea";
type Props = {
  Qnumber: number;
  Qdata: typeExamQuestionDataType;
};
export default function ExamQuestion({ Qdata, Qnumber }: Props) {
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
            onValueChange={(e) => console.log("e", e)}
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
              id={`${Qnumber}-write-Answer`}
              placeholder="Write your answer"
              className="w-full bg-[#0e0e0e] h-32 resize-none"
            />
          </>
        )}
      </div>
      {/* Right Answer */}

      {Qdata.rightAnswer && (
        <div className="flex items-end gap-1 w-full mt-3">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor={`right-answer-${Qnumber}`} className="text-sm">
              Right Answer:
            </label>
            <Input
              disabled={true}
              id={`right-answer-${Qnumber}`}
              type="text"
              placeholder="Right Answer"
              className="w-full bg-[#0e0e0e] h-[46px]"
              defaultValue={Qdata.rightAnswer}
            />
          </div>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger className="w-fit cursor-pointer mb-3.5">
                <RiErrorWarningLine className="w-5 h-5 text-blue-500" />
              </TooltipTrigger>
              <TooltipContent>Teacher only can see right answer</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
