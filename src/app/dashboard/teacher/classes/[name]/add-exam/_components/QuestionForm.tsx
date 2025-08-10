"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ExamDataType } from "@/validation/AddExamValidation";
import ExamTextAreaForm from "./ExamTextAreaForm";
import { ExamQuestionType } from "@/lib/globalTypes";
import ExamInputForm from "./ExamInputForm";

type Props = {
  index: number;
  register: UseFormRegister<ExamDataType>;
  error?: Merge<FieldError, FieldErrorsImpl<ExamDataType["questions"][number]>>;
  remove: () => void;
  setValue: UseFormSetValue<ExamDataType>;
  watch: UseFormWatch<ExamDataType>;
};
const labels: ["label_1", "label_2", "label_3", "label_4"] = [
  "label_1",
  "label_2",
  "label_3",
  "label_4",
];
export default function QuestionForm({
  index,
  error,
  setValue,
  register,
  watch,
}: Props) {
  const [choosesValues, setChoosesValues] = useState({
    label_1: "",
    label_2: "",
    label_3: "",
    label_4: "",
  });

  const id = `${index}-id`;

  return (
    <MotionEffect
      fade
      blur="10px"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      inView>
      <div className="flex flex-col gap-2 border border-[#292929] py-3 px-5 rounded-2xl relative bg-[#191717]">
        <p className="flex items-center font-medium gap-2 text-sm bg-Second-black w-fit px-1 text-low-white absolute top-[-13px] left-4">
          Q-{index + 1}
        </p>

        {/* Title & Mark & Type */}
        <div className="flex items-start justify-between gap-3 flex-col sm:flex-row">
          {/* Left */}
          <div className="w-full">
            <ExamTextAreaForm
              isError={error?.question != undefined}
              label="Question Title"
              placeholder="Question Title"
            />
          </div>

          {/* Right */}
          <div className="flex flex-col gap-3">
            {/* Qusetion Type */}
            <div className="flex flex-col gap-1">
              <label htmlFor={`${id}-Qtype`} className="text-sm">
                Question Type:
              </label>
              <Select
                onValueChange={(e: ExamQuestionType) =>
                  setValue(`questions.${index}.type`, e)
                }>
                <SelectTrigger
                  id={`${id}-Qtype`}
                  className="w-full bg-Second-Card-bg">
                  <SelectValue placeholder="Question Type" />
                </SelectTrigger>
                <SelectContent className="bg-Second-Card-bg">
                  <SelectItem value="CHOOSE">Multiple Choice</SelectItem>
                  <SelectItem value="TRUE_FALSE">True / False</SelectItem>
                  <SelectItem value="WRITE">Written Answer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Question Mark */}
            <ExamInputForm
              isError={error?.mark != undefined}
              label="Exam Mark"
              placeholder="Exam Mark"
              type="number"
              {...register("totalMark")}
            />

            {/* Correct Answer */}
            <div>
              {watch(`questions.${index}.type`) == "CHOOSE" && (
                <>Choose Options</>
              )}
              {watch(`questions.${index}.type`) == "TRUE_FALSE" && (
                <>TRUE_FALSE Options</>
              )}
              {watch(`questions.${index}.type`) == "WRITE" && (
                <>WRITE Options</>
              )}
            </div>
          </div>
        </div>
      </div>
    </MotionEffect>
  );
}
